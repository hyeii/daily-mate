package com.dailymate.domain.account.service;

import com.dailymate.domain.account.constant.AccountCategory;
import com.dailymate.domain.account.domain.Account;
import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.dto.AmountResDto;
import com.dailymate.domain.account.dto.OutputResDto;

import java.util.List;
import java.util.Map;

public interface AccountService {
    void addAccount(String token, AccountReqDto accountReqDto);

    void updateAccount(String token, Long accountId, AccountReqDto accountReqDto);

    void deleteAccount(String token, Long accountId);

    List<AccountResDto> findAccountList(String token, String date);

    List<AmountResDto> findAmountByMonth(String token, String date);

    List<OutputResDto> findOutputByCategory(String token, String date);

    Map<String, Long> findOutputByCategoryAsMap(String token, String date);
}
