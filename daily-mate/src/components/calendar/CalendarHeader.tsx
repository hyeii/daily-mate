import { format } from "date-fns";
import styled, { css } from "styled-components";
import {
  BackArrowIcon,
  ForwardArrowIcon,
} from "../common/CommonStyledComponents";

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
      <BackArrowIcon size="30" onClick={prevMonth} />
      <DateContainer>
        {format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월
      </DateContainer>
      <ForwardArrowIcon size="30" onClick={nextMonth} />
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
