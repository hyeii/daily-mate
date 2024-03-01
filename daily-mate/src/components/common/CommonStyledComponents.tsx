import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import styled, { css } from "styled-components";

export const arrowIconStyle = css`
  color: #9b9b9b;
  &:hover {
    cursor: pointer;
    color: #777777;
  }
`;

export const BackArrowIcon = styled(IoIosArrowBack)`
  ${arrowIconStyle}
`;

export const ForwardArrowIcon = styled(IoIosArrowForward)`
  ${arrowIconStyle}
`;

export interface ammountProps {
  textType: string;
}

export const AmountNumber = styled.div<ammountProps>`
  font-size: 1.2rem;
  color: ${({ textType }) =>
    textType === "in" ? "#478FFA" : textType === "out" ? "#FF4242" : "black"};
`;

export const TabContainer = styled.div`
  display: flex;
`;

export const TabText = styled.h3`
  margin-right: 2rem;
  font-size: 1.2rem;
  font-weight: normal;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export const LikeHeart = css`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const FullHeart = styled(HiHeart)`
  ${LikeHeart}
`;
export const OutLineHeart = styled(HiOutlineHeart)`
  ${LikeHeart}
`;

export const SignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;

  border-radius: 15px;
  box-shadow: 0px 0px 15px #c9c9c9;

  width: 300px;
`;

export const SignBtn = styled.div`
  width: auto;
  height: 35px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s, background-color 0.3s;
  background-color: #f6dee2;

  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fbe4e6;
    font-weight: bold;
  }

  &:active {
    transform: scale(1.05);
  }
`;

export const Title = styled.h3`
  margin-right: 2rem;
  font-size: 1.2rem;
`;

export const UpdateContainer = styled.div`
  margin: 2rem 0;
`;

export const InfoContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  align-items: center;
`;

export const InfoTitle = styled.div`
  flex: 1;
  font-size: 1.3rem;
`;

export const InfoInputBox = styled.div`
  flex: 4;
`;

export const AddInput = styled.input`
  flex: 8;
  height: 20px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  font-family: "LeeSeoyun";
  font-size: 1.4rem;

  box-shadow: 0 0 5px rgb(137, 137, 137);
`;

export const CompleteBtn = styled.button`
  background-color: #ff6161;
  font-size: 1.3rem;
  color: white;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
  padding: 6px 18px;
  font-family: "LeeSeoyun";
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    background-color: #e45757;
  }

  &:active {
    transform: scale(1.05);
  }
`;
