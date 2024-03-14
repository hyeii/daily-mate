package com.dailymate.domain.comment.exception;

import com.dailymate.global.exception.exception.NotFoundException;

public class CommentNotFoundException extends NotFoundException {
    public CommentNotFoundException() {
        super("COMMENT_NOT_FOUND_EXCEPTION 발생");
    }
    public CommentNotFoundException(String msg) {
        super(msg);
    }
}
