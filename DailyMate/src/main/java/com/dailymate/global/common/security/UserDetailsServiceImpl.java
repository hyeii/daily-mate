package com.dailymate.global.common.security;

import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.domain.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 실제 데이터베이스에서 사용자 인증정보를 가져오는 UserDetailsService
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 회원을 찾을 수 없습니다."));
    }

    // 해당하는 User의 데이터가 존재한다면 UserDetails 객체로 변환해서 리턴 ===> DB에서 찾은 사용자 정보인 UserDetails
    // 여기서 User는 Users가 아니라 security.core.userdetails.User임
    private UserDetails createUserDetails(Users user) {
        UserDetails userDetails = User.builder()
                .username(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword())) // 나중에 수정할거임  https://suddiyo.tistory.com/entry/Spring-Spring-Security-JWT-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-2 , https://kimtaesoo99.tistory.com/118
                .roles(user.getType().getRole())
                .build();

        log.info("UserDetails : {}", userDetails);

//        return User.builder()
//                .username(user.getEmail())
//                .password(user.getPassword())
//                .roles(user.getType().getRole())
//                .build();
        return userDetails;
    }
}
