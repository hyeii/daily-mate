package com.dailymate.domain.diary.domain;

import com.dailymate.domain.comment.domain.Comment;
import com.dailymate.domain.diary.constant.Feeling;
import com.dailymate.domain.diary.constant.OpenType;
import com.dailymate.domain.diary.constant.Weather;
import com.dailymate.domain.diary.dto.DiaryReqDto;
import com.dailymate.domain.user.domain.Users;
import com.dailymate.global.common.BaseTime;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Diary")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Where(clause = "deleted_at is null")
public class Diary extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diary_id")
    private Long diaryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private Users users;

    @NotNull
    @Column(length = 105)
    private String title;

    @Column(columnDefinition = "TEXT")
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

    @OneToMany(mappedBy = "diary", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    @Builder.Default
    private List<Comment> comments = new ArrayList<>();

    public static Diary createDiary(DiaryReqDto diaryReqDto, Users users) {
        return Diary.builder()
                .users(users)
                .title(diaryReqDto.getTitle())
                .content(diaryReqDto.getContent())
                .date(diaryReqDto.getDate())
                .weather(Weather.getWeather(diaryReqDto.getWeather()))
                .feeling(Feeling.getFeeling(diaryReqDto.getFeeling()))
                .openType(OpenType.getOpenType(diaryReqDto.getOpenType()))
                .build();
    }

    public void updateImage(String image){
        this.image = image;
    }

    public void updateDiary(String title, String content, String date, Weather weather, Feeling feeling, OpenType openType) {
        this.title = title == null ? this.title : title;
        this.content = content == null ? this.content : content;
        this.date = date == null ? this.date : date;
        this.weather = weather == null ? this.weather : weather;
        this.feeling = feeling == null ? this.feeling : feeling;
        this.openType = openType == null ? this.openType : openType;
    }
}
