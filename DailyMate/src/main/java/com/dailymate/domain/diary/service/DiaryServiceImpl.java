package com.dailymate.domain.diary.service;

import com.dailymate.domain.diary.constant.Feeling;
import com.dailymate.domain.diary.constant.OpenType;
import com.dailymate.domain.diary.constant.Weather;
import com.dailymate.domain.diary.dao.DiaryRepository;
import com.dailymate.domain.diary.domain.Diary;
import com.dailymate.domain.diary.dto.DiaryReqDto;
import com.dailymate.domain.diary.exception.DiaryBadRequestException;
import com.dailymate.domain.diary.exception.DiaryExceptionMessage;
import com.dailymate.domain.diary.exception.DiaryForbiddenException;
import com.dailymate.domain.diary.exception.DiaryNotFoundException;
import com.dailymate.global.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final ImageService imageService;

    /**
     * 일기 작성
     * @param diaryReqDto DiaryReqDto
     * @param image MultipartFile
     */
    @Override
    @Transactional
    public void addDiary(DiaryReqDto diaryReqDto, MultipartFile image) {

        // 제목 입력값 검증
        if(!StringUtils.hasText(diaryReqDto.getTitle())) {
            throw new DiaryBadRequestException("[ADD_DIARY] " + DiaryExceptionMessage.DIARY_BAD_REQUEST.getMsg());
        }

        // 사용자 존재하는지 확인(!!!)

        // 해당 날짜에 일기가 존재하는지 확인(!!!)
        if(diaryRepository.existsDiaryByDateAndUserId(diaryReqDto.getDate(), diaryReqDto.getUserId())) {
            throw new DiaryBadRequestException("[ADD_DIARY] " + DiaryExceptionMessage.DIARY_ALREADY_EXIST.getMsg());
        }

        Diary diary = Diary.createDiary(diaryReqDto);

        // 이미지 등록
        if(image != null && !image.isEmpty()) {
            String imageUrl = imageService.uploadImage(image);
            diary.updateImage(imageUrl);
        }

        diaryRepository.save(diary);
    }

    /**
     * 일기 수정
     * @param diaryReqDto DiaryReqDto
     * @param image MultipartFile
     */
    @Override
    @Transactional
    public void updateDiary(Long diaryId, DiaryReqDto diaryReqDto, MultipartFile image) {

        // 일기 존재하는 지 확인
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> {
                    throw new DiaryNotFoundException("[UPDATE_DIARY] " + DiaryExceptionMessage.DIARY_NOT_FOUND.getMsg());
                });

        // 이미 삭제된 일기인지 확인
        if(diary.getDeletedAt() != null) {
            throw new DiaryNotFoundException("[UPDATE_DIARY] " + DiaryExceptionMessage.DIARY_ALREADY_DELETED.getMsg());
        }

        // 일기 작성자와 같은지 확인(!!!)
        if(diary.getUserId() != diaryReqDto.getUserId()) {
            throw new DiaryForbiddenException("[UPDATE_DIARY] " + DiaryExceptionMessage.DIARY_HANDLE_ACCESS_DENIED.getMsg());
        }

        // 해당 날짜에 일기가 존재하는지 확인(!!!)
        if(diaryRepository.existsDiaryByDateAndUserId(diaryReqDto.getDate(), diaryReqDto.getUserId())) {
            throw new DiaryBadRequestException("[UPDATE_DIARY] " + DiaryExceptionMessage.DIARY_ALREADY_EXIST.getMsg());
        }

        // 일기 제목 입력값 확인
        if(!StringUtils.hasText(diaryReqDto.getTitle())) {
            throw new DiaryBadRequestException("[UPDATE_DIARY] " + DiaryExceptionMessage.DIARY_BAD_REQUEST.getMsg());
        }

        // 일기 수정
        diary.updateDiary(diaryReqDto.getTitle(),
                diaryReqDto.getContent(),
                diaryReqDto.getDate(),
                Weather.getWeather(diaryReqDto.getWeather()),
                Feeling.getFeeling(diaryReqDto.getFeeling()),
                OpenType.getOpenType(diaryReqDto.getOpenType()));

        // 이미지 입력값 확인
        if(image != null && !image.isEmpty()) {

            // 기존 이미지가 존재한다면 삭제
            if(diary.getImage() != null) {
                imageService.deleteImage(diary.getImage());
            }

            // 새로운 이미지 등록
            String imageUrl = imageService.uploadImage(image);
            diary.updateImage(imageUrl);
        }

    }

    /**
     * 일기 삭제
     * @param diaryId Long
     */
    @Override
    @Transactional
    public void deleteDiary(Long diaryId) {

        // 일기 존재하는 지 확인
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> {
                    throw new DiaryNotFoundException("[DELETE_DIARY] " + DiaryExceptionMessage.DIARY_NOT_FOUND.getMsg());
                });

        // 이미 삭제된 일기인지 확인
        if(diary.getDeletedAt() != null) {
            throw new DiaryNotFoundException("[DELETE_DIARY] " + DiaryExceptionMessage.DIARY_ALREADY_DELETED.getMsg());
        }

        // 일기 작성자와 같은지 확인(!!!)

        // 이미지가 존재한다면 삭제
        if(diary.getImage() != null) {
            imageService.deleteImage(diary.getImage());
        }

        diary.delete();
    }
}
