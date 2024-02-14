package com.dailymate.domain.user.api;

import com.dailymate.domain.user.dto.LogInReqDto;
import com.dailymate.domain.user.dto.SignUpReqDto;
import com.dailymate.domain.user.service.UserService;
import com.dailymate.global.common.jwt.JwtTokenDto;
import com.dailymate.global.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<MessageDto> signUp(@RequestBody SignUpReqDto signUpReqDto) {
        userService.signUp(signUpReqDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("SIGN-UP SUCCESS"));
    }

    @GetMapping("/check/email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.checkEmail(email));
    }

    @GetMapping("/check/nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.checkNickname(nickname));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtTokenDto> logIn(@RequestBody LogInReqDto logInReqDto) {
        return ResponseEntity.ok(userService.logIn(logInReqDto));
    }

}
