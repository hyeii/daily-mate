package com.dailymate.domain.comment.dto;

import com.dailymate.domain.comment.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class CommentResDto {

    private Long commentId;
    private String nickname;
    private String content;
    private Long likeNum;
    private Boolean isLiked;
    private String createdAt;
    private String updatedAt;

    public static CommentResDto createDto(Comment comment, Long likeNum, Boolean isLiked) {
        return CommentResDto.builder()
                .commentId(comment.getCommentId())
                .nickname(comment.getUsers().getNickname())
                .content(comment.getContent())
                .likeNum(likeNum)
                .isLiked(isLiked)
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}
