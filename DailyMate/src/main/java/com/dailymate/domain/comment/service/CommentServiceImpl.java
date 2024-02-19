package com.dailymate.domain.comment.service;

import com.dailymate.domain.comment.dao.CommentRepository;
import com.dailymate.domain.comment.dao.LikeCommentRepository;
import com.dailymate.domain.comment.domain.Comment;
import com.dailymate.domain.comment.domain.LikeComment;
import com.dailymate.domain.comment.domain.LikeCommentKey;
import com.dailymate.domain.comment.dto.CommentReqDto;
import com.dailymate.domain.comment.exception.CommentBadRequestException;
import com.dailymate.domain.comment.exception.CommentExceptionMessage;
import com.dailymate.domain.comment.exception.CommentForbiddenException;
import com.dailymate.domain.comment.exception.CommentNotFoundException;
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

import java.util.Optional;

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

        Comment comment = Comment.createComment(commentReqDto, diary, user);

        commentRepository.save(comment);
    }

    /**
     * 댓글 수정
     * @param accessToken String
     * @param commentReqDto CommentReqDto
     * @param commentId Long
     */
    @Override
    @Transactional
    public void updateComment(String accessToken, CommentReqDto commentReqDto, Long commentId) {

        // 입력값 확인
        if(accessToken == null || !StringUtils.hasText(commentReqDto.getContent())) {
            throw new CommentBadRequestException("[UPDATE_COMMENT] " + CommentExceptionMessage.COMMENT_BAD_REQUEST.getMsg());
        }

        // 사용자 확인
        Users user = userRepository.findById(jwtTokenProvider.getUserId(accessToken))
                .orElseThrow(() -> new UserNotFoundException("[UPDATE_COMMENT] " + UserExceptionMessage.USER_NOT_FOUND.getMsg()));

        // 댓글 확인
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("[UPDATE_COMMENT] " + CommentExceptionMessage.COMMENT_NOT_FOUND.getMsg()));

        // 사용자와 댓글 작성자 확인
        if(user != comment.getUsers()) {
            throw new CommentForbiddenException("[UPDATE_COMMENT] " + CommentExceptionMessage.COMMENT_HANDLE_ACCESS_DENIED.getMsg());
        }

        comment.updateContent(commentReqDto.getContent());
    }

    /**
     * 댓글 삭제
     * @param accessToken String
     * @param commentId Long
     */
    @Override
    @Transactional
    public void deleteComment(String accessToken, Long commentId) {

        // 입력값 확인
        if(accessToken == null) {
            throw new CommentBadRequestException("[DELETE_COMMENT] " + CommentExceptionMessage.COMMENT_BAD_REQUEST.getMsg());
        }

        // 사용자 확인
        Users user = userRepository.findById(jwtTokenProvider.getUserId(accessToken))
                .orElseThrow(() -> new UserNotFoundException("[DELETE_COMMENT] " + UserExceptionMessage.USER_NOT_FOUND.getMsg()));

        // 댓글 확인
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("[DELETE_COMMENT] " + CommentExceptionMessage.COMMENT_NOT_FOUND.getMsg()));

        // 사용자와 댓글 작성자 확인
        if(user == comment.getUsers() || user == comment.getDiary().getUsers()) {
            // 댓글 좋아요 삭제
            likeCommentRepository.deleteAllByComment(comment);
            // 댓글 삭제
            comment.delete();
        } else {
            throw new CommentForbiddenException("[DELETE_COMMENT] " + CommentExceptionMessage.COMMENT_HANDLE_ACCESS_DENIED.getMsg());
        }

    }

    @Override
    public void likeComment(String accessToken, Long commentId) {

        // 입력값 확인
        if(accessToken == null) {
            throw new CommentBadRequestException("[LIKE_COMMENT] " + CommentExceptionMessage.COMMENT_BAD_REQUEST.getMsg());
        }

        // 사용자 확인
        Users user = userRepository.findById(jwtTokenProvider.getUserId(accessToken))
                .orElseThrow(() -> new UserNotFoundException("[LIKE_COMMENT] " + UserExceptionMessage.USER_NOT_FOUND.getMsg()));

        // 댓글 확인
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("[LIKE_COMMENT] " + CommentExceptionMessage.COMMENT_NOT_FOUND.getMsg()));

        // 복합키 생성
        LikeCommentKey key = LikeCommentKey.createKey(user.getUserId(), commentId);

        // 좋아요 토글
        Optional<LikeComment> likeComment = likeCommentRepository.findById(key);

        if(likeComment.isPresent()) {
            likeCommentRepository.delete(likeComment.get());
        } else {
            likeCommentRepository.save(LikeComment.builder()
                    .user(user)
                    .comment(comment)
                    .build());
        }
    }
}
