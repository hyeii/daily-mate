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

export interface friendsInfo {
  fromId: number;
  requestDate: Date;
  approvalDate: Date;
}
