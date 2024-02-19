package com.dailymate.domain.account.service;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.dto.AmountResDto;
import com.dailymate.domain.account.dto.OutputResDto;

import java.util.List;

public interface AccountService {
    void addAccount(String token, AccountReqDto accountReqDto);

    void updateAccount(String token, Long accountId, AccountReqDto accountReqDto);

    void deleteAccount(Long accountId);

    List<AccountResDto> findAccountList(Long userId, String date);

//    List<AmountResDto> findAmountByMonth();

    List<OutputResDto> findOutputByCategory(Long userId, String date);
}
