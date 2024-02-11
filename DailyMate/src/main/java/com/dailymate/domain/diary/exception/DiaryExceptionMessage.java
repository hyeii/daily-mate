package com.dailymate.domain.diary.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DiaryExceptionMessage {

    DIARY_BAD_REQUEST("입력값이 유효하지 않습니다."),
    DIARY_NOT_FOUND("일기가 존재하지 않습니다."),
    DIARY_ALREADY_DELETED("이미 삭제된 일기입니다."),
    DIARY_ALREADY_EXIST("해당 날짜에 일기가 존재합니다."),
    USER_NOT_FOUND("사용자가 존재하지 않습니다."),
    DIARY_HANDLE_ACCESS_DENIED("권한이 없습니다.");

    private String msg;
}
