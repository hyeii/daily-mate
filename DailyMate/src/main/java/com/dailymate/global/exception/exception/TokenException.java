package com.dailymate.global.exception.exception;

import org.springframework.security.core.AuthenticationException;

public class TokenException extends AuthenticationException {

    public TokenException() {
        super("TOKEN_EXCEPTION 발생");
    }

    public TokenException(String msg) {
        super(msg);
    }

    public TokenException(String msg, Throwable cause) {
        super(msg, cause);
    }

}
