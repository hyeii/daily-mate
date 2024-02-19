import { ChangeEvent, useState } from "react";
import { commentBody } from "../../types/diaryType";
import { addComment } from "../../apis/diaryApi";

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
  };
  return (
    <div>
      <div>댓글 작성</div>
      <input type="text" onChange={handleComment} />
      <button onClick={submitComment}>작성</button>
    </div>
  );
};

export default AddComment;
