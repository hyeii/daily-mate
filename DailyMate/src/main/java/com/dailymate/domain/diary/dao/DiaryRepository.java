package com.dailymate.domain.diary.dao;

import com.dailymate.domain.diary.constant.OpenType;
import com.dailymate.domain.diary.domain.Diary;
import com.dailymate.domain.diary.dto.DiaryMonthlyResDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    boolean existsDiaryByDateAndUserId(String date, Long userId);
    Diary findDiaryByDateAndUserId(String date, Long userId);
    @Query("SELECT NEW com.dailymate.domain.diary.dto.DiaryMonthlyResDto(d.diaryId, d.title, d.image, d.weather, d.feeling, d.date) " +
            "FROM Diary d " +
            "WHERE d.userId = :userId " +
            "AND SUBSTRING(d.date, 1, 7) = :date")
    List<DiaryMonthlyResDto> findByUserIdAndYearMonth(Long userId, String date);

    @Query("SELECT NEW com.dailymate.domain.diary.dto.DiaryMonthlyResDto(d.diaryId, d.title, d.image, d.weather, d.feeling, d.date) " +
            "FROM Diary d " +
            "WHERE d.userId = :userId " +
            "AND SUBSTRING(d.date, 1, 7) = :date " +
            "AND d.openType = :openType")
    List<DiaryMonthlyResDto> findByUserIdAndYearMonthAAndOpenType(Long userId, String date, OpenType openType);

    @Query("SELECT NEW com.dailymate.domain.diary.dto.DiaryMonthlyResDto(d.diaryId, d.title, d.image, d.weather, d.feeling, d.date) " +
            "FROM Diary d " +
            "WHERE d.userId = :userId " +
            "AND SUBSTRING(d.date, 1, 7) = :date " +
            "AND d.openType != :openType")
    List<DiaryMonthlyResDto> findByUserIdAndYearMonthAAndOpenTypeNot(Long userId, String date, OpenType openType);
}
