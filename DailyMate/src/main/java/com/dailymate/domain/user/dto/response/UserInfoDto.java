package com.dailymate.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfoDto {

    private Long userId;
    private String email;
    private String nickname;
    private String image;
    private String profile;
    private String type;
    private String createdAt;

}
