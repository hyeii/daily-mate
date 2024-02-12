package com.dailymate.domain.user.service;

import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.dto.LogInReqDto;
import com.dailymate.domain.user.dto.LogInResDto;
import com.dailymate.domain.user.dto.SignUpReqDto;
import com.dailymate.global.common.jwt.JwtTokenDto;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void signUp(SignUpReqDto reqDto) {
        String email = reqDto.getEmail();
        log.info("[회원가입] 회원가입 요청 email : {}", email);



    }

    @Override
    public JwtTokenDto logIn(LogInReqDto reqDto) {
        String email = reqDto.getEmail();
        String password = reqDto.getPassword();
        log.info("[로그인] 로그인 요청 email : {}", email);

        // 1. email + password 기반으로 Authentication 객체 생성
        // 이때 authentication은 인증 여부를 확인하는 authenticated값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        // 2. 실제 검증
        // authenticate() 메서드를 통해 요청된 Users에 대한 검증 진행
        // authenticate 메서드가 실행될 때 UserDetailsServiceImpl에서 만든 loadUserByUserName메서드 실행
        Authentication authentication =
                authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtTokenDto jwtToken = jwtTokenProvider.generateToken(authentication);

        return jwtToken;
    }
}
