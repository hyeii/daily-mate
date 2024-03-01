package com.dailymate.domain.user.exception;

import com.dailymate.global.exception.exception.ForbiddenException;

public class UserForbiddenException extends ForbiddenException {

    public UserForbiddenException() {
        super("USER_FORBIDDEN_EXCEPTION 발생");
    }

    public UserForbiddenException(String msg) {
        super(msg);
    }

}
