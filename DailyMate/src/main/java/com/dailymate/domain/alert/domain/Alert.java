package com.dailymate.domain.alert.domain;

import com.dailymate.domain.alert.constant.AlertType;
import com.dailymate.global.common.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
@DynamicUpdate
public class Alert extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alertId;

    private Long toId;

    private Long fromId;

    private String content;

    @Enumerated(EnumType.STRING)
    private AlertType type;

    private String url;

}
