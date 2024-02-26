import React, { useState } from "react";
import axios from "axios";
import TodoCalendar from "./TodoCalendar";
import Item from "./Item";

const TodoPage = () => {
  const [view, setView] = useState<"daily" | "monthly">("daily");
  const [date, setDate] = useState("2024-02-26");
  const [todoList, setTodoList] = useState<string[]>([]);

  const fetchTodoListByDay = async (selectedDate: string) => {
    try {
      const response = await axios.get(`/all?date=${selectedDate}`);
      setTodoList(response.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  const handlePrevDay = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    setDate(currentDate.toISOString().split("T")[0]);
    fetchTodoListByDay(currentDate.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    setDate(currentDate.toISOString().split("T")[0]);
    fetchTodoListByDay(currentDate.toISOString().split("T")[0]);
  };

  return (
    <div>
      <h2>{date}의 할 일 목록</h2>
      <button onClick={() => setView("daily")}>일</button>
      <button onClick={() => setView("monthly")}>월</button>
      {view === "daily" ? (
        <div>
          <button onClick={handlePrevDay}>{"<"}</button>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={handleNextDay}>{">"}</button>
          <button onClick={() => fetchTodoListByDay(date)}>
            일별 할일 조회
          </button>
          <ul>
            {todoList.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <TodoCalendar />
        </div>
      )}
      <div className="appContainer">
        <Item text="할일 1" />
        <Item text="할일 2" />
        <Item text="완료한일 1" completed />
      </div>
      <input
        type="text"
        className="inputText"
        placeholder="할일 입력 후 엔터"
      />
    </div>
  );
};

export default TodoPage;
