package com.dailymate.domain.user.constant;

import lombok.Getter;

@Getter
public enum UserType {

    ROLE_USER("일반"),
    ROLE_SOCIAL("소셜"),
    ROLE_ADMIN("관리자");

    private String role;

    UserType(String role) {
        this.role = role;
    }

    public static UserType getUserType(String role) {
        if(role.contains("관리자"))
            return ROLE_ADMIN;

        if(role.contains("소셜"))
            return ROLE_SOCIAL;

        return ROLE_USER;
    }


}
