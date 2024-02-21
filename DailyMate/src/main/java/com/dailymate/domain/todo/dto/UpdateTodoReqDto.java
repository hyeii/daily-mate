package com.dailymate.domain.todo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateTodoReqDto {
	private String content;
	private String date;
}
