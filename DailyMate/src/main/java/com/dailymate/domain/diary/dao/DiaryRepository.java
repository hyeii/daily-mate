package com.dailymate.domain.diary.dao;

import com.dailymate.domain.diary.domain.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    boolean existsDiaryByDateAndUserId(String date, Long userId);
}
