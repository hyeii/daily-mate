package com.dailymate.global.exception.exception;

/**
 *  401, 403, 404를 제외한 모든 에러(400) - 잘못된 요청
 */
public class BadRequestException extends IllegalArgumentException {

    public BadRequestException() {
        super("BAD_REQUEST EXCEPTION 발생");
    }

    public BadRequestException(String msg) {
        super(msg);
    }

}
