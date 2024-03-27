package com.dailymate.domain.user.dto.response;

import lombok.Getter;

@Getter
public class UserSearchInfoDto {

    private Long userId;
    private String email;
    private String nickname;
    private String image;
    private String profile;
    private Boolean status; // 친구상태
    private String requestDate; // 친구요청일자

    public UserSearchInfoDto(Long userId, String email, String nickname, String image, String profile, Boolean status, String requestDate) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.image = image;
        this.profile = profile;
        this.status = status;
        this.requestDate = requestDate;
    }

}
