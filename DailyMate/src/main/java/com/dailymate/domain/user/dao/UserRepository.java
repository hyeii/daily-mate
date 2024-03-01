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
    Optional<Users> findByUserId(Long userId);

    Optional<Users> findByEmailAndProviderId(String email, String providerId); // OAuth2용

    List<Users> findByNicknameContainingAndTypeNot(String nickname, UserType type);
    List<Users> findByTypeNot(UserType type);

    Boolean existsByEmail(String email); // 이메일 중복검사
    Boolean existsByNickname(String nickname); // 닉네임 중복검사

    /**
     * 소셜 타입과 소셜의 식별값으로 회원을 찾는 메서드
     * 정보 제공을 동의한 순간 DB에 저장해야 하지만, 아직 추가 정보(프로필, 이미지)는 입력받지 않았으므로
     * 유저 객체는 DB에 있지만 추가 정보가 빠진 상태.
     * 
     * 따라서 추가 정보를 입력받아 회원가입을 진행할 때 소셜 타입, 식별자로 해당 회원을 찾기 위한 메서드
     * -> 저는 일단 구글만해서 소셜타입 따로없음여
     */
    Optional<Users> findByProviderId(String providerId);



    // 친구 신청 메서드에서 탈퇴한 회원인지 체크하기 위함
    Boolean existsByUserId(Long userId);

    // 검색한 friendId의 정보를 추출하되
    // friend 데이터가 있으면 데이터, 없으면 null을 반환해준다.
    @Query(value = "SELECT new com.dailymate.domain.user.dto.response.UserSearchInfoDto(u.userId, u.email, u.nickname, u.image, u.profile, " +
            "COALESCE(f.status, NULL), COALESCE(f.requestDate, NULL)) " +
            "FROM Users u " +
            "LEFT JOIN Friend f ON (u.userId = f.fromId AND f.toId = :userId) OR (u.userId = f.toId AND f.fromId = :userId) " +
            "WHERE u.userId = :friendId")
    Optional<UserSearchInfoDto> searchUserInfo(@Param("userId") Long userId, @Param("friendId") Long friendId);

}
