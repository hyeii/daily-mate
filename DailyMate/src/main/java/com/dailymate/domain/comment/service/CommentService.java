package com.dailymate.domain.comment.service;

import com.dailymate.domain.comment.dto.CommentReqDto;

public interface CommentService {

    void addComment(CommentReqDto commentReqDto, Long diaryId, Long userId);
}
