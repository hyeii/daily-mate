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

    private final String ACCESS_TOKEN = "authorization";
    private final DiaryService diaryService;

    @Operation(
            summary = "일기 등록",
            description = "일기를 등록합니다."
    )
    @PostMapping(consumes = {"multipart/form-data"}, produces = {"application/json"})
    public ResponseEntity<MessageDto> addDiary(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @RequestPart(value = "diaryReqDto") DiaryReqDto diaryReqDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        diaryService.addDiary(accessToken, diaryReqDto, image);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("일기를 등록했습니다."));
    }

    @Operation(
            summary = "일기 수정",
            description = "일기를 수정합니다."
    )
    @PatchMapping(value = "/{diaryId}")
    public ResponseEntity<MessageDto> updateDiary(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @PathVariable Long diaryId,
            @RequestPart(value = "diaryReqDto") DiaryReqDto diaryReqDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        diaryService.updateDiary(accessToken, diaryId, diaryReqDto, image);

        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("일기를 수정했습니다."));
    }

    @Operation(
            summary = "일기 삭제",
            description = "일기를 삭제합니다."
    )
    @DeleteMapping("/{diaryId}")
    public ResponseEntity<MessageDto> deleteDiary(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @PathVariable Long diaryId) {
        diaryService.deleteDiary(accessToken, diaryId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("일기를 삭제했습니다."));
    }

    @Operation(
            summary = "일기 좋아요",
            description = "좋아요 상태를 변경합니다."
    )
    @PostMapping("/like/{diaryId}")
    public ResponseEntity<MessageDto> likeDiary(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @PathVariable Long diaryId) {
        diaryService.likeDiary(accessToken, diaryId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("좋아요 상태를 변경했습니다."));
    }

    @Operation(
            summary = "일기 조회 (일별)",
            description = "해당 날짜의 일기를 조회합니다."
    )
    @GetMapping("/date")
    public ResponseEntity<DiaryResDto> findDiary(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @RequestParam("date") String date) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(diaryService.findDiary(accessToken, date));
    }

    @Operation(
            summary = "일기 조회 (월별)",
            description = "당월 일기를 조회합니다."
    )
    @GetMapping("/month")
    public ResponseEntity<DiaryMonthlyResDto[]> findDiaryByMonth(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @RequestParam String date) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(diaryService.findDiaryByMonth(accessToken, date));
    }

    @Operation(
            summary = "친구 일기 조회 (일별)",
            description = "친구의 일기를 조회합니다."
    )
    @GetMapping("/friend/{diaryId}")
    public ResponseEntity<DiaryResDto> findFriendDiary(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @PathVariable("diaryId") Long diaryId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(diaryService.findFriendDiary(accessToken, diaryId));
    }

    @Operation(
            summary = "친구 일기 조회 (월별)",
            description = "친구의 당월 일기를 조회합니다."
    )
    @GetMapping("/friend/{userId}/month")
    public ResponseEntity<DiaryMonthlyResDto[]> findFriendDiaryByMonth(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @PathVariable Long userId,
            @RequestParam String date) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(diaryService.findFriendDiaryByMonth(accessToken, date, userId));
    }
}
