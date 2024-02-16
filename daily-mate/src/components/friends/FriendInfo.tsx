import styled from "styled-components";
import { RxDotsHorizontal } from "react-icons/rx";
import { friendResponse } from "../../types/authType";
import { useEffect, useRef, useState } from "react";

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
              <div>친구 취소</div>
            ) : status === "waitingList" ? (
              <div>친구 수락</div>
            ) : (
              <div>친구 신청</div>
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
  padding: 8px;
`;
