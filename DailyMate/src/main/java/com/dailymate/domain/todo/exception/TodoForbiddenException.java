package com.dailymate.domain.todo.exception;

import com.dailymate.global.exception.exception.ForbiddenException;

public class TodoForbiddenException extends ForbiddenException {
	public TodoForbiddenException(){super("TODO_FORBIDDEN_EXCEPTION 발생");}
	public TodoForbiddenException(String msg){super(msg);}
}
