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

  return (
    <Wrapper>
      <TitleBox>
        <h3>일정을 관리하세요</h3>
      </TitleBox>
      <div>
        <p>J가 되고싶은 당신에게!</p>
      </div>

      {loginState ? (
        <div>반갑습니다!</div>
      ) : (
        <StartBtn onClick={handleSignIn}>시작하기</StartBtn>
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

const StartBtn = styled.button`
  background-color: #ff6161;
  color: white;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
  padding: 6px 18px;
  font-family: "LeeSeoyun";
  font-size: 1.5rem;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    background-color: #e45757;
  }

  &:active {
    transform: scale(1.05);
  }
`;
