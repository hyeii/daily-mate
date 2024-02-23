package com.dailymate.domain.alert.constant;

import lombok.Getter;

@Getter
public enum AlertType {
    친구요청("친구요청"),
    친구승낙("친구승낙"),
    좋아요("좋아요"),
    댓글("댓글");

    private String value;

    AlertType(String value) {this.value = value;}

    public static AlertType getAlertType(String value) {
        if(value.contains("친구요청"))
            return 친구요청;

        if(value.contains("친구승낙"))
            return 친구승낙;

        if(value.contains("좋아요"))
            return 좋아요;

        return 댓글;
    }
}
