import { ChangeEvent, useState } from "react";

const DiaryWritePage = () => {
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputContent, setInputContent] = useState<string>("");
  const [inputFeeling, setInputFeeling] = useState<string>("");
  const [inputWeather, setInputWeather] = useState<string>("");
  const [inputOpenType, setInputOpenType] = useState<string>("");
  const [inputImage, setInputImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const formData = new FormData();

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const handleContent = (event: ChangeEvent<HTMLInputElement>) => {
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

      const imagePreviewUrl = URL.createObjectURL(imageFile);
      setImagePreview(imagePreviewUrl);
      console.log(imagePreviewUrl);
    }
  };

  const submitDiary = () => {
    // 일기 저장
  };
  return (
    // 이하 select, radio 추후 컴포넌트 처리
    <div>
      <h3>일기 작성하기</h3>
      <div>제목</div>
      <input type="text" onChange={handleTitle} />
      <div>내용</div>
      <input type="text" onChange={handleContent} />
      <div>날씨</div>
      <select value={inputWeather} onChange={handleWeather}>
        <option value="맑음">맑음</option>
        <option value="흐림">흐림</option>
        <option value="눈">눈</option>
        <option value="비">비</option>
      </select>
      <div>기분</div>
      <select value={inputFeeling} onChange={handleFeeling}>
        <option value="행복">행복</option>
        <option value="분노">분노</option>
        <option value="슬픔">슬픔</option>
        <option value="사랑">사랑</option>
        <option value="우울">우울</option>
        <option value="무난">무난</option>
      </select>
      <div>공개설정</div>
      <input
        type="radio"
        id="type1"
        name="openType"
        value="공개"
        onChange={handleOpenType}
      />
      <label htmlFor="type1">공개</label>
      <input
        type="radio"
        id="type2"
        name="openType"
        value="비공개"
        onChange={handleOpenType}
      />
      <label htmlFor="type2">비공개</label>
      <input
        type="radio"
        id="type3"
        name="openType"
        value="친구공개"
        onChange={handleOpenType}
      />
      <label htmlFor="type3">친구공개</label>
      <div>이미지</div>
      <input type="file" accept="image/*" onChange={handleImage} />
      <img src={imagePreview} alt="preview" />
      <button onClick={submitDiary}>저장</button>
    </div>
  );
};

export default DiaryWritePage;
