package com.dailymate.domain.user.constant;

import lombok.Getter;

@Getter
public enum UserType {

    ROLE_USER("USER"),
    ROLE_SOCIAL("SOCIAL"),
    ROLE_ADMIN("ADMIN");

    private String role;

    UserType(String role) {
        this.role = role;
    }

    public static UserType getUserType(String role) {
        if(role.contains("ADMIN"))
            return ROLE_ADMIN;

        if(role.contains("SOCIAL"))
            return ROLE_SOCIAL;

        return ROLE_USER;
    }


}
