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

![Flutter](https://img.shields.io/badge/flutter-skyblue?style=for-the-badge&logo=flutter) ![Dart](https://img.shields.io/badge/dart-blue?style=for-the-badge&logo=dart) ![Firebase](https://img.shields.io/badge/firebase-yellow?style=for-the-badge&logo=firebase)

### back

![springboot](https://img.shields.io/badge/springboot-6DB33F.svg?&style=for-the-badge&logo=springboot&logoColor=white) ![springsecurity](https://img.shields.io/badge/springsecurity-6DB33F.svg?&style=for-the-badge&logo=springsecurity&logoColor=white) ![jsonwebtokens](https://img.shields.io/badge/jsonwebtokens-000000.svg?&style=for-the-badge&logo=jsonwebtokens&logoColor=white) ![JPA](https://img.shields.io/badge/JPA-6DB33F.svg?&style=for-the-badge&logo=JPA&logoColor=white) 

### DB

![mysql](https://img.shields.io/badge/mariadb-B45F04.svg?&style=for-the-badge&logo=mariadb&logoColor=white) ![amazons3](https://img.shields.io/badge/amazons3-569A31.svg?&style=for-the-badge&logo=amazons3&logoColor=white) ![redis](https://img.shields.io/badge/redis-DC382D.svg?&style=for-the-badge&logo=redis&logoColor=white)


<br>
<br>

## 🗃️ ERD

![image](https://github.com/DailyMate/DailyMate/assets/94058311/365976a4-9bd5-4df5-b35c-b01c8c93065e)


<br>

<br>

## 🎨 Figma
https://www.figma.com/file/UzIJeOAicadn2hDrEg2nBl/Daily-Mate?type=design&node-id=1-2&mode=design&t=Swo7wwkgTX4EJ7zj-0

https://www.figma.com/proto/UzIJeOAicadn2hDrEg2nBl/Daily-Mate?type=design&node-id=123-615&t=N70Yp5HAs43Y7gJN-1&scaling=scale-down&page-id=1%3A2&mode=design


<br>

<br>

## Convention
https://www.notion.so/fa69a91047394e518eaf3b6e9607f545

## 🗳️ API 명세서

[API 명세서 보러가기 (∩^o^)⊃━☆](https://www.notion.so/API-7ea51d4cc529432499cde1fa8621dc21)

<br>
<br>

## 📂 프로젝트 구성

# Backend
<detail>
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
</detail>

# Frontend
<detail>
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
</detail>

<br>
<br>

## 🖥 서비스 화면
### 메인화면


### 로그인 화면 


### 회원가입 화면


### 다이어리 메인


### 가계부 메인


### 투두리스트 메인


### 알림 화면


### 친구 화면




<br>

## 📌 시연 시나리오


<br>
<br>

