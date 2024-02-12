package com.dailymate.domain.user.api;

import com.dailymate.domain.user.dto.LogInReqDto;
import com.dailymate.domain.user.dto.SignUpReqDto;
import com.dailymate.domain.user.service.UserService;
import com.dailymate.global.common.jwt.JwtTokenDto;
import com.dailymate.global.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/login")
    public ResponseEntity<JwtTokenDto> logIn(@RequestBody LogInReqDto logInReqDto) {
        return ResponseEntity.ok(userService.logIn(logInReqDto));
    }

}
