package com.dailymate.global.exception.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TokenExceptionMessage {

    TOKEN_EXPIRED_ERROR("토큰이 만료되었습니다. 재로그인이 필요합니다."),
    TOKEN_NOT_EQUAL("토큰이 일치하지 않습니다. 재발급이 불가합니다."),
    TOKEN_NOT_FOUND("토큰이 존재하지 않습니다. 로그아웃된 사용자입니다.");

    private String value;

}
