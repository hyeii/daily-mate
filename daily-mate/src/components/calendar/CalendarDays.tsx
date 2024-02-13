import styled from "styled-components";

interface props {
  isMini: string;
}

const CalendarDays = ({ isMini }: props) => {
  const date = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <DayTextDiv>
      {date.map((day: string) => (
        <div key={day}>
          <div>{day}</div>
        </div>
      ))}
    </DayTextDiv>
  );
};

export default CalendarDays;

const DayTextDiv = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
`;
