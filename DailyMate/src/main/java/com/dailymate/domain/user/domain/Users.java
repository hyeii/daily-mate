package com.dailymate.domain.user.domain;

import com.dailymate.domain.user.constant.UserType;
import com.dailymate.global.common.BaseTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Where(clause = "deleted_at is null")
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
    public Users(String email, String password, String nickname, String type) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.type = UserType.getUserType(type);
    }

    public void updateUser(String nickname, String profile) {
        this.nickname = nickname == null ? this.nickname : nickname;
        this.profile = profile == null ? this.profile : profile;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

}
