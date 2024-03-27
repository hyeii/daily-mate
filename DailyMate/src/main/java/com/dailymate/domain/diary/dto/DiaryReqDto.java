package com.dailymate.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
public class DiaryReqDto {

    private String title;
    private String content;
    private String date;
    private String weather;
    private String feeling;
    private String openType;

}
