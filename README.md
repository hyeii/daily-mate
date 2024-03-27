# DailyMate

## 👩‍💻👨‍💻 팀원 소개
| 이름                      | 역할       | 설명                                                         |
| ------------------------- | ---------- | ------------------------------------------------------------ |
| 윤혜민 (팀장)                   | Frontend(Leader) | 프론트엔드 리더 / 메인화면, 유저, 다이어리, 가계부, 친구, 알림 화면 구현 |
| 김민우             | Backend | JPA를 활용한 백엔드 가계부, 알림 구현 |
| 김은솔                    | Backend | JPA를 활용한 백엔드 다이어리, 댓글 구현 |
| 문홍웅                    | Full Stack | 할일 백 & 프론트 구현 |
| 조윤영                    | Backend(Leader) | 백엔드 리더 / Spring Security & OAuth2 구현, 친구 구현 |

<br>
<br>

## 📅 프로젝트 기간

### 2024.1.2 ~ 2023.02.27 (8주)

- 아이디어 선정 및 구체화 : 2024.01.02 ~ 2024.01.03  
- 기능 명세서 확정 : 2024.01.04 ~ 2024.01.08  
- 목업 작성 : 2024.01.11  
- ERD 작성 : 2024.01.12 ~ 2024.01.18  
- API 명세서 작성 : 2024.01.19 ~ 2024.01.21  
- 프로젝트 구현 : 2024.01.22 ~ 2024.02.27  
- 산출물 정리 : 2024.03.04 ~ 2024.03.11  

<br>

<br>

## 💡 프로젝트 컨셉 및 주요 기능
일기, 할일, 가계부 관리 서비스  
<br>  


<br>

### 예상 사용자
다이어리, 할일, 가계부를 동시에 관리하면서 친구와 공유하고 싶은 효율중심의 MZ 세대  


<br>

### 주요 기능

다이어리 : 다이어리를 작성 및 공유할 수 있습니다. 기분에 따라 다꾸도 할 수 있습니다.  
가계부 : 가계부를 작성할 수 있습니다. 카테고리 또는 월별로 관리할 수 있습니다.  
할일관리 : 투두리스트를 작성하여 스케쥴 관리가 용이합니다. 중요도에 따라 관리할 수 있습니다.  
친구 : 친구끼리 다이어리를 공유하거나 댓글 또는 좋아요 기능을 사용할 수 있습니다.  
알림 : 친구 또는 다이어리와 관련한 알림 기능이 있습니다.  

<br>
<br>

## 🛠️ 기술스택

### front

