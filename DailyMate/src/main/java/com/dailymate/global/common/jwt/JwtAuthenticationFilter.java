package com.dailymate.global.common.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 클라이언트 요청 시 JWT 인증을 하기 위해 설치하는 커스텀 필터
 * UsernamePasswordAuthenticationFilter 이전에 실행할 것
 *
 * 클라이언트로부터 들어오는 요청에서 JWT 토큰을 처리하고,
 * 유효한 토큰인 경우 해당 토큰의 인증 정보(Authentication)를 SecurityContext에 저장하여
 * 인증된 요청을 처리할 수 있도록 한다.
 * => JWT를 통해 username + password 인증을 수행한다는 뜻
 *
 * 사용자의 요청에서 JWT 토큰을 추출하여
 * 통과하면 권한을 부여하고, 실패하면 권한부여 없이 다음 필터로 진행시킴
 */
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer";

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 실제 필터링 로직을 수행하는 곳
     *
     *  - Request Header에서 accessToken을 꺼내고 여러가지 검사 후 유저 정보를 꺼내 securityContext에 저장한다.
     *  - 가입/로그인/재발급을 제외한 모든 Request 요청은 이 필터를 거치기 때문에 토큰 정보가 없거나 유효하지 않으면 정상적으로 수행되지 않는다.
     *  - 그리고 요청이 정상적으로 Controller까지 도착했다면 SecurityContext에 user ID가 존재한다는 것이 보장된다.
     *      ※ 단, 직접 DB를 조회한 것이 아니라 accessToken에 있는 memberId를 꺼낸거라서, 탈퇴로 인해 DB에 없는 경우 등 예외 상황은 서비스단에서 처리한다.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 1. Request Header에서 토큰 추출
        String token = resolveToken(request);
        log.info("[필터] 토큰 : {}", token); // Bearer 토큰 형태임

        // 2. validateToken으로 토큰 유효성 검사
        //      StringUtils.hasText : token != null이랑 같은거임
        if(StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
            // 토큰이 유효할 경우(정상 토큰)
            // 해당 토큰으로 Authentication을 가지고 와서 SecurityContext에 저장   => 요청을 처리하는 동안 인증정보가 유지됨
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * 토큰의 prefix 체크 후 토큰 접두사를 제외한 토큰 추출
     */
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }

        return null;
    }

}
