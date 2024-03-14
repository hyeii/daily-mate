package com.dailymate.global.exception.exception;

/**
 * 토큰 인증은 됐으나,
 * 로그인 사용자가 해당 메서드에 사용 권한이 없음(403)
 */
public class ForbiddenException extends IllegalArgumentException {

    public ForbiddenException() {
        super("FORBIDDEN EXCEPTION 발생");
    }

    public ForbiddenException(String msg) {
        super(msg);
    }

}
