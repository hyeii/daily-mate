import { useRecoilValue } from "recoil";
import { userImageURLState } from "../../atoms/authAtom";

const ProfileImage = () => {
  const imageURL = useRecoilValue(userImageURLState);
  return <div>{imageURL}</div>;
};

export default ProfileImage;
