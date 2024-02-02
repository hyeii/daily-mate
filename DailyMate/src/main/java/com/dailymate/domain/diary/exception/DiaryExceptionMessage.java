package com.dailymate.domain.diary.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DiaryExceptionMessage {

    DIARY_BAD_REQUEST("제목을 입력해주세요.");

    private String msg;
}
