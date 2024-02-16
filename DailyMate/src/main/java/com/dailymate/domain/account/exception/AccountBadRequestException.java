package com.dailymate.domain.account.exception;

import com.dailymate.global.exception.exception.BadRequestException;

public class AccountBadRequestException extends BadRequestException {

    public AccountBadRequestException() {
        super("ACCOUNT_BAD_REQUEST_EXCEPTION 발생");
    }

    public AccountBadRequestException(String msg) {
        super(msg);
    }
}
