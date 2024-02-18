package com.dailymate.domain.friend.exception;

import com.dailymate.global.exception.exception.NotFoundException;

public class FriendNotFountException extends NotFoundException {

    public FriendNotFountException() {
        super("FRIEND_NOT_FOUND_EXCEPTION 발생");
    }

    public FriendNotFountException(String msg) {
        super(msg);
    }

}
