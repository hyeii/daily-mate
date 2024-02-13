package com.dailymate.domain.comment.domain;

import com.dailymate.domain.user.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@IdClass(LikeCommentKey.class)
@Table(name = "like_comment")
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikeComment {
    @Id
    @JoinColumn(name = "comment_Id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Comment comment;

    @Id
    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Users user;
}
