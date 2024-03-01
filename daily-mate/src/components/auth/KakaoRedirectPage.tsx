import { useEffect } from "react";

const KakaoRedirectPage = () => {
  // redirect 페이지 url에서 코드 찾아오기
  const code = new URL(window.location.href).searchParams.get("code");
  useEffect(() => {
    // 백엔드에 code 보내기
    console.log(code);
    // 이후 단계
    // => 백엔드에 code를 보내고 백에서 accessToken을 만들어서 보낸걸 받아온다
    // 그 accessToken을 등록하고 로그인 완룡
  });
  return (
    <div>
      <h3>로그인중</h3>
    </div>
  );
};

export default KakaoRedirectPage;
