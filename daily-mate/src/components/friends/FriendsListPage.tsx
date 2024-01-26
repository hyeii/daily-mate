import { useState } from "react";
import FriendsList from "./FriendsList";
import WaitingList from "./WaitingList";

const FriendsListPage = () => {
  const [isList, setIsList] = useState(true);

  const moveToListHandler = () => {
    setIsList(true);
  };

  const moveToWaitingHandler = () => {
    setIsList(false);
  };

  return (
    <div>
      <span onClick={moveToListHandler}>친구목록</span>
      <span onClick={moveToWaitingHandler}>대기중</span>
      {isList ? <FriendsList /> : <WaitingList />}
    </div>
  );
};

export default FriendsListPage;
