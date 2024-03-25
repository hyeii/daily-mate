package com.dailymate.domain.user.dto.oauth;

import java.util.Map;

public class KakaoOAuth2UserDto extends OAuth2UserDto {

    private Map<String, Object> account;
    private Map<String, Object> profile;

    public KakaoOAuth2UserDto(Map<String, Object> attributes) {
        super(attributes);

        account = (Map<String, Object>) attributes.get("kakao_account");
        profile = (Map<String, Object>) account.get("profile");
    }

    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getEmail() {
        return String.valueOf(account.get("email"));
    }

    @Override
    public String getNickname() {
        return profile == null ? null : (String) profile.get("nickname");
    }

    @Override
    public String getImage() {
        return profile == null ? null : String.valueOf(profile.get("thumbnail_image_url"));
    }
}
