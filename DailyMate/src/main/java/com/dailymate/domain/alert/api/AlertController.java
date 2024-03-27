package com.dailymate.domain.alert.api;

import com.dailymate.domain.alert.dto.AlertReqDto;
import com.dailymate.domain.alert.dto.AlertResDto;
import com.dailymate.domain.alert.dto.UrlDto;
import com.dailymate.domain.alert.service.AlertService;
import com.dailymate.global.dto.MessageDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/alert")
@RestController
public class AlertController {

    private final AlertService alertService;
    private final String ACCESS_TOKEN = "authorization";

    @Operation(
            summary = "알림 전송"
    )
    @PostMapping
    public ResponseEntity<MessageDto> addAlert(@RequestBody AlertReqDto alertReqDto) {
        alertService.addAlert(alertReqDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(MessageDto.message("CREATED SUCCESS"));
    }

    @Operation(
            summary = "알림 삭제"
    )
    @DeleteMapping("/{alertId}")
    public ResponseEntity<MessageDto> deleteAlert(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long alertId) {
        alertService.deleteAlert(token, alertId);
        return ResponseEntity.ok(MessageDto.message("DELETE SUCCESS"));
    }

    @Operation(
            summary = "알림 목록 조회"
    )
    @GetMapping
    public ResponseEntity<List<AlertResDto>> findAlertList(@RequestHeader(ACCESS_TOKEN) String token) {
        return ResponseEntity.ok(alertService.findAlertList(token));
    }

    @Operation(
            summary = "해당 url로 이동"
    )
    @GetMapping("/{alertId}")
    public ResponseEntity<UrlDto> findAlertUrl(@RequestHeader(ACCESS_TOKEN) String token, @PathVariable Long alertId) {
        return ResponseEntity.ok(alertService.findAlertUrl(token, alertId));
    }
}
