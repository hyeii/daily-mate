package com.dailymate.domain.alert.service;

import com.dailymate.domain.alert.dto.AlertReqDto;
import com.dailymate.domain.alert.dto.AlertResDto;

import java.util.List;

public interface AlertService {
    void addAlert(String token, AlertReqDto alertReqDto);

    void deleteAlert(String token, Long alertId);

    List<AlertResDto> findAlertList(String token);

    String findAlertUrl(String token, Long alertId);
}
