package com.dailymate.domain.diary.exception;

import com.dailymate.global.exception.exception.BadRequestException;

public class DiaryBadRequestException extends BadRequestException {

    public DiaryBadRequestException() {
        super("DIARY_BAD_REQUEST_EXCEPTION 발생");
    }

    public DiaryBadRequestException(String msg) {
        super(msg);
    }
}
