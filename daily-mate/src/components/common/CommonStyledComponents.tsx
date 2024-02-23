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
