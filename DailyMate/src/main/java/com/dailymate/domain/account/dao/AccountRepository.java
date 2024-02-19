package com.dailymate.domain.account.dao;

import com.dailymate.domain.account.constant.AccountCategory;
import com.dailymate.domain.account.domain.Account;
import com.dailymate.domain.account.dto.OutputResDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface AccountRepository extends JpaRepository<Account, Long> {

    List<Account> findByUserIdAndDate(Long userId, String date);

    @Query(value = "SELECT NEW com.dailymate.domain.account.dto.OutputResDto(a.category, SUM(a.amount)) " +
            "FROM Account a " +
            "WHERE a.type = '지출' AND a.userId = :userId AND a.date LIKE CONCAT(:date, '%') " +
            "GROUP BY a.category ")
    List<OutputResDto> findByUserIdAndDateStartsWith(@Param("userId") Long userId, @Param("date") String date);

//    List<Account> findByUserIdAndDateStartsWith(Long userId, String date);

//    Map<AccountCategory, Long> findByUserIdAndDateStartsWithAndDeletedAtIsNull();


}
