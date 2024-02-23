package com.dailymate.domain.alert.dto;

import com.dailymate.domain.alert.constant.AlertType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class AlertReqDto {
    private Long toId;
    private Long fromId;
    private String type;
    private String url;

}
