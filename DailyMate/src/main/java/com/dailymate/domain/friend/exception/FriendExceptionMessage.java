package com.dailymate.domain.friend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FriendExceptionMessage {

    ALREADY_WITHDRAW_USER("이미 탈퇴한 회원입니다. 친구 신청을 할 수 없습니다."),
    CANNOT_REQUEST_YOURSELF("본인에게 친구 신청을 할 수 없습니다."),
    FRIEND_NOT_FOUND("해당 친구 데이터를 찾을 수 없습니다."),
    ALREADY_FRIEND("이미 친구거나 대기중입니다."),
    YOU_ARE_NOT_FRIEND("친구 상태가 아닙니다."),
    NOT_WAITING("친구 요청 대기중이 아닙니다.");

    private String msg;

}
