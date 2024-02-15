import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
