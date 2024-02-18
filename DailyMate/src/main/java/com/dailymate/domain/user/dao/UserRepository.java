package com.dailymate.domain.user.dao;

import com.dailymate.domain.user.domain.Users;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByEmailAndDeletedAtIsNull(String email);

    List<Users> findByDeletedAtIsNull();
    Optional<Users> findByUserIdAndDeletedAtIsNull(Long userId); // 관리자체크는 서비스에서 할거니까

    List<Users> findByNicknameContainingAndDeletedAtIsNull(String nickname);

    
    Boolean existsByEmailAndDeletedAtIsNull(String email); // 이메일 중복검사
    Boolean existsByNicknameAndDeletedAtIsNull(String nickname); // 닉네임 중복검사

}
