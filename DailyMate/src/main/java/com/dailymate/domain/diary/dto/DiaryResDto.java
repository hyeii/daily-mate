package com.dailymate.domain.diary.dto;

import com.dailymate.domain.diary.constant.Weather;
import com.dailymate.domain.diary.domain.Diary;
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
    private Long likeNum;
    private Boolean isLike;

    public static DiaryResDto createDto(Diary diary, Long likeNum, Boolean isLike) {
        return DiaryResDto.builder()
                .diaryId(diary.getDiaryId())
                .title(diary.getTitle())
                .content(diary.getContent())
                .date(diary.getDate())
                .image(diary.getImage())
                .weather(diary.getWeather().getValue())
                .feeling(diary.getFeeling().getValue())
                .openType(diary.getOpenType().getValue())
                .createdAt(diary.getCreatedAt())
                .updatedAt(diary.getUpdatedAt())
                .likeNum(likeNum)
                .isLike(isLike)
                .build();
    }
}
