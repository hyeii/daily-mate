package com.dailymate.domain.account.exception;

import com.dailymate.global.exception.exception.NotFoundException;

public class AccountNotFountException extends NotFoundException {

    public AccountNotFountException() {
        super("ACCOUNT_NOT_FOUND_EXCEPTION 발생");
    }

    public AccountNotFountException(String msg) {
        super(msg);
    }
}
