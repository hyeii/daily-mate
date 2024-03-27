package com.dailymate.domain.diary.domain;

import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class LikeDiaryKey implements Serializable {

    private Long user;
    private Long diary;

    public static LikeDiaryKey createKey(Long userId, Long diaryId) {
        return LikeDiaryKey.builder()
                .user(userId)
                .diary(diaryId)
                .build();
    }
}
