package com.dailymate.domain.user.api;

import com.dailymate.domain.user.dto.request.LogInReqDto;
import com.dailymate.domain.user.dto.request.UpdateUserReqDto;
import com.dailymate.domain.user.dto.response.LogInResDto;
import com.dailymate.domain.user.dto.request.SignUpReqDto;
import com.dailymate.domain.user.dto.response.MyInfoDto;
import com.dailymate.domain.user.service.UserService;
import com.dailymate.global.common.jwt.JwtTokenDto;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final String ACCESS_TOKEN = "authorization";
    private final String REFRESH_TOKEN = "refresh-token";
    private final UserService userService;

    @Operation(
            summary = "회원가입",
            description = "회원가입을 합니다."
    )
    @PostMapping("/sign-up")
    public ResponseEntity<MessageDto> signUp(@RequestBody SignUpReqDto signUpReqDto) {
        userService.signUp(signUpReqDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("SIGN-UP SUCCESS"));
    }

    @Operation(
            summary = "이메일 중복 검사",
            description = "회원가입시 이메일을 중복 검사합니다."
    )
    @GetMapping("/check/email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.checkEmail(email));
    }

    @Operation(
            summary = "닉네임 중복 검사",
            description = "회원가입시 닉네임을 중복 검사합니다."
    )
    @GetMapping("/check/nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.checkNickname(nickname));
    }

    @Operation(
            summary = "로그인",
            description = "로그인 성공시 토큰과 사용자 정보를 반환합니다."
    )
    @PostMapping("/login")
    public ResponseEntity<LogInResDto> logIn(@RequestBody LogInReqDto logInReqDto) {
        return ResponseEntity.ok(userService.logIn(logInReqDto));
    }

    @Operation(
            summary = "토큰 재발급",
            description = "토큰정보를 이용해 토큰을 재발급합니다."
    )
    @PostMapping("/reissue-token")
    public ResponseEntity<JwtTokenDto> reissueToken(@RequestHeader(ACCESS_TOKEN) String accessToken, @RequestHeader(REFRESH_TOKEN) String refreshToken) {
        return ResponseEntity.ok(userService.reissueToken(accessToken, refreshToken));
    }

    @Operation(
            summary = "내 정보 조회",
            description = "로그인 사용자의 기본 정보를 조회합니다."
    )
    @GetMapping()
    public ResponseEntity<MyInfoDto> findMyInfo(@RequestHeader(ACCESS_TOKEN) String token) {
        return ResponseEntity.ok(userService.findMyInfo(token));
    }

    @Operation(
            summary = "내 정보 수정",
            description = "로그인 사용자의 정보를 수정합니다."
    )
    @PatchMapping
    public ResponseEntity<MessageDto> updateUser(@RequestHeader(ACCESS_TOKEN) String token, UpdateUserReqDto reqDto) {
        userService.updateUser(token, reqDto);
        return ResponseEntity.ok(MessageDto.message("UPDATE SUCCESS"));
    }

}
