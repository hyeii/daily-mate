package com.dailymate.global.image.exception;

import com.dailymate.global.exception.exception.NotFoundException;

public class ImageNotFoundException extends NotFoundException {

    public ImageNotFoundException() {
        super("IMAGE_NOT_FOUND_EXCEPTION_발생");
    }

    public ImageNotFoundException(String msg){
        super(msg);
    }
}
