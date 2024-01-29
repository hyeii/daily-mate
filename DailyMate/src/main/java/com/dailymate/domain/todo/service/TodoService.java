package com.dailymate.domain.todo.service;

import com.dailymate.domain.todo.dto.TodoReqDto;
import com.dailymate.domain.todo.dto.TodoResDto;

public interface TodoService {

	void addTodo(TodoReqDto todoReqDto);
	TodoResDto updateTodo(Long todoId, Long userId, TodoReqDto todoReqDto);
	void deleteTodo(Long todoId);
}
