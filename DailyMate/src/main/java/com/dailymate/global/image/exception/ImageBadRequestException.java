package com.dailymate.global.image.exception;

import com.dailymate.global.exception.exception.BadRequestException;

public class ImageBadRequestException extends BadRequestException {
    public ImageBadRequestException() {
        super("IMAGE_Bad_Request_Exception_발생");
    }

    public ImageBadRequestException(String msg){
        super(msg);
    }
}
