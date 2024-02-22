package com.dailymate.global.common.oauth;

import com.dailymate.domain.user.dao.RefreshTokenRedisRepository;
import com.dailymate.domain.user.domain.CustomOAuth2User;
import com.dailymate.domain.user.domain.RefreshToken;
import com.dailymate.global.common.jwt.JwtTokenDto;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import com.dailymate.global.common.jwt.constant.JwtTokenExpiration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            log.info("email : {}", oAuth2User.getEmail());
            log.info("oAuth2User : {}", oAuth2User);
            JwtTokenDto tokenDto = jwtTokenProvider.generateTokenOfSocial(authentication);

            RefreshToken refreshToken = RefreshToken.builder()
                    .email(oAuth2User.getEmail())
                    .refreshToken(tokenDto.getRefreshToken())
                    .expiration(JwtTokenExpiration.REFRESH_TOKEN_EXPIRATION_TIME.getTime())
                    .build();

            refreshTokenRedisRepository.save(refreshToken);
        } catch (AuthenticationException e) {
            log.error("[OAuth2SuccessHandler] 인가 에러 =======================");
            request.setAttribute("oauth2Exception", e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
