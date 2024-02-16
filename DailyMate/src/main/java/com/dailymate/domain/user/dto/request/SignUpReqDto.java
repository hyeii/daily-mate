package com.dailymate.domain.user.dto.request;

import com.dailymate.domain.user.constant.UserType;
import com.dailymate.domain.user.domain.Users;
import lombok.Data;

@Data // dto는 setter를 자유롭게 사용하여도 괜찮음 - 비밀번호 인코딩을 위해 setter 필요
public class SignUpReqDto { 

    private String email;
    private String password;
    private String nickname;

    public Users dtoToEntity() {
        return Users.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .type(UserType.ROLE_USER.getRole()) // 체크필요
                .build();
    }

}
