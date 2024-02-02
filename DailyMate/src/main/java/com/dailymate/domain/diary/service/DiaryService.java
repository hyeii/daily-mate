package com.dailymate.domain.diary.service;

import com.dailymate.domain.diary.dto.DiaryReqDto;
import org.springframework.web.multipart.MultipartFile;

public interface DiaryService {

    void addDiary(DiaryReqDto diaryReqDto, MultipartFile image);
}
