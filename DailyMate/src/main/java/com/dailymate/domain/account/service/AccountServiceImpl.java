package com.dailymate.domain.account.service;

import com.dailymate.domain.account.constant.AccountType;
import com.dailymate.domain.account.constant.Category;
import com.dailymate.domain.account.dao.AccountRepository;
import com.dailymate.domain.account.domain.Account;
import com.dailymate.domain.account.dto.*;
import com.dailymate.domain.account.exception.AccountBadRequestException;
import com.dailymate.domain.account.exception.AccountExceptionMessage;
import com.dailymate.domain.account.exception.AccountNotFountException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    /**
     * 가계부 등록
     * @param dto
     */
    @Override
    public void addAccount(AccountReqDto dto) {
        log.info("[가계부 등록] 가계부 등록 요청");

        int amount = dto.getAmount();

        // 수입이든 지출이든 0이면 에러 발생
        if(amount == 0) {
            log.error("[가계부 등록] 금액이 0원일 순 없습니다. 다시 입력하세요.");
            throw new AccountBadRequestException(AccountExceptionMessage.ACCOUNT_BAD_REQUEST.getMsg());
        }

        String category = dto.getCategory();

        // UserId 추가해야함
        Account account = Account.builder()
                .content(dto.getContent())
                .type(AccountType.getType(amount))
                .amount(amount)
                .category(Category.getCategory(category))
                .date(dto.getDate())
                .build();

        accountRepository.save(account);

        log.info("[가계부 등록] 가계부 등록 완료");
    }

    @Transactional
    @Override
    public void updateAccount(Long accountId, AccountReqDto dto) {
        log.info("[가계부 수정] 가계부 수정 요청. accountId : {}", accountId);

        // 1. 존재하는 가계부인지 체크
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> {
                    log.error("[가계부 수정] 존재하지 않는 가계부입니다.");
                    return new AccountNotFountException("[UPDATE_ACCOUNT] " + AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
                });

        // 2. 이미 삭제된 가계부인지 체크
        if(account.getDeletedAt() != null) {
            log.error("[가계부 수정] 이미 삭제된 가계부입니다.");
            throw new AccountNotFountException("[UPDATE_ACCOUNT] " + AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
        }

        // 3. 로그인 사용자의 가계부인지 체크(추후 추가)

        // 4. 금액이 0원인지 체크
        if(account.getAmount() == 0) {
            log.error("[가계부 수정] 금액이 0원일 순 없습니다. 다시 입력하세요.");
            throw new AccountBadRequestException(AccountExceptionMessage.ACCOUNT_BAD_REQUEST.getMsg());
        }

        log.info("[가계부 수정] 가계부 찾기 완료.");
        account.updateAccount(dto.getContent(), dto.getDate(), dto.getAmount(), Category.getCategory(dto.getCategory()));

//        accountRepository.save(account); // 얘 필요없는지 체크 -> 없어도 되는듯

        log.info("[가계부 수정] 가계부 수정 완료.");
    }

    @Transactional
    @Override
    public void deleteAccount(Long accountId) {
        log.info("[가계부 삭제] 가계부 삭제 요청. accountId : {}", accountId);

        // 1. 존재하면 가계부인지 체크
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> {
                    log.error("[가계부 삭제] 존재하지 않는 가계부입니다.");
                    return new AccountNotFountException("[DELETE_ACCOUNT] " + AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
                });

        // 2. 기삭제된 가계부인지 체크
        if(account.getDeletedAt() != null) {
            log.error("[가계부 삭제] 기삭제된 가계부입니다.");
            throw new AccountNotFountException("[DELETE_ACCOUNT] " + AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
        }

        // 3. 로그인 사용자의 가계부인지 체크

        log.info("[가계부 삭제] 가계부 찾기 완료.");
        account.delete();
//        accountRepository.save(account);

        log.info("[가계부 삭제] 가계부 삭제 완료.");
    }

    @Override
    public List<AccountResDto> findAccountList(String date) {
        // 파라미터 date 패턴 : yyyy-MM-dd
        log.info("[날짜별 거래 내역 조회] 날짜별 거래 내역 조회 요청. 날짜 : {}", date);

        // 1. 로그인을 했는지 체크

        // 2. 유저인지 체크

        log.info("[날짜별 거래 내역 조회] 반환 완료.");
        return accountRepository.findByUserIdAndDateAndDeletedAtIsNull(9539L, date).stream()
                .map(account -> AccountResDto.entityToDto(account))
                .collect(Collectors.toList());
    }

    @Override
    public MonthlyAmountDto findAmountByMonth(String date) {
        // 파라미터 date 패턴 : yyyy-MM
        log.info("[월별 거래 금액 조회] 월별 거래 금액 조회 요청. 날짜 : {}", date);
        List<DailyAmountByType> dailyList = accountRepository.findDailyAmountByType(9539L, date);

        MonthlyAmountDto monthlyDto = MonthlyAmountDto.dailyDtoToMonthlyDto(dailyList);
//        for(DailyAmountByTypeDto dto : dailyList) {
//            log.info(dto.getDate());
//            log.info(dto.getType().getValue());
//            log.info(dto.getAmountSum().toString());
//        }

        return monthlyDto;
    }

    @Override
    public List<MonthlyOutputByCategoryDto> findOutputByCategory(String date) {
        // 파라미터 date 패턴 : yyyy-MM
        log.info("[카테고리별 월별 지출 금액 조회] 월별 지출 카테고리별 금액 조회 요청. 연월 : {}", date);

        // 1. 로그인 했는지 체크

        // 2. 유저인지 체크

        return accountRepository.findOutputByCategory(9539L, date);
    }

    // 만약 카테고리별 리스트로 받는게 싫다면 아래의 메서드
    @Override
    public Map<String, Long> findOutputByCategoryAsMap(String date) {
        return accountRepository.findOutputByCategory(9539L, date).stream()
                .collect(Collectors.toMap(dto -> dto.getCategory().toString(), MonthlyOutputByCategoryDto::getAmountSum));
    }

}
