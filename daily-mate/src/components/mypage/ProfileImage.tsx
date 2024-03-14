import { useRecoilState, useSetRecoilState } from "recoil";
import { userImageModalState, userImageURLState } from "../../atoms/authAtom";
import styled from "styled-components";
import { LuPencil } from "react-icons/lu";
import { ChangeEvent, useEffect, useRef } from "react";
import { deleteImage, updateImage } from "../../apis/authApis";

const ProfileImage = () => {
  const S3URL = "https://dailymate.s3.ap-northeast-2.amazonaws.com/";
  const [userImageURL, setUserImageURL] = useRecoilState(userImageURLState);
  const [imageModalState, setImageModalState] =
    useRecoilState(userImageModalState);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: React.BaseSyntheticEvent | MouseEvent
    ) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setImageModalState(false);
      }
    };
    if (imageModalState)
      document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [imageModalState, modalRef]);

  const handleEdit = () => {
    setImageModalState(!imageModalState);
  };

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const updateResult = await updateImage(formData);
      if (updateResult !== null) {
        setUserImageURL(updateResult.image);
        alert("이미지 업데이트 완료");
        setImageModalState(false);
        window.location.reload();
      }
    }
  };

  const handleDeleteImage = async () => {
    const deleteImageRes = await deleteImage();
    if (deleteImageRes) {
      setUserImageURL(null);
      alert("이미지 삭제 완료");
      window.location.reload();
    }
  };

  return (
    <ImageWrapper>
      <ImageContainer>
        <ImageBox
          src={userImageURL ?? process.env.PUBLIC_URL + "/defaultImg.png"}
          alt="userImage"
        />
        <EditBtnBox onClick={handleEdit}>
          <EditIcon size={15} />
        </EditBtnBox>
        <div ref={modalRef}>
          {imageModalState ? (
            <EtcModalWrapper>
              {userImageURL ? (
                <div>
                  <label htmlFor="file">
                    <EtcModalBox>프로필 사진 변경</EtcModalBox>
                    <InputImage
                      type="file"
                      id="file"
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </label>
                  <EtcModalBox onClick={handleDeleteImage}>
                    프로필 사진 삭제
                  </EtcModalBox>
                </div>
              ) : (
                <label htmlFor="file">
                  <EtcModalBox>프로필 사진 등록</EtcModalBox>
                  <InputImage
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleImage}
                  />
                </label>
              )}
            </EtcModalWrapper>
          ) : null}
        </div>
      </ImageContainer>
    </ImageWrapper>
  );
};

export default ProfileImage;

const ImageWrapper = styled.div``;

const ImageContainer = styled.div`
  position: relative;
`;

const ImageBox = styled.img`
  border-radius: 50%;
  width: 10rem;
  height: 10rem;

  @media screen and (max-width: 991px) {
    width: 7rem;
    height: 7rem;
  }

  object-fit: cover;
`;

const EditBtnBox = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  top: 7rem;
  left: 7rem;
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;

  @media screen and (max-width: 991px) {
    top: 5rem;
    left: 5rem;
    width: 1.8rem;
    height: 1.8rem;
  }

  box-shadow: 0 0 4px;

  cursor: pointer;

  &:hover {
    background-color: #fde1e1;
    color: #ea3838;
    box-shadow: 0 0 4px #f8d2d2;
  }
`;

const InputImage = styled.input`
  display: none;
  // opacity: 0;
`;

const EditIcon = styled(LuPencil)``;

const EtcModalWrapper = styled.div`
  position: absolute;
  z-index: 999;
  width: 125px;
  top: 7rem;
  left: 7rem;
  background: #ffffff;
  box-shadow: 0px 0px 10px #939393;
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 1.2rem;

  @media screen and (max-width: 991px) {
    top: 5rem;
    left: 5rem;
    font-size: 1rem;
    width: 105px;
  }
`;

const EtcModalBox = styled.div`
  cursor: pointer;
  margin: 0.7rem 0;
  &: hover {
    font-weight: bold;
  }
`;
