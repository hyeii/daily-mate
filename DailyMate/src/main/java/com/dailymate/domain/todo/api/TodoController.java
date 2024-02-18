package com.dailymate.domain.todo.api;

import com.dailymate.domain.todo.dto.AddTodoReqDto;
import com.dailymate.domain.todo.dto.TodoReqDto;
import com.dailymate.domain.todo.dto.TodoResDto;
import com.dailymate.domain.todo.dto.UpdateTodoReqDto;
import com.dailymate.domain.todo.service.TodoService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Todo", description = "할일 API Document")
@RestController
@RequiredArgsConstructor
@RequestMapping("/todo")
public class TodoController {

	private final TodoService todoService;

	@Operation(
			summary = "할일 등록",
			description = "로그인 사용자의 할일을 등록합니다."
	)
	@PostMapping
	public ResponseEntity<MessageDto> addTodo(@RequestBody AddTodoReqDto reqDto, @RequestHeader String token){
		todoService.addTodo(reqDto, token);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(MessageDto.message("CREATE SUCCESS"));
	}

	@Operation(
			summary = "할일 수정",
			description = "로그인 사용자의 할일을 수정합니다."
	)
	@PatchMapping("/{todoId}")
	public ResponseEntity<TodoResDto> updateTodo(@PathVariable Long todoId, @RequestBody UpdateTodoReqDto reqDto, @RequestHeader String token){
		return ResponseEntity.ok(todoService.updateTodo(todoId, reqDto, token));
	}
}
