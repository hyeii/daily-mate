import Calendar from "./calendar/Calendar";

interface props {
  currentDay: string;
}

const AccountDaily = ({ currentDay }: props) => {
  return (
    <div>
      <div>일 통계</div>
      <div>{currentDay}</div>
      <Calendar isMini={"yes"} />
    </div>
  );
};

export default AccountDaily;
