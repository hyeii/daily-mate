import { format } from "date-fns";
import styled, { css } from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface props {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  setToday: () => void;
  isMini: string;
}

const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  setToday,
  isMini,
}: props) => {
  return (
    <HeaderWrapper>
      <BackArrowIcon size="30" onClick={prevMonth}>
        이전
      </BackArrowIcon>
      <DateContainer>
        {format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월
      </DateContainer>
      <ForwardArrowIcon size="30" onClick={nextMonth}>
        다음
      </ForwardArrowIcon>
      {/* <button onClick={setToday}>오늘</button> */}
    </HeaderWrapper>
  );
};

export default CalendarHeader;

const HeaderWrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateContainer = styled.h3`
  font-size: 1.2rem;
  color: #515151;
  margin: 0 3rem;
`;

const arrowIconStyle = css`
  color: #9b9b9b;
  &:hover {
    cursor: pointer;
    color: #777777;
  }
`;

const BackArrowIcon = styled(IoIosArrowBack)`
  ${arrowIconStyle}
`;

const ForwardArrowIcon = styled(IoIosArrowForward)`
  ${arrowIconStyle}
`;
