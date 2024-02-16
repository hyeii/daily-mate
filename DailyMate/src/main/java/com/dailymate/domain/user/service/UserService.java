package com.dailymate.domain.user.service;

import com.dailymate.domain.user.dto.request.*;
import com.dailymate.domain.user.dto.response.LogInResDto;
import com.dailymate.domain.user.dto.response.MyInfoDto;
import com.dailymate.domain.user.dto.response.UserInfoDto;
import com.dailymate.global.common.jwt.JwtTokenDto;

import java.util.List;

public interface UserService {

    void signUp(SignUpReqDto reqDto);

    Boolean checkEmail(String email);

    Boolean checkNickname(String nickname);

    LogInResDto logIn(LogInReqDto reqDto);

//    JwtTokenDto reissueToken(String refreshToken);
    JwtTokenDto reissueToken(String accessToken, String refreshToken);

    MyInfoDto findMyInfo(String accessToken);

    void updateUser(String accessToken, UpdateUserReqDto reqDto); // 닉네임 중복검사필요

    void updatePassword(String accessToken, UpdatePasswordReqDto reqDto);

    void withdraw(String accessToken); // 비번체크필요

    Boolean checkPassword(String accessToken, PasswordDto passwordDto);

    void logout(String accessToken);

    List<UserInfoDto> findUserList(String accessToken);

    UserInfoDto findUser(String accessToken, Long userId);

    UserInfoDto findUserByUserId(String accessToken, Long userId); // 혜미니요청

    List<MyInfoDto> findUserByNickname(String accessToken, String nickname);

}
