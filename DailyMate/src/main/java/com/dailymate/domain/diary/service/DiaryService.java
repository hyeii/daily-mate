package com.dailymate.domain.diary.service;

import com.dailymate.domain.diary.dto.DiaryMonthlyResDto;
import com.dailymate.domain.diary.dto.DiaryReqDto;
import com.dailymate.domain.diary.dto.DiaryResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DiaryService {

    void addDiary(DiaryReqDto diaryReqDto, MultipartFile image);
    void updateDiary(Long diaryId, DiaryReqDto diaryReqDto, MultipartFile image);
    void deleteDiary(Long diaryId);
    void likeDiary(Long diaryId, Long userId);
    DiaryResDto findDiary(String date, Long userId);
    DiaryMonthlyResDto[] findDiaryByMonth(String date, Long userId);
    DiaryResDto findFriendDiary(Long diaryId, Long userId);
}
