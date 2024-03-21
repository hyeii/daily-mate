import { useEffect } from "react";
import useLogOut from "../../hooks/useLogOut";
import { useNavigate } from "react-router-dom";

const KakaoLogOutRedirectPage = () => {
  const { LogOut } = useLogOut();
  const navigate = useNavigate();

  useEffect(() => {
    LogOut();
    alert("로그아웃 완료");
    navigate("/");
  }, []);

  return (
    <div>
      <h3>카카오 로그아웃</h3>
    </div>
  );
};

export default KakaoLogOutRedirectPage;
