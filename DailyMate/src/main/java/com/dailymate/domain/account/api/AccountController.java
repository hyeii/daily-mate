package com.dailymate.domain.account.api;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.dto.AmountResDto;
import com.dailymate.domain.account.dto.OutputResDto;
import com.dailymate.domain.account.service.AccountService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<MessageDto> deleteAccount(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long accountId) {
        accountService.deleteAccount(token, accountId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("DELETE SUCCESS"));
    }

    @GetMapping
    public ResponseEntity<List<AccountResDto>> findAccountList(@RequestHeader(ACCESS_TOKEN) String token, @RequestParam String date) {
        return ResponseEntity.ok(accountService.findAccountList(token, date));
    }

    @GetMapping("/month")
    public ResponseEntity<List<AmountResDto>> findAmountByMonth(@RequestHeader(ACCESS_TOKEN) String token, @RequestParam String date) {
        return ResponseEntity.ok(accountService.findAmountByMonth(token, date));
    }

    @Operation(
            summary = "월 지출액 카테고리별 조회",
            description = ""
    )
    @GetMapping("/category")
    public ResponseEntity<List<OutputResDto>> findOutputByCategory(@RequestHeader(ACCESS_TOKEN) String token, @RequestParam String date) {
        return ResponseEntity.ok(accountService.findOutputByCategory(token, date));
    }

    @Operation(
            summary = "월 지출액 카테고리별 조회(맵)",
            description = ""
    )
    @GetMapping("/category/map")
    public ResponseEntity<Map<String, Long>> findOutputByCategoryAsMap(@RequestHeader(ACCESS_TOKEN) String token, @RequestParam String date) {
        return ResponseEntity.ok(accountService.findOutputByCategoryAsMap(token, date));
    }
}
