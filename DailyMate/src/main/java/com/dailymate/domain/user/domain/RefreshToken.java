package com.dailymate.domain.user.domain;

import com.dailymate.global.common.jwt.constant.JwtTokenExpiration;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@Builder
@AllArgsConstructor
@RedisHash("refreshToken")
public class RefreshToken {

    @Id
    private String email;

    private String refreshToken;

    @TimeToLive
    private Long expiration;

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        this.expiration = JwtTokenExpiration.REFRESH_TOKEN_EXPIRATION_TIME.getTime();
    }

}
