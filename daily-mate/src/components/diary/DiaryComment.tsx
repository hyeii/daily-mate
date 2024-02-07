import { useEffect, useState } from "react";
import { commentListResponse } from "../../types/diaryType";
import { getCommentList } from "../../apis/diaryApi";
import AddComment from "./AddComment";

interface props {
  diaryId: number;
}

const DiaryComment = ({ diaryId }: props) => {
  const [commentList, setCommentList] = useState<commentListResponse[]>();
  useEffect(() => {
    const fetchData = async () => {
      const commentListData: commentListResponse[] | null =
        await getCommentList(diaryId);
      if (commentListData !== null) {
        setCommentList(commentListData);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h3>댓글 컴포넌트</h3>
      <AddComment diaryId={diaryId} />
    </div>
  );
};

export default DiaryComment;
