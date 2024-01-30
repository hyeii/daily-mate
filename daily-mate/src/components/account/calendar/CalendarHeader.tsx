type props = {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;
};

const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  goToday,
}: props) => {
  return <div>헤더</div>;
};

export default CalendarHeader;
