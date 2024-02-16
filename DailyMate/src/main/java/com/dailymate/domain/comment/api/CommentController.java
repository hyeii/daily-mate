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

    private final CommentService commentService;

    @Operation(
            summary = "댓글 등록",
            description = "댓글을 등록합니다."
    )
    @PostMapping("/{diaryId}")
    public ResponseEntity<MessageDto> addComment(
            @PathVariable Long diaryId,
            @RequestBody CommentReqDto commentReqDto) {

        // userId (!!!)
        commentService.addComment(commentReqDto, diaryId, 1l);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("댓글을 작성했습니다."));
    }
}
