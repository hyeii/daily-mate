package com.dailymate.domain.diary.dto;

import com.dailymate.domain.diary.constant.Feeling;
import com.dailymate.domain.diary.constant.Weather;
import com.dailymate.domain.diary.domain.Diary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@Builder
@RequiredArgsConstructor
public class DiaryMonthlyResDto {

        private Long diaryId;
        private String title;
        private String image;
        private Weather weather;
        private Feeling feeling;
        private String date;

        public DiaryMonthlyResDto(Long diaryId, String title, String image, Weather weather, Feeling feeling, String date) {
                this.diaryId = diaryId;
                this.title = title;
                this.image = image;
                this.weather = weather;
                this.feeling = feeling;
                this.date = date;
        }

}
