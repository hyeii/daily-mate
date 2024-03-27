package com.dailymate.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LogInResDto {

    private String accessToken;
    private String refreshToken;

    private Long userId;
    private String email;
    private String nickName;

    private String image;
    private String profile;
    private String type;
    private String providerId;

}
