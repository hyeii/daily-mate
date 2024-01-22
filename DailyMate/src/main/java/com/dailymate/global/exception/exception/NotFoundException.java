package com.dailymate.global.exception.exception;

/**
 * 404에러
 */
public class NotFoundException extends IllegalArgumentException {

    public NotFoundException() {
        super("NOT_FOUND EXCEPTION 발생");
    }

    public NotFoundException(String msg) {
        super(msg);
    }
}
