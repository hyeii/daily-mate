package com.dailymate.domain.diary.dao;

import com.dailymate.domain.diary.domain.LikeDiary;
import com.dailymate.domain.diary.domain.LikeDiaryKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeDiaryRepository extends JpaRepository<LikeDiary, LikeDiaryKey> {
}
