package com.dailymate.global.image.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ImageExceptionMessage {

    IMAGE_BAD_REQUEST("등록할 이미지가 존재하지 않습니다."),
    IMAGE_URL_BAD_REQUEST("삭제할 이미지 URL이 존재하지 않습니다."),
    IMAGE_FILE_IO_ERROR("이미지 읽기에 실패했습니다."),
    AMAZON_S3_SERVICE_UPLOAD_ERROR("S3 서버 에러로 인해 실패했습니다."),
    AMAZON_S3_CLIENT_UPLOAD_ERROR("S3 클라이언트 에러로 인해 실패했습니다.")
    ;

    private String msg;
}
