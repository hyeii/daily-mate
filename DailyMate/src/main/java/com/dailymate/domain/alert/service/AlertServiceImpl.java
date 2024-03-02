package com.dailymate.domain.alert.service;

import com.dailymate.domain.alert.constant.AlertType;
import com.dailymate.domain.alert.dao.AlertRepository;
import com.dailymate.domain.alert.domain.Alert;
import com.dailymate.domain.alert.dto.AlertReqDto;
import com.dailymate.domain.alert.dto.AlertResDto;
import com.dailymate.domain.alert.dto.UrlDto;
import com.dailymate.domain.alert.exception.AlertExceptionMessage;
import com.dailymate.domain.alert.exception.AlertForbiddenException;
import com.dailymate.domain.alert.exception.AlertNotFoundException;
import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.domain.Users;
import com.dailymate.global.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class AlertServiceImpl implements AlertService{

    private final AlertRepository alertRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void addAlert(AlertReqDto alertReqDto) {
        log.info("[ADD_ALERT] 알림 전송 요청");

        Alert alert = Alert.builder()
                .toId(alertReqDto.getToId())
                .fromId(alertReqDto.getFromId())
                .diaryId(alertReqDto.getDiaryId()) // null일때 널에러 테스트
                .type(AlertType.getAlertType(alertReqDto.getType()))
                .url(alertReqDto.getUrl())
                .build();

        alertRepository.save(alert);
        log.info("[ADD_ALERT] 알림 전송 완료");
    }

    @Override
    @Transactional
    public void deleteAlert(String token, Long alertId) {

        // 알림이 존재하는지 확인하자.
        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() -> {
                    return new AlertNotFoundException(AlertExceptionMessage.ALERT_NOT_FOUND.getMsg());
                });

        // 대상이 일치하는지 확인하자.
        String email = jwtTokenProvider.getAuthentication(token).getName();
        Users loginUser = userRepository.findByEmail(email)
                .orElse(null);

        Long loginUserId = loginUser.getUserId();
        if(alert.getToId() != loginUserId) {
            throw new AlertForbiddenException(AlertExceptionMessage.ALERT_HANDLE_ACCESS_DENIED.getMsg());
        }

        // 알림 삭제
        alertRepository.delete(alert);
    }

    @Transactional
    @Override
    public List<AlertResDto> findAlertList(String token) {

        Long userId = jwtTokenProvider.getUserId(token);
        List<Alert> alertList = alertRepository.findByToId(userId);
        List<AlertResDto> alertResDtoList = new ArrayList<>();

        for(Alert alert : alertList) {
            AlertResDto alertResDto = AlertResDto.builder()
                    .alertId(alert.getAlertId())
                    .toId(alert.getToId())
                    .fromId(alert.getFromId())
                    .content(alert.getContent())
                    .diaryId(alert.getDiaryId())
                    .type(alert.getType().getValue())
                    .url(alert.getUrl())
                    .build();
            alertResDtoList.add(alertResDto);
        }
        return alertResDtoList;
    }

//    @Transactional
//    @Override
//    public String findAlertUrl(String token, Long alertId) {
//        Long userId = jwtTokenProvider.getUserId(token);
//        return alertRepository.findUrl(userId, alertId);
//    }

    @Transactional
    @Override
    public UrlDto findAlertUrl(String token, Long alertId) {
        Long userId = jwtTokenProvider.getUserId(token);
        Alert alert = alertRepository.findByToIdAndAlertId(userId, alertId)
                .orElseThrow(() -> {
                    return new AlertNotFoundException(AlertExceptionMessage.ALERT_NOT_FOUND.getMsg());
                });

        return UrlDto.builder()
                .url(alert.getUrl())
                .build();
    }

}
