package com.dailymate.domain.user.domain;

import com.dailymate.domain.user.constant.UserType;
import com.dailymate.global.common.BaseTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Users extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    private String email;

    private String password;

    private String nickname;

    private String image;

    private String profile;

    @Enumerated(EnumType.STRING)
    private UserType type;

    private String providerId;

    @Builder
    public Users(String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.type = UserType.getUserType(role);
    }

}
