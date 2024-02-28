package com.dailymate.domain.user.api;

import com.dailymate.domain.user.dto.response.LogInResDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/oauth")
public class GoogleController {

    @GetMapping("/google")
    public RedirectView redirectToGoogle() {
        return new RedirectView("/oauth2/authorization/google");
    }

//    @GetMapping("/google/success")
////    public ResponseEntity<LogInResDto> googleLogin(@RequestParam("userInfo") String userInfo) {
////        // userInfo는 URL의 쿼리 매개변수로부터 전달된 인코딩된 LogInResDto 정보입니다.
////        // 이를 다시 LogInResDto 객체로 변환합니다.
////        LogInResDto logInResDto = convertUserInfoToLogInResDto(userInfo);
////
////        // 변환된 LogInResDto 객체를 ResponseEntity에 담아서 반환
////        return ResponseEntity.ok(logInResDto);
////    }
//
//
//    public ResponseEntity<?> googleLogin() {
//        return ResponseEntity.ok().build();
//    }
//
//    // userInfo를 LogInResDto 객체로 변환하는 메서드
//    private LogInResDto convertUserInfoToLogInResDto(String userInfo) {
//        // 여기에 적절한 로직을 추가하여 userInfo를 LogInResDto로 변환합니다.
//        // 예시로는 ObjectMapper를 사용하여 JSON 문자열을 파싱하는 방법이 있습니다.
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            return objectMapper.readValue(userInfo, LogInResDto.class);
//        } catch (JsonProcessingException e) {
//            // 변환에 실패한 경우 처리
//            e.printStackTrace();
//            // 예외 상황에 대한 적절한 응답 처리
//            return null;
//        }
//    }
}
