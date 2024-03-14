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
import javax.validation.constraints.NotNull;

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

    @NotNull
    private String nickname;

    private String image;

    private String profile;

    @Enumerated(EnumType.STRING)
    private UserType type;

    private String providerId; // 소셜 타입의 식별자값(일반 로그인일 경우 null)

    @Builder
    public Users(String email, String password, String nickname, String type, String image, String providerId) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.type = UserType.getUserType(type);
        this.image = image;
        this.providerId = providerId;
    }

    public void updateUser(String nickname, String profile) {
        this.nickname = nickname == null ? this.nickname : nickname;
        this.profile = profile == null ? this.profile : profile;
    }

    public void updateImage(String image) {
        if(image != null && !image.startsWith("http"))
            image = "https://dailymate.s3.ap-northeast-2.amazonaws.com/" + image;

        this.image = image;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

}
