package com.dailymate.domain.comment.domain;

import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class LikeCommentKey implements Serializable {

    private Long user;
    private Long comment;

    public static LikeCommentKey createKey(Long userId, Long commentId) {
        return LikeCommentKey.builder()
                .user(userId)
                .comment(commentId)
                .build();
    }
}
