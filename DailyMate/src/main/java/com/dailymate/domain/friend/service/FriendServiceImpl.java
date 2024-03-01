package com.dailymate.domain.friend.service;

import com.dailymate.domain.alert.constant.AlertType;
import com.dailymate.domain.alert.dto.AlertReqDto;
import com.dailymate.domain.alert.service.AlertService;
import com.dailymate.domain.friend.dao.FriendRepository;
import com.dailymate.domain.friend.domain.Friend;
import com.dailymate.domain.friend.dto.FriendInfoDto;
import com.dailymate.domain.friend.exception.FriendBadRequestException;
import com.dailymate.domain.friend.exception.FriendExceptionMessage;
import com.dailymate.domain.friend.exception.FriendNotFountException;
import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    private final AlertService alertService;

    @Transactional
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

        log.info("[친구 신청] 친구 신청 알림 전송합니다.");
        AlertReqDto reqDto = new AlertReqDto(toId, loginUserId, null, "친구요청");
        alertService.addAlert(reqDto);
        log.info("[친구 신청] 알림 전송 완료. 메서드 종료함당 ");
    }

    @Override
    public List<FriendInfoDto> findFriendRequestList(String token) {
        Long loginUserId = jwtTokenProvider.getUserId(token);
        log.info("[친구 신청 리스트 전체 조회] 조회 요청 : {}", loginUserId);

        // toId가 로그인 사용자의 ID고, 아직 대기중인 경우만 조회해야함
        return friendRepository.findByToIdAndStatusIsFalse(loginUserId).stream()
                .map(friend -> friendRepository.findFriendRequest(friend.getFromId(), loginUserId))
                .collect(Collectors.toList());
    }

    @Override
    public FriendInfoDto findFriendRequest(String token, Long friendId) {
        Long loginUserId = jwtTokenProvider.getUserId(token);
        log.info("[친구 신청 상세 조회] {}님이 {}님의 정보 조회 요청", loginUserId, friendId);

        // 대기중인 친구인지 체크(프론트에서 걸러지지만 그래두!)
        // 그냥친구도 나오면안대
        if(!friendRepository.existsByToIdAndFromIdAndStatusIsFalse(loginUserId, friendId)) {
            log.error("[친구 신청 상세 조회] 친구 요청 대기중 상태가 아니라 조회가 불가합니다.");
            throw new FriendBadRequestException(FriendExceptionMessage.NOT_WAITING.getMsg());
        }

        return friendRepository.findFriendRequest(friendId, loginUserId);
    }

    @Transactional
    @Override
    public void acceptFriend(String token, Long friendId) {
        Long loginUserId = jwtTokenProvider.getUserId(token);
        log.info("[친구 신청 승낙] {}님이 {}님의 친구 요청을 승낙하러 들어왔습니다.", loginUserId, friendId);

        // 친구 대기중인지 체크
        Friend friend = friendRepository.findByToIdAndFromIdAndStatusIsFalse(loginUserId, friendId)
                .orElseThrow(() -> {
                    log.error("[친구 신청 승낙] 친구 요청 대기중인 데이터가 없습니다.");
                    return new FriendNotFountException(FriendExceptionMessage.NOT_WAITING.getMsg());
                });

        // 승낙
        friend.acceptFriend();
        friendRepository.save(friend);

        log.info("[친구 신청 승낙] 친구 승낙 완료 !");
    }

    @Transactional
    @Override
    public void rejectFriend(String token, Long friendId) {
        Long loginUserId = jwtTokenProvider.getUserId(token);
        log.info("[친구 신청 거부] {}님이 {}님의 친구 요청을 거부하러 들어왔습니다.", loginUserId, friendId);

        // 친구 대기중인지 체크
        Friend friend = friendRepository.findByToIdAndFromIdAndStatusIsFalse(loginUserId, friendId)
                .orElseThrow(() -> {
                    log.error("[친구 신청 거부] 친구 요청 대기중인 데이터가 없습니다.");
                    return new FriendNotFountException(FriendExceptionMessage.NOT_WAITING.getMsg());
                });

        // 데이터 삭제
        friendRepository.delete(friend);
        log.info("[친구 신청 거부] 친구 거부 완료 !");
    }

    @Transactional
    @Override
    public void deleteFriend(String token, Long friendId) {
        Long loginUserId = jwtTokenProvider.getUserId(token);
        log.info("[친구 끊기] {}님이 {}님과 친구를 끊으려합니다.", loginUserId, friendId);

        Friend friend = friendRepository.findMyFriendToEntity(loginUserId, friendId);

        // 친구인지 체크
        if(friend == null) {
            log.error("[친구 끊기] 친구 상태가 아닙니다.");
            throw new FriendNotFountException(FriendExceptionMessage.YOU_ARE_NOT_FRIEND.getMsg());
        }

        // 데이터 삭제
        friendRepository.delete(friend);
        log.info("[친구 끊기] 친구 끊기 완료 !");
    }

    @Override
    public List<FriendInfoDto> findFriendList(String token) {
        Long loginUserId = jwtTokenProvider.getUserId(token);
        log.info("[친구 리스트 전체 조회] 조회 요청 : {}", loginUserId);

        return friendRepository.findMyFriendList(loginUserId);
    }

    @Override
    public FriendInfoDto findFriend(String token, Long friendId) {
        Long loginUserId = jwtTokenProvider.getUserId(token);
        log.info("[친구 상세 조회] {}님이 {}님의 정보를 조회 요청", loginUserId, friendId);

        return friendRepository.findMyFriendToDto(loginUserId, friendId);
    }

}
