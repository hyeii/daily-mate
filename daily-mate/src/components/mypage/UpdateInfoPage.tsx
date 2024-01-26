import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atoms/authAtom";
import { ChangeEvent, useState } from "react";

const UpdateInfoPage = () => {
  // 정보수정을 별도 페이지가 아니라 프로필 기본페이지에서 컴포넌트로만 처리할지 고민.

  const userInfo = useRecoilValue(userInfoState);
  const [newNickname, setNewNickname] = useState<string>(userInfo.nickname);
  const [newProfileMessage, setNewProfileMessage] = useState<string>(
    userInfo.profileMessage
  );

  const nicknameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const profileMessageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewProfileMessage(event.target.value);
  };

  const updateSubmitHandler = () => {
    // 내 정보 수정 api 호출 및 atom 반영(api가 success 되면 atom 업데이트)
  };

  return (
    <div>
      <h3>정보수정 : 닉네임, 한줄소개</h3>
      <div>
        <input defaultValue={newNickname} onChange={nicknameHandler} />
        <input
          defaultValue={newProfileMessage}
          onChange={profileMessageHandler}
        />
        <button onClick={updateSubmitHandler}>저장</button>
      </div>
    </div>
  );
};

export default UpdateInfoPage;
