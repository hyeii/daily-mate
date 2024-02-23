import { useRecoilValue } from "recoil";
import { userImageURLState } from "../../atoms/authAtom";
import styled from "styled-components";

const ProfileImage = () => {
  const imageURL = useRecoilValue(userImageURLState);
  return (
    <ImageBox src={process.env.PUBLIC_URL + "/defaultImg.png"} alt="default" />
  );
};

export default ProfileImage;

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
