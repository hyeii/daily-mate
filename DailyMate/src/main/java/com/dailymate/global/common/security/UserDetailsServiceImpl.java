package com.dailymate.global.common.security;

import com.dailymate.domain.user.dao.UserRepository;
import com.dailymate.domain.user.domain.Users;
import com.dailymate.domain.user.exception.UserExceptionMessage;
import com.dailymate.domain.user.exception.UserNotFoundException;
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

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(UserExceptionMessage.USER_NOT_FOUND.getMsg()));

        return new UserDetailsImpl(user);

//        return UserDetailsImpl.builder()
//                .userId(user.getUserId())
//                .email(user.getEmail())
//                .password(user.getPassword())
//                .authority(user.getType().getRole())
//                .build();

//        return userRepository.findByEmail(email)
//                .map(this::createUserDetails)
//                .orElseThrow(() -> new UsernameNotFoundException(UserExceptionMessage.USER_NOT_FOUND.getMsg()));
    }

    // 해당하는 User의 데이터가 존재한다면 UserDetails 객체로 변환해서 리턴 ===> DB에서 찾은 사용자 정보인 UserDetails
    // 여기서 User는 Users가 아니라 security.core.userdetails.User임
    private UserDetails createUserDetails(Users user) {
        // 비밀번호 체크를 여기서 한다고 보면됨
        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                //                .password(passwordEncoder.encode(user.getPassword())) // DB에 encoding된 값을 가지고있을땐 그냥 getPw(), 아닐땐 이거사용
                .roles(user.getType().getRole())
                .build();
    }
}
