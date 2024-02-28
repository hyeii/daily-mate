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
  onUpdateTodo: (todoId: number, content: string, date: string) => void;
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

  const handleUpdate = (todoId: number, content: string, date: string) => {
    onUpdateTodo(todoId, content, date);
    setEditingTodoId(null);
  };

  const handleDelete = (todoId: number) => {
    onDeleteTodo(todoId);
  };

  const handlePostpone = (todoId: number) => {
    onPostponeTodo(todoId);
  };

  const [expandedTodoId, setExpandedTodoId] = useState<number | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [editedDate, setEditedDate] = useState<string>("");

  const toggleExpandedTodo = (todoId: number) => {
    if (expandedTodoId === todoId) {
      setExpandedTodoId(null);
    } else {
      setExpandedTodoId(todoId);
    }
  };

  const toggleEditingTodo = (todoId: number, content: string, date: string) => {
    setEditingTodoId(todoId);
    setEditedContent(content);
    setEditedDate(date);
  };

  return (
    <div>
      <h2>일별 Todo 리스트</h2>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.todoId}>
            {editingTodoId === todo.todoId ? (
              <div>
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
                <button
                  onClick={() =>
                    handleUpdate(todo.todoId, editedContent, editedDate)
                  }
                >
                  완료
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggle(todo.todoId)}
                />
                <span
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                    display: "inline-block",
                    marginLeft: "5px",
                  }}
                >
                  {todo.content}
                </span>
                <button onClick={() => toggleExpandedTodo(todo.todoId)}>
                  ...
                </button>
                {expandedTodoId === todo.todoId && (
                  <div>
                    <button
                      onClick={() =>
                        toggleEditingTodo(todo.todoId, todo.content, todo.date)
                      }
                    >
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
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyTodoList;
