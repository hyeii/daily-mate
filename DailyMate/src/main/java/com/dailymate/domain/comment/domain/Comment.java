package com.dailymate.domain.comment.domain;

import com.dailymate.domain.comment.dto.CommentReqDto;
import com.dailymate.domain.diary.domain.Diary;
import com.dailymate.domain.user.Users;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id", nullable = false, updatable = false)
    private Diary diary;

    @NotNull
    @Column(nullable = false, length = 200)
    private String content;

    public static Comment createComment(CommentReqDto commentReqDto, Diary diary, Users users) {
        return Comment.builder()
                .content(commentReqDto.getContent())
                .diary(diary)
                .users(users)
                .build();
    }

    public void updateContent(String content) {
        this.content = content;
    }
}
