package com.dailymate.domain.user.service;

import com.dailymate.domain.user.dto.request.*;
import com.dailymate.domain.user.dto.response.*;
import com.dailymate.global.common.jwt.JwtTokenDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    void signUp(SignUpReqDto reqDto);

    Boolean checkEmail(String email);

    Boolean checkNickname(String nickname);

    LogInResDto logIn(LogInReqDto reqDto);

    LogInResDto getOAuthLoginInfo(String token); // oauth2 로긘용

    JwtTokenDto reissueToken(String accessToken, String refreshToken);

    MyInfoDto findMyInfo(String token);

    void updateUser(String token, UpdateUserReqDto reqDto); // 닉네임 중복검사필요

    void updatePassword(String token, UpdatePasswordReqDto reqDto);

    void withdraw(String token); // 비번체크필요

    Boolean checkPassword(String token, PasswordDto passwordDto);

    void logout(String token);

    List<UserAllInfoDto> findUserList(String token);

    UserAllInfoDto findUser(String token, Long userId);

    UserAllInfoDto findUserByUserId(String token, Long userId); // 혜미니요청

    List<UserSearchInfoDto> findUserByNickname(String token, String nickname);

    // 이미지 등록
    void addUserImage(String token, MultipartFile image);

    // 이미지 삭제
    void deleteUserImage(String token);

}
