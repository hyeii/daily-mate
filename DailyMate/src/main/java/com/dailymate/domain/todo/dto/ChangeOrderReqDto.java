package com.dailymate.domain.todo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class ChangeOrderReqDto {
	private Long todoId;

	private Integer todoOrder;
}
