package com.dailymate.domain.user.exception;

import com.dailymate.global.exception.exception.BadRequestException;

public class UserBadRequestException extends BadRequestException {

    public UserBadRequestException() {
        super("USER_BAD_REQUEST_EXCEPTION 발생");
    }

    public UserBadRequestException(String msg) {
        super(msg);
    }
}
