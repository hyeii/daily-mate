import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import axios from "axios";
import { changeOrder } from "../../apis/todoApi";

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
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const DailyTodoList: React.FC<DailyTodoListProps> = ({
  todoList,
  onToggleTodo,
  onUpdateTodo,
  onDeleteTodo,
  onPostponeTodo,
  setTodoList,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 요소의 참조

  const accessToken = window.localStorage.getItem("accessToken");

  // 드롭다운 외부 클릭 시 드롭다운 접기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setExpandedTodoId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChangeOrder = async (
    reqDto: { todoId: number; todoOrder: number }[]
  ) => {
    const result = await changeOrder(reqDto);
    if (result) {
      console.log("할일 순서 변경 성공");
    }
  };

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

  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(">>> source", source);
    console.log(">>> destination", destination);

    if (!destination) return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const newTodoList = Array.from(todoList);
    const movedTodo = newTodoList[sourceIndex];
    newTodoList.splice(sourceIndex, 1);
    newTodoList.splice(destinationIndex, 0, movedTodo);

    setTodoList(newTodoList);

    const reqDto = newTodoList.map((todo, index) => ({
      todoId: todo.todoId,
      todoOrder: index,
    }));
    handleChangeOrder(reqDto);
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
      <ul>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {todoList.map((todo, index) => (
                  <Draggable
                    key={todo.todoId}
                    draggableId={String(todo.todoId)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItem key={todo.todoId}>
                          <ContentWrapper>
                            <div>
                              <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => handleToggle(todo.todoId)}
                              />
                              <span
                                style={{
                                  textDecoration: todo.done
                                    ? "line-through"
                                    : "none",
                                  display: "inline-block",
                                  marginLeft: "5px",
                                }}
                              >
                                {todo.content}
                              </span>
                            </div>
                            <DropdownWrapper ref={dropdownRef}>
                              <MoreButton
                                onClick={() => toggleExpandedTodo(todo.todoId)}
                              >
                                ···
                              </MoreButton>
                              <DropdownContent
                                $show={expandedTodoId === todo.todoId}
                              >
                                {editingTodoId === todo.todoId ? (
                                  <div>
                                    <ButtonRow>
                                      <span>수정 할일</span>
                                      <TextInput
                                        type="text"
                                        value={editedContent}
                                        onChange={(e) =>
                                          setEditedContent(e.target.value)
                                        }
                                      />
                                    </ButtonRow>
                                    <ButtonRow>
                                      <span>수정 날짜</span>
                                      <DateInput
                                        type="date"
                                        value={editedDate}
                                        onChange={(e) =>
                                          setEditedDate(e.target.value)
                                        }
                                      />
                                    </ButtonRow>
                                    <div>
                                      <ButtonRow>
                                        <SubmitButton
                                          onClick={() =>
                                            handleUpdate(
                                              todo.todoId,
                                              editedContent,
                                              editedDate
                                            )
                                          }
                                        >
                                          수정
                                        </SubmitButton>
                                        <CancelButton
                                          onClick={() => setEditingTodoId(null)}
                                        >
                                          취소
                                        </CancelButton>
                                      </ButtonRow>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      onClick={() =>
                                        toggleEditingTodo(
                                          todo.todoId,
                                          todo.content,
                                          todo.date
                                        )
                                      }
                                    >
                                      수정하기
                                    </button>
                                    <button
                                      onClick={() =>
                                        handlePostpone(todo.todoId)
                                      }
                                    >
                                      내일로 미루기
                                    </button>
                                    <DeleteButton
                                      onClick={() => handleDelete(todo.todoId)}
                                    >
                                      삭제하기
                                    </DeleteButton>
                                  </>
                                )}
                              </DropdownContent>
                            </DropdownWrapper>
                          </ContentWrapper>
                        </ListItem>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
    </div>
  );
};

export default DailyTodoList;

const ListItem = styled.li`
  list-style-type: none; /* 목록 기호 없애기 */
  padding-left: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;

  &:hover {
    background-color: pink;
    border-radius: 999px;
  }
`;

const ContentWrapper = styled.div`
  display: flex; /* flexbox 사용 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: space-between; /* 요소 사이의 간격 최대화 */
`;

const DropdownWrapper = styled.div`
  position: relative; /* 상대 위치 설정 */
`;

const MoreButton = styled.button`
  border: none; /* 테두리 없애기 */
  background-color: transparent; /* 배경색 투명하게 */
  font-size: 20px;
`;

const DropdownContent = styled.div<{ $show: boolean }>`
  display: ${(props) =>
    props.$show ? "block" : "none"}; /* 드롭다운 내용 숨김 */
  position: absolute; /* 절대 위치 설정 */
  background-color: white; /* 배경색 */
  min-width: 160px; /* 최소 너비 */
  width: 350px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  z-index: 1; /* 콘텐츠 위로 표시 */
  right: 0; /* 오른쪽 정렬 */
  top: 100%; /* 아래로 정렬 */
  border-radius: 4px; /* 모서리 둥글게 */
  button {
    width: 100%; /* 버튼을 전체 너비로 설정 */
    padding: 12px 16px; /* 안쪽 여백 */
    text-align: left; /* 텍스트 왼쪽 정렬 */
    border: none; /* 테두리 없애기 */
    background-color: transparent; /* 배경색 투명하게 */
    font-size: 16px; /* 폰트 크기 */
    cursor: pointer; /* 커서 모양 설정 */
    &:hover {
      background-color: #f1f1f1; /* 호버시 배경색 변경 */
    }
  }
`;

const DeleteButton = styled.button`
  color: red; /* 텍스트 색상 빨간색으로 설정 */
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  text-align: center;
  width: 20%; /* 버튼 크기 절반으로 줄임 */
`;

const CancelButton = styled.button`
  text-align: center;
  width: 20%; /* 버튼 크기 절반으로 줄임 */
  background-color: red;
  color: red;
`;

const TextInput = styled.input`
  width: 70%;
  padding: 8px;
  margin-bottom: 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  border: none;
`;

const DateInput = styled.input`
  width: 70%;
  padding: 8px;
  margin-bottom: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
`;
