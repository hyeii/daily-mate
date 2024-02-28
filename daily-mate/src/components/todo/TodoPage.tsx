import React, { useState, useEffect, useInsertionEffect } from "react";
import axios from "axios";
import DailyTodoList from "./DailyTodoList";
import TodoCalendar from "./TodoCalendar";
import Calendar from "react-calendar";
import { EnumNumberMember } from "@babel/types";
import TodoAddModal from "./TodoAddModal";
import { async } from "q";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const accessToken = window.localStorage.getItem("accessToken");

  const fetchTodoList = async (date: string) => {
    try {
      const response = await axios.get("http://localhost:8080/todo/all", {
        params: {
          date: date,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
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

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/todo/${todoId}`, // 엔드포인트 URL
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 헤더 설정
          },
        }
      );
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.todoId !== todoId)
      ); // 삭제된 항목을 todoList에서 제거
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handlePostponeTodo = async (todoId: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/todo/postpone/${todoId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.todoId !== todoId)
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleUpdateTodo = async (
    todoId: number,
    updatedContent: string,
    updatedDate: string
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/todo/${todoId}`,
        { content: updatedContent, date: updatedDate }, // 수정된 내용과 날짜를 요청 본문에 포함
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // 서버에서 응답이 성공하면 해당 todo를 업데이트
      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.todoId === todoId
            ? { ...todo, content: updatedContent, date: updatedDate }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
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

  const handleAddTodo = async (content: String, repeat: number) => {
    console.log(repeat);
    try {
      const response = await axios.post(
        "http://localhost:8080/todo", // 등록 요청을 보낼 엔드포인트 URL
        {
          content: content, // 할 일 내용
          repeatition: repeat, // 반복 설정
          // date: selectedDate, // 선택된 날짜
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 헤더 설정
          },
        }
      );
      // 등록이 성공하면 서버에서 반환된 데이터를 처리할 수 있습니다.
      console.log("Todo 등록 성공:", response.data);
      setIsModalOpen(false); // 모달 닫기
      fetchTodoList(selectedDate); // 등록 후 할 일 목록 다시 불러오기
    } catch (error) {
      console.error("Todo 등록 에러:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
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
          <DailyTodoList
            todoList={todoList}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onPostponeTodo={handlePostponeTodo}
            onUpdateTodo={handleUpdateTodo}
          />
        </div>
      ) : (
        <div>
          <TodoCalendar />
        </div>
      )}
      <button onClick={openModal}>+ 할 일 추가</button>
      <TodoAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTodo={handleAddTodo}
      />
    </div>
  );
};

export default TodoPage;
