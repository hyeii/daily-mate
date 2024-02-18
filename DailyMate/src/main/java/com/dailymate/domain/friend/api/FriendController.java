package com.dailymate.domain.friend.api;

import com.dailymate.domain.friend.dto.FriendRequestDto;
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
    public ResponseEntity<List<FriendRequestDto>> findFriendRequestList(@RequestHeader(ACCESS_TOKEN) String token) {
        return ResponseEntity.ok(friendService.findFriendRequestList(token));
    }

    @Operation(
            summary = "친구 신청 상세 조회",
            description = "로그인 사용자에게 친구 신청을 걸어 대기중인 회원의 정보를 조회합니다."
    )
    @GetMapping("/request/{friendId}")
    public ResponseEntity<FriendRequestDto> findFriendRequest(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long friendId) {
        return ResponseEntity.ok(friendService.findFriendRequest(token, friendId));
    }

}
