package com.dailymate.domain.diary.constant;

import lombok.Getter;

@Getter
public enum Weather {

    맑음("맑음"),
    흐림("흐림"),
    눈("눈"),
    비("비");

    private String value;

    Weather(String value) {
        this.value = value;
    }

    public static Weather getWeather(String value) {

        if(value.contains("맑음"))
            return 맑음;

        if(value.contains("흐림"))
            return 맑음;

        if(value.contains("눈"))
            return 맑음;

        if(value.contains("비"))
            return 맑음;

        else return null;
    }
}
