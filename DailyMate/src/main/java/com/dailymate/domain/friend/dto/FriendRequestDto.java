package com.dailymate.domain.friend.dto;

import lombok.Getter;

@Getter
public class FriendRequestDto {

    private Long fromId;
    private String requestDate;

    private String email;
    private String nickname;
    private String image;
    private String  profile;

    // jdcl인가 거기서 lombok생성자는 인식을 잘못해서 직접 구현!
    public FriendRequestDto(Long fromId, String requestDate, String email, String nickname, String image, String profile) {
        this.fromId = fromId;
        this.requestDate = requestDate;
        this.email = email;
        this.nickname = nickname;
        this.image = image;
        this.profile = profile;
    }

}
