package com.dailymate.domain.account.domain;

import com.dailymate.domain.account.constant.AccountType;
import com.dailymate.domain.account.constant.Category;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long accountId;

    private Long userId;

    private String content;

    @Enumerated(EnumType.STRING)
    private AccountType type;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate date;

    @NotNull
    private Integer amount;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    @PrePersist
    public void createTime() {
        this.createdAt = LocalDateTime.now();
    }

    @Builder
    public Account(String content, LocalDate date, Integer amount, Category category, AccountType type) {
        this.content = content;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.type = type;
    }


}
