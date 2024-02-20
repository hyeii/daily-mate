import { ChangeEvent, useEffect, useState } from "react";
import { commentBody, commentListResponse } from "../../types/diaryType";
import {
  deleteComment,
  getCommentList,
  updateComment,
} from "../../apis/diaryApi";
import AddComment from "./AddComment";
import { useRecoilValue } from "recoil";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { userInfoState } from "../../atoms/authAtom";
import styled from "styled-components";
import { format } from "date-fns";

interface props {
  diaryId: number;
}

const DiaryComment = ({ diaryId }: props) => {
  const [commentList, setCommentList] = useState<commentListResponse[]>([
    {
      commentId: 12,
      content: "댓글테스트",
      nickname: "당근2",
      isLiked: true,
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
  const [openButtons, setOpenButtons] = useState<number>(-1);

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

  const handleOpenButtons = (commentId: number) => {
    setOpenButtons(commentId);
  };

  return (
    <div>
      <AddComment diaryId={diaryId} />
      {commentList.map((comment) => (
        <CommentWrapper
          key={comment.commentId}
          onMouseEnter={() => handleOpenButtons(comment.commentId)}
          onMouseLeave={() => handleOpenButtons(-1)}
        >
          <CommentTop>
            <NicknameBox>{comment.nickname}</NicknameBox>
            <div>{format(comment.createdAt, "yyyy년 M월 d일")}</div>
          </CommentTop>
          <CommentMiddle>
            {updateState === comment.commentId ? (
              <input
                type="text"
                defaultValue={comment.content}
                onChange={handleUpdateComment}
              />
            ) : (
              <ContentBox>{comment.content}</ContentBox>
            )}
          </CommentMiddle>
          <CommentBottom>
            <div>
              {comment.isLiked ? <HiHeart /> : <HiOutlineHeart />}{" "}
              {comment.likeNum}
            </div>
            {comment.nickname === userInfo.nickname &&
            comment.commentId === openButtons &&
            updateState !== comment.commentId ? (
              <div>
                <ControlButtons onClick={() => CheckUpdateComment(comment)}>
                  수정
                </ControlButtons>
                <ControlButtons onClick={() => submitDeleteComment(comment)}>
                  삭제
                </ControlButtons>
              </div>
            ) : comment.nickname === userInfo.nickname &&
              updateState === comment.commentId ? (
              <div>
                <ControlButtons onClick={() => submitUpdateComment(comment)}>
                  완료
                </ControlButtons>
                <ControlButtons onClick={cancelUpdateComment}>
                  취소
                </ControlButtons>
              </div>
            ) : null}
          </CommentBottom>
        </CommentWrapper>
      ))}
    </div>
  );
};

export default DiaryComment;

// 작성자     작성일시
// 댓글내용랄랄라
// 좋아요     수정삭제

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentMiddle = styled.div`
  margin: 0.2rem 0;
`;

const CommentBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NicknameBox = styled.div`
  font-weight: bold;
`;

const ContentBox = styled.div`
  font-size: 1.1rem;
`;

const ControlButtons = styled.span`
  cursor: pointer;
  margin: 0 0.3rem;
  &:hover {
    font-weight: bold;
  }
`;
