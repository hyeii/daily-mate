package com.dailymate.domain.user.dto.oauth;

import com.dailymate.domain.user.constant.UserType;
import com.dailymate.domain.user.domain.Users;
import lombok.*;

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

 카카오의 유저 정보 Response JSON

 {
 "id":123456789,
 "connected_at": "2022-04-11T01:45:28Z",
 "kakao_account": {
 // 프로필 또는 닉네임 동의 항목 필요
 "profile_nickname_needs_agreement": false,
 // 프로필 또는 프로필 사진 동의 항목 필요
 "profile_image_needs_agreement	": false,
 "profile": {
 // 프로필 또는 닉네임 동의 항목 필요
 "nickname": "홍길동",
 // 프로필 또는 프로필 사진 동의 항목 필요
 "thumbnail_image_url": "http://yyy.kakao.com/.../img_110x110.jpg",
 "profile_image_url": "http://yyy.kakao.com/dn/.../img_640x640.jpg",
 "is_default_image":false
 },
 // 이름 동의 항목 필요
 "name_needs_agreement":false,
 "name":"홍길동",
 // 카카오계정(이메일) 동의 항목 필요
 "email_needs_agreement":false,
 "is_email_valid": true,
 "is_email_verified": true,
 "email": "sample@sample.com",
 // 연령대 동의 항목 필요
 "age_range_needs_agreement":false,
 "age_range":"20~29",
 // 출생 연도 동의 항목 필요
 "birthyear_needs_agreement": false,
 "birthyear": "2002",
 // 생일 동의 항목 필요
 "birthday_needs_agreement":false,
 "birthday":"1130",
 "birthday_type":"SOLAR",
 // 성별 동의 항목 필요
 "gender_needs_agreement":false,
 "gender":"female",
 // 카카오계정(전화번호) 동의 항목 필요
 "phone_number_needs_agreement": false,
 "phone_number": "+82 010-1234-5678",
 // CI(연계정보) 동의 항목 필요
 "ci_needs_agreement": false,
 "ci": "${CI}",
 "ci_authenticated_at": "2019-03-11T11:25:22Z",
 },
 "properties":{
 "${CUSTOM_PROPERTY_KEY}": "${CUSTOM_PROPERTY_VALUE}",
 ...
 }
 }


 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OAuthAttributes {

    private static final String GOOGLE = "google";
    private static final String KAKAO = "kakao";

    private String nameAttributeKey;
    private OAuth2UserDto oAuth2UserDto;

    public static OAuthAttributes of(String providerId, String nameAttributeKey, Map<String, Object> attributes) {
        switch (providerId) {
            case GOOGLE:
                return ofGoogle(nameAttributeKey, attributes);
            case KAKAO:
                return ofKakao(nameAttributeKey, attributes);
            default:
                throw new RuntimeException();
        }
    }

    private static OAuthAttributes ofGoogle(String nameAttributeKey, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(nameAttributeKey)
                .oAuth2UserDto(new GoogleOAuth2UserDto(attributes))
                .build();
    }

    private static OAuthAttributes ofKakao(String nameAttributeKey, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(nameAttributeKey)
                .oAuth2UserDto(new KakaoOAuth2UserDto(attributes))
                .build();
    }

    public Users toEntity(OAuth2UserDto oAuth2UserDto, String providerId) {
        return Users.builder()
                .email(oAuth2UserDto.getEmail())
                .nickname(oAuth2UserDto.getNickname())
                .image(oAuth2UserDto.getImage())
                .type(UserType.ROLE_SOCIAL.getRole())
                .providerId(providerId)
                .build();
    }

    public Users toEntityWithNewNickname(OAuth2UserDto oAuth2UserDto, String providerId, String nickname) {
        return Users.builder()
                .email(oAuth2UserDto.getEmail())
                .nickname(nickname)
                .image(oAuth2UserDto.getImage())
                .type(UserType.ROLE_SOCIAL.getRole())
                .providerId(providerId)
                .build();
    }
}
