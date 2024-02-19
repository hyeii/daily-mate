package com.dailymate.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OutputResDto {
    private String category;
    private Long amountSum;

}
