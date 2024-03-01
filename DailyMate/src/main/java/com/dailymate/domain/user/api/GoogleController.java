package com.dailymate.domain.user.api;

import com.dailymate.domain.user.dto.response.LogInResDto;
import com.dailymate.domain.user.service.UserService;
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

    @GetMapping("/google")
    public RedirectView redirectToGoogle() {
        return new RedirectView("/oauth2/authorization/google");
    }

    @GetMapping("/google/success")
    public ResponseEntity<?> googleLogin(@RequestParam("accessToken") String accessToken) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/google/login-info")
    public ResponseEntity<LogInResDto> getGoogleLoginInfo(@RequestHeader(ACCESS_TOKEN) String token) {
        return ResponseEntity.ok(userService.getGoogleLoginInfo(token));
    }

}
