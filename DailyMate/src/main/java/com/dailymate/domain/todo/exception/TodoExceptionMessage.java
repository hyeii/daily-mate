package com.dailymate.domain.todo.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TodoExceptionMessage {

	TODO_NOT_FOUND("할일 존재 안함"),
	TODO_FORBIDDEN("해당 할일 권한 없음");

	private String msg;
}
