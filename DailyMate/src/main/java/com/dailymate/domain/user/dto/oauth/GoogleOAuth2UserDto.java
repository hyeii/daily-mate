package com.dailymate.domain.user.dto.oauth;

import java.util.Map;

public class GoogleOAuth2UserDto extends OAuth2UserDto {

    public GoogleOAuth2UserDto(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return String.valueOf(attributes.get("sub"));
    }

    @Override
    public String getEmail() {
        return String.valueOf(attributes.get("email"));
    }

    @Override
    public String getNickname() {
        return (String) attributes.get("name");
    }

    @Override
    public String getImage() {
        return (String) attributes.get("picture");
    }

}
