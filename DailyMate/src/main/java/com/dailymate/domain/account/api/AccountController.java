package com.dailymate.domain.account.api;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.service.AccountService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Account", description = "가계부 API Document")
@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    @Operation(
            summary = "가계부 등록",
            description = "로그인 사용자의 가계부를 등록합니다."
    )
    @PostMapping
    public ResponseEntity<MessageDto> addAccount(@RequestBody AccountReqDto reqDto) {
        accountService.addAccount(reqDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("CREATE SUCCESS"));
    }

    @Operation(
            summary = "가계부 수정",
            description = "로그인 사용자의 가계부를 수정합니다."
    )
    @PatchMapping("/{accountId}")
    public ResponseEntity<AccountResDto> updateAccount(@PathVariable Long accountId, @RequestBody AccountReqDto reqDto) {
        return ResponseEntity.ok(accountService.updateAccount(accountId, reqDto));
    }

    @Operation(
            summary = "가계부 삭제",
            description = "로그인 사용자의 가계부를 삭제합니다."
    )
    @DeleteMapping("/{accountId}")
    public ResponseEntity<MessageDto> deleteAccount(@PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.ok(MessageDto.message("DELETE SUCCESS"));
    }
}
