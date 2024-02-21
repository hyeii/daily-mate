package com.dailymate.domain.account.constant;

import lombok.Getter;

@Getter
public enum AccountCategory {
    식비("식비"),
    카페("카페"),
    생활("생활"),
    교통("교통"),
    기타("기타");

    private String value;

    AccountCategory (String value) {this.value = value;}

    public static AccountCategory getAccountCategory (String value) {
        if(value == null)
            return null;

        if(value.contains("식비"))
            return 식비;

        if(value.contains("카페"))
            return 카페;

        if(value.contains("생활"))
            return 생활;

        if(value.contains("교통"))
            return 교통;

        return 기타;
    }
}
