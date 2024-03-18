import { useRecoilValue } from "recoil";
import { isLoginState } from "../../atoms/authAtom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MainPage = () => {
  const loginState = useRecoilValue(isLoginState);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <Wrapper>
      <Container>
        <TitleBox>
          <MainImgBox>
            <MainImg
              src={process.env.PUBLIC_URL + "/undraw_checklist__re_2w7v.svg"}
              alt="checklist"
            />
          </MainImgBox>
          <InnerTextBox>
            <TextBox>
              <TitleTop>
                <div>데일리메이트,</div>
                <div>일정 관리의 모든 것</div>
              </TitleTop>
              <TitleMiddle>
                <div>흩어져 있는 다이어리, 가계부, 투두리스트를 한번에</div>
                <div>친구와 공유하는 우리만의 다이어리</div>
              </TitleMiddle>
            </TextBox>
            {loginState ? (
              <TitleMiddle>사이드바에서 확인하세요</TitleMiddle>
            ) : (
              <StartBtnBox>
                <StartBtn onClick={handleSignIn}>시작하기</StartBtn>
              </StartBtnBox>
            )}
          </InnerTextBox>
        </TitleBox>
      </Container>
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 20px;
  margin-top: 10px;

  @media (min-width: 992px) {
    grid-auto-flow: column;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 1fr;

    & > * {
      flex: 1;
    }
  }
`;

const TitleTop = styled.h2`
  font-size: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TitleMiddle = styled.div`
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const InnerTextBox = styled.div`
  font-family: "NanumSquare";
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  grid-row-start: 1;
`;

const TextBox = styled.div`
  @media (min-width: 992px) {
    margin-top: 2rem;
  }
`;

const StartBtnBox = styled.div`
  margin: 2rem 0;
`;

const StartBtn = styled.button`
  background-color: #ff6161;
  color: white;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
  padding: 6px 18px;
  font-family: "NanumSquare";
  font-size: 1.5rem;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    background-color: #e45757;
  }

  &:active {
    transform: scale(1.05);
  }
`;

const MainImgBox = styled.div`
  display: flex;
  // width: 100%;
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const MainImg = styled.img`
  width: 100%;
`;
