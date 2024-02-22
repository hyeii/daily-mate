package com.dailymate.domain.comment.dao;

import com.dailymate.domain.comment.domain.Comment;
import com.dailymate.domain.diary.domain.Diary;
import com.dailymate.domain.user.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c, count(lc), CASE WHEN count(u) >= 1 THEN TRUE ELSE FALSE END AS isLiked FROM Comment c " +
            "LEFT JOIN Diary d ON c.diary = d " +
            "LEFT JOIN LikeComment lc ON lc.comment = c " +
            "LEFT JOIN Users u ON lc.user = u AND u = :user " +
            "WHERE d = :diary " +
            "GROUP BY c")
    List<Object[]> findCommentsAndLikesByDiaryId(@Param("diary") Diary diary, @Param("user") Users user);
}
