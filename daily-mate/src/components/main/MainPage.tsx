import { useRecoilValue } from "recoil";
import { isLoginState } from "../../atoms/authAtom";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const loginState = useRecoilValue(isLoginState);
  const navigate = useNavigate();
  const handleLogOut = () => {};

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div>
      <h3>메인화면</h3>
      <div>
        <span>로그인 여부 : </span>
        {loginState ? <span>로그인 중</span> : <span>로그아웃 상태</span>}
      </div>
      {loginState ? (
        <button onClick={handleLogOut}>로그아웃</button>
      ) : (
        <div>
          <button onClick={handleSignIn}>로그인</button>
          <button onClick={handleSignUp}>회원가입</button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
