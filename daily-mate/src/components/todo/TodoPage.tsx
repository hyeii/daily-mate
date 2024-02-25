import React, { useState } from "react";
import DailyTodoList from "./DailyTodoList";

const TodoPage = () => {
  const [view, setView] = useState<"daily" | "monthly">("daily");
  return (
    <div>
      <button onClick={() => setView("daily")}>일</button>
      <button onClick={() => setView("monthly")}>월</button>
      {view === "daily" ? <DailyTodoList /> : <div>월별조회</div>}
    </div>
  );
};

export default TodoPage;
