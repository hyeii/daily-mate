package com.dailymate.domain.account.constant;

import lombok.Getter;

@Getter
public enum AccountType {

    수입("수입"),
    지출("지출");

    private String value;

    AccountType(String value) {
        this.value = value;
    }

    public static AccountType getType(Integer amount) {
        if(amount < 0)
            return 지출;

        if(amount > 0)
            return 수입;

        else return null;
    }

}
