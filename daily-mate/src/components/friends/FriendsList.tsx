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
      } else {
        setFriendsList([
          {
            fromId: 10,
            email: "1232@123.com",
            nickname: "김더미",
            image: "url",
            profile: "졸려",
            requestDate: new Date(),
          },
          {
            fromId: 11,
            email: "1232@123.com",
            nickname: "최더미",
            image: "url",
            profile: "배고파",
            requestDate: new Date(),
          },
        ]);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        {friendsList.map((friend) => (
          <div key={friend.fromId}>
            <UserDataInfo
              id={friend.fromId}
              nickname={friend.nickname}
              profile={friend.profile}
              image={friend.image}
              status="friendsList"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
