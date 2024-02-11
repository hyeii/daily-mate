package com.dailymate.global.common.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class JwtTokenDto {

    private String grantType; // JWT 인증 타입 - "Bearer " 인증방식 사용 --> accessToken을 HTTP요청의 Authorization 헤더에 포함하여 전송
    private String accessToken;
    private String refreshToken;

}
