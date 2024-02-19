package com.dailymate.domain.account.api;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.dto.OutputResDto;
import com.dailymate.domain.account.service.AccountService;
import com.dailymate.global.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/account")
@RestController
public class AccountController {

    private final AccountService accountService;
    private final String ACCESS_TOKEN = "authorization";

    @PostMapping
    public ResponseEntity<MessageDto> addAccount(@RequestHeader(ACCESS_TOKEN) String token, @RequestBody AccountReqDto accountReqDto) {
        accountService.addAccount(token, accountReqDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("CREATE SUCCESS"));
    }

    @PatchMapping("/{accountId}")
    public ResponseEntity<MessageDto> updateAccount(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long accountId, @RequestBody AccountReqDto accountReqDto) {
        accountService.updateAccount(token, accountId, accountReqDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("UPDATE SUCCESS"));
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<MessageDto> deleteAccount(@PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("DELETE SUCCESS"));
    }

    @GetMapping
    public ResponseEntity<List<AccountResDto>> findAccountList(Long userId, @RequestParam String date) {
        return ResponseEntity.ok(accountService.findAccountList(userId, date));
    }



    @GetMapping("/category")
    public ResponseEntity<List<OutputResDto>> findOutputByCategory(Long userId, @RequestParam String date) {
        return ResponseEntity.ok(accountService.findOutputByCategory(userId, date));
    }
}
