package com.dailymate.domain.user.api;

import com.dailymate.domain.user.dto.request.*;
import com.dailymate.domain.user.dto.response.*;
import com.dailymate.domain.user.service.UserService;
import com.dailymate.global.common.jwt.JwtTokenDto;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            summary = "로그아웃",
            description = "로그인 사용자를 로그아웃 처리합니다."
    )
    @PostMapping("/logout")
    public ResponseEntity<MessageDto> logout(@RequestHeader(ACCESS_TOKEN) String token) {
        userService.logout(token);
        return ResponseEntity.ok(MessageDto.message("LOG-OUT SUCCESS"));
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
    public ResponseEntity<MessageDto> updateUser(@RequestHeader(ACCESS_TOKEN) String token, @RequestBody UpdateUserReqDto reqDto) {
        userService.updateUser(token, reqDto);
        return ResponseEntity.ok(MessageDto.message("UPDATE SUCCESS"));
    }

    @Operation(
            summary = "서비스 전 비밀번호 체크",
            description = "특정 서비스 이전에 비밀번호 검사를 합니다."
    )
    @PostMapping("/password")
    public ResponseEntity<Boolean> checkPassword(@RequestHeader(ACCESS_TOKEN) String token, @RequestBody PasswordDto passwordDto) {
        return ResponseEntity.ok(userService.checkPassword(token, passwordDto));
    }

    @Operation(
            summary = "비밀번호 변경",
            description = "비밀번호를 변경합니다."
    )
    @PatchMapping("/password")
    public ResponseEntity<MessageDto> updatePassword(@RequestHeader(ACCESS_TOKEN) String token, @RequestBody UpdatePasswordReqDto reqDto) {
        userService.updatePassword(token, reqDto);
        return ResponseEntity.ok(MessageDto.message("UPDATE SUCCESS"));
    }

    @Operation(
            summary = "회원탈퇴",
            description = "로그인 사용자를 탈퇴처리합니다."
    )
    @DeleteMapping
    public ResponseEntity<MessageDto> withdraw(@RequestHeader(ACCESS_TOKEN) String token) {
        userService.withdraw(token);
        return ResponseEntity.ok(MessageDto.message("WITHDRAW SUCCESS"));
    }

    @Operation(
            summary = "관리자용 전체 회원 리스트 조회",
            description = "관리자 전용 메서드입니다. 탈퇴한 회원을 제외한 전체 회원을 조회합니다."
    )
    @GetMapping("/admin/all")
    public ResponseEntity<List<UserAllInfoDto>> findUserList(@RequestHeader(ACCESS_TOKEN) String token) {
        return ResponseEntity.ok(userService.findUserList(token));
    }

    @Operation(
            summary = "관리자용 회원 상세 조회",
            description = "관리자 전용 메서드입니다. userId로 회원을 상세 조회합니다."
    )
    @GetMapping("/admin/{userId}")
    public ResponseEntity<UserAllInfoDto> findUser(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long userId) {
        return ResponseEntity.ok(userService.findUser(token, userId));
    }

    @Operation(
            summary = "혜민이가 요청한 회원 상세 조회",
            description = "아무나 사용가능한 메서드입니다. userId로 회원을 상세 조회합니다."
    )
    @GetMapping("/{userId}")
    public ResponseEntity<UserAllInfoDto> findUserByUserId(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long userId) {
        return ResponseEntity.ok(userService.findUserByUserId(token, userId));
    }

    @Operation(
            summary = "회원 검색",
            description = "닉네임으로 회원을 검색할 수 있습니다. 로그인 사용자와의 친구 상태도 확인할 수 있습니다."
    )
    @GetMapping("/search")
    public ResponseEntity<List<UserSearchInfoDto>> findUserByNickname(@RequestHeader(ACCESS_TOKEN) String token, @RequestParam(required = false) String nickname) {
        return ResponseEntity.ok(userService.findUserByNickname(token, nickname));
    }

}
