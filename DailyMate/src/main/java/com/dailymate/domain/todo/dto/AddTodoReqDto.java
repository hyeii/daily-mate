package com.dailymate.domain.todo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddTodoReqDto {
	private String content;
	private Integer repeatition;

	private String date;
}
