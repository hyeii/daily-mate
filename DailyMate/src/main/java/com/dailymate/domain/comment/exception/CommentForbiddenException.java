package com.dailymate.domain.comment.exception;

import com.dailymate.global.exception.exception.ForbiddenException;

public class CommentForbiddenException extends ForbiddenException {
    public CommentForbiddenException() {
        super("COMMENT_FORBIDDEN_EXCEPTION 발생");
    }
    public CommentForbiddenException(String msg) {
        super(msg);
    }
}
