package com.dailymate.domain.alert.constant;

import lombok.Getter;

@Getter
public enum AlertType {
    친구요청("친구요청"),
    친구승낙("친구승낙"),
    일기좋아요("일기좋아요"),
    댓글("댓글"),
    댓글좋아요("댓글좋아요");

    private String value;

    AlertType(String value) {this.value = value;}

    public static AlertType getAlertType(String value) {
        if(value.contains("친구요청"))
            return 친구요청;

        if(value.contains("친구승낙"))
            return 친구승낙;

        if(value.contains("일기좋아요"))
            return 일기좋아요;

        if(value.contains("댓글"))
            return 댓글;

            return 댓글좋아요;
    }

//    public static String findUrl(AlertType alertType) {
//        if(alertType.equals(AlertType.친구요청))
//            return "/friend/request/all";
//
//        if(alertType.equals(AlertType.친구승낙))
//            return "";
//
//        return "/diary/";
//    }
}
