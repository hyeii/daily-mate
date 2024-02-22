package com.dailymate.domain.comment.exception;

import com.dailymate.global.exception.exception.BadRequestException;

public class CommentBadRequestException extends BadRequestException {

    public CommentBadRequestException() {
        super("COMMENT_BAD_REQUEST_EXCEPTION 발생");
    }

    public CommentBadRequestException(String msg) {
        super(msg);
    }
}
