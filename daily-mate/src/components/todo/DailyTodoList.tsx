import React from "react";

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

interface DailyTodoListProps {
  todoList: Todo[];
  onToggleTodo: (todoId: number) => void;
}

const DailyTodoList: React.FC<DailyTodoListProps> = ({
  todoList,
  onToggleTodo,
}) => {
  const handleToggle = (todoId: number) => {
    onToggleTodo(todoId);
  };
  console.log("todoList:", todoList);
  return (
    <div>
      <h2>일별 Todo 리스트</h2>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.todoId}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggle(todo.todoId)}
            />
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                display: "inline-block", // inline 요소를 inline-block으로 변경
                marginLeft: "5px", // 간격 추가
              }}
            >
              {todo.content}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyTodoList;
