package com.dailymate.domain.user.dao;

import com.dailymate.domain.user.constant.UserType;
import com.dailymate.domain.user.domain.Users;
import com.dailymate.domain.user.dto.response.UserSearchInfoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByEmail(String email);

    Optional<Users> findByUserId(Long userId); // 관리자체크는 서비스에서 할거니까

    List<Users> findByNicknameContainingAndTypeNot(String nickname, UserType type);
    List<Users> findByTypeNot(UserType type);

    Boolean existsByEmail(String email); // 이메일 중복검사
    Boolean existsByNickname(String nickname); // 닉네임 중복검사


    // 친구 신청 메서드에서 탈퇴한 회원인지 체크하기 위함
    Boolean existsByUserId(Long userId);

    // 나랑 친구거나 대기중인 회원의 정보 조회
//    @Query(value = "SELECT new com.dailymate.domain.user.dto.response.UserSearchInfoDto(u.userId, u.email, u.nickname, u.image, u.profile, f.status, f.requestDate)" +
//            "FROM Users u " +
//            "JOIN Friend f ON (u.userId = f.fromId AND f.toId = :userId) OR (u.userId = f.toId AND f.fromId = :userId) " +
//            "WHERE u.userId = :friendId")
//    Optional<UserSearchInfoDto> checkFriendStatus(@Param("userId") Long userId, @Param("friendId") Long friendId);

    // 검색한 friendId의 정보를 추출하되
    // friend 데이터가 있으면 데이터, 없으면 null을 반환해준다.
    @Query(value = "SELECT new com.dailymate.domain.user.dto.response.UserSearchInfoDto(u.userId, u.email, u.nickname, u.image, u.profile, " +
            "COALESCE(f.status, NULL), COALESCE(f.requestDate, NULL)) " +
            "FROM Users u " +
            "LEFT JOIN Friend f ON (u.userId = f.fromId AND f.toId = :userId) OR (u.userId = f.toId AND f.fromId = :userId) " +
            "WHERE u.userId = :friendId")
    Optional<UserSearchInfoDto> searchUserInfo(@Param("userId") Long userId, @Param("friendId") Long friendId);

}
