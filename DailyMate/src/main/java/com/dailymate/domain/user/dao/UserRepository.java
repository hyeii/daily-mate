package com.dailymate.domain.user.dao;

import com.dailymate.domain.user.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByEmailAndDeletedAtIsNull(String email);
    
    Boolean existsByEmailAndDeletedAtIsNull(String email); // 이메일 중복검사
    Boolean existsByNicknameAndDeletedAtIsNull(String nickname); // 닉네임 중복검사

}
