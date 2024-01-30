package com.dailymate.domain.account.dto;

import com.dailymate.domain.account.constant.Category;
import com.dailymate.domain.account.domain.Account;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AccountResDto {

    private Long accountId;
    private Long userId;
    private String content;
    private String type;

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private String date;
    private Integer amount;
    private String category;

    private String createdAt;

    public static AccountResDto entityToDto(Account account) {
        Category category = account.getCategory();

        return AccountResDto.builder()
                .accountId(account.getAccountId())
                .userId(account.getUserId())
                .content(account.getContent())
                .type(account.getType().getValue())
                .date(account.getDate())
                .amount(account.getAmount())
                .category(category == null ? null : category.getLabel())
                .createdAt(account.getCreatedAt())
                .build();
    }

}
