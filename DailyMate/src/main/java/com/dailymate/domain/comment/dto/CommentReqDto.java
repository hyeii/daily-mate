package com.dailymate.domain.comment.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentReqDto {

//    @JsonIgnore
    private Long userId;
//    @JsonIgnore
    private Long diaryId;
    private String content;
}
