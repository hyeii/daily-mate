import { useRecoilValue } from "recoil";
import { isLoginState } from "../../atoms/authAtom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    <Wrapper>
      <TitleBox>
        <h3>일정을 관리하세요</h3>
      </TitleBox>
      <div>
        <p>J가 되고싶은 당신에게!</p>
      </div>

      {loginState ? (
        <button onClick={handleLogOut}>로그아웃</button>
      ) : (
        <div>
          <button onClick={handleSignIn}>로그인</button>
          <button onClick={handleSignUp}>회원가입</button>
        </div>
      )}
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  align-items: center;
  font-family: "LeeSeoyun";
  font-size: 2rem;
`;
