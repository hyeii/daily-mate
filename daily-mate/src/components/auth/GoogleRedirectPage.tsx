import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socialLogIn } from "../../apis/authApis";
import useLogin from "../../hooks/useLogIn";

const GoogleRedirectPage = () => {
  const token = new URL(window.location.href).searchParams.get("accessToken");
  const navigate = useNavigate();
  const { LogIn } = useLogin();

  useEffect(() => {
    const fetchLogin = async () => {
      if (token) {
        const socialResponse = await socialLogIn(token);
        if (socialResponse) {
          if (!localStorage.getItem("accessToken")) {
            alert(`${socialResponse.nickName}님 어서오세요!`);
          }
          LogIn(socialResponse);
          navigate("/account");
        } else {
          alert("다시 로그인을 시도해주세요.");
        }
      }
    };

    fetchLogin();
  }, []);
  return <div>구글로그인중</div>;
};

export default GoogleRedirectPage;
