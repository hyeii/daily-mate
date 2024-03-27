package com.dailymate.domain.diary.dao;

import com.dailymate.domain.diary.domain.Diary;
import com.dailymate.domain.diary.domain.LikeDiary;
import com.dailymate.domain.diary.domain.LikeDiaryKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeDiaryRepository extends JpaRepository<LikeDiary, LikeDiaryKey> {
    void deleteAllByDiary(Diary diary);
    @Query("SELECT COUNT(ld) FROM LikeDiary ld WHERE ld.diary.diaryId = :diaryId")
    Long countLikesByDiaryId(@Param("diaryId") Long diaryId);
}
