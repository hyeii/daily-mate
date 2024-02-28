package com.dailymate.domain.alert.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AlertResDto {
    private Long alertId;
    private Long toId;
    private Long fromId;
    private String content;
    private String type;
    private String url;

}
