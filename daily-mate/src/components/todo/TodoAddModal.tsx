import { DateValues } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";

interface TodoAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (content: string, repeat: number, date: string) => void;
  date: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative; /* 상대 위치 지정 */
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const TodoAddModal: React.FC<TodoAddModalProps> = ({
  isOpen,
  onClose,
  onAddTodo,
  date,
}) => {
  const [content, setContent] = useState<string>("");
  const [repeat, setRepeat] = useState<number>(1);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleRepeatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRepeat(parseInt(e.target.value, 10));
  };

  const handleSubmit = () => {
    onAddTodo(content, repeat, date);
    setContent("");
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButtonContainer>
          <CloseButton onClick={onClose}>X</CloseButton>
        </CloseButtonContainer>
        <h2>할 일 추가</h2>

        <div>
          <label htmlFor="repeat">반복 설정:</label>
          <SelectBox id="repeat" value={repeat} onChange={handleRepeatChange}>
            <option value={1}>1일</option>
            <option value={2}>2일</option>
            <option value={3}>3일</option>
            <option value={4}>4일</option>
            <option value={5}>5일</option>
            <option value={6}>6일</option>
            <option value={7}>7일</option>
            {/* 다른 반복 주기를 추가하려면 여기에 옵션을 추가하세요 */}
          </SelectBox>
        </div>
        <label>할 일:</label>
        <InputBox
          type="textarea"
          value={content}
          onChange={handleContentChange}
          placeholder="할 일을 입력하세요"
        />
        <AddButton onClick={handleSubmit}>등록하기</AddButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TodoAddModal;

const AddButton = styled.button`
  border: none;
  background-color: transparent;
`;

const InputBox = styled.input`
  padding: 10px;
  margin: 10px;
`;

const SelectBox = styled.select`
  margin: 10px;
`;
