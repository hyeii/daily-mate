import { ChangeEvent, useState } from "react";
import { searchResponse } from "../../types/authType";
import { searchUser } from "../../apis/searchApi";

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
          {/* <FriendInfo status="search" friendData={result} /> */}
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
