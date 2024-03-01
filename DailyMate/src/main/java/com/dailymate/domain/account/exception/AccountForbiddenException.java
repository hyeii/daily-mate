package com.dailymate.domain.account.exception;

import com.dailymate.global.exception.exception.ForbiddenException;

public class AccountForbiddenException extends ForbiddenException {

    public AccountForbiddenException() {
        super("ACCOUNT_FORBIDDEN_EXCEPTION 발생");
    }

    public AccountForbiddenException(String msg) {
        super(msg);
    }
}
