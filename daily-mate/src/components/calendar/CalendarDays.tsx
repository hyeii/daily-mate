import styled from "styled-components";

interface props {
  isMini: string;
}

const CalendarDays = ({ isMini }: props) => {
  const date = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <DayTextDiv>
      {date.map((day: string) => (
        <DayText key={day}>{day}</DayText>
      ))}
    </DayTextDiv>
  );
};

export default CalendarDays;

const DayTextDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DayText = styled.div`
  font-size: 1rem;
`;
