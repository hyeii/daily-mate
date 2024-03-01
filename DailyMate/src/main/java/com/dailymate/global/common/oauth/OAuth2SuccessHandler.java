package com.dailymate.global.common.oauth;

import com.dailymate.domain.user.dao.RefreshTokenRedisRepository;
import com.dailymate.domain.user.domain.RefreshToken;
import com.dailymate.domain.user.dto.response.LogInResDto;
import com.dailymate.global.common.jwt.JwtTokenDto;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import com.dailymate.global.common.jwt.constant.JwtTokenExpiration;
import com.dailymate.global.common.security.UserDetailsImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.net.URLEncoder;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("[OAUTH_SUCCESS_HANDLER] 성공성공");

        try {
            UserDetailsImpl oAuth2User = (UserDetailsImpl)authentication.getPrincipal();

            JwtTokenDto tokenDto = jwtTokenProvider.generateToken(authentication);

            RefreshToken refreshToken = RefreshToken.builder()
                    .email(oAuth2User.getUsername())
                    .refreshToken(tokenDto.getRefreshToken())
                    .expiration(JwtTokenExpiration.REFRESH_TOKEN_EXPIRATION_TIME.getTime())
                    .build();

            log.info("[SUCCESS_HANDLER] accessToken : {}", tokenDto.getAccessToken());
            refreshTokenRedisRepository.save(refreshToken); // 소셜로그인

            // 리디렉션으로 Param에 넣어서 프론트에 값을 보내면 값이 노출되어서 보안에 취약하니까
            // JSON형식으로 응답을 보내자

            // LoginResDto를 보낼거니까 우선 만들기
            LogInResDto logInResDto = LogInResDto.builder()
                    .accessToken(tokenDto.getAccessToken())
                    .refreshToken(tokenDto.getRefreshToken())
                    .userId(oAuth2User.getUserId())
                    .email(oAuth2User.getUsername())
                    .nickName(oAuth2User.getName())
                    .image(oAuth2User.getUser().getImage())
                    .profile(oAuth2User.getUser().getProfile())
                    .type(oAuth2User.getAuthorities().toString())
                    .build();

            // JSON 형식으로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            String userInfo = objectMapper.writeValueAsString(logInResDto);

//            // 응답 생성
//            response.setContentType("application/json");
//            response.setCharacterEncoding("UTF-8");
//            response.getWriter().write(userInfo);

            // 리다이렉트하장
            // URL 인코딩
            String encodeUserInfo = URLEncoder.encode(userInfo, "UTF-8");
////            response.sendRedirect("/oauth/google/success?userInfo=" + encodeUserInfo);
//            response.sendRedirect("/oauth/google/success?" + encodeUserInfo);
            response.sendRedirect("http://localhost:3000/oauth/google/success?" + tokenDto.getAccessToken());

            log.info("[SUCCESS_HANDLER] 응답 생성 완료.");
        } catch (AuthenticationException e) {
            log.error("[SUCCESS_HANDLER] 인가 에러 =======================");
            request.setAttribute("oauth2Exception", e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
