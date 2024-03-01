import { useEffect, useState } from "react";
import { friendResponse } from "../../types/authType";
import { getFriendList } from "../../apis/friendApi";
import UserDataInfo from "../common/UserDataInfo";

const FriendsList = () => {
  const [friendsList, setFriendsList] = useState<friendResponse[]>([]);
  useEffect(() => {
    // 렌더링 시 해당 유저의 친구 목록 가져오기
    const fetchData = async () => {
      const getFriendResponse = await getFriendList();
      if (getFriendResponse !== null) {
        setFriendsList(getFriendResponse);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {friendsList.map((friend) => (
        <div key={friend.userId}>
          <UserDataInfo
            id={friend.userId}
            nickname={friend.nickname}
            profile={friend.profile}
            image={friend.image}
            status="friendList"
          />
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
