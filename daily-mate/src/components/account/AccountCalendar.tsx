import Calendar from "../calendar/Calendar";

const AccountCalendar = () => {
  return (
    <div>
      <div>캘린더</div>
      <Calendar isMini="not" calendarType="account" />
    </div>
  );
};

export default AccountCalendar;
