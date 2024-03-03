package com.dailymate.domain.alert.exception;

import com.dailymate.global.exception.exception.ForbiddenException;

public class AlertForbiddenException extends ForbiddenException {

    public AlertForbiddenException() {super("ALERT_FORBIDDEN_EXCEPTION 발생"); }

    public AlertForbiddenException(String msg) {super(msg);}
}
