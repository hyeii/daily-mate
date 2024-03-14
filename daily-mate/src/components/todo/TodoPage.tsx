import React, { useState, useEffect, useInsertionEffect } from "react";
import axios from "axios";
import DailyTodoList from "./DailyTodoList";
import TodoCalendar from "./TodoCalendar";
import Calendar from "react-calendar";
import { EnumNumberMember } from "@babel/types";
import TodoAddModal from "./TodoAddModal";
import { async } from "q";
import styled from "styled-components";
import {
  getTodoList,
  toggleTodo,
  deleteTodo,
  postponeTodo,
  updateTodo,
  addTodo,
} from "../../apis/todoApi";

export interface Todo {
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
    const sortedTodoList: Todo[] | null = await getTodoList(date);
    if (sortedTodoList != null) {
      setTodoList(sortedTodoList);
    }

    // try {
    //   const response = await axios.get("http://localhost:8080/todo/all", {
    //     params: {
    //       date: date,
    //     },
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
    //   const sortedTodoList = response.data.sort(
    //     (a: Todo, b: Todo) => a.todoOrder - b.todoOrder
    //   );
    //   setTodoList(sortedTodoList);
    // } catch (error) {
    //   console.error("Error fetching todo list:", error);
    // }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleToggleTodo = async (todoId: number) => {
    const result = await toggleTodo(todoId);
    if (result) {
      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.todoId === todoId ? { ...todo, done: !todo.done } : todo
        )
      );
    }

    // try {
    //   const response = await axios.patch(
    //     `http://localhost:8080/todo/success/${todoId}`,
    //     null,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   );
    //   // 서버에서 응답이 성공하면 해당 todo의 done 상태를 토글
    //   setTodoList((prevTodoList) =>
    //     prevTodoList.map((todo) =>
    //       todo.todoId === todoId ? { ...todo, done: !todo.done } : todo
    //     )
    //   );
    // } catch (error) {
    //   console.error("Error toggling todo:", error);
    // }
  };

  const handleDeleteTodo = async (todoId: number) => {
    const result = await deleteTodo(todoId);
    if (result) {
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.todoId !== todoId)
      );
    }
    // try {
    //   const response = await axios.delete(
    //     `http://localhost:8080/todo/${todoId}`, // 엔드포인트 URL
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`, // 헤더 설정
    //       },
    //     }
    //   );
    //   setTodoList((prevTodoList) =>
    //     prevTodoList.filter((todo) => todo.todoId !== todoId)
    //   ); // 삭제된 항목을 todoList에서 제거
    // } catch (error) {
    //   console.error("Error deleting todo:", error);
    // }
  };

  const handlePostponeTodo = async (todoId: number) => {
    const result = await postponeTodo(todoId);
    if (result) {
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.todoId !== todoId)
      );
    }
    // try {
    //   const response = await axios.patch(
    //     `http://localhost:8080/todo/postpone/${todoId}`,
    //     null,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   );
    //   setTodoList((prevTodoList) =>
    //     prevTodoList.filter((todo) => todo.todoId !== todoId)
    //   );
    // } catch (error) {
    //   console.error("Error toggling todo:", error);
    // }
  };

  const handleUpdateTodo = async (
    todoId: number,
    updatedContent: string,
    updatedDate: string
  ) => {
    const result = await updateTodo(todoId, updatedContent, updatedDate);
    if (result) {
      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.todoId === todoId
            ? { ...todo, content: updatedContent, date: updatedDate }
            : todo
        )
      );
    }
    // try {
    //   const response = await axios.patch(
    //     `http://localhost:8080/todo/${todoId}`,
    //     { content: updatedContent, date: updatedDate }, // 수정된 내용과 날짜를 요청 본문에 포함
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   );
    //   // 서버에서 응답이 성공하면 해당 todo를 업데이트
    //   setTodoList((prevTodoList) =>
    //     prevTodoList.map((todo) =>
    //       todo.todoId === todoId
    //         ? { ...todo, content: updatedContent, date: updatedDate }
    //         : todo
    //     )
    //   );
    // } catch (error) {
    //   console.error("Error updating todo:", error);
    // }
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

  const handleAddTodo = async (
    content: String,
    repeat: number,
    date: String
  ) => {
    const result = await addTodo(content, repeat, date);
    if (result) {
      setIsModalOpen(false); // 모달 닫기
      fetchTodoList(selectedDate); // 등록 후 할 일 목록 다시 불러오기
    }
    // console.log(repeat);
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/todo", // 등록 요청을 보낼 엔드포인트 URL
    //     {
    //       content: content, // 할 일 내용
    //       repeatition: repeat, // 반복 설정
    //       date: date,
    //       // date: selectedDate, // 선택된 날짜
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`, // 헤더 설정
    //       },
    //     }
    //   );
    //   // 등록이 성공하면 서버에서 반환된 데이터를 처리할 수 있습니다.
    //   console.log("Todo 등록 성공:", response.data);
    //   setIsModalOpen(false); // 모달 닫기
    //   fetchTodoList(selectedDate); // 등록 후 할 일 목록 다시 불러오기
    // } catch (error) {
    //   console.error("Todo 등록 에러:", error);
    // }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };
  const handleOutsideModalClick = () => {
    setIsModalOpen(false); // 모달 외부 클릭 시 모달 닫기
  };
  return (
    <div onClick={handleOutsideModalClick}>
      <div>
        {view === "daily" ? (
          <>
            <ActiveButton onClick={() => setView("daily")}>일</ActiveButton>
            <InactiveButton onClick={() => setView("monthly")}>
              월
            </InactiveButton>
          </>
        ) : (
          <>
            <InactiveButton onClick={() => setView("daily")}>일</InactiveButton>
            <ActiveButton onClick={() => setView("monthly")}>월</ActiveButton>
          </>
        )}
      </div>
      {view === "daily" ? (
        <div>
          <div>
            <PreviousButton onClick={handlePreviousDay}>&lt;</PreviousButton>
            <DateInput
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <NextButton onClick={handleNextDay}>&gt;</NextButton>
          </div>
          <h1>할 일</h1>
          <DailyTodoList
            todoList={todoList}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onPostponeTodo={handlePostponeTodo}
            onUpdateTodo={handleUpdateTodo}
            setTodoList={setTodoList}
          />
        </div>
      ) : (
        <div>
          <TodoCalendar />
        </div>
      )}
      <ADdButton onClick={openModal}>+ 할 일 추가</ADdButton>
      <TodoAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTodo={handleAddTodo}
        date={selectedDate}
      />
    </div>
  );
};

export default TodoPage;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 25px;
  padding: 20px;

  cursor: pointer;
`;

const ActiveButton = styled(StyledButton)`
  color: black;
`;

const InactiveButton = styled(StyledButton)`
  color: gray;
`;

const PreviousButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 25px;
  padding: 20px;
  margin-right: 10px;
  cursor: pointer;
  color: pink; /* 분홍색으로 변경 */
`;

const NextButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 25px;
  cursor: pointer;
  color: pink; /* 분홍색으로 변경 */
`;

const DateInput = styled.input`
  border: none;
  background-color: transparent;
  font-family: "Arial", sans-serif;
  font-size: 25px;
  padding: 20px;
  cursor: pointer;
  color: pink; /* 분홍색으로 변경 */

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

const ADdButton = styled.button`
  border: none;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  color: gray;
  &:hover {
    background-color: #f1f1f1; /* 호버시 배경색 변경 */
  }
`;
