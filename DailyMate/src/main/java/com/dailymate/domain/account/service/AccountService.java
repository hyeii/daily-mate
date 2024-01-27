package com.dailymate.domain.account.service;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;

import java.util.List;

public interface AccountService {

//    List<AccountResDto> findAccountList(String token, String date);

    void addAccount(AccountReqDto accountReqDto); // void로 변경해야함

    AccountResDto updateAccount(Long accountId, AccountReqDto accountReqDto);

    void deleteAccount(Long accountId);

}
