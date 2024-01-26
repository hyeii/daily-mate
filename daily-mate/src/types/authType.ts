export interface userInfo {
  nickname: String;
  email: String;
  profileMessage: String;
  loginType: String;
  friendsCount: number;
}

export interface updatePasswordInput {
  existPassword: String;
  newPassword: String;
  newPasswordCheck: String;
}

export interface getFriends {
  fromId: number;
  requestDate: Date;
  approvalDate: Date;
}

export enum diaryOpenType {
  closed = "비공개",
  friend = "친구공개",
  public = "전체공개",
}

export interface friendInfo {
  nickname: String;
  profileMessage: String;
  imageURL: String;
  openType: diaryOpenType;
  isFriend: boolean;
}

export interface friendInfoType {
  status: "friendsList" | "waitingList" | "search";
}
