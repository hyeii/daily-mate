package com.dailymate.domain.comment.dao;

import com.dailymate.domain.comment.domain.LikeComment;
import com.dailymate.domain.comment.domain.LikeCommentKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeCommentRepository extends JpaRepository<LikeComment, LikeCommentKey> {
}
