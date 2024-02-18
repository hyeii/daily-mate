package com.dailymate.domain.comment.service;

import com.dailymate.domain.comment.dto.CommentReqDto;

public interface CommentService {
    void addComment(String accessToken, CommentReqDto commentReqDto, Long diaryId);
    void updateComment(String accessToken, CommentReqDto commentReqDto, Long commentId);
    void deleteComment(String accessToken, Long commentId);
    void likeComment(String accessToken, Long commentId);
}
