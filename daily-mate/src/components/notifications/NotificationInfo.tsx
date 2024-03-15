import { useEffect, useState } from "react";
import { notifyResponse } from "../../types/notificationType";
import styled from "styled-components";
import { getUserByUserId } from "../../apis/authApis";
import { confirmFriend } from "../../apis/friendApi";
import { useNavigate } from "react-router-dom";
import { LuX } from "react-icons/lu";
import { deleteNofity } from "../../apis/notificationApis";

interface props {
  notify: notifyResponse;
}

const NotificationInfo = ({ notify }: props) => {
  const [type, setType] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [fromUser, setFromUser] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserByUserId(notify.fromId);
      if (userData) {
        setFromUser(userData.nickname);
      }
    };
    switch (notify.type) {
      case "친구요청":
        setType(1);
        setContent("님으로부터 친구 신청이 도착했습니다.");
        setAction("승낙하기");
        break;
      case "친구승낙":
        setType(2);
        setContent("님과 친구가 되었습니다.");
        break;
      case "일기좋아요":
        setType(3);
        setContent("님이 일기를 좋아합니다.");
        setAction("바로가기");
        break;
      case "댓글좋아요":
        setType(4);
        setContent("님이 댓글을 좋아합니다.");
        setAction("바로가기");
        break;
      case "댓글":
        setType(5);
        setContent("님이 댓글을 달았습니다.");
        setAction("바로가기");
        break;
      default:
        break;
    }

    fetchUser();
  }, []);

  const handleAction = async () => {
    switch (type) {
      case 1:
        const submitFriendRes = await confirmFriend(notify.fromId, fromUser);
        if (submitFriendRes) {
          await deleteNofity(notify.alertId);
          alert(`${fromUser}님과 친구가 되었습니다.`);
          window.location.reload();
        }
        break;
      case 2:
        break;
      case 3:
      case 4:
      case 5:
        navigate(`/diary/daily/${notify.diaryId}`);
        break;
      default:
        break;
    }
  };

  const handleDeleteNotify = () => {
    const deleteResult = deleteNofity(notify.alertId);
    if (deleteResult !== null) {
      window.location.reload();
    }
  };

  return (
    <Wrapper>
      <Contianer>
        <div>
          {fromUser}
          {content}
        </div>
        <ActionContainer onClick={handleAction}>{action}</ActionContainer>
      </Contianer>
      <CloseContainer>
        <CloseBtn onClick={handleDeleteNotify} size={20} />
      </CloseContainer>
    </Wrapper>
  );
};

export default NotificationInfo;

const Wrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

const Contianer = styled.div`
  width: -webkit-fill-available;
  height: 2.5rem;
  flex: 6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  box-shadow: 0 0 5px rgb(137, 137, 137);
`;

const ActionContainer = styled.div`
  cursor: pointer;
  &: hover {
    font-weight: bold;
  }
`;

const CloseContainer = styled.div`
  width: 2.5rem;
  display: flex;
  justify-content: end;
`;

const CloseBtn = styled(LuX)`
  cursor: pointer;
  &: hover {
    color: #848484;
  }
`;
