package com.dailymate.global.common.security;

import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.domain.Users;
import com.dailymate.domain.user.exception.UserExceptionMessage;
import com.dailymate.domain.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 실제 데이터베이스에서 사용자 인증정보를 가져오는 UserDetailsService
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    // 해당하는 User의 데이터가 존재한다면 UserDetails 객체로 변환해서 리턴 ===> DB에서 찾은 사용자 정보인 UserDetails
    // 비밀번호 체크를 여기서 한다고 보면 됨
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(UserExceptionMessage.USER_NOT_FOUND.getMsg()));

        return UserDetailsImpl.builder()
                .user(user)
                .build();
    }

}
