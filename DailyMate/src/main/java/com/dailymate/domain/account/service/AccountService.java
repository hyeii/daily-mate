package com.dailymate.domain.account.service;

import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;

import java.util.List;

public interface AccountService {

//    List<AccountResDto> findAccountList(String token, String date);

    AccountResDto addAccount(AccountReqDto accountReqDto);


}
