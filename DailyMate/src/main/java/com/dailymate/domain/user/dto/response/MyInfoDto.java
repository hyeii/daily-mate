package com.dailymate.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyInfoDto {

    private String email;
    private String nickname;
    private String image;
    private String profile;

}
