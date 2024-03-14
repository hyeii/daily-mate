package com.dailymate.domain.alert.service;

import com.dailymate.domain.alert.domain.Alert;
import com.dailymate.domain.alert.dto.AlertReqDto;
import com.dailymate.domain.alert.dto.AlertResDto;
import com.dailymate.domain.alert.dto.UrlDto;

import java.util.List;
import java.util.Optional;

public interface AlertService {
    void addAlert(AlertReqDto alertReqDto);

    void deleteAlert(String token, Long alertId);

    List<AlertResDto> findAlertList(String token);

//    String findAlertUrl(String token, Long alertId);

    UrlDto findAlertUrl(String token, Long alertId);

}
