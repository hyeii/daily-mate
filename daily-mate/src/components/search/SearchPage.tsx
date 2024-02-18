import { ChangeEvent, useState } from "react";
import { searchResponse } from "../../types/authType";
import { searchUser } from "../../apis/searchApi";
import UserDataInfo from "../common/UserDataInfo";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<searchResponse[]>([]);

  const searchInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const searchHandler = async () => {
    // 사용자 검색결과 setSearchResult에 저장
    const searchResponse = await searchUser(searchValue);
    if (searchResponse !== null) {
      setSearchResult(searchResponse);
    } else {
      setSearchResult([
        {
          userId: 3,
          nickname: "냥",
          email: "qwe@eqwe",
          profile: "검색테스트1",
          image: "url",
          status: "친구",
        },
        {
          userId: 4,
          nickname: "냥2",
          email: "qwe@eqwe",
          profile: "검색테스트2",
          image: "url",
          status: "대기중",
        },
      ]);
    }
  };

  return (
    <div>
      <h3>사용자 검색</h3>
      <input onChange={searchInputHandler} />
      <button onClick={searchHandler}>검색</button>
      <div>검색 결과</div>
      {searchResult.map((result) => (
        <div key={result.userId}>
          <UserDataInfo
            id={result.userId}
            nickname={result.nickname}
            profile={result.profile}
            image={result.image}
            status={
              result.status === "친구"
                ? "friendList"
                : result.status === "대기중"
                ? "waitingList"
                : "search"
            }
          />
          {/* 내가 걸고 상대가 대기중인 상태 고려 추가 */}
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
