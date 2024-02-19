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
      } else {
        setWaitingList([
          {
            userId: 10,
            email: "1232@123.com",
            nickname: "김아직친구아님",
            image: "url",
            profile: "신청받아",
            requestDate: "2024-02-10",
          },
          {
            userId: 11,
            email: "1232@123.com",
            nickname: "박친구아님",
            image: "url",
            profile: "신청받아22",
            requestDate: "2024-02-10",
          },
          {
            userId: 12,
            email: "1232@123.com",
            nickname: "이친구아님",
            image: "url",
            profile: "신청받아33",
            requestDate: "2024-02-10",
          },
        ]);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
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
    </div>
  );
};

export default WaitingList;
