package com.dailymate.domain.alert.domain;

import com.dailymate.domain.alert.constant.AlertType;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
@DynamicUpdate
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alertId;

    private Long toId;

    private Long fromId;

    private Long diaryId;

    private String content;

    @Enumerated(EnumType.STRING)
    private AlertType type;

    private String url;

    private String createdAt;

    @PrePersist
    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

}
