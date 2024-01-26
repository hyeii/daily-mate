import {
  diaryOpenType,
  friendInfo,
  friendInfoType,
} from "../../types/authType";

const FriendInfo = (status: friendInfoType) => {
  // status : 친구 목록, 대기중 목록, 검색 결과 목록 중 어떤 상황인가.

  // 들어와야 할 props : 어디에 쓰일 컴포넌트인지 + 유저 정보

  // -----더미데이터----
  const dummyFriend: friendInfo = {
    nickname: "김더미",
    profileMessage: "졸려",
    imageURL: "url",
    openType: diaryOpenType.friend,
    isFriend: true,
  };

  return (
    <div>
      <div>{dummyFriend.imageURL}</div>
      <div>{dummyFriend.nickname}</div>
      <div>{dummyFriend.profileMessage}</div>
      <div>etc</div>
      <div>{dummyFriend.openType}</div>
      {status.status === "friendsList" ? (
        <div>친구 취소</div>
      ) : status.status === "waitingList" ? (
        <div>친구 수락</div>
      ) : (
        <div>친구 신청</div>
      )}
    </div>
  );
};

export default FriendInfo;
