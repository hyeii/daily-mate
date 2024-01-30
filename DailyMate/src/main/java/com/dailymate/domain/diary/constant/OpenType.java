package com.dailymate.domain.diary.constant;

import lombok.Getter;

@Getter
public enum OpenType {

    공개("공개"),
    비공개("비공개"),
    친구공개("친구공개");

    private String value;

    OpenType(String value) {
        this.value = value;
    }

    public static OpenType getOpenType(String value) {

        if(value.contains("비공개")) return 비공개;
        if(value.contains("친구공개")) return 친구공개;
        else return 공개;
    }
}
