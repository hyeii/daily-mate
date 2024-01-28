package com.dailymate.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MonthlyAmountDto {

    private Long totalInput;
    private Long totalOutput;
    private Long[] inputs;
    private Long[] outputs;

    public static MonthlyAmountDto dailyDtoToMonthlyDto(List<DailyAmountByType> dailyList) {
        Long inputSum = 0L;
        Long outputSum = 0L;
        Long[] inputs = new Long[32];
        Long[] outputs = new Long[32];
        for(DailyAmountByType dailyDto : dailyList) {
            int day = Integer.parseInt(dailyDto.getDate().substring(8, 10));
//            System.out.println(dailyDto.getDate() + " / 추출한 일자 : " + day);

            if(dailyDto.getAmountSum() < 0) {
                outputs[day] = dailyDto.getAmountSum();
                outputSum += outputs[day];
            }
            else {
                inputs[day] = dailyDto.getAmountSum();
                inputSum += inputs[day];
            }
        }

        return MonthlyAmountDto.builder()
                .totalInput(inputSum)
                .totalOutput(outputSum)
                .inputs(inputs)
                .outputs(outputs)
                .build();
    }

}
