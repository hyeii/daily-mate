package com.dailymate.domain.account.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AccountExceptionMessage {

    ACCOUNT_BAD_REQUEST("알맞은 금액을 입력해주세요."),
//    ACCOUNT_BAD_REQUEST_CATEGORY("카테고리를 입력해주세요."),
    ACCOUNT_NOT_FOUND("가계부가 존재하지 않습니다."),
    ACCOUNT_ALREADY_DELETED("이미 삭제된 가계부입니다."),
    ACCOUNT_HANDLE_ACCESS_DENIED("접근 권한이 없습니다.");

    private String msg;
}
