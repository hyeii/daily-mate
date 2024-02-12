package com.dailymate.global.common.security;

import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.domain.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 회원을 찾을 수 없습니다."));
    }

    // 해당하는 User의 데이터가 존재한다면 UserDetails 객체로 변환해서 리턴
    // 여기서 User는 Users가 아니라 security.core.userdetails.User임
    private UserDetails createUserDetails(Users user) {
        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getType().getRole())
                .build();
    }
}
