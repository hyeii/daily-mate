package com.dailymate.domain.account.constant;

import lombok.Getter;

@Getter
public enum Category {

    식비("식비"),
    카페("카페"),
    생활("생활"),
    교통("교통"),
    기타("기타");

    private String label;

    Category(String label) {
        this.label = label;
    }

    public static Category getCategory(String label) {
        if(label == null)
            return null;

        if(label.contains("식비"))
            return 식비;

        if(label.contains("카페"))
            return 카페;

        if(label.contains("생활"))
            return 생활;

        if(label.contains("교통"))
            return 교통;

        else return 기타;
    }
}
