package com.dailymate.domain.todo.api;

import com.dailymate.domain.todo.dto.*;
import com.dailymate.domain.todo.service.TodoService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

	@Operation(
			summary = "할일 삭제",
			description = "로그인 사용자의 할일을 삭제합니다."
	)
	@DeleteMapping("/{todoId}")
	public ResponseEntity<MessageDto> deleteTodo(@PathVariable Long todoId, @RequestHeader String token){
		todoService.deleteTodo(todoId, token);
		return ResponseEntity.status(HttpStatus.OK)
				.body(MessageDto.message("DELETE SUCCESS"));
	}

	@Operation(
			summary = "할일 내일로 미루기",
			description = "로그인 사용자의 할일을 하루 미룹니다."
	)
	@PatchMapping("/postpone/{todoId}")
	public ResponseEntity<String> postponeTodo(@PathVariable Long todoId, @RequestHeader String token){
		return ResponseEntity.ok(todoService.postponeTodo(todoId, token));
	}

	@Operation(
			summary = "할일 리스트 일별 전체 조회",
			description = "로그인 사용자의 할일 리스트를 전체 조회합니다."
	)
	@GetMapping("/all")
	public ResponseEntity<List<String>> findTodoLisByDay(@RequestParam String date, @RequestHeader String token){
		return ResponseEntity.ok(todoService.findTodoListByDay(date, token));
	}

	@Operation(
			summary = "할일 상세 조회",
			description = "로그인 사용자의 할일 상세 조회를 합니다."
	)
	@GetMapping("/{todoId}")
	public ResponseEntity<TodoResDto> findTodo(@PathVariable Long todoId, @RequestHeader String token){
		return ResponseEntity.ok(todoService.findTodo(todoId, token));
	}

	@Operation(
			summary = "할일 달성도 조회",
			description = "로그인 사용자의 달성도를 조회합니다."
	)
	@GetMapping("/success")
	public ResponseEntity<Integer> getSuccessRate(@RequestParam String date, @RequestHeader String token){
		return ResponseEntity.ok(todoService.getSuccessRate(date, token));
	}

	@Operation(
			summary = "할일 완료",
			description = "로그인 사용자의 할일을 완료합니다."
	)
	@PatchMapping("/success/{todoId}")
	public ResponseEntity<MessageDto> checkTodo(@PathVariable Long todoId, @RequestHeader String token){
		todoService.checkTodo(todoId, token);
		return ResponseEntity.status(HttpStatus.OK)
				.body(MessageDto.message("TOGGLE SUCCESS"));
	}
}
