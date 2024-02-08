export interface userInfo {
  userId: number;
  nickname: string;
  email: string;
  profileMessage: string;
  loginType: string;
  friendsCount: number;
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

export interface updatePasswordInput {
  existPassword: string;
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

export interface friendInfo {
  nickname: string;
  profileMessage: string;
  imageURL: string;
  openType: diaryOpenType;
  isFriend: boolean;
}

export interface friendInfoType {
  status: "friendsList" | "waitingList" | "search";
}
