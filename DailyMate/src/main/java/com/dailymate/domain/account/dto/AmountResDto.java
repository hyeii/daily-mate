package com.dailymate.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AmountResDto {
    private Long totalInput;
    private Long totalOutput;

}