![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Firebase](https://img.색에서 "다이어리 놀러가기"를 선택합니다.

![친구다여리놀러가기2](https://github.com/DailyMate/DailyMate/assets/94058311/0c97c510-1f87-4753-b29e-17efb29f377c)
2. 친구 다이어리를 구경할 수 있습니다.  

![친구다여리놀러가기3](https://github.com/DailyMate/DailyMate/assets/94058311/50e50b2d-f21f-4b98-b6b6-83e83db211a2)
![친구다여리놀러가기4-댓글좋아요](https://github.com/DailyMate/DailyMate/assets/94058311/d827efb0-8cc8-44d1-9df0-e8a9b5762af0)
3. 다이어리 댓글에 좋아요를 누를 수 있습니다.  

![친구다여리놀러가기5-댓글달기](https://github.com/DailyMate/DailyMate/assets/94058311/4109d7c8-62a2-4611-9f2f-9b5a455fe843)
![친구다여리놀러가기6-댓글달기2](https://github.com/DailyMate/DailyMate/assets/94058311/7f7f9325-ec93-43b6-9083-1de770991439)
4. 다이어리에 댓글도 달 수 있습니다.  

![친구다여리놀러가기7-댓글달기3-알림](https://github.com/DailyMate/DailyMate/assets/94058311/cdbc4f81-3f30-4f43-a04b-6df71810725d)
5. 댓글 또는 좋아요와 관련된 활동은 친구의 알림에 실시간으로 반영됩니다.  
<br>

### 가계부 
![가계부메인화면](https://github.com/DailyMate/DailyMate/assets/94058311/b3ded2ab-d3de-4649-99c3-46b486992cfc)
1. 가게부 메인 화면입니다. 다이어리와 동일한 달력 형식을 사용하여 손쉽게 관리할 수 있습니다.  

![가계부 날짜별 카테고리별 조회 메인1](https://github.com/DailyMate/DailyMate/assets/94058311/5b35bc85-837f-4afb-9e96-c103e2863c85)
2. 원하는 날짜를 선택하면 일자별 카테고리별 가계부 내역을 상세하게 조회할 수 있습니다.   

![가계부 날짜별 카테고리별 조회 메인-마우스대면 요약뜸](https://github.com/DailyMate/DailyMate/assets/94058311/88b00268-7e81-4e55-a487-609d147e2561)
3. 막대 그래프에 마우스를 올리면 상세한 수치도 확인할 수 있습니다.  

![가계부 등록 2](https://github.com/DailyMate/DailyMate/assets/94058311/dc6aa967-f988-445e-b189-d058fc1cd9b8)
4. "항목 추가" 버튼을 사용하여 가계부를 추가할 수 있습니다.

![가계부 월통계](https://github.com/DailyMate/DailyMate/assets/94058311/d3240b57-a67f-4479-a6c9-f968d58b16b8)
5. 월별 통계도 확인할 수 있습니다. 시각적으로 간결히 구성되어 있어 돈관리에 용이합니다.  

<br>

### 투두리스트 
![할일 메인](https://github.com/DailyMate/DailyMate/assets/94058311/8c363fba-57a6-4328-bf37-e39222db35d2)
1. 투두리스트 메인 화면입니다. 달력 형태로 쉽게 스케줄을 관리할 수 있습니다.  
2. 달성도를 색으로 분리하여 월단위 목표 관리에 용이합니다.  

![할일 조회하기](https://github.com/DailyMate/DailyMate/assets/94058311/a85b599a-3341-45d0-9c5f-67c9527ffa4e)
3. 원하는 날짜를 선택하면 해당 날짜의 할일 리스트가 중요도 순으로 조회됩니다.  

![할일 등록1](https://github.com/DailyMate/DailyMate/assets/94058311/88e938e4-74fe-4833-a22b-5e72f4e3e405)
![할일 등록2 - 확인](https://github.com/DailyMate/DailyMate/assets/94058311/0610c2fd-4dbb-453a-a02f-0ec091f6c9b0)
4. "할 일 추가" 버튼을 통해 할일을 등록할 수 있으며, 반복 설정도 가능합니다.   
5. 할일을 등록하면 해당 날짜만큼 할일 리스트에 추가됩니다.  

![할일 수정 1](https://github.com/DailyMate/DailyMate/assets/94058311/7739bf8c-fb09-42ce-859a-80e65a7f4690)
![할일 수정 2](https://github.com/DailyMate/DailyMate/assets/94058311/147eec6f-2fe8-43e2-a833-e3c9f02497dd)
![할일 수정 3- 수정완 및 내일로미루기 1](https://github.com/DailyMate/DailyMate/assets/94058311/a7b3324e-6b8a-4dc1-86f3-1e67463146fe)
6. "수정하기"를 이용하여 수정할 수 있습니다.  

![내일로미루기 1 5](https://github.com/DailyMate/DailyMate/assets/94058311/e190e7b5-899f-40bc-8332-8549aef58d1e)
![내일로미루기 2](https://github.com/DailyMate/DailyMate/assets/94058311/474e7c6e-cd8b-4d9c-8d66-a6ff17d2477b)
7. "내일로 미루기"를 이용하여 달성하지 못한 일을 내일 날짜로 미룰 수 있습니다.  

![할일 드래그앤드랍 1](https://github.com/DailyMate/DailyMate/assets/94058311/666133da-bc71-45e7-b34d-62aa107cf4ba)
![할일 드래그앤드랍 2](https://github.com/DailyMate/DailyMate/assets/94058311/90280be4-a379-456b-a6de-06053fac1cfc)
8. 드래그 앤 드랍 기능을 통해 중요도를 변경할 수 있습니다.  
<br>

### 친구관리
![사용자검색 1](https://github.com/DailyMate/DailyMate/assets/94058311/ad9d48a0-bbe9-4b90-94b5-79d95248fe96)
![사용자검색 2](https://github.com/DailyMate/DailyMate/assets/94058311/68de2886-f575-4082-904c-8a08b1c5f61d)
1. 사용자 검색을 통 해당 닉네임이 포함된 사용자들 목록을 조회할 수 있습니다.

![사용자검색3-친구신청1](https://github.com/DailyMate/DailyMate/assets/94058311/d8771a76-a1c9-448c-a933-d13e3e3b5857)
![사용자검색4-친구신청2](https://github.com/DailyMate/DailyMate/assets/94058311/fded109e-158a-4897-9372-279ab6458dfe)
2. 친구가 되고픈 사용자에게 "친구 신청"을 할 수 있습니다.  

![사용자검색5-친구신청3-알림1](https://github.com/DailyMate/DailyMate/assets/94058311/4a407c2e-1f53-4f33-92a8-8ecaf55e2615)
3. 친구 신청을 받은 사용자에게 실시간으로 알림이 전송됩니다.

![사용자검색6-친구신청4-알림2-친구대기중](https://github.com/DailyMate/DailyMate/assets/94058311/73416cf7-dc05-493a-aeb3-5dcbb433cfc3)
4. "대기중"인 친구 목록에서 친구 요청 내역들을 확인할 수 있습니다.  

![사용자검색7-친구승인또는거절](https://github.com/DailyMate/DailyMate/assets/94058311/1e2273fb-b3e8-4017-a483-0fdbdf29b988)
5. 친구 승인 또는 거절을 할 수 있습니다.  

<br>



<br>
<br>

## 📂 프로젝트 구성

# Backend
   DailyMate           
    └─src  
        ├─main  
        │  ├─java  
        │  │  └─com  
        │  │      └─dailymate  
        │  │          │  DailyMateApplication.java  
        │  │          │    
        │  │          ├─domain  
        │  │          │  ├─account  
        │  │          │  │  ├─api  
        │  │          │  │  │      AccountController.java  
        │  │          │  │  │        
        │  │          │  │  ├─constant  
        │  │          │  │  │      AccountCategory.java  
        │  │          │  │  │      AccountType.java  
        │  │          │  │  │        
        │  │          │  │  ├─dao  
        │  │          │  │  │      AccountRepository.java  
        │  │          │  │  │        
        │  │          │  │  ├─domain  
        │  │          │  │  │      Account.java  
        │  │          │  │  │      
        │  │          │  │  ├─dto  
        │  │          │  │  │      AccountReqDto.java  
        │  │          │  │  │      AccountResDto.java  
        │  │          │  │  │      AmountResDto.java  
        │  │          │  │  │      OutputResDto.java  
        │  │          │  │  │      
        │  │          │  │  ├─exception  
        │  │          │  │  │      AccountBadRequestException.java  
        │  │          │  │  │      AccountExceptionMessage.java  
        │  │          │  │  │      AccountForbiddenException.java  
        │  │          │  │  │      AccountNotFoundException.java  
        │  │          │  │  │      
        │  │          │  │  └─service  
        │  │          │  │          AccountService.java  
        │  │          │  │          AccountServiceImpl.java  
        │  │          │  │          
        │  │          │  ├─alert  
        │  │          │  │  ├─api  
        │  │          │  │  │      AlertController.java  
        │  │          │  │  │      
        │  │          │  │  ├─constant  
        │  │          │  │  │      AlertType.java  
        │  │          │  │  │      
        │  │          │  │  ├─dao  
        │  │          │  │  │      AlertRepository.java  
        │  │          │  │  │      
        │  │          │  │  ├─domain  
        │  │          │  │  │      Alert.java  
        │  │          │  │  │      
        │  │          │  │  ├─dto  
        │  │          │  │  │      AlertReqDto.java  
        │  │          │  │  │      AlertResDto.java  
        │  │          │  │  │      UrlDto.java  
        │  │          │  │  │      UrlResDto.java  
        │  │          │  │  │      
        │  │          │  │  ├─exception  
        │  │          │  │  │      AlertExceptionMessage.java  
        │  │          │  │  │      AlertForbiddenException.java  
        │  │          │  │  │      AlertNotFoundException.java  
        │  │          │  │  │      
        │  │          │  │  └─service  
        │  │          │  │          AlertService.java  
        │  │          │  │          AlertServiceImpl.java  
        │  │          │  │          
        │  │          │  ├─comment  
        │  │          │  │  ├─api  
        │  │          │  │  │      CommentController.java  
        │  │          │  │  │      
        │  │          │  │  ├─dao  
        │  │          │  │  │      CommentRepository.java  
        │  │          │  │  │      LikeCommentRepository.java  
        │  │          │  │  │        
        │  │          │  │  ├─domain  
        │  │          │  │  │      Comment.java  
        │  │          │  │  │      LikeComment.java  
        │  │          │  │  │      LikeCommentKey.java  
        │  │          │  │  │      
        │  │          │  │  ├─dto  
        │  │          │  │  │      CommentReqDto.java  
        │  │          │  │  │      CommentResDto.java  
        │  │          │  │  │      
        │  │          │  │  ├─exception  
        │  │          │  │  │      CommentBadRequestException.java  
        │  │          │  │  │      CommentExceptionMessage.java  
        │  │          │  │  │      CommentForbiddenException.java  
        │  │          │  │  │      CommentNotFoundException.java  
        │  │          │  │  │        
        │  │          │  │  └─service  
        │  │          │  │          CommentService.java  
        │  │          │  │          CommentServiceImpl.java  
        │  │          │  │           
        │  │          │  ├─diary  
        │  │          │  │  ├─api  
        │  │          │  │  │      DiaryController.java  
        │  │          │  │  │      
        │  │          │  │  ├─constant  
        │  │          │  │  │      Feeling.java  
        │  │          │  │  │      OpenType.java  
        │  │          │  │  │      Weather.java  
        │  │          │  │  │      
        │  │          │  │  ├─dao  
        │  │          │  │  │      DiaryRepository.java  
        │  │          │  │  │      LikeDiaryRepository.java  
        │  │          │  │  │      
        │  │          │  │  ├─domain  
        │  │          │  │  │      Diary.java  
        │  │          │  │  │      LikeDiary.java  
        │  │          │  │  │      LikeDiaryKey.java  
        │  │          │  │  │      
        │  │          │  │  ├─dto  
        │  │          │  │  │      DiaryMonthlyResDto.java  
        │  │          │  │  │      DiaryReqDto.java  
        │  │          │  │  │      DiaryResDto.java  
        │  │          │  │  │      
        │  │          │  │  ├─exception  
        │  │          │  │  │      DiaryBadRequestException.java  
        │  │          │  │  │      DiaryExceptionMessage.java  
        │  │          │  │  │      DiaryForbiddenException.java  
        │  │          │  │  │      DiaryNotFoundException.java  
        │  │          │  │  │      
        │  │          │  │  └─service  
        │  │          │  │          DiaryService.java    
        │  │          │  │          DiaryServiceImpl.java  
        │  │          │  │          
        │  │          │  ├─friend  
        │  │          │  │  ├─api  
        │  │          │  │  │      FriendController.java  
        │  │          │  │  │      
        │  │          │  │  ├─dao  
        │  │          │  │  │      FriendRepository.java  
        │  │          │  │  │      
        │  │          │  │  ├─domain  
        │  │          │  │  │      Friend.java  
        │  │          │  │  │      
        │  │          │  │  ├─dto  
        │  │          │  │  │      FriendInfoDto.java  
        │  │          │  │  │      
        │  │          │  │  ├─exception  
        │  │          │  │  │      FriendBadRequestException.java   
        │  │          │  │  │      FriendExceptionMessage.java  
        │  │          │  │  │      FriendNotFountException.java  
        │  │          │  │  │      
        │  │          │  │  └─service  
        │  │          │  │          FriendService.java  
        │  │          │  │          FriendServiceImpl.java  
        │  │          │  │          
        │  │          │  ├─todo  
        │  │          │  │  ├─api  
        │  │          │  │  │      TodoController.java  
        │  │          │  │  │      
        │  │          │  │  ├─dao  
        │  │          │  │  │      TodoRepository.java    
        │  │          │  │  │      
        │  │          │  │  ├─domain  
        │  │          │  │  │      Todo.java  
        │  │          │  │  │      
        │  │          │  │  ├─dto  
        │  │          │  │  │      AddTodoReqDto.java  
        │  │          │  │  │      TodoReqDto.java  
        │  │          │  │  │      TodoResDto.java  
        │  │          │  │  │      UpdateTodoReqDto.java  
        │  │          │  │  │      
        │  │          │  │  ├─exception  
        │  │          │  │  │      TodoExceptionMessage.java  
        │  │          │  │  │      TodoForbiddenException.java  
        │  │          │  │  │      TodoNotFoundException.java  
        │  │          │  │  │      
        │  │          │  │  └─service  
        │  │          │  │          TodoService.java    
        │  │          │  │          TodoServiceImpl.java  
        │  │          │  │          
        │  │          │  └─user  
        │  │          │      ├─api  
        │  │          │      │      GoogleController.java  
        │  │          │      │      UserController.java  
        │  │          │      │      
        │  │          │      ├─constant  
        │  │          │      │      UserType.java  
        │  │          │      │      
        │  │          │      ├─dao  
        │  │          │      │      RefreshTokenRedisRepository.java  
        │  │          │      │      UserRepository.java  
        │  │          │      │      
        │  │          │      ├─domain  
        │  │          │      │      RefreshToken.java  
        │  │          │      │      Users.java  
        │  │          │      │      
        │  │          │      ├─dto  
        │  │          │      │  ├─oauth  
        │  │          │      │  │      GoogleOAuth2UserDto.java  
        │  │          │      │  │      KakaoOAuth2UserDto.java  
        │  │          │      │  │      OAuth2UserDto.java  
        │  │          │      │  │      OAuthAttributes.java  
        │  │          │      │  │      
        │  │          │      │  ├─request  
        │  │          │      │  │      LogInReqDto.java  
        │  │          │      │  │      PasswordDto.java  
        │  │          │      │  │      SignUpReqDto.java  
        │  │          │      │  │      UpdatePasswordReqDto.java  
        │  │          │      │  │      UpdateUserReqDto.java  
        │  │          │      │  │      
        │  │          │      │  └─response  
        │  │          │      │          LogInResDto.java  
        │  │          │      │          MyInfoDto.java  
        │  │          │      │          UserAllInfoDto.java  
        │  │          │      │          UserSearchInfoDto.java  
        │  │          │      │          
        │  │          │      ├─exception  
        │  │          │      │      UserBadRequestException.java  
        │  │          │      │      UserExceptionMessage.java  
        │  │          │      │      UserForbiddenException.java  
        │  │          │      │      UserNotFoundException.java  
        │  │          │      │              
        │  │          │      └─service  
        │  │          │              UserService.java  
        │  │          │              UserServiceImpl.java  
        │  │          │              
        │  │          └─global  
        │  │              ├─common  
        │  │              │  │  BaseTime.java  
        │  │              │  │  
        │  │              │  ├─jwt  
        │  │              │  │  │  JwtAuthenticationFilter.java  
        │  │              │  │  │  JwtTokenDto.java  
        │  │              │  │  │  JwtTokenProvider.java  
        │  │              │  │  │  
        │  │              │  │  ├─constant  
        │  │              │  │  │      JwtTokenExpiration.java  
        │  │              │  │  │      
        │  │              │  │  └─exception  
        │  │              │  │          JwtAccessDeniedHandler.java  
        │  │              │  │          JwtAuthenticationEntryPoint.java  
        │  │              │  │          
        │  │              │  ├─oauth  
        │  │              │  │      OAuth2FailureHandler.java  
        │  │              │  │      OAuth2SuccessHandler.java  
        │  │              │  │      OAuth2UserServiceImpl.java  
        │  │              │  │      
        │  │              │  ├─redis  
        │  │              │  │      RedisUtil.java  
        │  │              │  │      
        │  │              │  └─security  
        │  │              │          SecurityUtil.java  
        │  │              │          UserDetailsImpl.java  
        │  │              │          UserDetailsServiceImpl.java  
        │  │              │          
        │  │              ├─config  
        │  │              │      CorsConfig.java  
        │  │              │      RedisConfig.java  
        │  │              │      S3Config.java  
        │  │              │      SecurityConfig.java  
        │  │              │      SwaggerConfig.java  
        │  │              │      
        │  │              ├─dto  
        │  │              │      MessageDto.java  
        │  │              │      
        │  │              ├─exception  
        │  │              │  │  GlobalExceptionHandler.java  
        │  │              │  │  
        │  │              │  └─exception  
        │  │              │          BadRequestException.java  
        │  │              │          ForbiddenException.java  
        │  │              │          NotFoundException.java  
        │  │              │          TokenException.java  
        │  │              │          TokenExceptionMessage.java  
        │  │              │          
        │  │              └─image  
        │  │                  ├─exception  
        │  │                  │      ImageBadRequestException.java  
        │  │                  │      ImageExceptionMessage.java  
        │  │                  │      ImageNotFoundException.java  
        │  │                  │      
        │  │                  └─service  
        │  │                          ImageService.java  
        │  │                          ImageServiceImpl.java  
        │  │                          
        │  └─resources  
        │      │  application-h2.yml  
        │      │  application-jwt.yml  
        │      │  application-oauth.yml  
        │      │  application-s3.yml  
        │      │  application-swagger.yml  
        │      │  application.yml  
        │      │  data.sql  
        │      │    
        │      └─static  
        │              index.html  
        │              
        └─test  
            └─java  
                └─com  
                    └─example  
                        └─dailymate  
                                DailyMateApplicationTests.java  

# Frontend
 daily-mate  
 │  .gitignore  
 │  package-lock.json  
 │  package.json  
 │  README.md  
 │  tsconfig.json  
 │  
 ├─public  
 │      defaultImg.png  
 │      favicon.ico  
 │      free-icon-cloudy.png  
 │      free-icon-rainy.png  
 │      free-icon-snow.png  
 │      free-icon-sunny.png  
 │      index.html  
 │      kakao_login_large_narrow.png  
 │      logo192.png  
 │      logo512.png  
 │      manifest.json  
 │      robots.txt  
 │      tony-lee-8IKf54pc3qk-unsplash.jpg  
 │      web_light_sq_SI@4x.png  
 │      
 └─src  
     │  App.css  
     │  App.test.tsx  
     │  App.tsx  
     │  index.css  
     │  index.tsx  
     │  logo.svg  
     │  react-app-env.d.ts  
     │  reportWebVitals.ts  
     │  setupTests.ts  
     │  
     ├─apis  
     │      accountApi.ts  
     │      api.ts  
     │      authApis.ts  
     │      diaryApi.ts  
     │      friendApi.ts  
     │      notificationApis.ts  
     │      searchApi.ts  
     │      
     ├─atoms  
     │      accountAtom.ts  
     │      authAtom.ts  
     │      diaryAtom.ts  
     │      sideBarAtom.ts  
     │      
     ├─components  
     │  │  index.tsx  
     │  │  
     │  ├─account  
     │  │      AccountCalendar.tsx  
     │  │      AccountDaily.tsx  
     │  │      AccountHistory.tsx  
     │  │      AccountMonthly.tsx  
     │  │      AccountMonthlyChart.tsx  
     │  │      AccountPage.tsx  
     │  │      AddAccountModal.tsx  
     │  │      BarChart.tsx  
     │  │      DoughnutChart.tsx  
     │  │      InOutMonthly.tsx  
     │  │      
     │  ├─auth  
     │  │      GoogleRedirectPage.tsx  
     │  │      KakaoRedirectPage.tsx  
     │  │      SignInPage.tsx  
     │  │      SIgnUpPage.tsx  
     │  │      
     │  ├─calendar  
     │  │  │  Calendar.tsx  
     │  │  │  CalendarCells.tsx  
     │  │  │  CalendarDays.tsx  
     │  │  │  CalendarHeader.tsx  
     │  │  │  
     │  │  └─cell  
     │  │          AccountCell.tsx   
     │  │          MyDiaryCell.tsx  
     │  │          OtherDiaryCell.tsx  
     │  │            
     │  ├─common  
     │  │      CommonStyledComponents.tsx  
     │  │      FormatDate.tsx  
     │  │      UserDataInfo.tsx  
     │  │      
     │  ├─diary  
     │  │      AddComment.tsx  
     │  │      DiaryComment.tsx  
     │  │      DiaryDailyPage.tsx  
     │  │      DiaryMonthlyPage.tsx  
     │  │      DiaryWritePage.tsx  
     │  │      PickDateModal.tsx  
     │  │      
     │  ├─friends  
     │  │      FriendsList.tsx  
     │  │      FriendsListPage.tsx  
     │  │      WaitingList.tsx  
     │  │      
     │  ├─main  
     │  │      MainPage.tsx  
     │  │      
     │  ├─mypage  
     │  │      ProfileImage.tsx  
     │  │      ProfilePage.tsx  
     │  │      UpdateInfoPage.tsx  
     │  │      UpdatePasswordPage.tsx  
     │  │      
     │  ├─notifications  
     │  │      NotificationPage.tsx  
     │  │      
     │  ├─search  
     │  │      SearchPage.tsx  
     │  │      
     │  ├─sidebar  
     │  │      SideBar.tsx  
     │  │      
     │  └─todo  
     │          TodoPage.tsx  
     │          
     └─types  
             accountType.ts  
             authType.ts  
             diaryType.ts  
             notificationType.ts  

<br>
<br>


