export interface userInfo {
  userId: number;
  nickname: string;
  email: string;
  profile: string;
  type: string;
}

// 로그인 ResponseData
export interface userResponse {
  userId: number;
  accessToken: string;
  refreshToken: string;
  email: string;
  nickName: string;
  image: string;
  profile: string;
  type: string;
}

// 내 정보 조회 ResponseData
export interface myInfoResponse {
  email: string;
  nickname: string;
  image: string;
  profile: string;
}

// 회원가입 body
export interface signUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface updatePasswordInput {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

export interface getFriends {
  fromId: number;
  requestDate: string;
  approvalDate: string;
}

export enum diaryOpenType {
  closed = "비공개",
  friend = "친구공개",
  public = "전체공개",
}

export interface friendResponse {
  userId: number;
  email: string;
  nickname: string;
  image: string;
  profile: string;
  requestDate: string;
}

export interface searchResponse {
  userId: number;
  email: string;
  nickname: string;
  image: string;
  profile: string;
  status: boolean;
  requestDate: string | null;
}

export interface reIssueTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface getInfoResponse {
  userId: number;
  email: string;
  nickname: string;
  image: string;
  profile: string;
  type: string;
  createdAt: string;
}
