package com.dailymate.domain.account.exception;

import com.dailymate.global.exception.exception.NotFoundException;

public class AccountNotFoundException extends NotFoundException {

    public AccountNotFoundException() {
        super("ACCOUNT_NOT_FOUND_EXCEPTION 발생");
    }

    public AccountNotFoundException(String msg) {
        super(msg);
    }
}
