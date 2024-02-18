package com.dailymate.domain.friend.dao;

import com.dailymate.domain.friend.domain.Friend;
import com.dailymate.domain.friend.dto.FriendInfoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    // 이미 친구거나 대기중인지 체크하기
    // 데이터가 있는거만으로 대기중이거나 친구상태임
    Boolean existsByToIdAndFromId(Long toId, Long fromId);

    // 대기중인 친구인지 체크하기
    Boolean existsByToIdAndFromIdAndStatusIsFalse(Long toId, Long fromId);

    // 나한테 친구를 걸고 대기중인 회원 목록
    List<Friend> findByToIdAndStatusIsFalse(Long toId);

    // 특정 친구 회원 목록
    @Query(value = "SELECT new com.dailymate.domain.friend.dto.FriendInfoDto(u.userId, f.requestDate, u.email, u.nickname, u.image, u.profile)" +
            "FROM Users u " +
            "JOIN Friend f ON (u.userId = f.fromId AND f.toId = :userId) OR (u.userId = f.toId AND f.fromId = :userId) " +
            "WHERE u.userId = :friendId " +
            "AND f.status = true")
    FriendInfoDto findMyFriend(@Param("userId") Long userId, @Param("friendId") Long friendId);

    // 전체 친구 목록
    @Query(value = "SELECT new com.dailymate.domain.friend.dto.FriendInfoDto(u.userId, f.requestDate, u.email, u.nickname, u.image, u.profile)" +
            "FROM Users u " +
            "JOIN Friend f ON (f.toId = :userId AND u.userId = f.fromId) OR (f.fromId = :userId AND u.userId = f.toId) " +
            "WHERE f.status = true")
    List<FriendInfoDto> findMyFriendList(@Param("userId") Long userId);

    // toId는 toId고, userId는 fromId인 User의 정보
    @Query(value = "SELECT new com.dailymate.domain.friend.dto.FriendInfoDto(f.fromId, f.requestDate, u.email, u.nickname, u.image, u.profile)" +
            "FROM Users u " +
            "JOIN Friend f ON u.userId = f.fromId " +
            "WHERE u.userId = :fromId AND f.toId = :toId")
    FriendInfoDto findFriendRequest(@Param("fromId") Long fromId, @Param("toId") Long toId);

    // 요청 대기중인 친구 반환
    Optional<Friend> findByToIdAndFromIdAndStatusIsFalse(Long toId, Long fromId);

    // 친구 상태인 친구 반환
    Optional<Friend> findByToIdAndFromIdAndStatusIsTrue(Long toId, Long fromId);
}
