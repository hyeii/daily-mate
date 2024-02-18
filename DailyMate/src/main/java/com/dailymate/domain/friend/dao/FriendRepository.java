package com.dailymate.domain.friend.dao;

import com.dailymate.domain.friend.domain.Friend;
import com.dailymate.domain.friend.dto.FriendRequestDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    // 이미 친구거나 대기중인지 체크하기
    // 데이터가 있는거만으로 대기중이거나 친구상태임
    Boolean existsByToIdAndFromId(Long toId, Long fromId);

    // 대기중인 친구인지 체크하기
    Boolean existsByToIdAndFromIdAndStatusIsFalse(Long toId, Long fromId);

    List<Friend> findByToIdAndStatusIsFalse(Long toId);

    // toId는 toId고, userId는 fromId인 User의 정보
    @Query(value = "SELECT new com.dailymate.domain.friend.dto.FriendRequestDto(f.fromId, f.requestDate, u.email, u.nickname, u.image, u.profile)" +
            "FROM Users u " +
            "JOIN Friend f ON u.userId = f.fromId " +
            "WHERE u.userId = :fromId AND f.toId = :toId")
    FriendRequestDto findFriendRequest(@Param("fromId") Long fromId, @Param("toId") Long toId);

}
