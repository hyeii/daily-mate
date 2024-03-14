import { AxiosResponse } from "axios";
import { API } from "./api";
import { Todo } from "../components/todo/TodoPage";

export const getTodoList = async (date: string) => {
  try {
    const response = await API.get("todo/all", {
      params: {
        date: date,
      },
    });
    return response.data.sort((a: Todo, b: Todo) => a.todoOrder - b.todoOrder);
  } catch (error) {
    console.error("Error fetching todo list:", error);
  }
};

export const toggleTodo = async (todoId: number) => {
  try {
    const response = await API.patch(`/todo/success/${todoId}`, null);
    // 서버에서 응답이 성공하면 해당 todo의 done 상태를 토글
    return true;
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
};

export const deleteTodo = async (todoId: number) => {
  try {
    const response = await API.delete(
      `/todo/${todoId}` // 엔드포인트 URL
    );
    return true;
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

export const postponeTodo = async (todoId: number) => {
  try {
    const response = await API.patch(`todo/postpone/${todoId}`, null);
    return true;
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
};

export const updateTodo = async (
  todoId: number,
  updatedContent: string,
  updatedDate: string
) => {
  try {
    const response = await API.patch(
      `/todo/${todoId}`,
      { content: updatedContent, date: updatedDate } // 수정된 내용과 날짜를 요청 본문에 포함
    );

    return true;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const addTodo = async (
  content: String,
  repeat: number,
  date: String
) => {
  console.log(repeat);
  try {
    const response = await API.post(
      "/todo", // 등록 요청을 보낼 엔드포인트 URL
      {
        content: content, // 할 일 내용
        repeatition: repeat, // 반복 설정
        date: date,
        // date: selectedDate, // 선택된 날짜
      }
    );
    // 등록이 성공하면 서버에서 반환된 데이터를 처리할 수 있습니다.
    return true;
  } catch (error) {
    console.error("Todo 등록 에러:", error);
  }
};

export const changeOrder = async (
  reqDto: { todoId: number; todoOrder: number }[]
) => {
  try {
    const response = await API.patch("/todo/changeOrder", reqDto);
    return true;
  } catch (error) {
    console.error("할일 순서 변경 실패:", error);
  }
};

export const findSuccess = async (date: string) => {
  try {
    const response = await API.get("/todo/success", {
      params: {
        date: date,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching todo list:", error);
  }
};
