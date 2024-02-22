package com.dailymate.domain.user.dto.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

/**

 구글의 유저 정보 Response JSON

 {
 "sub": "식별값",
 "name": "name",
 "given_name": "given_name",
 "picture": "https//lh3.googleusercontent.com/~~",
 "email": "email",
 "email_verified": true,
 "locale": "ko"
 }

 */
@Getter
@AllArgsConstructor
public abstract class OAuth2UserDto {

    protected Map<String, Object> attributes;

    public abstract String getId(); // 식별값 추출(구글 - sub, 카카오 - id)

    public abstract String getEmail();
    public abstract String getNickname();
    public abstract String getImage();


}
