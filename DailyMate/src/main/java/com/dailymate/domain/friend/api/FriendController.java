package com.dailymate.domain.friend.api;

import com.dailymate.domain.friend.dto.FriendInfoDto;
import com.dailymate.domain.friend.service.FriendService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {

    private final String ACCESS_TOKEN = "authorization";
    private final FriendService friendService;

    @Operation(
            summary = "친구 신청",
            description = "아무 관계가 없는 사람에게 친구를 신청합니다."
    )
    @PostMapping("/request/{toId}")
    public ResponseEntity<MessageDto> addFriendRequest(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long toId) {
        friendService.addFriendRequest(token, toId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("REQUEST SUCCESS"));
    }

    @Operation(
            summary = "친구 신청 리스트 전체 조회",
            description = "로그인 사용자에게 친구 신청을 걸어 대기중인 회원들의 정보를 리스트로 조회합니다."
    )
    @GetMapping("/request/all")
    public ResponseEntity<List<FriendInfoDto>> findFriendRequestList(@RequestHeader(ACCESS_TOKEN) String token) {
        return ResponseEntity.ok(friendService.findFriendRequestList(token));
    }

    @Operation(
            summary = "친구 신청 상세 조회",
            description = "로그인 사용자에게 친구 신청을 걸어 대기중인 회원의 정보를 조회합니다."
    )
    @GetMapping("/request/{friendId}")
    public ResponseEntity<FriendInfoDto> findFriendRequest(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long friendId) {
        return ResponseEntity.ok(friendService.findFriendRequest(token, friendId));
    }

    @Operation(
            summary = "친구 신청 승낙",
            description = "친구 신청을 승낙합니다."
    )
    @PatchMapping("/request/{friendId}")
    public ResponseEntity<MessageDto> acceptFriend(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long friendId) {
        friendService.acceptFriend(token, friendId);
        return ResponseEntity.ok(MessageDto.message("ACCEPT SUCCESS"));
    }

    @Operation(
            summary = "친구 신청 거부",
            description = "친구 신청을 거부합니다."
    )
    @DeleteMapping("/request/{friendId}")
    public ResponseEntity<MessageDto> rejectFriend(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long friendId) {
        friendService.rejectFriend(token, friendId);
        return ResponseEntity.ok(MessageDto.message("REJECT SUCCESS"));
    }

    @Operation(
            summary = "친구 끊기",
            description = "친구 상태를 끊습니다."
    )
    @DeleteMapping("/{friendId}")
    public ResponseEntity<MessageDto> deleteFriend(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long friendId) {
        friendService.deleteFriend(token, friendId);
        return ResponseEntity.ok(MessageDto.message("DELETE SUCCESS"));
    }

    @Operation(
            summary = "친구 리스트 전체 조회",
            description = "친구 상태인 회원들의 정보를 조회합니다."
    )
    @GetMapping("/all")
    public ResponseEntity<List<FriendInfoDto>> findFriendList(@RequestHeader(ACCESS_TOKEN) String token) {
        return ResponseEntity.ok(friendService.findFriendList(token));
    }

    @Operation(
            summary = "친구 상세 조회",
            description = "친구 상태인 회원의 정보를 조회합니다."
    )
    @GetMapping("/{friendId}")
    public ResponseEntity<FriendInfoDto> findFriend(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long friendId) {
        return ResponseEntity.ok(friendService.findFriend(token, friendId));
    }

}
