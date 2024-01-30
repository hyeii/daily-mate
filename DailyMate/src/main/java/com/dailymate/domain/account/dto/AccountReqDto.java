package com.dailymate.domain.account.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AccountReqDto {

    private String content;
    private String date;
    private Integer amount;
    private String category;

}
