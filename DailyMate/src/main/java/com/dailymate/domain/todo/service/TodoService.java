package com.dailymate.domain.todo.service;

import com.dailymate.domain.todo.dto.AddTodoReqDto;
import com.dailymate.domain.todo.dto.TodoReqDto;
import com.dailymate.domain.todo.dto.TodoResDto;
import com.dailymate.domain.todo.dto.UpdateTodoReqDto;

import java.util.List;

public interface TodoService {

	void addTodo(AddTodoReqDto addTodoReqDto, String token);
	TodoResDto updateTodo(Long todoId, UpdateTodoReqDto updateTodoReqDto, String token);
	void deleteTodo(Long todoId, String token);

	String postponeTodo(Long todoId, String token);

	List<String> findTodoListByDay(String date, String token);

	TodoResDto findTodo(Long todoId, String token);

	Integer getSuccessRate(String token, String date);

	void checkTodo(Long todoId, String token);
}
