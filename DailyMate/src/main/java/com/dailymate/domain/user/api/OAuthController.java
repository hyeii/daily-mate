package com.dailymate.domain.user.api;

import com.dailymate.domain.user.dto.response.LogInResDto;
import com.dailymate.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final String ACCESS_TOKEN = "authorization";
    private final UserService userService;

    @Operation(
            summary = "구글 로그인으로 리다이렉트",
            description = "프론트에서 버튼을 누르면 구글 로그인 창으로 리다이렉트됩니다."
    )
    @GetMapping("/google")
    public RedirectView redirectToGoogle() {
        return new RedirectView("/oauth2/authorization/google");
    }

    @Operation(
            summary = "카카오 로그인으로 리다이렉트",
            description = "프론트에서 버튼을 누르면 카카오 로그인 창으로 리다이렉트됩니다."
    )
    @GetMapping("/kakao")
    public RedirectView redirectToKakao() {
        return new RedirectView("/oauth2/authorization/kakao");
    }

    @Operation(
            summary = "구글/카카오 로그인 성공 후 ACCESS_TOKEN 반환",
            description = "구글/카카오 로그인 성공 후 프론트에 쿼리스트링으로 ACCESS_TOKEN을 반환합니다."
    )
    @GetMapping("/success")
    public ResponseEntity<?> oauthLogin(@RequestParam("accessToken") String accessToken) {
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "토큰을 이용해 소셜 로그인 정보 추출",
            description = "프론트에서 토큰을 사용하여 LoginResDto를 반환받습니다."
    )
    @GetMapping("/login-info")
    public ResponseEntity<LogInResDto> getOauthLoginInfo(@RequestHeader(ACCESS_TOKEN) String token) {
        return ResponseEntity.ok(userService.getOAuthLoginInfo(token));
    }

    @Operation(
            summary = "카카오 계정과 함께 로그아웃",
            description = "카카오 계정이 자동 로그인되지 않도록 함께 로그아웃 처리합니다."
    )
    @GetMapping("/kakao/logout")
    public RedirectView redirectToKakaoLogout() {
        return new RedirectView("https://kauth.kakao.com/oauth/logout?client_id=ade8054042579d60e4054ba7e9004c7b&logout_redirect_uri=http://localhost:8080/user/logout");
    }

}
