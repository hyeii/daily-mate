import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { diaryByDateResponse, diaryDailyParams } from "../../types/diaryType";
import { deleteDiary, getDiaryByDiaryId, likeDiary } from "../../apis/diaryApi";
import DiaryComment from "./DiaryComment";
import { LuTrash2 } from "react-icons/lu";
import styled from "styled-components";
import { formatDate } from "../common/FormatDate";
import { FullHeart, OutLineHeart } from "../common/CommonStyledComponents";
import { userInfoState } from "../../atoms/authAtom";
import { useRecoilValue } from "recoil";

const DiaryDailyPage = () => {
  const userInfo = useRecoilValue(userInfoState);
  const { diaryId } = useParams<diaryDailyParams>();
  const [diaryDetail, setDiaryDetail] = useState<diaryByDateResponse | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (diaryId !== undefined) {
        const diaryByDateData: diaryByDateResponse | null =
          await getDiaryByDiaryId(parseInt(diaryId));
        if (diaryByDateData !== null) {
          setDiaryDetail(diaryByDateData);
        }
      }
    };
    fetchData();
  }, [diaryId]);

  const deleteDiaryNow = () => {
    if (diaryDetail && deleteDiary(diaryDetail.diaryId) !== null) {
      alert("일기가 삭제되었습니다.");
      setTimeout(() => {
        navigate(`/diary/monthly/${userInfo.userId}`);
      }, 1000);
    }
  };

  // 수정할 수 있다면 수정하기
  const handleLikeDiary = async (diaryId: number) => {
    if (likeDiary(diaryId) !== null) {
      if (diaryId !== undefined) {
        const diaryByDateData: diaryByDateResponse | null =
          await getDiaryByDiaryId(diaryId);
        if (diaryByDateData !== null) {
          window.location.reload();
        }
      }
    }
  };

  const weatherIcon = (weather: string) => {
    let weatherNow = "";
    switch (weather) {
      case "맑음":
        weatherNow = "sunny";
        break;
      case "흐림":
        weatherNow = "cloudy";
        break;
      case "비":
        weatherNow = "rainy";
        break;
      case "눈":
        weatherNow = "snow";
        break;
      default:
        break;
    }
    const weatherSrc: string =
      process.env.PUBLIC_URL + `/free-icon-${weatherNow}.png`;
    return <ImageBox src={weatherSrc} alt="default" />;
  };

  return (
    <DiaryDailyWrapper>
      {diaryDetail && (
        <DiaryContainer>
          <DateBox>
            <div>{formatDate(diaryDetail.date)}</div>
          </DateBox>
          <TitleBox>
            <div>{diaryDetail.title}</div>
          </TitleBox>
          <DiaryTop>
            <FeelingBox>
              <div>오늘의 기분</div>
              <div style={{ margin: "0 0.5rem" }}></div>
              <div>{diaryDetail.feeling}</div>
            </FeelingBox>
            <WeatherBox>
              <div>오늘의 날씨</div>
              <div style={{ margin: "0 0.5rem" }}></div>
              <div>{weatherIcon(diaryDetail.weather)}</div>
            </WeatherBox>
          </DiaryTop>
          <DiaryBottom>
            {diaryDetail.image && (
              <ContentImageContainer>
                <ContentImageBox
                  src={`https://dailymate.s3.ap-northeast-2.amazonaws.com/${diaryDetail.image}`}
                  alt="example"
                />
              </ContentImageContainer>
            )}
            <ContentBox>
              <ContentInside>{diaryDetail.content}</ContentInside>
            </ContentBox>
            <DiaryIconBox>
              {diaryDetail.isMine ? (
                <TrashCan onClick={deleteDiaryNow} />
              ) : (
                <div style={{ opacity: "0" }}>숨김</div>
              )}
              {diaryDetail.isLike ? (
                <div>
                  <FullHeart
                    onClick={() => handleLikeDiary(diaryDetail.diaryId)}
                  />
                  {diaryDetail.likeNum}
                </div>
              ) : (
                <div>
                  <OutLineHeart
                    onClick={() => handleLikeDiary(diaryDetail.diaryId)}
                  />
                  {diaryDetail.likeNum}
                </div>
              )}
            </DiaryIconBox>
          </DiaryBottom>
        </DiaryContainer>
      )}
      {diaryDetail && (
        <CommentContainer>
          <DiaryComment diaryId={diaryDetail.diaryId} />
        </CommentContainer>
      )}
    </DiaryDailyWrapper>
  );
};

export default DiaryDailyPage;

const DiaryDailyWrapper = styled.div`
  width: auto;
  display: flex;
  font-family: "LeeSeoyun";
  font-size: 1.4rem;

  @media screen and (min-width: 992px) {
    flex-direction: row;
  }

  @media screen and (max-width: 991px) {
    flex-direction: column;
  }
`;

const DiaryContainer = styled.div`
  padding: 1rem;
  @media screen and (min-width: 992px) {
    flex: 2 1 0;
  }
`;

const CommentContainer = styled.div`
  padding: 1rem;
  @media screen and (min-width: 992px) {
    flex: 1 1 0;
  }
`;

const DateBox = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.6em;
  margin: 1rem 0;
`;

const ImageBox = styled.img`
  // border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
`;

const DiaryTop = styled.div`
  display: flex;
`;

const DiaryBottom = styled.div`
  padding: 1rem;
`;

const FeelingBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentImageContainer = styled.div`
  display: inline-block;
`;

const ContentImageBox = styled.img`
  width: 100%;
  height: auto;
`;

const ContentBox = styled.div`
  display: flex;
  font-size: 1.4em;
`;

const ContentInside = styled.p`
  line-height: 125%;
  margin: 1rem 0;
`;

const TrashCan = styled(LuTrash2)`
  cursor: pointer;
  &:hover {
    color: #9b9b9b;
  }
`;

const DiaryIconBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
