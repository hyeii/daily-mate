package com.dailymate.domain.diary.domain;

import com.dailymate.domain.diary.constant.Feeling;
import com.dailymate.domain.diary.constant.OpenType;
import com.dailymate.domain.diary.constant.Weather;
import com.dailymate.global.common.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Diary")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Where(clause = "deleted_at = null")
public class Diary extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @NotNull
    @Column
    private Long userId;

    @NotNull
    @Column
    private String title;

    @Column
    private String content;

    @Column
    private String date;

    @Column
    private String image;

    @Enumerated(EnumType.STRING)
    private Weather weather;

    @Enumerated(EnumType.STRING)
    private Feeling feeling;

    @Enumerated(EnumType.STRING)
    private OpenType openType;
}
