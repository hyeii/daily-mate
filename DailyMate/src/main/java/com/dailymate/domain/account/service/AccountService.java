package com.dailymate.domain.account.service;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.dto.MonthlyAmountDto;
import com.dailymate.domain.account.dto.MonthlyOutputByCategoryDto;

import java.util.List;
import java.util.Map;

public interface AccountService {

    void addAccount(AccountReqDto accountReqDto);

    void updateAccount(Long accountId, AccountReqDto accountReqDto);

    void deleteAccount(Long accountId);

    List<AccountResDto> findAccountList(String date);

    MonthlyAmountDto findAmountByMonth(String date);

    List<MonthlyOutputByCategoryDto> findOutputByCategory(String date);
    Map<String, Long> findOutputByCategoryAsMap(String date);

}
