package com.dailymate.domain.user.dto.response;

import lombok.Getter;

@Getter
public class UserSearchInfoDto {

    private long userId;
    private String email;
    private String nickname;
    private String image;
    private String profile;
    private boolean status; // 친구상태
    private String requestDate; // 친구요청일자

    public UserSearchInfoDto(long userId, String email, String nickname, String image, String profile, boolean status, String requestDate) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.image = image;
        this.profile = profile;
        this.status = status;
        this.requestDate = requestDate;
    }

}
