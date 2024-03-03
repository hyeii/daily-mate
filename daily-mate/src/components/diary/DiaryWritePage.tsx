import { ChangeEvent, useEffect, useState } from "react";
import { diaryRequest } from "../../types/diaryType";
import { addDiary } from "../../apis/diaryApi";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { writeDate } from "../../atoms/diaryAtom";
import { formatDate } from "../common/FormatDate";
import PickDateModal from "./PickDateModal";
import { useNavigate } from "react-router-dom";
import { userInfoState } from "../../atoms/authAtom";

const DiaryWritePage = () => {
  //  날짜 props를 전달하되, 전달된게 없다면 오늘 기준으로 임의지정 가능하도록
  //  => recoil로 저장
  const [getWriteDate, setGetWriteDate] = useRecoilState(writeDate);
  const userInfo = useRecoilValue(userInfoState);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("작성할 날짜 : " + getWriteDate);
  }, []);

  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputContent, setInputContent] = useState<string>("");
  const [inputFeeling, setInputFeeling] = useState<string>("행복");
  const [inputWeather, setInputWeather] = useState<string>("맑음");
  const [inputOpenType, setInputOpenType] = useState<string>("");
  const [inputImage, setInputImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [openDatePickModal, setOpenDatePickModal] = useState<boolean>(false);

  const handleOpenDatePickModal = () => {
    console.log(openDatePickModal);
    setOpenDatePickModal(!openDatePickModal);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(event.target.value);
  };
  const handleFeeling = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputFeeling(event.target.value);
  };
  const handleWeather = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputWeather(event.target.value);
  };

  const handleOpenType = (event: ChangeEvent<HTMLInputElement>) => {
    setInputOpenType(event.target.value);
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    console.log(imageFile);
    if (imageFile) {
      setInputImage(imageFile);

      // 첨부한 이미지 프리뷰 확인용
      const imagePreviewUrl = URL.createObjectURL(imageFile);
      setImagePreview(imagePreviewUrl);
      console.log(imagePreviewUrl);
    }
  };

  const submitDiary = () => {
    // 일기 저장

    if (inputTitle === "") {
      alert("제목을 작성해주세요");
      return;
    }

    if (inputContent === "") {
      alert("내용을 작성해주세요");
      return;
    }

    if (inputOpenType === "") {
      alert("공개 범위를 선택해주세요");
      return;
    }

    const diaryData: diaryRequest = {
      title: inputTitle,
      content: inputContent,
      date: getWriteDate,
      weather: inputWeather,
      feeling: inputFeeling,
      openType: inputOpenType,
    };
    const formData = new FormData();
    formData.append(
      "diaryReqDto",
      new Blob([JSON.stringify(diaryData)], { type: "application/json" })
    );
    if (inputImage) formData.append("image", inputImage);

    if (addDiary(formData) !== null) {
      alert("일기 작성 완료!");
      setTimeout(() => {
        navigate(`/diary/monthly/${userInfo.userId}`);
      }, 1000);
    }
  };
  return (
    // 이하 select, radio 추후 컴포넌트 처리
    <DiaryWriteWrapper>
      <h3>새로운 일기</h3>
      <WriteDateBox>
        <h2>{formatDate(getWriteDate)}</h2>
      </WriteDateBox>
      {/* 변경한 날짜에 이미 일기 존재할 시 중복 처리 이슈로 보류 */}
      {/* <button onClick={handleOpenDatePickModal}>날짜 변경하기</button> */}
      <RelativeWrapper>
        <LeftWrapper>
          <TitleInputBox>
            <TitleInput placeholder="제목" type="text" onChange={handleTitle} />
          </TitleInputBox>
          <ContentInputbox>
            <ContentInput
              cols={10}
              rows={15}
              placeholder="하루를 기록해보세요"
              value={inputContent}
              onChange={handleContent}
            />
          </ContentInputbox>
        </LeftWrapper>
        <RightWrapper>
          <PickContainer>
            <WeatherContainer>
              <PickText>날씨</PickText>
              <AddSelect value={inputWeather} onChange={handleWeather}>
                <option value="맑음">맑음</option>
                <option value="흐림">흐림</option>
                <option value="눈">눈</option>
                <option value="비">비</option>
              </AddSelect>
            </WeatherContainer>
            <FeelingContainer>
              <PickText>기분</PickText>
              <AddSelect value={inputFeeling} onChange={handleFeeling}>
                <option value="행복">행복</option>
                <option value="분노">분노</option>
                <option value="슬픔">슬픔</option>
                <option value="사랑">사랑</option>
                <option value="우울">우울</option>
                <option value="무난">무난</option>
              </AddSelect>
            </FeelingContainer>
          </PickContainer>

          <OpenTypeRadioContainer>
            <PickText>공개설정</PickText>
            <RadioButtonContainer>
              <input
                type="radio"
                id="type1"
                name="openType"
                value="공개"
                onChange={handleOpenType}
              />
              <label htmlFor="type1">공개</label>
            </RadioButtonContainer>
            <RadioButtonContainer>
              <input
                type="radio"
                id="type2"
                name="openType"
                value="비공개"
                onChange={handleOpenType}
              />
              <label htmlFor="type2">비공개</label>
            </RadioButtonContainer>
            <RadioButtonContainer>
              <input
                type="radio"
                id="type3"
                name="openType"
                value="친구공개"
                onChange={handleOpenType}
              />
              <label htmlFor="type3">친구공개</label>
            </RadioButtonContainer>
          </OpenTypeRadioContainer>
          <AddLabel htmlFor="file">이미지 첨부하기</AddLabel>
          <AddImage
            type="file"
            accept="image/*"
            id="file"
            onChange={handleImage}
          />
          {inputImage && (
            <PreviewImgBox>
              <PreviewImg src={imagePreview} alt="preview" />
            </PreviewImgBox>
          )}
        </RightWrapper>
      </RelativeWrapper>
      <SubmitBtnBox>
        <SubmitBtn onClick={submitDiary}>저장</SubmitBtn>
      </SubmitBtnBox>
      {openDatePickModal ? (
        <PickDateModal setOpenDatePickModal={setOpenDatePickModal} />
      ) : null}
    </DiaryWriteWrapper>
  );
};

