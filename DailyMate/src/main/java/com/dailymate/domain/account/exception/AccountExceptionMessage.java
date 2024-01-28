package com.dailymate.domain.account.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AccountExceptionMessage {

    ACCOUNT_NOT_FOUND("가계부 존재 안함"),
    ACCOUNT_FORBIDDEN("해당 가계부 권한 없음"),
    ACCOUNT_BAD_REQUEST("가계부 금액이 0원일 수 없음");

    private String msg;

}
