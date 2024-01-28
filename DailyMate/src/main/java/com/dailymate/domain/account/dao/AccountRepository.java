package com.dailymate.domain.account.dao;

import com.dailymate.domain.account.domain.Account;
import com.dailymate.domain.account.dto.MonthlyOutputByCategoryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    List<Account> findByUserIdAndDate(Long userId, String date);

    @Query("SELECT NEW com.dailymate.domain.account.dto.MonthlyOutputByCategoryDto(a.category, SUM(a.amount)) " +
            "FROM Account a " +
            "WHERE a.type = '지출' AND a.userId = :userId AND a.date LIKE CONCAT(:date, '%') " +
            "GROUP BY a.category")
    List<MonthlyOutputByCategoryDto> findOutputByCategory(@Param("userId") Long userId, @Param("date") String date);



}
