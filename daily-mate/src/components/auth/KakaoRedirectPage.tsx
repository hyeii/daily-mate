import { useEffect } from "react";
import { useNavigate } from "react-router";
import useLogin from "../../hooks/useLogIn";
import { kakaoLogIn } from "../../apis/authApis";

const KakaoRedirectPage = () => {
  // redirect 페이지 url에서 코드 찾아오기
  const token = new URL(window.location.href).searchParams.get("accessToken");
  const navigate = useNavigate();
  const { LogIn } = useLogin();

  useEffect(() => {
    const fetchLogin = async () => {
      if (token) {
        const socialResponse = await kakaoLogIn(token);
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
  return (
    <div>
      <h3>카카오로그인중</h3>
    </div>
  );
};

export default KakaoRedirectPage;
