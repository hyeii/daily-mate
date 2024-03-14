package com.dailymate.domain.account.dto;

import com.dailymate.domain.account.constant.AccountCategory;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class AccountReqDto {
//    private Long userId;
    private String content;
    private String date;
    private Integer amount;
    private String category;

}
