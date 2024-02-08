package com.dailymate.domain.diary.constant;

import lombok.Getter;

@Getter
public enum Feeling {

    행복("행복"),
    분노("분노"),
    슬픔("슬픔"),
    사랑("사랑"),
    우울("우울"),
    무난("무난");

    private String value;

    Feeling(String value) {
        this.value = value;
    }

    public static Feeling getFeeling(String value) {

        if(value.contains("행복"))
            return 행복;

        if(value.contains("분노"))
            return 분노;

        if(value.contains("슬픔"))
            return 슬픔;

        if(value.contains("사랑"))
            return 사랑;

        if(value.contains("우울"))
            return 우울;

        if(value.contains("무난"))
            return 무난;

        else return null;
    }
}
