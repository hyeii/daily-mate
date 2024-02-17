package com.dailymate.domain.comment.service;

import com.dailymate.domain.comment.dao.CommentRepository;
import com.dailymate.domain.comment.dao.LikeCommentRepository;
import com.dailymate.domain.comment.domain.Comment;
import com.dailymate.domain.comment.dto.CommentReqDto;
import com.dailymate.domain.comment.exception.CommentBadRequestException;
import com.dailymate.domain.comment.exception.CommentExceptionMessage;
import com.dailymate.domain.diary.dao.DiaryRepository;
import com.dailymate.domain.diary.domain.Diary;
import com.dailymate.domain.diary.exception.DiaryExceptionMessage;
import com.dailymate.domain.diary.exception.DiaryNotFoundException;
import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.domain.Users;
import com.dailymate.domain.user.exception.UserExceptionMessage;
import com.dailymate.domain.user.exception.UserNotFoundException;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final DiaryRepository diaryRepository;
    private final LikeCommentRepository likeCommentRepository;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 댓글 작성
     * @param accessToken String
     * @param commentReqDto CommentReqDto
     * @param diaryId Long
     */
    @Override
    @Transactional
    public void addComment(String accessToken, CommentReqDto commentReqDto, Long diaryId) {

        // 입력값 검증
        if(!StringUtils.hasText(commentReqDto.getContent())) {
            throw new CommentBadRequestException("[ADD_COMMENT] " + CommentExceptionMessage.COMMENT_BAD_REQUEST.getMsg());
        }

        // 사용자 확인
        Users user = userRepository.findById(jwtTokenProvider.getUserId(accessToken))
                .orElseThrow(() -> new UserNotFoundException("[ADD_COMMENT] " + UserExceptionMessage.USER_NOT_FOUND.getMsg()));

        // 일기 확인
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new DiaryNotFoundException("[ADD_COMMENT] " + DiaryExceptionMessage.DIARY_NOT_FOUND.getMsg()));

        // 공개여부 및 친구여부 확인(???)

        Comment comment = Comment.createComment(commentReqDto, diary, user);

        commentRepository.save(comment);
    }
}
