package com.dailymate.domain.todo.service;

import com.dailymate.domain.todo.domain.Todo;
import com.dailymate.domain.todo.dto.*;

import java.util.List;

public interface TodoService {

	void addTodo(AddTodoReqDto addTodoReqDto, String token);
	TodoResDto updateTodo(Long todoId, UpdateTodoReqDto updateTodoReqDto, String token);
	void deleteTodo(Long todoId, String token);

	String postponeTodo(Long todoId, String token);

	List<Todo> findTodoListByDay(String date, String token);

	TodoResDto findTodo(Long todoId, String token);

	Integer getSuccessRate(String token, String date);

	void checkTodo(Long todoId, String token);

	List<ChangeOrderResDto> changeOrder(List<ChangeOrderReqDto> changeOrderReqDto, String token);
}
