package com.dailymate.domain.user.dto.response;

import com.dailymate.domain.user.domain.Users;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserAllInfoDto {

    private Long userId;
    private String email;
    private String nickname;
    private String image;
    private String profile;
    private String type;
    private String createdAt;

    public static UserAllInfoDto entityToDto(Users user) {
        if(user == null)
            return null;

        return UserAllInfoDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .image(user.getImage())
                .profile(user.getProfile())
                .type(user.getType().getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }

}
