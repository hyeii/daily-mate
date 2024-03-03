package com.dailymate.domain.alert.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AlertExceptionMessage {

    ALERT_NOT_FOUND("알림이 존재하지 않습니다."),
//    ALERT_ALREADY_DELETED("이미 삭제된 알림입니다."),
    ALERT_HANDLE_ACCESS_DENIED("접근 권한이 없습니다.");

    private String msg;
}
