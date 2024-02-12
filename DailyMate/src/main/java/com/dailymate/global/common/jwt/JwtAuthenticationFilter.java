package com.dailymate.global.common.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 클라이언트 요청 시 JWT 인증을 하기 위해 설치하는 커스텀 필터
 * UsernamePasswordAuthenticationFilter 이전에 실행할 것
 *
 * 클라이언트로부터 들어오는 요청에서 JWT 토큰을 처리하고,
 * 유효한 토큰인 경우 해당 토큰의 인증 정보(Authentication)를 SecurityContext에 저장하여
 * 인증된 요청을 처리할 수 있도록 한다.
 * => JWT를 통해 username + password 인증을 수행한다는 뜻
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        // 1. request Header에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) request);
        
        // 2. validateToken으로 토큰 유효성 검사
        if(token != null && jwtTokenProvider.validateToken(token)) {
            // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext에 저장
            //      => 요청을 처리하는 동안 인증 정보가 유지된다!!!
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        chain.doFilter(request, response);
    }

    /**
     * Request Header에서 토큰 정보를 추출
     *  => Authorization 헤더에서 "Bearer "접두사로 시작하는 토큰을 추출하여 반환
     */
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        // StringUtils.hasText() : 값이 있을 경우 true, 공백이나 NULL일 경우 false
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}
