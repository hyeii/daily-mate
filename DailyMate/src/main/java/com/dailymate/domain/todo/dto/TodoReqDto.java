package com.dailymate.domain.todo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoReqDto {

	private String content;
	private String date;
	private Integer order;
	private Boolean done;

	private Integer repeat;
}
