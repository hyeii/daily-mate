package com.dailymate.domain.diary.exception;

import com.dailymate.global.exception.exception.NotFoundException;

public class DiaryNotFoundException extends NotFoundException {
    public DiaryNotFoundException() {
        super("DIARY_NOT_FOUND_EXCEPTION 발생");
    }

    public DiaryNotFoundException(String msg) {
        super(msg);
    }
}
