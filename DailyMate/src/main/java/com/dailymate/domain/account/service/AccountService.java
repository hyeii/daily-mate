package com.dailymate.domain.account.service;

import com.dailymate.domain.account.dto.AccountReqDto;

public interface AccountService {
    void addAccount(AccountReqDto accountReqDto);

    void updateAccount(Long accountId, AccountReqDto accountReqDto);

    void deleteAccount(Long accountId);
}
