package com.dailymate.domain.todo.dto;

import com.dailymate.domain.todo.domain.Todo;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TodoResDto {

	private Long todoId;
	private Long userId;
	private String content;
	private String date;
	private Integer order;
	private Boolean done;
	private String createdAt;
	private String updatedAt;
	private String deletedAt;

	public static TodoResDto entityToDto(Todo todo){
		return TodoResDto.builder()
				.todoId(todo.getTodoId())
				.userId(todo.getUserId())
				.content(todo.getContent())
				.date(todo.getDate())
				.order(todo.getTodoOrder())
				.done(todo.getDone())
				.createdAt(todo.getCreatedAt())
				.updatedAt(todo.getUpdatedAt())
				.deletedAt(todo.getDeletedAt())
				.build();
	}
}
