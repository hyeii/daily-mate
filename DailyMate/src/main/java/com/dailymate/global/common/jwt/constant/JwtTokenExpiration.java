package com.dailymate.global.common.jwt.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum JwtTokenExpiration {

    ACCESS_TOKEN_EXPIRATION_TIME("ACCESS TOKEN 만료시간 : 30분", 1000L * 60 * 30),
    REFRESH_TOKEN_EXPIRATION_TIME("REFRESH TOKEN 만료시간 : 7일", 1000L * 60 * 60 * 24 * 7);

    private String description;
    private Long time;

}
