import { useEffect, useState } from "react";
import { getFriends } from "../../types/authType";

const WaitingList = () => {
  const [waitingList, setWaitingList] = useState<getFriends[]>([]);
  useEffect(() => {
    // 렌더링 시 해당 유저의 친구 대기중 목록 가져오기
  });
  return (
    <div>
      <h3>대기중 리스트</h3>
      <div>
        {waitingList.map((friend) => (
          <div key={friend.fromId}>{friend.fromId}</div>
        ))}
      </div>
    </div>
  );
};

export default WaitingList;
