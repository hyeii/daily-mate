package com.dailymate.domain.comment.dao;

import com.dailymate.domain.comment.domain.Comment;
import com.dailymate.domain.comment.domain.LikeComment;
import com.dailymate.domain.comment.domain.LikeCommentKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeCommentRepository extends JpaRepository<LikeComment, LikeCommentKey> {
    void deleteAllByComment(Comment comment);
    @Query("SELECT COUNT(lc) FROM LikeComment lc WHERE lc.comment.commentId = :commentId")
    Long countLikesByCommentId(@Param("commentId") Long commentId);
}
