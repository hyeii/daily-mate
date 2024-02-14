package com.dailymate.global.config;

import com.dailymate.global.common.jwt.JwtAuthenticationFilter;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Spring Security의 설정을 담당
 */

/**
 * 공부주석 -나중에지울거
 *
 * @EnableMethodSecurity : https://velog.io/@shon5544/Spring-Security-4.-%EA%B6%8C%ED%95%9C-%EC%B2%98%EB%A6%AC
 *
 */
@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록됨
@RequiredArgsConstructor
//@EnableMethodSecurity
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .headers().frameOptions().disable() // h2 접근 허용을 위함
                .and()
                // REST API이므로 basic auth 및 csrf 보안을 사용하지 않음
                .httpBasic().disable()
//                .formLogin().disable()
                .csrf().disable()
                // JWT를 사용하기 때문에 세션을 사용하지 않음
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests()
                // 해당 API에 대해서는 모든 요청을 허가 -> 회원가입, 로그인
                // requestMatchers는 스프링부트3버전부터 -> 2버전은 그대로 antMatchers 사용
//                .requestMatchers(new AntPathRequestMatcher("/user/login", "/user/sign-up")).permitAll()
                .antMatchers(PERMIT_URL_ARRAY).permitAll()
                // 이 밖에 모든 요청에 대해서 인증을 필요로함
                .anyRequest().authenticated()
                .and()
                // JWT 인증을 위하여 직접 구현한 필터를
                // UsernamePasswordAuthenticationFilter 전에 실행
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    private static final String[] PERMIT_URL_ARRAY = {
            // swagger
            "/favicon.ico",
            "/error",
            "/swagger-ui/**",
            "/swagger-resources/**",
//            "/v3/api-docs/**",
            "/api-docs/**",

            // user
            "/user/sign-up",
            "/user/login",
            "/user/check/**",
            "/user/reissue-token",

            // social

            // h2-console
            "/h2-console/**",


    };

    /**
     * DelegatingPasswordEncoder를 생성하여 반환
     *  => 여러 암호화 알고리즘을 지원하며,
     *     Spring Security의 기본 권장 알고리즘을 사용하여 비밀번호를 인코딩
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
