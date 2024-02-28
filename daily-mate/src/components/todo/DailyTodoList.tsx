import React, { useState } from "react";

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
  onUpdateTodo: (todoId: number) => void;
  onDeleteTodo: (todoId: number) => void;
  onPostponeTodo: (todoId: number) => void;
}

const DailyTodoList: React.FC<DailyTodoListProps> = ({
  todoList,
  onToggleTodo,
  onUpdateTodo,
  onDeleteTodo,
  onPostponeTodo,
}) => {
  const handleToggle = (todoId: number) => {
    onToggleTodo(todoId);
  };
  const handleUpdate = (todoId: number) => {
    onUpdateTodo(todoId);
  };

  const handleDelete = (todoId: number) => {
    onDeleteTodo(todoId);
  };

  const handlePostpone = (todoId: number) => {
    onPostponeTodo(todoId);
  };
  console.log("todoList:", todoList);

  const [expandedTodoId, setExpandedTodoId] = useState<number | null>(null);

  const toggleExpandedTodo = (todoId: number) => {
    if (expandedTodoId === todoId) {
      setExpandedTodoId(null);
    } else {
      setExpandedTodoId(todoId);
    }
  };

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
            <button onClick={() => toggleExpandedTodo(todo.todoId)}>...</button>
            {expandedTodoId === todo.todoId && (
              <div>
                <button onClick={() => handleUpdate(todo.todoId)}>
                  수정하기
                </button>
                <button onClick={() => handleDelete(todo.todoId)}>
                  삭제하기
                </button>
                <button onClick={() => handlePostpone(todo.todoId)}>
                  내일로 미루기
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyTodoList;
