package com.dailymate.domain.user.dto.response;

import com.dailymate.domain.user.domain.Users;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserSearchDto {

    private Long userId;
    private String email;
    private String nickname;
    private String image;
    private String profile;
    private String status; // 친구상태
    private String requestDate; // 친구요청일자

    public static UserSearchDto entityToDto(Users user) {
        return UserSearchDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .image(user.getImage())
                .profile(user.getProfile())
                .status(null)
                .requestDate(null)
                .build();
    }

}
