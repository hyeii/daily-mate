package com.dailymate.global.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 공통적으로 생성시간(CreatedAt) & 수정시간(UpdatedAt) 관리하는 클래스
 * https://wildeveloperetrain.tistory.com/76
 */
@Getter
@MappedSuperclass // 다른 엔티티들이 상속할 경우, 아래의 필드를 컬럼으로 인식
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTime {

    private String createdAt;

    private String updatedAt;

    private String deletedAt;

    @PrePersist
    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    @PreUpdate
    public void setUpdatedAt() {
        this.updatedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern(("yyyy-MM-dd HH:mm:ss")));
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

}
