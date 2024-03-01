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
public class GoogleController {

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
            summary = "구글 로그인 성공 후 ACCESS_TOKEN 반환",
            description = "구글 로그인 성공 후 프론트에 쿼리스트링으로 ACCESS_TOKEN을 반환합니다."
    )
    @GetMapping("/google/success")
    public ResponseEntity<?> googleLogin(@RequestParam("accessToken") String accessToken) {
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "토큰을 이용해 소셜 로그인 정보 추출",
            description = "프론트에서 토큰을 사용하여 LoginResDto를 반환받습니다."
    )
    @GetMapping("/google/login-info")
    public ResponseEntity<LogInResDto> getGoogleLoginInfo(@RequestHeader(ACCESS_TOKEN) String token) {
        return ResponseEntity.ok(userService.getGoogleLoginInfo(token));
    }

}
