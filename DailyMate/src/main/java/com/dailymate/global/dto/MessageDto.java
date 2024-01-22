package com.dailymate.global.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageDto {

    String message;

    public static MessageDto message(String msg) {
        return MessageDto.builder()
                .message(msg)
                .build();
    }

}
