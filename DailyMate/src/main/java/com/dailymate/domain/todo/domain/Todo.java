package com.dailymate.domain.todo.domain;

import com.dailymate.global.common.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
public class Todo extends BaseTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "todo_id")
	private Long todoId;
	@NotNull
	private Long userId;
	@NotNull
	private String content;
	@NotNull
	private String date;
	@NotNull
	private Integer order;
	@NotNull
	private Boolean done;


	public void updateTodo(String content, String date){
		this.content = content == null ? this.content : content;
		this.date = date == null ? this.date : date;
	}
}
