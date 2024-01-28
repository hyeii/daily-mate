package com.dailymate.domain.account.dto;

import com.dailymate.domain.account.constant.Category;
import lombok.*;

@Getter
@AllArgsConstructor
public class MonthlyOutputByCategoryDto {

    private Category category;
    private Long amountSum;

}
