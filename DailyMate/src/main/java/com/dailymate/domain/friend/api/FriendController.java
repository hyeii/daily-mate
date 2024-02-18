package com.dailymate.domain.friend.api;

import com.dailymate.domain.friend.service.FriendService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
