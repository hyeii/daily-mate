package com.dailymate.domain.comment.api;

import com.dailymate.domain.comment.dto.CommentReqDto;
import com.dailymate.domain.comment.service.CommentService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Comment", description = "댓글 API Document")
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
@Slf4j
public class CommentController {

    private final String ACCESS_TOKEN = "authorization";
    private final CommentService commentService;

    @Operation(
            summary = "댓글 등록",
            description = "댓글을 등록합니다."
    )
    @PostMapping("/{diaryId}")
    public ResponseEntity<MessageDto> addComment(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @PathVariable Long diaryId,
            @RequestBody CommentReqDto commentReqDto) {

        commentService.addComment(accessToken, commentReqDto, diaryId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("댓글을 작성했습니다."));
    }

    @Operation(
            summary = "댓글 수정",
            description = "댓글을 수정합니다."
    )
    @PutMapping("/{commentId}")
    public ResponseEntity<MessageDto> updateComment(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @RequestBody CommentReqDto commentReqDto,
            @PathVariable Long commentId) {

        commentService.updateComment(accessToken, commentReqDto, commentId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("댓글을 수정했습니다."));
    }

    @Operation(
            summary = "댓글 삭제",
            description = "댓글을 삭제합니다."
    )
    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageDto> deleteComment(
            @RequestHeader(ACCESS_TOKEN) String accessToken,
            @PathVariable Long commentId) {

        commentService.deleteComment(accessToken, commentId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(MessageDto.message("댓글을 삭제했습니다."));
    }
}
