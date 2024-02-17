package com.dailymate.domain.diary.service;

import com.dailymate.domain.diary.dto.DiaryMonthlyResDto;
import com.dailymate.domain.diary.dto.DiaryReqDto;
import com.dailymate.domain.diary.dto.DiaryResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DiaryService {

    void addDiary(String accessToken, DiaryReqDto diaryReqDto, MultipartFile image);
    void updateDiary(String accessToken, Long diaryId, DiaryReqDto diaryReqDto, MultipartFile image);
    void deleteDiary(String accessToken, Long diaryId);
    void likeDiary(String accessToken, Long diaryId);
    DiaryResDto findDiary(String accessToken, String date);
    DiaryMonthlyResDto[] findDiaryByMonth(String accessToken, String date);
    DiaryResDto findFriendDiary(String accessToken, Long diaryId);
    DiaryMonthlyResDto[] findFriendDiaryByMonth(String accessToken, String date, Long friendId);
}
