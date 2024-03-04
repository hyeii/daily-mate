package com.dailymate.domain.todo.domain;

import com.dailymate.global.common.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
@Where(clause = "deleted_at is null")
public class Todo extends BaseTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TODO_ID")
	private Long todoId;
	@NotNull
	private Long userId;
	@NotNull
	private String content;
	@NotNull
	private String date;
	@NotNull
	private Integer todoOrder;
	@NotNull
	private Boolean done;

	@NotNull
	private Integer repeatition;


	public void updateTodo(String content, String date){
		this.content = content == null ? this.content : content;
		this.date = date == null ? this.date : date;
	}

	public void toggleDone(){
		this.done = !this.done;
	}
}
