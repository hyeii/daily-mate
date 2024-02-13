package com.dailymate.domain.comment.domain;

import com.dailymate.domain.diary.domain.Diary;
import com.dailymate.global.common.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Comment")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Where(clause = "deleted_at is null")
public class Comment extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long commentId;

    @NotNull
    @Column
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id", nullable = false, updatable = false)
    private Diary diary;

    @NotNull
    @Column(nullable = false, length = 200)
    private String content;
}
