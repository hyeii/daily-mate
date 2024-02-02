package com.dailymate.domain.diary.service;

import com.dailymate.domain.diary.constant.Feeling;
import com.dailymate.domain.diary.constant.OpenType;
import com.dailymate.domain.diary.constant.Weather;
import com.dailymate.domain.diary.dao.DiaryRepository;
import com.dailymate.domain.diary.domain.Diary;
import com.dailymate.domain.diary.dto.DiaryReqDto;
import com.dailymate.domain.diary.exception.DiaryBadRequestException;
import com.dailymate.domain.diary.exception.DiaryExceptionMessage;
import com.dailymate.global.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final ImageService imageService;
    @Override
    public void addDiary(DiaryReqDto diaryReqDto, MultipartFile image) {

        // 제목 입력값 검증
        if(!StringUtils.hasText(diaryReqDto.getTitle())) {
            throw new DiaryBadRequestException("[ADD_DIARY] " + DiaryExceptionMessage.DIARY_BAD_REQUEST.getMsg());
        }

        Diary diary = Diary.createDiary(diaryReqDto);

        // 이미지 등록
        if(image != null && !image.isEmpty()) {
            String imageUrl = imageService.uploadImage(image);
            diary.updateImage(imageUrl);
        }

        diaryRepository.save(diary);
    }
}
