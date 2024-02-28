package com.dailymate.domain.alert.dao;

import com.dailymate.domain.alert.domain.Alert;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {

    List<Alert> findByToId(Long toId);

    @Query(value = "SELECT NEW com.dailymate.domain.alert.dto.UrlResDto(a.url) " +
    "FROM Alert a " +
    "WHERE a.toId = :userId AND a.alertId = :alertId ")
    String findUrl(@Param("userId") Long userId, @Param("alertId") Long alertId);

}
