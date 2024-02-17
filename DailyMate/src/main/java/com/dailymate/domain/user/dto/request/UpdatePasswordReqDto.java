package com.dailymate.domain.user.dto.request;

import lombok.Getter;

@Getter
public class UpdatePasswordReqDto {

    private String password;
    private String newPassword;
    private String newPasswordCheck;

}
