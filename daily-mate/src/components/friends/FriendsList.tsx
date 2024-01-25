import { useEffect, useState } from "react";
import { friendsInfo } from "../../types/authType";

const FriendsList = () => {
  const [friendsList, setFriendsList] = useState<friendsInfo[]>([]);
  useEffect(() => {
    // 렌더링 시 해당 유저의 친구 목록 가져오기
  });
  return (
    <div>
      <h3>친구 목록 컴포넌트</h3>
      <div>
        {friendsList.map((friend) => (
          <div key={friend.fromId}>{friend.fromId}</div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
