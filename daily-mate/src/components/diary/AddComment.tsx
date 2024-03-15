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
  const [inputLength, setInputLength] = useState<number>(0);
  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    setInputComment(event.target.value);
    setInputLength(event.target.value.length);
  };
  const submitComment = () => {
    if (inputComment === "") {
      alert("댓글을 입력해주세요");
      return;
    }

    if (inputLength > 200) {
      alert("댓글은 200자 이하로 입력해주세요");
      return;
    }
    const comment: commentBody = {
      content: inputComment,
    };
    addComment(diaryId, comment);
    window.location.reload();
  };
  return (
    <>
      <AddCommentWrapper>
        <AddInput type="text" maxLength={200} onChange={handleComment} />
        <ButtonBox>
          <SubmitButton onClick={submitComment} />
        </ButtonBox>
      </AddCommentWrapper>
      <CommentLengthBox>
        <CommentLength>{inputLength} / 200</CommentLength>
      </CommentLengthBox>
    </>
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
  font-size: 1.2rem;
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

const CommentLengthBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const CommentLength = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1rem;
`;
