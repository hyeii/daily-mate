package com.dailymate.domain.account.service;

import com.dailymate.domain.account.constant.AccountType;
import com.dailymate.domain.account.constant.Category;
import com.dailymate.domain.account.dao.AccountRepository;
import com.dailymate.domain.account.domain.Account;
import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    /**
     * 가계부 등록
     * @param accountReqDto
     */
    @Override
    public AccountResDto addAccount(AccountReqDto accountReqDto) {
        log.info("[가계부 등록] 가계부 등록 요청");

        int amount = accountReqDto.getAmount();
        String category = accountReqDto.getCategory();

        // UserId 추가해야함
        Account account = Account.builder()
                .content(accountReqDto.getContent())
                .type(AccountType.getType(amount))
                .amount(amount)
                .category(Category.getCategory(category))
                .date(LocalDate.parse(accountReqDto.getDate(), DateTimeFormatter.ISO_DATE))
                .build();

        accountRepository.save(account);

        log.info("[가계부 등록] 가계부 등록 완료");

        return AccountResDto.entityToDto(account);
    }
}
