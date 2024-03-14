package com.dailymate.domain.friend.exception;

import com.dailymate.global.exception.exception.BadRequestException;

public class FriendBadRequestException extends BadRequestException {

    public FriendBadRequestException() {
        super("FRIEND_BAD_REQUEST_EXCEPTION 발생");
    }

    public FriendBadRequestException(String msg) {
        super(msg);
    }

}
