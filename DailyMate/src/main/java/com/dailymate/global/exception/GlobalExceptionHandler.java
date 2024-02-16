package com.dailymate.global.exception;

import com.dailymate.global.dto.MessageDto;
import com.dailymate.global.exception.exception.BadRequestException;
import com.dailymate.global.exception.exception.ForbiddenException;
import com.dailymate.global.exception.exception.NotFoundException;
import com.dailymate.global.exception.exception.TokenException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * ExceptionHandler를 적용하여 여러 컨트롤러에 전역적으로 예외 처리가 가능함
 */
@RestControllerAdvice(annotations = RestController.class)
public class GlobalExceptionHandler {

    /**
     * 토큰 관련 에러 처리(401)
     * @param tokenException
     */
//    @ExceptionHandler(TokenException.class)
//    public ResponseEntity<MessageDto> handleTokenException(TokenException tokenException) {
//        return null;
//    }

    /**
     * 토큰 인증은 됐으나 해당 유저에게 해당 메서드 사용 권한이 없을 때(403)
     * (일반적으로 관리자 전용 메서드를 일반 유저가 접근시)
     * @param forbiddenException
     */
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<MessageDto> handleForbiddenException(ForbiddenException forbiddenException) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(MessageDto.message(forbiddenException.getMessage()));
    }

    /**
     * 존재하지 않는 데이터에 대한 처리(404)
     * @param notFoundException
     */
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<MessageDto> handleNotFoundException(NotFoundException notFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(MessageDto.message(notFoundException.getMessage()));
    }

    /**
     * 그 외 처리 - 잘못된 요청(400)
     * @param badRequestException
     */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<MessageDto> handleBadRequestException(BadRequestException badRequestException) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(MessageDto.message(badRequestException.getMessage()));
    }

}
