import { ChangeEvent, useState } from "react";
import { commentBody } from "../../types/diaryType";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atoms/authAtom";
import { addComment } from "../../apis/diaryApi";

interface props {
  diaryId: number;
}

const AddComment = ({ diaryId }: props) => {
  const [inputComment, setInputComment] = useState<string>("");
  const userInfo = useRecoilValue(userInfoState);
  const handleComment = (event: ChangeEvent<HTMLInputElement>) => {
    setInputComment(event.target.value);
  };
  const submitComment = () => {
    if (inputComment === "") {
      alert("댓글을 입력해주세요");
      return;
    }
    const comment: commentBody = {
      nickname: userInfo.nickname,
      content: inputComment,
      likeNum: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
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
