package com.dailymate.domain.diary.exception;

import com.dailymate.global.exception.exception.ForbiddenException;

public class DiaryForbiddenException extends ForbiddenException {

    public DiaryForbiddenException() {
        super("DIARY_BAD_REQUEST_EXCEPTION 발생");
    }

    public DiaryForbiddenException(String msg) {
        super(msg);
    }
}
