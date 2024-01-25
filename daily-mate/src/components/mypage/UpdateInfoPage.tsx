import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atoms/authAtom";

const UpdateInfoPage = () => {
  const userInfo = useRecoilValue(userInfoState);

  return <div>정보수정</div>;
};

export default UpdateInfoPage;
