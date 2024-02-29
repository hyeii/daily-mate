import styled from "styled-components";
import { RxDotsHorizontal } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import {
  confirmFriend,
  deleteFriend,
  denyFriend,
  registFriend,
} from "../../apis/friendApi";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atoms/authAtom";

interface props {
  id: number;
  nickname: string;
  image: string;
  profile: string;
  status: string;
}

const UserDataInfo = ({ id, nickname, image, profile, status }: props) => {
  // status : friendList, waitingList, bothWaitingList, search

  const [etcClicked, setEtcClicked] = useState<boolean>(false);
  const userInfo = useRecoilValue(userInfoState);

  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (
      event: React.BaseSyntheticEvent | MouseEvent
    ) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEtcClicked(false);
      }
    };
    if (etcClicked) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [etcClicked, modalRef]);

  const handleEtc = () => {
    setEtcClicked(!etcClicked);
  };

  const handleConfirmFriend = (friendId: number, nickname: string) => {
    const confirmResponse = confirmFriend(friendId, nickname);
    if (confirmResponse !== null) {
      alert(`${nickname}님과 친구가 되었습니다`);
      window.location.reload();
    } else {
      alert("다시 시도해 주세요");
    }
  };

  const handleDenyFriend = (friendId: number, nickname: string) => {
    const denyResponse = denyFriend(friendId, nickname);
    if (denyResponse !== null) {
      alert(`${nickname}님의 친구 신청이 거절되었습니다`);
      window.location.reload();
    } else {
      alert("다시 시도해 주세요");
    }
  };

  const handleDeleteFriend = (friendId: number) => {
    const deleteResponse = deleteFriend(friendId);
    if (deleteResponse !== null) {
      // 새로고침
      alert("친구가 삭제되었습니다.");
      window.location.reload();
    } else {
      alert("다시 시도해 주세요");
    }
  };

  const handleRegistFriend = (toId: number, nickname: string) => {
    const registResponse = registFriend(toId);
    if (registResponse !== null) {
      alert(`${nickname}님에게 친구를 신청했습니다`);
      window.location.reload();
    } else {
      alert("다시 시도해 주세요");
    }
  };

  const handleUserDiary = (id: number) => {
    navigate(`/diary/monthly/${id}`);
  };
  return (
    <FriendInfoWrapper>
      <ImageProfileContainer>
        <ImageBox
          src={process.env.PUBLIC_URL + "/defaultImg.png"}
          alt="default"
        />
        <div>
          <NicknameBox>{nickname}</NicknameBox>
          <ProfileBox>{profile}</ProfileBox>
        </div>
      </ImageProfileContainer>
      <div ref={modalRef} style={{ position: "relative" }}>
        {id !== userInfo.userId ? (
          <EtcIcon onClick={handleEtc} size={24} />
        ) : null}
        {etcClicked ? (
          <EtcModalWrapper>
            {status === "friendList" ? (
              <EtcModalBox onClick={() => handleDeleteFriend(id)}>
                친구 취소
              </EtcModalBox>
            ) : status === "waitingList" ? (
              <div>
                <EtcModalBox onClick={() => handleConfirmFriend(id, nickname)}>
                  친구 승인
                </EtcModalBox>
                <EtcModalBox onClick={() => handleDenyFriend(id, nickname)}>
                  친구 거절
                </EtcModalBox>
              </div>
            ) : status === "search" ? (
              <EtcModalBox onClick={() => handleRegistFriend(id, nickname)}>
                친구 신청
              </EtcModalBox>
            ) : (
              <EtcModalBoxWaiting>친구 대기중</EtcModalBoxWaiting>
            )}
            <EtcModalBox onClick={() => handleUserDiary(id)}>
              다이어리 놀러가기
            </EtcModalBox>
          </EtcModalWrapper>
        ) : null}
      </div>
    </FriendInfoWrapper>
  );
};

export default UserDataInfo;

const FriendInfoWrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const ImageProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageBox = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  object-fit: cover;
`;

const NicknameBox = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-left: 15px;
`;

const ProfileBox = styled.div`
  font-size: 0.9rem;
  margin-left: 15px;
`;

const EtcIcon = styled(RxDotsHorizontal)`
  cursor: pointer;
  position: relative;
`;

const EtcModalWrapper = styled.div`
  position: absolute;
  z-index: 999;
  width: 130px;
  top: 24px;
  right: 0px;
  background: #ffffff;
  box-shadow: 0px 0px 10px #939393;
  border-radius: 10px;
  padding: 4px 8px;
`;

const EtcModalBox = styled.div`
  cursor: pointer;
  margin: 0.5rem 0;
  &: hover {
    font-weight: bold;
  }
`;

const EtcModalBoxWaiting = styled.div`
  margin: 0.5rem 0;
`;
