package com.dailymate.domain.account.domain;

import com.dailymate.domain.account.constant.AccountCategory;
import com.dailymate.domain.account.constant.AccountType;
import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.global.common.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter // getter 메서드 자동 추가.
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 기본 생성자 자동 추가. Account {}
@AllArgsConstructor
@Builder // builder 클래스 자동 생성 > 생성자 대신 사용.
@Entity
@DynamicInsert
@DynamicUpdate
public class Account extends BaseTime {

    @Id // 해당 변수를 PK로 설정.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 값이 없어도 자동으로 할당.
    private Long accountId;

    private Long userId;

    private String content;

    @Enumerated(EnumType.STRING) // Enum Type을 String으로 명시해주자.
    private AccountType type;

    private String date;

    private Integer amount;

    @Enumerated(EnumType.STRING)
    private AccountCategory category;

    public void updateAccount(AccountReqDto accountReqDto) {
        this.content = accountReqDto.getContent() == null ? this.content : accountReqDto.getContent();
        this.date = accountReqDto.getDate() == null ? this.date : accountReqDto.getDate();
        this.amount = accountReqDto.getAmount() == null ? this.amount : accountReqDto.getAmount();
        this.category = accountReqDto.getCategory() == null ? this.category : AccountCategory.getAccountCategory(accountReqDto.getCategory());
        this.type = AccountType.getAccountType(this.amount);
    }
}
