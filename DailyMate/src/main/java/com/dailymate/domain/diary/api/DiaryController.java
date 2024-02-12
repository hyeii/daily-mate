package com.dailymate.domain.diary.api;

import com.dailymate.domain.diary.dto.DiaryMonthlyResDto;
import com.dailymate.domain.diary.dto.DiaryReqDto;
import com.dailymate.domain.diary.dto.DiaryResDto;
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

    @Operation(
            summary = "일기 수정",
            description = "일기를 수정합니다."
    )
    @PatchMapping(value = "/{diaryId}")
    public ResponseEntity<MessageDto> updateDiary(
            @PathVariable Long diaryId,
            @RequestPart(value = "diaryReqDto") DiaryReqDto diaryReqDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        diaryService.updateDiary(diaryId, diaryReqDto, image);

        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("일기를 수정했습니다."));
    }

    @Operation(
            summary = "일기 삭제",
            description = "일기를 삭제합니다."
    )
    @DeleteMapping("/{diaryId}")
    public ResponseEntity<MessageDto> deleteDiary(@PathVariable Long diaryId) {
        diaryService.deleteDiary(diaryId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("일기를 삭제했습니다."));
    }

    @Operation(
            summary = "일기 좋아요",
            description = "좋아요 상태를 변경합니다."
    )
    @PostMapping("/like/{diaryId}")
    public ResponseEntity<MessageDto> likeDiary(@PathVariable Long diaryId) {
        diaryService.likeDiary(diaryId, 1l);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("좋아요 상태를 변경했습니다."));
    }

    @Operation(
            summary = "일기 조회 (일별)",
            description = "해당 날짜의 일기를 조회합니다."
    )
    @GetMapping("/date")
    public ResponseEntity<DiaryResDto> findDiary(@RequestParam("date") String date) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(diaryService.findDiary(date, 1l));
    }

    @Operation(
            summary = "일기 조회 (월별)",
            description = "당월 일기를 조회합니다."
    )
    @GetMapping("/{userId}/month")
    public ResponseEntity<DiaryMonthlyResDto[]> findDiaryByMonth(
            @PathVariable Long userId,
            @RequestParam String date) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(diaryService.findDiaryByMonth(date, userId));
    }

    @Operation(
            summary = "친구 일기 조회 (일별)",
            description = "친구의 일기를 조회합니다."
    )
    @GetMapping("/friend/{diaryId}")
    public ResponseEntity<DiaryResDto> findFriendDiary(
            @PathVariable("diaryId") Long diaryId,
            @RequestParam("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(diaryService.findFriendDiary(diaryId, userId));
    }

    @Operation(
            summary = "친구 일기 조회 (월별)",
            description = "친구의 당월 일기를 조회합니다."
    )
    @GetMapping("/friend/{userId}/month")
    public ResponseEntity<DiaryMonthlyResDto[]> findFriendDiaryByMonth(
            @PathVariable Long userId,
            @RequestParam String date) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(diaryService.findFriendDiaryByMonth(date, 1l, userId));
    }
}
