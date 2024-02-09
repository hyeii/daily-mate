import { useRecoilState } from "recoil";
import { userInfoState } from "../../atoms/authAtom";
import { ChangeEvent, useState } from "react";
import { updateUserInfo } from "../../apis/authApis";

const UpdateInfoPage = () => {
  // 정보수정을 별도 페이지가 아니라 프로필 기본페이지에서 컴포넌트로만 처리할지 고민.

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [newNickname, setNewNickname] = useState<string>(userInfo.nickname);
  const [newProfileMessage, setNewProfileMessage] = useState<string>(
    userInfo.profile
  );

  const nicknameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const profileMessageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewProfileMessage(event.target.value);
  };

  const updateSubmitHandler = async () => {
    // 내 정보 수정 api 호출 및 atom 반영(api가 success 되면 atom 업데이트)
    if (newNickname === "") {
      alert("닉네임을 입력해주세요");
      return;
    }

    // 한줄소개는 공백이어도 가능하게.
    const updateResult = await updateUserInfo(newNickname, newProfileMessage);
    if (updateResult !== null) {
      setUserInfo((prev) => ({
        ...prev,
        nickname: updateResult.nickname,
        profileMessage: updateResult.profile,
      }));
      alert("내 정보가 수정되었습니다");
    }
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
