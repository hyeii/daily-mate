package com.dailymate.domain.account.service;

import com.dailymate.domain.account.constant.AccountCategory;
import com.dailymate.domain.account.constant.AccountType;
import com.dailymate.domain.account.dao.AccountRepository;
import com.dailymate.domain.account.domain.Account;
import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.dto.OutputResDto;
import com.dailymate.domain.account.exception.AccountBadRequestException;
import com.dailymate.domain.account.exception.AccountExceptionMessage;
import com.dailymate.domain.account.exception.AccountForbiddenException;
import com.dailymate.domain.account.exception.AccountNotFoundException;
import com.dailymate.domain.diary.exception.DiaryBadRequestException;
import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.domain.Users;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void addAccount(String token, AccountReqDto accountReqDto) {

        // 금액을 확인하자.
        if(accountReqDto.getAmount() == 0) {
            throw new DiaryBadRequestException(AccountExceptionMessage.ACCOUNT_BAD_REQUEST.getMsg());
        }

        // 작성자 번호로 등록해주자.
        String email = jwtTokenProvider.getAuthentication(token).getName();
        Users user = userRepository.findByEmail(email).orElse(null);


        // 가계부 생성
        Account account = Account.builder()
//                .userId(1L)
                .userId(user.getUserId())
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
    public void updateAccount(String token, Long accountId, AccountReqDto accountReqDto) {

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
        String email = jwtTokenProvider.getAuthentication(token).getName();
        Users loginUser = userRepository.findByEmail(email)
                .orElse(null);

        Long loginUserId = loginUser.getUserId();
        if(account.getUserId() != loginUserId) {
            // 불일치
            throw new AccountForbiddenException(AccountExceptionMessage.ACCOUNT_HANDLE_ACCESS_DENIED.getMsg());
        }

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

    @Transactional
    @Override
    public List<AccountResDto> findAccountList(Long userId, String date) {

//        List<Account> accountList = accountRepository.findAll();
//        List<AccountResDto> accountResDtoList = new ArrayList<>();
//
//        for(Account account : accountList) {
//
//            // 해당 날짜에 조회할 가계부가 존재하는지 확인하자.
//
//            if (account.getCreatedAt() == date) {
//
//                // 이미 삭제된 가계부인지 확인하자.
//                if (account.getDeletedAt() == null) {

//                    // 사용자가 일치하는지 확인하자.
//
//                    AccountResDto accountResDto = AccountResDto.builder()
//                            .userId(1L)
//                            .accountId(account.getAccountId())
//                            .content(account.getContent())
//                            .type(account.getType().getValue())
//                            .date(account.getDate())
//                            .amount(account.getAmount())
//                            .category(account.getCategory().getValue())
//                            .build();
//
//                    accountResDtoList.add(accountResDto);
//                }
//            }
//        }
//        // 날짜별 가계부 조회
//        return accountResDtoList;

        log.info("[날짜별 가계부 조회] 조회 요청 : {}", userId);
        List<Account> accountList = accountRepository.findByUserIdAndDate(userId, date);

        log.info("[날짜별 가계부 조회] 조회잘됐엉");
        log.info("[날짜별 가계부 조회] accountList 개수 : {}", accountList.size());

        List<AccountResDto> accountResDtoList = new ArrayList<>();

        for(Account account : accountList) {
            log.info("[날짜별 가계부 조회] 조회된 가계부 : {}", account.getContent());
            AccountResDto accountResDto = AccountResDto.builder()
                    .userId(1L)
                    .accountId(account.getAccountId())
                    .content(account.getContent())
                    .type(account.getType().getValue())
                    .date(account.getDate())
                    .amount(account.getAmount())
                    .category(account.getCategory() == null ? null : account.getCategory().getValue())
                    .build();
            accountResDtoList.add(accountResDto);
        }
        return accountResDtoList;
    }



    @Transactional
    @Override
    public List<OutputResDto> findOutputByCategory(Long userId, String date) {
        return accountRepository.findByUserIdAndDateStartsWith(userId, date);
    }


}
