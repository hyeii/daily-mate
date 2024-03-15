import { useEffect, useState } from "react";
import { friendResponse } from "../../types/authType";
import { getWaitingList } from "../../apis/friendApi";
import UserDataInfo from "../common/UserDataInfo";

const WaitingList = () => {
  const [waitingList, setWaitingList] = useState<friendResponse[]>([]);
  useEffect(() => {
    // 렌더링 시 해당 유저의 친구 목록 가져오기
    const fetchData = async () => {
      const getWaitingResponse = await getWaitingList();
      if (getWaitingResponse !== null) {
        setWaitingList(getWaitingResponse);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {waitingList.map((friend) => (
        <div key={friend.userId}>
          <UserDataInfo
            id={friend.userId}
            nickname={friend.nickname}
            profile={friend.profile}
            image={friend.image}
            status="waitingList"
          />
        </div>
      ))}
    </div>
  );
};

export default WaitingList;
