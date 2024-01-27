package com.dailymate.domain.account.domain;

import com.dailymate.domain.account.constant.AccountType;
import com.dailymate.domain.account.constant.Category;
import com.dailymate.global.common.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
public class Account extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;

    private Long userId;

    private String content;

    @Enumerated(EnumType.STRING)
    private AccountType type;

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @NotNull
    private String date;

    @NotNull
    private Integer amount;

    @Enumerated(EnumType.STRING)
    private Category category;

    /**
     * 가계부 수정
     */
    public void updateAccount(String content, String date, Integer amount, Category category) {
        this.content = content == null ? this.content : content;
        this.date = date == null ? this.date : date;
        this.category = category == null ? this.category : category;

        if(amount != null) {
            this.amount = amount;
            this.type = AccountType.getType(amount);
        }
    }

}
