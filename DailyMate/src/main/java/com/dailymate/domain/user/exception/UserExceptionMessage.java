package com.dailymate.domain.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserExceptionMessage {

    USER_NOT_FOUND("존재하지 않는 사용자입니다."),
    USER_FORBIDDEN("권한이 없는 사용자입니다."),
    SIGN_UP_BAD_REQUEST("회원가입에 필요한 정보가 불충분합니다."),
    PASSWORD_NOT_MATCH_REGEX("비밀번호는 8~16자 이내의 영문, 숫자, 특수문자를 포함해야 합니다."),
    PASSWORD_INCORRECT("비밀번호가 틀립니다."),
    PASSWORD_MUST_BE_DIFFERENT("현재 비밀번호와 다른 비밀번호를 입력해야 합니다."),
    NICKNAME_DUPLICATED("이미 사용중인 닉네임입니다.");

    private String msg;

}
