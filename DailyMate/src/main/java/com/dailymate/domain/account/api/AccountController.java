package com.dailymate.domain.account.api;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.dto.MonthlyAmountDto;
import com.dailymate.domain.account.dto.MonthlyOutputByCategoryDto;
import com.dailymate.domain.account.service.AccountService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<MessageDto> updateAccount(@PathVariable Long accountId, @RequestBody AccountReqDto reqDto) {
        accountService.updateAccount(accountId, reqDto);
        return ResponseEntity.ok(MessageDto.message("UPDATE SUCCESS"));
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

    @Operation(
            summary = "날짜별 거래 내역 조회",
            description = "로그인 사용자의 거래 내역 중 해당 날짜에 적용되는 리스트를 반환합니다."
    )
    @GetMapping
    public ResponseEntity<List<AccountResDto>> findAccountList(@RequestParam String date) {
        return ResponseEntity.ok(accountService.findAccountList(date));
    }

    @Operation(
            summary = "월별 거래 금액 조회",
            description = "로그인 사용자의 월별 거래 금액을 조회합니다."
    )
    @GetMapping("/month")
    public ResponseEntity<MonthlyAmountDto> findAmountByMonth(@RequestParam String date) {
        return ResponseEntity.ok(accountService.findAmountByMonth(date));
    }

    @Operation(
            summary = "카테고리별 월별 지출 금액 조회",
            description = "로그인 사용자의 소비 내역을 카테고리 및 월별 조회합니다."
    )
    @GetMapping("/category")
    public ResponseEntity<List<MonthlyOutputByCategoryDto>> findOutputByCategory(@RequestParam String date) {
        return ResponseEntity.ok(accountService.findOutputByCategory(date));
    }

    @GetMapping("/category/map")
    public ResponseEntity<Map<String, Long>> findOutputByCategoryAsMap(@RequestParam String date) {
        return ResponseEntity.ok(accountService.findOutputByCategoryAsMap(date));
    }

}
