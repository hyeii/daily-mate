package com.dailymate.global.common.security;

import com.dailymate.domain.user.constant.UserType;
import com.dailymate.domain.user.domain.Users;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Spring Security에서 사용자의 정보를 담는 인터페이스를 구현한 클래스
 */
@Getter
@Builder
public class UserDetailsImpl implements UserDetails, OAuth2User {
    private final Users user;
    private final Map<String, Object> attributes;

    public Long getUserId() {
        return user.getUserId();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> auth = new ArrayList<>();
        String authority = user.getType().getRole();

        if(authority.equals(UserType.ROLE_ADMIN.getRole()))
            authority = "ROLE_ADMIN";
        else if(authority.equals(UserType.ROLE_SOCIAL.getRole()))
            authority = "ROLE_SOCIAL";
        else
            authority = "ROLE_USER";

        auth.add(new SimpleGrantedAuthority(authority));

        return auth;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public String getName() {
        return user.getNickname();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
