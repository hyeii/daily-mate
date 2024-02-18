package com.dailymate.domain.user.dao;

import com.dailymate.domain.user.constant.UserType;
import com.dailymate.domain.user.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByEmail(String email);

    Optional<Users> findByUserId(Long userId); // 관리자체크는 서비스에서 할거니까

    List<Users> findByNicknameContainingAndTypeNot(String nickname, UserType type);
    List<Users> findByTypeNot(UserType type);

    Boolean existsByEmail(String email); // 이메일 중복검사
    Boolean existsByNickname(String nickname); // 닉네임 중복검사

}
