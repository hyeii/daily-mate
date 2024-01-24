package com.dailymate.domain.account.api;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<AccountResDto> addAccount(@RequestBody AccountReqDto reqDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(accountService.addAccount(reqDto));
    }

}
