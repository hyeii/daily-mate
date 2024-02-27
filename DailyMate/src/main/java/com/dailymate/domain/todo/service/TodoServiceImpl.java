package com.dailymate.domain.todo.service;

import com.dailymate.domain.todo.dao.TodoRepository;
import com.dailymate.domain.todo.domain.Todo;
import com.dailymate.domain.todo.dto.AddTodoReqDto;
import com.dailymate.domain.todo.dto.TodoReqDto;
import com.dailymate.domain.todo.dto.TodoResDto;
import com.dailymate.domain.todo.dto.UpdateTodoReqDto;
import com.dailymate.domain.todo.exception.TodoExceptionMessage;
import com.dailymate.domain.todo.exception.TodoForbiddenException;
import com.dailymate.domain.todo.exception.TodoNotFoundException;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

	private final TodoRepository todoRepository;
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	public void addTodo(AddTodoReqDto addTodoReqDto, String token) {
		Long USERID = jwtTokenProvider.getUserId(token);
		log.info("[할일 등록] 할일 등록 요청");

		LocalDate today = LocalDate.now();
		for(int i = 0; i < addTodoReqDto.getRepeatition(); i++){
			String todayString = today.plusDays(i).toString();
			Todo todo = Todo.builder()
					.userId(USERID)
					.content(addTodoReqDto.getContent())
					.date(todayString)
					.todoOrder(0)
					.done(false)
					.repeatition(addTodoReqDto.getRepeatition())
					.build();

			todoRepository.save(todo);
		}


		log.info("[할일 등록] 할일 등록 완료");
	}

	@Override
	public TodoResDto updateTodo(Long todoId, UpdateTodoReqDto updateTodoReqDto, String token) {
		Long USERID = jwtTokenProvider.getUserId(token);
		log.info("[할일 수정] 할일 수정 요청. userId : {}", USERID);
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
		if(todo.getUserId() != USERID){
			log.error("[할일 수정] 권한이 없는 할일입니다.");
			throw new TodoForbiddenException("[UPDATE_TODO] " + TodoExceptionMessage.TODO_FORBIDDEN.getMsg());
		}

		log.info("[할일 수정] 할일 찾기 완료.");

		todo.updateTodo(updateTodoReqDto.getContent(), updateTodoReqDto.getDate());
		todoRepository.save(todo);

		log.info("[할일 수정] 할일 수정 완료.");

		return TodoResDto.entityToDto(todo);

	}

	@Transactional
	@Override
	public void deleteTodo(Long todoId, String token) {
		Long USERID = jwtTokenProvider.getUserId(token);

		log.info("[할일 삭제] 할일 삭제 요청. todoId : {}", todoId);

		// 1. 존재하는 할일인지 체크
		Todo todo = todoRepository.findById(todoId)
				.orElseThrow(()->{
					log.error("[할일 삭제] 존재하지 않는 할일입니다.");
					return new TodoNotFoundException("[DELETE_TODO] " + TodoExceptionMessage.TODO_NOT_FOUND.getMsg());
				});

		// 2. 기삭제된 할일인지 체크
		if(todo.getDeletedAt() != null){
			log.error("[할일 삭제] 삭제된 할일 입니다.");
			throw new TodoNotFoundException("[DELETE_TODO] " + TodoExceptionMessage.TODO_NOT_FOUND.getMsg());
		}

		// 3. 로그인 사용자의 할일인지 체크
		if(todo.getUserId() != USERID){
			log.error("[할일 수정] 권한이 없는 할일입니다.");
			throw new TodoForbiddenException("[UPDATE_TODO] " + TodoExceptionMessage.TODO_FORBIDDEN.getMsg());
		}

		log.info("[할일 삭제] 할일 찾기 완료");
		todo.delete();
		log.info("[할일 삭제] 할일 삭제 완료");

	}

	@Override
	public String postponeTodo(Long todoId, String token) {
		Long USERID = jwtTokenProvider.getUserId(token);
		log.info("[할일 미루기] 할일 미루기 요청. todoId : {}", todoId);

		// 1. 존재하는 할일인지 체크
		Todo todo = todoRepository.findById(todoId)
				.orElseThrow(()->{
					log.error("[할일 삭제] 존재하지 않는 할일입니다.");
					return new TodoNotFoundException("[DELETE_TODO] " + TodoExceptionMessage.TODO_NOT_FOUND.getMsg());
				});

		// 2. 로그인 사용자의 할일인지 체크
		if(todo.getUserId() != USERID){
			log.error("[할일 수정] 권한이 없는 할일입니다.");
			throw new TodoForbiddenException("[UPDATE_TODO] " + TodoExceptionMessage.TODO_FORBIDDEN.getMsg());
		}

		// 3. 할일의 날짜를 하루 미룸
		LocalDate currentDate = LocalDate.parse(todo.getDate()); // 문자열로 저장된 날짜를 LocalDate로 변환
		LocalDate postponedDate = currentDate.plusDays(1); // 현재 날짜에 1일을 추가하여 미룬 날짜 생성

		// 4. 미룬 할일 정보를 새로운 할일로 저장
		Todo postponedTodo = Todo.builder()
				.content(todo.getContent())
				.date(postponedDate.toString()) // LocalDate를 문자열로 변환하여 저장
				.todoOrder(todo.getTodoOrder())
				.done(todo.getDone())
				.userId(todo.getUserId())
				.build();

		todoRepository.save(postponedTodo);
		deleteTodo(todoId, token);

		log.info("[할일 미루기] 할일 미루기 완료");
		return postponedDate.toString();
	}

	@Override
	public List<String> findTodoListByDay(String date, String token) {
		Long USERID = jwtTokenProvider.getUserId(token);
		log.info("[할일 일별 조회] 할일 일별 조회 요청. date : {}", date);

		// 1. 해당 날짜에 해당하는 사용자의 할일 목록을 조회
		List<Todo> todoList = todoRepository.findByUserIdAndDate(USERID, date);

		if (todoList.isEmpty()) {
			log.info("[할일 일별 조회] 해당 날짜에 할일이 없습니다. date : {}, userId : {}", date, USERID);
			return Collections.emptyList(); // 비어 있는 리스트 반환
		}

		// 2. 할일 내용만 추출하여 리스트로 반환
		List<String> contentList = todoList.stream()
				.map(Todo::getContent)
				.collect(Collectors.toList());

		log.info("[할일 일별 조회] 할일 내용 조회 완료. date : {}, userId : {}", date, USERID);
		return contentList;
	}


	@Override
	public TodoResDto findTodo(Long todoId, String token) {
		Long USERID = jwtTokenProvider.getUserId(token);
		log.info("[할일 상세] 할일 상세 요청. todoId : {}", todoId);

		// 1. 존재하는 할일인지 체크
		Todo todo = todoRepository.findById(todoId)
				.orElseThrow(() -> {
					log.error("[할일 상세] 존재하지 않는 할일입니다.");
					return new TodoNotFoundException("[FIND_TODO] " + TodoExceptionMessage.TODO_NOT_FOUND.getMsg());
				});

		// 2. 로그인 사용자의 할일인지 체크
		if (!todo.getUserId().equals(USERID)) {
			log.error("[할일 상세] 권한이 없는 할일입니다.");
			throw new TodoForbiddenException("[FIND_TODO] " + TodoExceptionMessage.TODO_FORBIDDEN.getMsg());
		}

		// 3. TodoResDto로 변환하여 반환
		TodoResDto todoResDto = TodoResDto.entityToDto(todo);
		log.info("[할일 상세] 할일 상세 조회 완료. todoId : {}", todoId);
		return todoResDto;

	}

	@Override
	public Integer getSuccessRate(String token, String date) {
		Long USERID = jwtTokenProvider.getUserId(token);
		log.info("[할일 일간 달성도 조회] 달성도 조회 요청. userId : {}", USERID);

		List<Todo> todoList = todoRepository.findByUserIdAndDate(USERID, date);

		int totalTodos = todoList.size();

		long completedTodos = todoList.stream().filter(Todo::getDone).count();

		double successRate = totalTodos == 0 ? 0 : ((double) completedTodos / totalTodos) * 100;

		log.info("[할일 일간 달성도 조회] 달성도 조회 완료. userId : {}, date : {}, successRate : {}", USERID, date, successRate);

		return (int)successRate;

	}

	@Override
	public void checkTodo(Long todoId, String token) {
		Long USERID = jwtTokenProvider.getUserId(token);
		log.info("[할일 완료 체크] 완료 체크 요청. todoId : {}", todoId);

		// 1. 존재하는 할일인지 체크
		Todo todo = todoRepository.findById(todoId)
				.orElseThrow(() -> {
					log.error("[할일 상세] 존재하지 않는 할일입니다.");
					return new TodoNotFoundException("[FIND_TODO] " + TodoExceptionMessage.TODO_NOT_FOUND.getMsg());
				});

		// 2. 로그인 사용자의 할일인지 체크
		if(todo.getUserId() != USERID){
			log.error("[할일 수정] 권한이 없는 할일입니다.");
			throw new TodoForbiddenException("[UPDATE_TODO] " + TodoExceptionMessage.TODO_FORBIDDEN.getMsg());
		}

		todo.toggleDone();
		todoRepository.save(todo);

		log.info("[할일 완료 체크] 할일 완료. todoId : {}", todoId);
	}

}
