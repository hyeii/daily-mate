package com.dailymate.domain.user.dto.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
public abstract class OAuth2UserDto {

    protected Map<String, Object> attributes;

    public abstract String getEmail();
    public abstract String getNickname();
    public abstract String getImage();


}
