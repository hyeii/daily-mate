import { useState } from "react";
import AccountCalendar from "./AccountCalendar";
import AccountMonthly from "./AccountMonthly";
import AccountDaily from "./AccountDaily";

const AccountPage = () => {
  const [accountTab, setAccountTab] = useState<string>("calendar");

  const handleCalendar = () => {
    setAccountTab("calendar");
  };
  const handleMonthly = () => {
    setAccountTab("monthly");
  };
  const handleDaily = () => {
    setAccountTab("daily");
  };
  return (
    <div>
      <h3>가계부 페이지</h3>
      <div>
        <span onClick={handleCalendar}>달력</span>
        <span onClick={handleMonthly}>월 통계</span>
        <span onClick={handleDaily}>일 통계</span>
        <span>항목 추가</span>
      </div>
      <div>
        {accountTab === "calendar" ? (
          <AccountCalendar />
        ) : accountTab === "monthly" ? (
          <AccountMonthly />
        ) : (
          <AccountDaily />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
