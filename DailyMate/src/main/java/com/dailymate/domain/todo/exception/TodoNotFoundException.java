package com.dailymate.domain.todo.exception;

import com.dailymate.global.exception.exception.NotFoundException;

public class TodoNotFoundException extends NotFoundException {

	public TodoNotFoundException(){super("TODO_NOT_FOUND_EXCEPTION 발생");}
	public TodoNotFoundException(String msg){super(msg);}
}
