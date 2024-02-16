package com.dailymate.domain.account.service;

import com.dailymate.domain.account.constant.AccountCategory;
import com.dailymate.domain.account.constant.AccountType;
import com.dailymate.domain.account.dao.AccountRepository;
import com.dailymate.domain.account.domain.Account;
import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.exception.AccountBadRequestException;
import com.dailymate.domain.account.exception.AccountExceptionMessage;
import com.dailymate.domain.account.exception.AccountNotFoundException;
import com.dailymate.domain.diary.exception.DiaryBadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Slf4j
@Service
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public void addAccount(AccountReqDto accountReqDto) {

        // 금액을 확인하자.
        if(accountReqDto.getAmount() == 0) {
            throw new DiaryBadRequestException(AccountExceptionMessage.ACCOUNT_BAD_REQUEST.getMsg());
        }

        // 작성자가 일치하는지 확인하자.

        // 가계부 생성
        Account account = Account.builder()
                .userId(1L)
                .content(accountReqDto.getContent())
                .type(AccountType.getAccountType(accountReqDto.getAmount()))
                .date(accountReqDto.getDate())
                .amount(accountReqDto.getAmount())
                .category(AccountCategory.getAccountCategory(accountReqDto.getCategory()))
                .build();

        accountRepository.save(account);
    }

    @Override
    @Transactional
    public void updateAccount(Long accountId, AccountReqDto accountReqDto) {

        // 가계부가 존재하는지 확인하자.
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> {
                   throw new AccountNotFoundException(AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
                });

        // 이미 삭제된 가계부인지 확인하자.
        if(account.getDeletedAt() != null) {
            throw new AccountNotFoundException(AccountExceptionMessage.ACCOUNT_ALREADY_DELETED.getMsg());
        }

        // 작성자가 일치하는지 확인하자.

        //금액을 확인하자.
        if(account.getAmount() == 0) {
            throw new AccountBadRequestException(AccountExceptionMessage.ACCOUNT_BAD_REQUEST.getMsg());
        }

        // 가계부 수정
        account.updateAccount(accountReqDto);
        accountRepository.save(account);
    }

    @Override
    @Transactional
    public void deleteAccount(Long accountId) {

        // 가계부가 존재하는지 확인하자.
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> {
                   return new AccountNotFoundException(AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
                });

        // 이미 삭제된 가계부인지 확인하자.
        if(account.getDeletedAt() != null) {
            throw new AccountNotFoundException(AccountExceptionMessage.ACCOUNT_ALREADY_DELETED.getMsg());
        }

        // 작성자가 일치하는지 확인하자.

        // 가계부 삭제
        account.delete();
    }
}
