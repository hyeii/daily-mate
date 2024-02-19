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
          profile: "검색테스트1 - 친구임",
          image: "url",
          status: true,
          requestDate: "2024-02-13",
        },
        {
          userId: 4,
          nickname: "냥2",
          email: "qwe@eqwe",
          profile: "검색테스트2 - 대기중임",
          image: "url",
          status: false,
          requestDate: "2024-02-13",
        },
        {
          userId: 5,
          nickname: "냥3",
          email: "qwe@eqwe",
          profile: "검색테스트3 - 친구아님",
          image: "url",
          status: false,
          requestDate: null,
        },
      ]);
    }
  };

  const checkFriendState = (result: searchResponse) => {
    const { status, requestDate } = result;
    return status
      ? "friendList"
      : requestDate !== null
      ? "bothWaitingList"
      : "search";
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
            status={checkFriendState(result)}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
