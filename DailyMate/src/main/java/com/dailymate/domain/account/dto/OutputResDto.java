package com.dailymate.domain.account.dto;

import com.dailymate.domain.account.constant.AccountCategory;
import lombok.Getter;

@Getter
public class OutputResDto {
    private AccountCategory category;
    private Long amountSum;

    public OutputResDto(AccountCategory category, Long amountSum) {
        this.category = category;
        this.amountSum = amountSum;
    }

}
