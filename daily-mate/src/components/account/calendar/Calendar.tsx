import { useState } from "react";
import CalendarCells from "./CalendarCells";
import CalendarDays from "./CalendarDays";
import CalendarHeader from "./CalendarHeader";
import { addMonths, format, subMonths } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: Date) => {
    setSelectedDate(format(day, "yyyy-MM-dd"));
  };
  const goToday = () => {
    setCurrentMonth(new Date());
  };
  return (
    <div>
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        goToday={goToday}
      />
      <CalendarDays />
      <CalendarCells />
    </div>
  );
};

export default Calendar;
