package com.dailymate.domain.account.api;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.service.AccountService;
import com.dailymate.global.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/account")
@RestController
@Slf4j
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<MessageDto> addAccount(@RequestBody AccountReqDto accountReqDto) {
        accountService.addAccount(accountReqDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("CREATE SUCCESS"));
    }

    @PatchMapping("/{accountId}")
    public ResponseEntity<MessageDto> updateAccount(@PathVariable Long accountId, @RequestBody AccountReqDto accountReqDto) {
        accountService.updateAccount(accountId, accountReqDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("UPDATE SUCCESS"));
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<MessageDto> deleteAccount(@PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("DELETE SUCCESS"));
    }


}