export default DiaryWritePage;

const DiaryWriteWrapper = styled.div`
  font-family: "LeeSeoyun";
  font-size: 1.1rem;
`;

const RelativeWrapper = styled.div`
  @media screen and (min-width: 1300px) {
    display: flex;
  }
`;

const WriteDateBox = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleInputBox = styled.div`
  width: auto;
  display: flex;
  margin: 1rem 0;
`;

const TitleInput = styled.input`
  flex: 1;
  font-size: 1.5em;
  width: auto;
  border: 0;
  border-bottom: 0.1rem solid;
  border-color: #d4d4d4;
  outline: none;
  padding: 0.5rem;
  font-family: "LeeSeoyun";
  background-color: transparent;

  &:focus {
    border-color: #000000;
  }
`;

const ContentInputbox = styled.div`
  width: auto;
  display: flex;
  margin: 1rem 0;
`;

const ContentInput = styled.textarea`
  flex: 1;
  resize: none;
  font-size: 1.5em;
  width: auto;
  border: 0.1rem solid;
  border-radius: 0.5rem;
  border-color: #ffffff;
  background-color: #ffffff;
  outline: none;
  padding: 0.5rem;
  font-family: "LeeSeoyun";

  &:focus {
    border-color: #d4d4d4;
  }
`;

const PickContainer = styled.div`
  display: flex;

  @media screen and (min-width: 1300px) {
    margin: 2rem 0;
  }
`;

const PickText = styled.div`
  margin-right: 1rem;
  font-weight: bold;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const FeelingContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const AddSelect = styled.select`
  border: 0;
  border-radius: 15px;
  outline: none;
  font-size: 1.1em;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  font-family: "LeeSeoyun";
`;

const AddImage = styled.input`
  margin: 0.5rem 0;
  opacity: 0;
`;

const AddLabel = styled.label`
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ffffff;
  font-family: "LeeSeoyun";

  &:hover {
    background-color: #f3bebe;
    color: #ffffff;
  }
`;

const OpenTypeRadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  @media screen and (min-width: 1300px) {
    margin: 2rem 0;
  }
`;

const RadioButtonContainer = styled.div`
  margin: 0 0.5rem;
`;

const SubmitBtnBox = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitBtn = styled.button`
  background-color: #ff6161;
  color: white;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
  padding: 0.7rem 1.3rem;
  font-family: "LeeSeoyun";
  font-size: 1.2em;
  margin: 1rem;
  transition: transform 0.2s, background-color 0.3s;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #f61c1c;
  }

  &:active {
    transform: scale(1.05);
  }
`;

const LeftWrapper = styled.div`
  @media screen and (min-width: 1300px) {
    flex: 2;
    margin-right: 1rem;
  }
`;

const RightWrapper = styled.div`
  @media screen and (min-width: 1300px) {
    flex: 1;
    margin: 3rem 0.3rem;
  }
`;

const PreviewImgBox = styled.div`
  width: auto;
  display: flex;
  margin-top: 0.5rem;
`;

const PreviewImg = styled.img`
  max-width: 100%;
  object-fit: scale-down;

  @media screen and (min-width: 1300px) {
    max-height: 240px;
  }

  @media screen and (max-width: 1299px) {
    max-height: 350px;
  }
`;
