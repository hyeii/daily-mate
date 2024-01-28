package com.dailymate.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MonthlyAmountDto {

    private Integer totalInput;
    private Integer totalOutput;
    private Integer[] inputs;
    private Integer[] outputs;



}
