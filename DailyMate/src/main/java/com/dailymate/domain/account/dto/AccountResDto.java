package com.dailymate.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountResDto {
    private Long userId;
    private Long accountId;
    private String content;
    private String type;
    private String date;
    private Integer amount;
    private String category;

}
