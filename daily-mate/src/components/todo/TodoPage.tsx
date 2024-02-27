import React, { useState, useEffect } from "react";
import axios from "axios";
import DailyTodoList from "./DailyTodoList";
import TodoCalendar from "./TodoCalendar";
import Calendar from "react-calendar";
import { EnumNumberMember } from "@babel/types";

interface Todo {
  todoId: number;
  userId: number;
  content: string;
  date: string;
  done: boolean;
  repeat: number;
  todoOrder: number;
  createAt: string;
  updatedAt: string;
  deletedAt: string;
}

const TodoPage = () => {
  const [view, setView] = useState<"daily" | "monthly">("daily");
  const [todoList, setTodoList] = useState<Todo[]>([]); // Todo 배열로 타입 변경
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const getCurrentDate = (): string => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setSelectedDate(getCurrentDate());
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchTodoList(selectedDate);
    }
  }, [selectedDate]);

  const fetchTodoList = async (date: string) => {
    try {
      const response = await axios.get("http://localhost:8080/todo/all", {
        params: {
          date: date,
        },
        headers: {
          token: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBuYXZlci5jb20iLCJ1c2VySWQiOjEwMSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcwODk2MzM5NH0.L6w5O5bsyJZ-6tOIMliMKxRPuudr3doz4vR3L4bRTIo`,
        },
      });
      setTodoList(response.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleToggleTodo = async (todoId: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/todo/success/${todoId}`,
        null,
        {
          headers: {
            token: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBuYXZlci5jb20iLCJ1c2VySWQiOjEwMSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcwODk2MzM5NH0.L6w5O5bsyJZ-6tOIMliMKxRPuudr3doz4vR3L4bRTIo`,
          },
        }
      );
      // 서버에서 응답이 성공하면 해당 todo의 done 상태를 토글
      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.todoId === todoId ? { ...todo, done: !todo.done } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handlePreviousDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setSelectedDate(
      currentDate.toISOString().slice(0, 10) // Format as "YYYY-MM-DD"
    );
  };

  const handleNextDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedDate(
      currentDate.toISOString().slice(0, 10) // Format as "YYYY-MM-DD"
    );
  };

  return (
    <div>
      <h2>나의 할 일 목록</h2>
      <button onClick={() => setView("daily")}>일</button>
      <button onClick={() => setView("monthly")}>월</button>
      {view === "daily" ? (
        <div>
          <div>
            <button onClick={handlePreviousDay}>&lt;</button>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <button onClick={handleNextDay}>&gt;</button>
          </div>
          <DailyTodoList todoList={todoList} onToggleTodo={handleToggleTodo} />
        </div>
      ) : (
        <div>
          <TodoCalendar />
        </div>
      )}
    </div>
  );
};

export default TodoPage;
