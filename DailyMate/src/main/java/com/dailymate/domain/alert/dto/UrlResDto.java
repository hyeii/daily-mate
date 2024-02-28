package com.dailymate.domain.alert.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UrlResDto {
    private String url;

    public UrlResDto(String url) {
        this.url = url;
    }

}
