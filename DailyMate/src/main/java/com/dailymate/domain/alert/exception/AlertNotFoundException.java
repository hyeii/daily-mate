package com.dailymate.domain.alert.exception;

import com.dailymate.global.exception.exception.NotFoundException;

public class AlertNotFoundException extends NotFoundException {

    public AlertNotFoundException() {super("ALERT_NOT_FOUND_EXCEPTION 발생"); }

    public AlertNotFoundException(String msg) {super(msg);}
}
