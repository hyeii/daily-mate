package com.dailymate.domain.todo.service;

import com.dailymate.domain.todo.dto.TodoReqDto;
import com.dailymate.domain.todo.dto.TodoResDto;

import java.util.List;

public interface TodoService {

	void addTodo(TodoReqDto todoReqDto);
	TodoResDto updateTodo(Long todoId, Long userId, TodoReqDto todoReqDto);
	void deleteTodo(Long todoId, Long userId);

	void postponeTodo(Long todoId, Long userId);

	List<String> findTodoListByDay(String date, Long userId);

	TodoResDto findTodo(Long todoId, Long userId);

	Integer getSuccessRate(Long userId, String date);

	void checkTodo(Long todoId, Long userId);
}
