import { ChangeEvent, useState } from "react";
import { commentBody } from "../../types/diaryType";
import { addComment } from "../../apis/diaryApi";
import styled from "styled-components";
import { IoArrowRedo } from "react-icons/io5";

interface props {
  diaryId: number;
}

const AddComment = ({ diaryId }: props) => {
  const [inputComment, setInputComment] = useState<string>("");
  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    setInputComment(event.target.value);
  };
  const submitComment = () => {
    if (inputComment === "") {
      alert("댓글을 입력해주세요");
      return;
    }
    const comment: commentBody = {
      content: inputComment,
    };
    addComment(diaryId, comment);
    window.location.reload();
  };
  return (
    <AddCommentWrapper>
      <AddInput type="text" onChange={handleComment} />
      <ButtonBox>
        <SubmitButton onClick={submitComment} />
      </ButtonBox>
    </AddCommentWrapper>
  );
};

export default AddComment;

const AddCommentWrapper = styled.div`
  display: flex;
`;

const AddInput = styled.input`
  width: auto;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding: 0.5rem;
  background-color: #ffffff;
  font-family: "LeeSeoyun";
  flex: 1;
`;

const SubmitButton = styled(IoArrowRedo)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;
