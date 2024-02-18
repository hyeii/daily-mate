package com.dailymate.domain.friend.service;

import com.dailymate.domain.friend.dto.FriendInfoDto;

import java.util.List;

public interface FriendService {

    void addFriendRequest(String token, Long toId); // 친구가 되고싶은 사람의 ID

    List<FriendInfoDto> findFriendRequestList(String token);
    FriendInfoDto findFriendRequest(String token, Long friendId); // friendId가 맞나

    void acceptFriend(String token, Long friendId);
    void rejectFriend(String token, Long friendId);
    void deleteFriend(String token, Long friendId);

    List<FriendInfoDto> findFriendList(String token);
    FriendInfoDto findFriend(String token, Long friendId);

}
