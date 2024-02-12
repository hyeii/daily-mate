package com.dailymate.global.common.security;

import com.dailymate.domain.user.constant.UserType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.ElementCollection;
import javax.persistence.FetchType;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Spring Security에서 사용자의 정보를 담는 인터페이스를 구현한 클래스
 */
@Getter
@Builder
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {

//    private Long userId;
    private String email; // username

    private String password;

//    private String authority;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>(); // 유저가 가지고 있는 권한 목록

    /**
     * 계정의 권한 목록을 리턴
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    /**
     * 계정의 고유한 값을 리턴 =========================== 젤 중요한 메서드
     *  ex. DB PK값, 중복없는 이메일 값 등
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * 계정의 만료 여부
     *  => 만료 안됨 : true / 만료 : false
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 비밀번호 만료 여부
     *  => 만료 안됨 : true / 만료 : false
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 계정의 활성화 여부
     *  => 활성화 : true / 비활성화 : false
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
