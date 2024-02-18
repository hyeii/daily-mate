package com.dailymate.domain.friend.domain;

import com.dailymate.domain.user.domain.Users;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendId;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "to_id")
//    private Users toId;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "from_id")
//    private Users fromId;

    private Long toId;
    private Long fromId;

    private String requestDate;

    @ColumnDefault("false")
    private Boolean status;

    @Builder
    public Friend(Long toId, Long fromId) {
        this.toId = toId;
        this.fromId = fromId;
        this.requestDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

}
