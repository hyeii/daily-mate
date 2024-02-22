package com.dailymate.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AmountResDto {
    private Long totalInput;
    private Long totalOutput;
    private Long[] inputs;
    private Long[] outputs;

    public AmountResDto(Long totalInput, Long totalOutput, Long[] inputs, Long[] outputs) {
        this.totalInput = totalInput;
        this.totalOutput = totalOutput;
        this.inputs = inputs;
        this.outputs = outputs;
    }
}
