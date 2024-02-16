package com.dailymate.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LogInResDto {

    private String accessToken;
    private String refreshToken;
    private String email;
    private String nickName;

    private String image;
    private String profile;
    private String type;

}
