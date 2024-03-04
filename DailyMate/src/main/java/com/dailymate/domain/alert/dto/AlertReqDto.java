package com.dailymate.domain.alert.dto;

import com.dailymate.domain.alert.constant.AlertType;
import lombok.Getter;

@Getter
public class AlertReqDto {

    private Long toId;
    private Long fromId;
    private Long diaryId;
    private String type;
    private String url;
    
    public AlertReqDto(Long toId, Long fromId, Long diaryId, String type) {
        this.toId = toId;
        this.fromId = fromId;
        this.diaryId = diaryId;
        this.type = type;
        this.url = findUrl(type);

        if(diaryId != null) {
            url += diaryId;
        }
    }

    private String findUrl(String type) {
        if(type.equals(AlertType.친구요청.getValue()))
            return "/friend/request/all";

        if(type.equals(AlertType.친구승낙.getValue()))
            return "/friend/all";

        if (type.equals(AlertType.일기좋아요.getValue()))
            return "/diary/"; // 다여리Id 추가

        return "/comment/"; // 다여리Id 추가
    }

}
