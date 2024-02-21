package com.dailymate.global.common.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * 로그인 사용자의 email 꺼내기
 * 만료시간 체크 기능 수행 등
 */
@Slf4j
@Component
public class SecurityUtil {

    private SecurityUtil() {}

    // SecurityContext에 유저 정보가 저장되는 시점
    // Request가 들어올 때 JwtFilter의 doFilter에서 저장
    public static Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null) {
            log.error("[SecurityUtil] 인증 정보 없음");
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return userDetails.getUserId();
    }

    public static String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null) {
            log.error("[SecurityUtil] 인증 정보 없음");
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        return authentication.getName();
    }

}
