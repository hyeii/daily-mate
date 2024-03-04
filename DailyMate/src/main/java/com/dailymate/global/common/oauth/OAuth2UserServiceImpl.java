package com.dailymate.global.common.oauth;

import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.domain.Users;
import com.dailymate.domain.user.dto.oauth.OAuth2UserDto;
import com.dailymate.domain.user.dto.oauth.OAuthAttributes;
import com.dailymate.domain.user.exception.UserBadRequestException;
import com.dailymate.domain.user.exception.UserExceptionMessage;
import com.dailymate.global.common.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

/**
 * 사용자의 정보를 가져오는 대리자
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OAuth2UserServiceImpl implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    /**
     * OAuth2 로그인시 가장 먼저 실행되는 메소드
     *
     * 사용자가 구글로그인을 시도하고 성공하면, 구글에서 사용자 정보를 서버로 보내게 됩니다.
     * 그때 loadUser()메서드가 실행됩니다.
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("[LOAD_USER] 이것도 실행 잘됨");

        // DefaultOAuth2User 서비스를 통해 user 정보를 가져와야 하기 때문에 대리자 생성
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // 어떤 서비스인지 구분하는 코드 (google / kakao)
        String providerId = userRequest.getClientRegistration().getRegistrationId();

        // OAuth2 로그인 진행시 키가 되는 필드값(PK) (구글만 지원)
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        // 소셜 로그인에서 API가 제공하는 userInfo의 JSON 값
        Map<String, Object> attributes = oAuth2User.getAttributes();

        // 데이터를 담는 dto
        OAuthAttributes oAuthAttributes = OAuthAttributes.of(providerId, userNameAttributeName, attributes);

        Users createdUser = getUser(oAuthAttributes, providerId);

        // 리턴 후 OAuth2User 객체로 정의됨.
        // OAuth2LoginAuthenticationFilter를 거치면서 Authentication에 저장을 해준다.
        // 그래서 handler에서 꺼내쓸 수 있다.
        return UserDetailsImpl.builder()
                .user(createdUser)
                .attributes(attributes)
                .build();
    }

    @Transactional
    public Users getUser(OAuthAttributes oAuthAttributes, String providerId) {
        OAuth2UserDto oAuth2UserDto = oAuthAttributes.getOAuth2UserDto();
        Users user = userRepository.findByEmailAndProviderId(oAuth2UserDto.getEmail(), providerId).orElse(null);

        if(user == null) {
            // 중복 이메일인지, 중복 닉네임인지 체크하고 create
            // 중복 이메일은 회원가입 불가
            if(userRepository.existsByEmail(oAuth2UserDto.getEmail())) {
                log.error("[소셜 회원가입] 이메일이 중복입니다. 해당 정보로 회원가입할 수 없습니다.");
                throw new UserBadRequestException(UserExceptionMessage.EMAIL_DUPLICATED.getMsg());
            }

            // 중복 닉네임은 닉네임 변경 후 저장해주기
            if(userRepository.existsByNickname(oAuth2UserDto.getNickname())) {
                log.info("[소셜 회원가입] 닉네임이 중복입니다. 닉네임을 랜덤으로 설정합니다.");

                // 닉네임 랜덤으로 중복없이 설정해버리기
                String nickname = UUID.randomUUID().toString().substring(0, 13);
                while(userRepository.existsByNickname(nickname)) {
                    nickname = UUID.randomUUID().toString().substring(0, 13);
                }
                log.info("[소셜 회원가입] 닉네임이 랜덤으로 설정되었습니다! : {}", nickname);

                return createUserWithNewNickname(oAuthAttributes, providerId, nickname);
            }

            log.info("[소셜 회원가입] {}님의 회원가입을 시작합니다.", oAuth2UserDto.getEmail());
            return createUser(oAuthAttributes, providerId);
        }

        if(!user.getImage().equals(oAuth2UserDto.getImage())) {
            log.info("[소셜 로그인] 이미지가 달라서 이미지 업데이트");
            user.updateImage(oAuth2UserDto.getImage());
        }

        log.info("[소셜 로그인] {}님의 로그인을 요청합니다.", oAuth2UserDto.getEmail());
        return user;
    }

    private Users createUser(OAuthAttributes oAuthAttributes, String providerId) {
        return userRepository.save(oAuthAttributes.toEntity(oAuthAttributes.getOAuth2UserDto(), providerId));
    }

    private Users createUserWithNewNickname(OAuthAttributes oAuthAttributes, String providerId, String nickname) {
        return userRepository.save(oAuthAttributes.toEntityWithNewNickname(oAuthAttributes.getOAuth2UserDto(), providerId, nickname));
    }
}
