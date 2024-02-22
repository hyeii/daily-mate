package com.dailymate.domain.comment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CommentExceptionMessage {

    COMMENT_BAD_REQUEST("입력값이 유효하지 않습니다."),
    COMMENT_NOT_FOUND("댓글이 존재하지 않습니다."),
    COMMENT_HANDLE_ACCESS_DENIED("권한이 없습니다.");

    private String msg;
}
