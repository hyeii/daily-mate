import { useState } from "react";
import FriendsList from "./FriendsList";
import WaitingList from "./WaitingList";
import { TabContainer, TabText } from "../common/CommonStyledComponents";

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
      <TabContainer>
        <TabText
          onClick={moveToListHandler}
          style={isList ? { fontWeight: "bold" } : {}}
        >
          친구목록
        </TabText>
        <TabText
          onClick={moveToWaitingHandler}
          style={!isList ? { fontWeight: "bold" } : {}}
        >
          대기중
        </TabText>
      </TabContainer>
      {isList ? <FriendsList /> : <WaitingList />}
    </div>
  );
};

export default FriendsListPage;
