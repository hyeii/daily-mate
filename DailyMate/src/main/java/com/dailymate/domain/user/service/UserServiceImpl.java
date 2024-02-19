package com.dailymate.domain.user.service;

import com.dailymate.domain.friend.dao.FriendRepository;
import com.dailymate.domain.user.constant.UserType;
import com.dailymate.domain.user.dao.RefreshTokenRedisRepository;
import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.domain.RefreshToken;
import com.dailymate.domain.user.domain.Users;
import com.dailymate.domain.user.dto.request.*;
import com.dailymate.domain.user.dto.response.*;
import com.dailymate.domain.user.exception.UserBadRequestException;
import com.dailymate.domain.user.exception.UserExceptionMessage;
import com.dailymate.domain.user.exception.UserNotFoundException;
import com.dailymate.global.common.jwt.JwtTokenDto;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import com.dailymate.global.common.jwt.constant.JwtTokenExpiration;
import com.dailymate.global.common.redis.RedisUtil;
import com.dailymate.global.exception.exception.NotFoundException;
import com.dailymate.global.exception.exception.TokenException;
import com.dailymate.global.exception.exception.TokenExceptionMessage;
import com.dailymate.global.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final RedisUtil redisUtil;
    private final ImageService imageService;
    private final FriendRepository friendRepository;

    /**
     * 회원가입
     */
    @Transactional
    @Override
    public void signUp(SignUpReqDto reqDto) {
        String email = reqDto.getEmail();
        log.info("[회원가입] 회원가입 요청 email : {}", email);

        // 이메일 중복 검사 -> 메서드 따로 뺼거임
        // 닉네임 중복 확인 -> 메서드 따로 뺄거임

        // 회원가입 정보 유효성 체크(다 입력했는가)
        if(!checkSignupInfo(reqDto)) {
            log.error("[회원가입] 회원가입 정보 유효성 검사 FALSE");
            throw new UserBadRequestException(UserExceptionMessage.SIGN_UP_BAD_REQUEST.getMsg());
        }

        // 비밀번호 정규화 체크(프론트에서 처리하지만, 만약을 대비해서 에러를 날리기로 합의함)
        if(!checkPasswordRegex(reqDto.getPassword())) {
            log.error("[회원가입] 비밀번호는 8~16자 이내 영문, 숫자, 특수문자를 포함해야합니다.");
            throw new UserBadRequestException(UserExceptionMessage.PASSWORD_NOT_MATCH_REGEX.getMsg());
        }

        // 비밀번호 암호화
        reqDto.setPassword(passwordEncoder.encode(reqDto.getPassword()));

        // 엔티티 저장
        userRepository.save(reqDto.dtoToEntity());
        log.info("[회원가입] 회원가입이 완료되었습니다 !!!");
    }

    /**
     * 회원가입 전 이메일 중복 검사
     * 단, 탈퇴한 회원의 이메일은 재사용 가능
     *
     * 중복 O - true / 중복 X - false
     */
    @Override
    public Boolean checkEmail(String email) {
        log.info("[이메일 중복 검사] email : {}", email);
        return userRepository.existsByEmail(email);
    }

    /**
     * 회원가입 전 닉네임 중복 검사
     * 단, 탈퇴한 회원의 닉네임은 재사용 가능
     *
     * 중복 O - true / 중복 X - false
     */
    @Override
    public Boolean checkNickname(String nickname) {
        log.info("[닉네임 중복 검사] nickname : {}", nickname);
        return userRepository.existsByNickname(nickname);
    }

    /**
     * 로그인
     */
    @Transactional
    @Override
    public LogInResDto logIn(LogInReqDto reqDto) {
        String email = reqDto.getEmail();
        log.info("[로그인] 로그인 요청 email : {}", email);

        // 존재하는 회원 체크 && 탈퇴한 회원인지도 체크
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("[로그인] 존재하지 않는 사용자입니다.");
                    return new UserNotFoundException(UserExceptionMessage.USER_NOT_FOUND.getMsg());
                });

        // 1. email + password 기반으로 Authentication 객체 생성
        // 이때 authentication은 인증 여부를 확인하는 authenticated값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, reqDto.getPassword());

        // 2. 실제 검증(비밀번호 체크)
        // authenticate 메서드가 실행될 때 UserDetailsServiceImpl에서 만든 loadUserByUserName() 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtTokenDto jwtToken = jwtTokenProvider.generateToken(authentication);

        // 4. Redis에 refreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .email(email)
                .refreshToken(jwtToken.getRefreshToken())
                .expiration(JwtTokenExpiration.REFRESH_TOKEN_EXPIRATION_TIME.getTime() / 1000) // 나누기 1000왜하는거징
                .build();

        refreshTokenRedisRepository.save(refreshToken);

        return LogInResDto.builder()
                .accessToken(jwtToken.getAccessToken())
                .refreshToken(jwtToken.getRefreshToken())
                .email(email)
                .nickName(user.getNickname())
                .image(user.getImage())
                .profile(user.getProfile())
                .type(user.getType().getRole())
                .build();
    }

    /**
     * 토큰 재발급
     */
    @Transactional
    @Override
    public JwtTokenDto reissueToken(String accessToken, String refreshToken) {
        // 1. refresh Token 검증
        if(!jwtTokenProvider.validateToken(refreshToken)) {
            log.error("[토큰 재발급] 리프레시 토큰이 유효하지 않습니다.");
            throw new TokenException(TokenExceptionMessage.TOKEN_EXPIRED_ERROR.getValue());
        }

        log.info("[토큰 재발급] accessToken : {}", accessToken);

        // 2. authentication 가져오기
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        // 3. 저장소에서 email을 기반으로 refreshToken 가져오기
        RefreshToken originalRefreshToken = refreshTokenRedisRepository.findById(authentication.getName())
                .orElseThrow(() -> {
                    log.error("[토큰 재발급] 로그아웃 된 사용자입니다.");
                    return new NotFoundException(TokenExceptionMessage.TOKEN_NOT_FOUND.getValue());
                });
        log.info("[토큰 재발급] 리프레시 토큰 가져오기 성공 ! : {}", originalRefreshToken.getRefreshToken());

        // 4. refresh token 일치하는지 검사
        if(!refreshToken.equals(originalRefreshToken.getRefreshToken())) {
            log.error("[토큰 재발급] 토큰 불일치로 재발급이 불가합니다.");
            throw new TokenException(TokenExceptionMessage.TOKEN_NOT_EQUAL.getValue());
        }

        log.info("[토큰 재발급] 토큰 재발급 가능!");
        // 5. 토큰 재발급
        JwtTokenDto tokenDto = jwtTokenProvider.generateToken(authentication);

        // 6. 기존에 Redis에 저장된 토큰 업데이트
        originalRefreshToken.updateRefreshToken(tokenDto.getRefreshToken());
        refreshTokenRedisRepository.save(originalRefreshToken);

        return tokenDto;
    }

    /**
     * 내 정보 조회
     */
    @Override
    public MyInfoDto findMyInfo(String token) {
        Long userId = getLoginUserId(token);
        log.info("[내 정보 조회] 조회 요청 {}", userId);

        Users loginUser = getLoginUser(userId);

        return MyInfoDto.builder()
                .email(loginUser.getEmail())
                .nickname(loginUser.getNickname())
                .image(loginUser.getImage())
                .profile(loginUser.getProfile())
                .build();
    }

    /**
     * 내 정보 수정
     */
    @Transactional
    @Override
    public void updateUser(String token, UpdateUserReqDto reqDto) {
        Long userId = getLoginUserId(token);
        log.info("[내 정보 수정] 수정 요청 : {}", userId);

        Users loginUser = getLoginUser(userId);

        // 수정 전 비밀번호 체크 -> 메서드 따로있음
        // 수정한 닉네임 중복 검사 -> 프론트에서 처리

        loginUser.updateUser(reqDto.getNickname(), reqDto.getProfile());
        userRepository.save(loginUser);

        log.info("[내 정보 수정] 정보 수정 완료. -----------------------------");
    }

    /**
     * 비밀번호 변경
     */
    @Transactional
    @Override
    public void updatePassword(String token, UpdatePasswordReqDto reqDto) {
        Long userId = getLoginUserId(token);
        log.info("[패스워드 변경] 패드워드 변경 요청 : {}", userId);

        Users loginUser = getLoginUser(userId);
        String newPassword = reqDto.getNewPassword();

        // 1. 현재 비밀번호와 입력한 비밀번호가 일치하는가
        if(!passwordEncoder.matches(reqDto.getPassword(), loginUser.getPassword())) {
            log.error("[패스워드 변경] 비밀번호가 틀립니다.");
            throw new UserBadRequestException(UserExceptionMessage.PASSWORD_INCORRECT.getMsg());
        }

        // 2. 새로 작성한 비밀번호와 현재 비밀번호가 상이한가
        if(reqDto.getPassword().equals(newPassword)) {
            log.error("[패스워드 변경] 현재 비밀번호와 다른 비밀번호를 입력해야 합니다.");
            throw new UserBadRequestException(UserExceptionMessage.PASSWORD_MUST_BE_DIFFERENT.getMsg());
        }

        // 3. 새로 작성한 비밀번호가 정규식에 부합하는가
        if(!checkPasswordRegex(newPassword)) {
            log.error("[패스워드 변경] 새로운 비밀번호는 8~16자 이내의 영문, 숫자, 특수문자를 포함해야 합니다.");
            throw new UserBadRequestException(UserExceptionMessage.PASSWORD_NOT_MATCH_REGEX.getMsg());
        }

        // 4. 새로 작성한 비밀번호와 확인용이 일치하는가
        if(!newPassword.equals(reqDto.getNewPasswordCheck())) {
            log.error("[패스워드 변경] 비밀번호 확인이 일치하지 않습니다.");
            throw new UserBadRequestException(UserExceptionMessage.PASSWORD_INCORRECT.getMsg());
        }

        log.info("[패스워드 변경] 패스워드 변경 가능!");
        loginUser.updatePassword(passwordEncoder.encode(newPassword));
        userRepository.save(loginUser);

        log.info("[패스워드 변경] 변경 완료 -----------------------------");
    }

    /**
     * 회원탈퇴
     */
    @Transactional
    @Override
    public void withdraw(String token) {
        Long userId = getLoginUserId(token);
        log.info("[회원탈퇴] 회원탈퇴 요청 : {}", userId);

        // 서비스 전 비밀번호 체크
        
        Users loginUser = getLoginUser(userId);
        loginUser.delete();
        userRepository.save(loginUser);
        
        log.info("[회원탈퇴] 탈퇴 완료");

        // 로그아웃 추가??
    }

    /**
     * 서비스 전 비밀번호 체크
     */
    @Override
    public Boolean checkPassword(String token, PasswordDto passwordDto) {
        Long userId = getLoginUserId(token);
        log.info("[서비스 전 비밀번호 체크] 비밀번호 체크 요청 : {}", userId);

        return passwordEncoder.matches(passwordDto.getPassword(), getLoginUser(userId).getPassword());
    }

    /**
     * 로그아웃
     */
    @Transactional
    @Override
    public void logout(String token) {
        String email = getLoginUserEmail(token);
        log.info("[로그아웃] 로그아웃 요청 : {}", email);

        Long expirationTime = jwtTokenProvider.getTokenExpirationTime(token);

        // 로그아웃 여부를 redis에 넣어서 accessToken이 유효한지 체크
        if(expirationTime < 0) {
            log.error("[로그아웃] ACCESS TOKEN이 이미 만료되었습니다.");
            throw new TokenException(TokenExceptionMessage.TOKEN_EXPIRED_ERROR.getValue());
        }

        // refresh token 삭제
        refreshTokenRedisRepository.deleteById(email);

        // redis에 accessToken 사용 못하도록 등록
        // (로그아웃 요청한 access token이 만료될 때까지 해당 token으로 오는 요청을 막기 위함)
        redisUtil.setBlackList(token.substring(7), "accessToken", expirationTime);

        log.info("[로그아웃] 로그아웃 완료!");
    }

    /**
     * 관리자용 전체 회원 리스트 조회하는 메서드
     */
    @Override
    public List<UserAllInfoDto> findUserList(String token) {
        // 관리자 회원인지 체크
        String role = jwtTokenProvider.getUserRole(token);
        log.info("[전체 회원 리스트 조회] 관리자용 메서드입니다. 로그인 사용자 권한 : {}", role);

//        if(!role.equals("ROLE_ADMIN")) {
//            log.error("[전체 회원 리스트 조회] 관리자 권한이 없습니다. 접근 불가합니다.");
//            throw new UserForbiddenException(UserExceptionMessage.USER_FORBIDDEN.getMsg());
//        } --> securityConfig에서  처리

        // 탈퇴한 회원을 제외한 모든 회원 조회
//        return userRepository.findByDeletedAtIsNull().stream()
        return userRepository.findAll().stream()
                .map(user -> UserAllInfoDto.entityToDto(user))
                .collect(Collectors.toList());
    }

    /**
     * 관리자용 회원 상세 조회하는 메서드
     */
    @Override
    public UserAllInfoDto findUser(String token, Long userId) {
        log.info("[관리자용 회원 조회] 관리자용 메서드입니다.");
        Users user = userRepository.findByUserId(userId)
                .orElseThrow(() -> {
                    log.error("[관리자용 회원 조회] 존재하지 않는 회원입니다.");
                    return new UserNotFoundException(UserExceptionMessage.USER_NOT_FOUND.getMsg());
                });

        return UserAllInfoDto.entityToDto(user);
    }

    /**
     * 혜민이가 요청한 아무나 사용가능한 userId로 회원 조회하는 메서드
     */
    @Override
    public UserAllInfoDto findUserByUserId(String token, Long userId) {
        Long loginUserId = getLoginUserId(token);
        log.info("[혜민이의 회원 조회] {}님의 조회 요청 ID : {}", loginUserId, userId);

        Users user = userRepository.findByUserId(userId)
                .orElseThrow(() -> {
                    log.error("[혜민이의 회원 조회] 존재하지 않는 회원입니다.");
                    return new UserNotFoundException(UserExceptionMessage.USER_NOT_FOUND.getMsg());
                });

        return UserAllInfoDto.entityToDto(user);
    }

    /**
     * 검색어를 포함하는 닉네임을 소유한 회원 전체를 조회
     */
    @Override
    public List<UserSearchInfoDto> findUserByNickname(String token, String nickname) {
        Long userId = getLoginUserId(token);
        log.info("[회원 검색] {}님의 검색 요청 : {}", userId, nickname);

        // 검색조건이 없을 땐 관리자를 제외한 전체 조회!
        if(nickname == null) {
            log.info("[회원 검색] 검색 조건이 없어 전체 회원이 조회됩니다.");
            return userRepository.findByTypeNot(UserType.ROLE_ADMIN).stream()
                    .map(user -> userRepository.searchUserInfo(userId, user.getUserId()))
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList());
        }

        return userRepository.findByNicknameContainingAndTypeNot(nickname, UserType.ROLE_ADMIN).stream()
                .map(user -> userRepository.searchUserInfo(userId, user.getUserId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    /**
     * 회원가입 정보 유효성 검사
     */
    private boolean checkSignupInfo(SignUpReqDto reqDto) {
        // StringUtils.hasText() : 값이 있을 경우 true, 공백이나 NULL일 경우 false
        if(!StringUtils.hasText(reqDto.getEmail()) ||
                !StringUtils.hasText(reqDto.getPassword()) ||
                !StringUtils.hasText(reqDto.getNickname()))
            return false;

        return true;
    }

    /**
     * 비밀번호 정규식 검사
     * 8 ~ 16자 이내 영문, 숫자, 특수문자 포함(대소문자 구분 X)
     * 포함 : true / 불포함 : false
     */
    private boolean checkPasswordRegex(String password) {
        Pattern regexPattern = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,16}$");
        Matcher matcher = regexPattern.matcher(password);

        return matcher.find();
    }

    /**
     * accessToken을 이용하여 로그인 사용자의 userId를 추출
     */
    private Long getLoginUserId(String token) {
        return jwtTokenProvider.getUserId(token);
    }

    /**
     * accessToken을 이용하여 로그인 사용자의 email 추출
     */
    private String getLoginUserEmail(String token) {
        return jwtTokenProvider.getUserEmail(token);
    }

    private Users getLoginUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("[유저 서비스] 사용자가 존재하지 않습니다.");
                    return new UserNotFoundException(UserExceptionMessage.USER_NOT_FOUND.getMsg());
                });
    }
}
