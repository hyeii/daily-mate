import { ChangeEvent, useState } from "react";
import FriendInfo from "./FriendInfo";
import { friendResponse } from "../../types/authType";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<friendResponse[]>([]);

  const searchInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const searchHandler = () => {
    console.log(searchValue);
    // 사용자 검색결과 setSearchResult에 저장
  };

  return (
    <div>
      <h3>사용자 검색</h3>
      <input onChange={searchInputHandler} />
      <button onClick={searchHandler}>검색</button>
      <div>검색 결과</div>
      {searchResult.map((result) => (
        <div key={result.fromId}>
          <FriendInfo status="search" friendData={result} />
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
