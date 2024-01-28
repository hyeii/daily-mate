package com.dailymate.global.image.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ImageExceptionMessage {

    IMAGE_BAD_REQUEST("이미지가 들어오지 않았습니다."),
    IMAGE_NOT_FOUNT("이미지 존재하지 않습니다.");

    private String msg;
}
