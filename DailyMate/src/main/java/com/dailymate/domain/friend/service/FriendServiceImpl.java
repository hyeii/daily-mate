package com.dailymate.domain.friend.service;

import com.dailymate.domain.friend.dao.FriendRepository;
import com.dailymate.domain.friend.domain.Friend;
import com.dailymate.domain.friend.dto.FriendInfoDto;
import com.dailymate.domain.friend.dto.FriendRequestDto;
import com.dailymate.domain.friend.exception.FriendBadRequestException;
import com.dailymate.domain.friend.exception.FriendExceptionMessage;
import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Override
    public void addFriendRequest(String token, Long toId) {
        Long loginUserId = jwtTokenProvider.getUserId(token);

        // 본인에게 못걸게 막혀야함
        if(loginUserId == toId) {
            log.error("[친구 신청] 본인에게는 친구 신청을 할 수 없습니다.");
            throw new FriendBadRequestException(FriendExceptionMessage.CANNOT_REQUEST_YOURSELF.getMsg());
        }

        // 탈퇴한 회원에게도 못걸음
        if(!userRepository.existsByUserId(toId)) {
            log.error("[친구 신청] 이미 탈퇴한 회원입니다.");
            throw new FriendBadRequestException(FriendExceptionMessage.ALREADY_WITHDRAW_USER.getMsg());
        }

        log.info("[친구 신청] {}님이 {}님에게 친구 신청 요청", loginUserId, toId);

        // 이미 친구거나, 대기중인지 체크
        if(friendRepository.existsByToIdAndFromId(toId, loginUserId)
        || friendRepository.existsByToIdAndFromId(loginUserId, toId)) {
            log.error("[친구 신청] {}님과 {}님은 이미 친구거나 대기중입니다.");
            throw new FriendBadRequestException(FriendExceptionMessage.ALREADY_FRIEND.getMsg());
        }

        Friend requestFriend = Friend.builder()
                .toId(toId)
                .fromId(loginUserId)
                .build();

        friendRepository.save(requestFriend);
        log.info("[친구 신청] 친구 신청 완료.");
    }

    @Override
    public List<FriendRequestDto> findFriendRequestList(String token) {
        return null;
    }

    @Override
    public FriendRequestDto findFriendRequest(String token, Long friendId) {
        return null;
    }

    @Override
    public void acceptFriend(String token, Long friendId) {

    }

    @Override
    public void rejectFriend(String token, Long friendId) {

    }

    @Override
    public void deleteFriend(String token, Long friendId) {

    }

    @Override
    public List<FriendInfoDto> findFriendList(String token) {
        return null;
    }

    @Override
    public FriendInfoDto findFriend(String token, Long friendId) {
        return null;
    }
}
