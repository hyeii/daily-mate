package com.dailymate.domain.diary.domain;

import com.dailymate.domain.diary.constant.Feeling;
import com.dailymate.domain.diary.constant.OpenType;
import com.dailymate.domain.diary.constant.Weather;
import com.dailymate.domain.diary.dto.DiaryReqDto;
import com.dailymate.global.common.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Diary")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Where(clause = "deleted_at = null")
public class Diary extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @NotNull
    @Column
    private Long userId;

    @NotNull
    @Column
    private String title;

    @Column
    private String content;

    @Column
    private String date;

    @Column
    private String image;

    @Enumerated(EnumType.STRING)
    private Weather weather;

    @Enumerated(EnumType.STRING)
    private Feeling feeling;

    @Enumerated(EnumType.STRING)
    private OpenType openType;

    public static Diary createDiary(DiaryReqDto diaryReqDto) {
        return Diary.builder()
                .userId(1l)
                .title(diaryReqDto.getTitle())
                .content(diaryReqDto.getContent())
                .date(diaryReqDto.getDate())
                .weather(Weather.getWeather(diaryReqDto.getWeather()))
                .feeling(Feeling.getFeeling(diaryReqDto.getFeeling()))
                .openType(OpenType.getOpenType(diaryReqDto.getOpenType()))
                .build();
    }

    public void updateImage(String image){
        this.image = image;
    }

}
