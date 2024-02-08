package com.dailymate.domain.diary.domain;

import com.dailymate.domain.user.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@IdClass(LikeDiaryKey.class)
@Table(name = "like_diary")
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikeDiary {

    @Id
    @JoinColumn(name = "diary_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Diary diary;

    @Id
    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Users user;

}
