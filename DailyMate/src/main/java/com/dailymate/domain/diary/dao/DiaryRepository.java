package com.dailymate.domain.diary.dao;

import com.dailymate.domain.diary.constant.OpenType;
import com.dailymate.domain.diary.domain.Diary;
import com.dailymate.domain.diary.dto.DiaryMonthlyResDto;
import com.dailymate.domain.user.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    boolean existsDiaryByDateAndUsers(String date, Users users);
    Diary findDiaryByDateAndUsers(String date, Users users);
    @Query("SELECT NEW com.dailymate.domain.diary.dto.DiaryMonthlyResDto(d.diaryId, d.title, d.image, d.weather, d.feeling, d.date) " +
            "FROM Diary d " +
            "WHERE d.users = :users " +
            "AND SUBSTRING(d.date, 1, 7) = :date")
    List<DiaryMonthlyResDto> findByUsersAndYearMonth(Users users, String date);

    @Query("SELECT NEW com.dailymate.domain.diary.dto.DiaryMonthlyResDto(d.diaryId, d.title, d.image, d.weather, d.feeling, d.date) " +
            "FROM Diary d " +
            "WHERE d.users = :users " +
            "AND SUBSTRING(d.date, 1, 7) = :date " +
            "AND d.openType = :openType")
    List<DiaryMonthlyResDto> findByUsersAndYearMonthAAndOpenType(Users users, String date, OpenType openType);

    @Query("SELECT NEW com.dailymate.domain.diary.dto.DiaryMonthlyResDto(d.diaryId, d.title, d.image, d.weather, d.feeling, d.date) " +
            "FROM Diary d " +
            "WHERE d.users = :users " +
            "AND SUBSTRING(d.date, 1, 7) = :date " +
            "AND d.openType != :openType")
    List<DiaryMonthlyResDto> findByUsersAndYearMonthAAndOpenTypeNot(Users users, String date, OpenType openType);
}
