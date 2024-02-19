import { ChangeEvent, useEffect, useState } from "react";
import { commentBody, commentListResponse } from "../../types/diaryType";
import {
  deleteComment,
  getCommentList,
  updateComment,
} from "../../apis/diaryApi";
import AddComment from "./AddComment";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atoms/authAtom";

interface props {
  diaryId: number;
}

const DiaryComment = ({ diaryId }: props) => {
  const [commentList, setCommentList] = useState<commentListResponse[]>([
    {
      commentId: 12,
      content: "댓글테스트",
      nickname: "당근2",
      isLiked: false,
      likeNum: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      commentId: 134,
      content: "댓글테스트2",
      nickname: "당근",
      isLiked: false,
      likeNum: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  const [updateState, setUpdateState] = useState<number>(-1);
  const [inputUpdateComment, setInputUpdateComment] = useState<string>("");
  const userInfo = useRecoilValue(userInfoState);
  useEffect(() => {
    const fetchData = async () => {
      const commentListData: commentListResponse[] | null =
        await getCommentList(diaryId);
      if (commentListData !== null) {
        setCommentList(commentListData);
      }
    };
    fetchData();
  }, [diaryId]);

  const CheckUpdateComment = (comment: commentListResponse) => {
    if (comment.nickname !== userInfo.nickname) {
      return;
    }
    // 다른 댓글이 수정 상태인 경우 리턴
    if (updateState !== -1) return;

    setUpdateState(comment.commentId);
  };

  const handleUpdateComment = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUpdateComment(event.target.value);
  };

  const submitUpdateComment = (comment: commentListResponse) => {
    // 수정 api
    const updatedComment: commentBody = {
      content: inputUpdateComment,
    };
    updateComment(comment.commentId, updatedComment);
    // updateState 초기화 위치 고민 필요!
    setUpdateState(-1);
  };

  const cancelUpdateComment = () => {
    setUpdateState(-1);
  };

  const submitDeleteComment = (comment: commentListResponse) => {
    if (comment.nickname !== userInfo.nickname) {
      return;
    }
    if (window.confirm("해당 댓글을 삭제할까요?")) {
      deleteComment(comment.commentId);
    }
  };

  return (
    <div>
      <h3>댓글 컴포넌트</h3>
      {commentList.map((comment) => (
        <div key={comment.commentId}>
          {updateState === comment.commentId ? (
            <input
              type="text"
              defaultValue={comment.content}
              onChange={handleUpdateComment}
            />
          ) : (
            <div>{comment.content}</div>
          )}
          <div>{comment.nickname}</div>
          <div>{comment.likeNum}</div>
          {comment.nickname === userInfo.nickname &&
          updateState !== comment.commentId ? (
            <div>
              <span onClick={() => CheckUpdateComment(comment)}>수정</span>
              <span onClick={() => submitDeleteComment(comment)}>삭제</span>
            </div>
          ) : comment.nickname === userInfo.nickname &&
            updateState === comment.commentId ? (
            <div>
              <span onClick={() => submitUpdateComment(comment)}>완료</span>
              <span onClick={cancelUpdateComment}>취소</span>
            </div>
          ) : null}
        </div>
      ))}
      <AddComment diaryId={diaryId} />
    </div>
  );
};

export default DiaryComment;
