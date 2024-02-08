package com.dailymate.domain.diary.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class DiaryResDto {

    private Long diaryId;
    private String title;
    private String content;
    private String date;
    private String image;
    private String weather;
    private String feeling;
    private String openType;
    private String createdAt;
    private String updatedAt;
    private Integer likeNum;
    private Boolean isLike;


}
