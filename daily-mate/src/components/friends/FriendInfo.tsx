import styled from "styled-components";
import { RxDotsHorizontal } from "react-icons/rx";
import { friendResponse } from "../../types/authType";
import { useEffect, useRef, useState } from "react";
import {
  confirmFriend,
  deleteFriend,
  denyFriend,
  registFriend,
} from "../../apis/friendApi";

interface props {
  status: string;
  friendData: friendResponse;
}

const FriendInfo = ({ status, friendData }: props) => {
  // status : 친구 목록, 대기중 목록, 검색 결과 목록 중 어떤 상황인가.
  // status: "friendsList" | "waitingList" | "search"

  // 들어와야 할 props : 어디에 쓰일 컴포넌트인지 + 유저 정보
  const [etcClicked, setEtcClicked] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

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
      // 새로고침
    } else {
      alert("다시 시도해 주세요");
    }
  };

  const handleDenyFriend = (friendId: number, nickname: string) => {
    const denyResponse = denyFriend(friendId, nickname);
    if (denyResponse !== null) {
      // 새로고침
    } else {
      alert("다시 시도해 주세요");
    }
  };

  const handleDeleteFriend = (friendId: number) => {
    const deleteResponse = deleteFriend(friendId);
    if (deleteResponse !== null) {
      // 새로고침
    } else {
      alert("다시 시도해 주세요");
    }
  };

  const handleRegistFriend = (toId: number, nickname: string) => {
    const registResponse = registFriend(toId, nickname);
    if (registResponse !== null) {
      // 새로고침
    } else {
      alert("다시 시도해 주세요");
    }
  };

  return (
    <FriendInfoWrapper>
      <ImageProfileContainer>
        <ImageBox
          src={process.env.PUBLIC_URL + "/defaultImg.png"}
          alt="default"
        />
        <div>
          <NicknameBox>{friendData.nickname}</NicknameBox>
          <ProfileBox>{friendData.profile}</ProfileBox>
        </div>
      </ImageProfileContainer>
      <div ref={modalRef} style={{ position: "relative" }}>
        <EtcIcon onClick={handleEtc} size={24} />
        {etcClicked ? (
          <EtcModalWrapper>
            {status === "friendsList" ? (
              <EtcModalBox
                onClick={() => handleDeleteFriend(friendData.fromId)}
              >
                친구 취소
              </EtcModalBox>
            ) : status === "waitingList" ? (
              <div>
                <EtcModalBox
                  onClick={() =>
                    handleConfirmFriend(friendData.fromId, friendData.nickname)
                  }
                >
                  친구 승인
                </EtcModalBox>
                <EtcModalBox
                  onClick={() =>
                    handleDenyFriend(friendData.fromId, friendData.nickname)
                  }
                >
                  친구 거절
                </EtcModalBox>
              </div>
            ) : (
              <EtcModalBox
                onClick={() =>
                  handleRegistFriend(friendData.fromId, friendData.nickname)
                }
              >
                친구 신청
              </EtcModalBox>
            )}
          </EtcModalWrapper>
        ) : null}
      </div>
    </FriendInfoWrapper>
  );
};

export default FriendInfo;

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
  width: 100px;
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
