package com.dailymate.domain.friend.dao;

import com.dailymate.domain.friend.domain.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    // 이미 친구거나 대기중인지 체크하기
    // 데이터가 있는거만으로 대기중이거나 친구상태임
    Boolean existsByToIdAndFromId(Long toId, Long fromId);


}
