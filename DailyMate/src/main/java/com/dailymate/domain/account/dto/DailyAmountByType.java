package com.dailymate.domain.account.dto;

import com.dailymate.domain.account.constant.AccountType;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * repository 에서 select를 위한 임시 dto
 * 해당 dto를 MonthlyAmountDto로 변환 후 response하기 위함
 */
@Getter
@AllArgsConstructor
public class DailyAmountByType {

    private String date;
    private AccountType type;
    private Long amountSum;

}
