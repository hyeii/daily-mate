package com.dailymate.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FriendInfoDto {

    private Long fromId;
    private String requestDate;

    private String email;
    private String nickname;
    private String image;
    private String profile;

}
