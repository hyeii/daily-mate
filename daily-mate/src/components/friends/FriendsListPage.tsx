import { useState } from "react";
import FriendsList from "./FriendsList";
import WaitingList from "./WaitingList";

const FriendsListPage = () => {
  return (
    <div>
      <h3>친구목록</h3>
      <h3>대기중</h3>
      <FriendsList />
      <WaitingList />
    </div>
  );
};

export default FriendsListPage;
