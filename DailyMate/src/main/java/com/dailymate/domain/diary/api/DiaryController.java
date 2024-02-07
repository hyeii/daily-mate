package com.dailymate.domain.diary.api;

import com.dailymate.domain.diary.dto.DiaryReqDto;
import com.dailymate.domain.diary.service.DiaryService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Diary", description = "일기 API Document")
@RestController
@RequiredArgsConstructor
@RequestMapping("/diary")
@Slf4j
public class DiaryController {

    private final DiaryService diaryService;

    @Operation(
            summary = "일기 등록",
            description = "일기를 등록합니다."
    )
    @PostMapping(consumes = {"multipart/form-data"}, produces = {"application/json"})
    public ResponseEntity<MessageDto> addDiary(
            @RequestPart(value = "diaryReqDto") DiaryReqDto diaryReqDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        diaryService.addDiary(diaryReqDto, image);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("일기를 등록했습니다."));
    }

    @PatchMapping(value = "/{diaryId}")
    public ResponseEntity<MessageDto> updateDiary(
            @PathVariable Long diaryId,
            @RequestPart(value = "diaryReqDto") DiaryReqDto diaryReqDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        diaryService.updateDiary(diaryId, diaryReqDto, image);

        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("일기를 수정했습니다."));
    }

    @DeleteMapping("/{diaryId}")
    public ResponseEntity<MessageDto> deleteDiary(@PathVariable Long diaryId) {
        diaryService.deleteDiary(diaryId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("일기를 삭제했습니다."));
    }
}
