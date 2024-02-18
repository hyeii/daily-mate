package com.dailymate.domain.friend.dto;

import lombok.Getter;

@Getter
public class FriendInfoDto {

    private Long userId;
    private String requestDate;

    private String email;
    private String nickname;
    private String image;
    private String  profile;

    // jpql에서 lombok생성자는 인식을 잘못해서 직접 구현!
    public FriendInfoDto(Long userId, String requestDate, String email, String nickname, String image, String profile) {
        this.userId = userId;
        this.requestDate = requestDate;
        this.email = email;
        this.nickname = nickname;
        this.image = image;
        this.profile = profile;
    }

}
