package com.dailymate.domain.todo.service;

import com.dailymate.domain.todo.dao.TodoRepository;
import com.dailymate.domain.todo.domain.Todo;
import com.dailymate.domain.todo.dto.TodoReqDto;
import com.dailymate.domain.todo.dto.TodoResDto;
import com.dailymate.domain.todo.exception.TodoExceptionMessage;
import com.dailymate.domain.todo.exception.TodoForbiddenException;
import com.dailymate.domain.todo.exception.TodoNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

	private final TodoRepository todoRepository;

	@Override
	public void addTodo(TodoReqDto todoReqDto) {
		log.info("[할일 등록] 할일 등록 요청");

		Todo todo = Todo.builder()
				.content(todoReqDto.getContent())
				.date(todoReqDto.getDate())
				.order(todoReqDto.getOrder())
				.done(todoReqDto.getDone())
				.build();

		todoRepository.save(todo);

		log.info("[할일 등록] 할일 등록 완료");
	}

	@Override
	public TodoResDto updateTodo(Long todoId, Long userId, TodoReqDto todoReqDto) {
		log.info("[할일 수정] 할일 수정 요청. userId : {}", userId);
		// 1. 존재하는 할일인지 체크
		Todo todo = todoRepository.findById(todoId)
				.orElseThrow(()->{
					log.error("[할일 수정] 존재하지 않는 할일입니다.");
					return new TodoNotFoundException("[UPDATE_TODO] " + TodoExceptionMessage.TODO_NOT_FOUND.getMsg());
				});

		// 2. 이미 삭제된 할일인지 체크
		if(todo.getDeletedAt() != null){
			log.error("[할일 수정] 이미 삭제된 할일입니다.");
			throw new TodoNotFoundException("[UPDATE_TODO] " + TodoExceptionMessage.TODO_NOT_FOUND.getMsg());
		}

		// 3. 로그인 사용자의 할일인지 체크
		if(todo.getUserId() != userId){
			log.error("[할일 수정] 권한이 없는 할일입니다.");
			throw new TodoForbiddenException("[UPDATE_TODO] " + TodoExceptionMessage.TODO_FORBIDDEN.getMsg());
		}

		log.info("[할일 수정] 할일 찾기 완료.");
		todo.updateTodo(todoReqDto.getContent(), todoReqDto.getDate());
		log.info("[할일 수정] 할일 수정 완료.");
		return TodoResDto.entityToDto(todo);

	}

	@Override
	public void deleteTodo(Long todoId) {

	}
}
