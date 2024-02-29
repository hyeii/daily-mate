import { ChangeEvent, KeyboardEvent, useState } from "react";
import { searchResponse } from "../../types/authType";
import { searchUser } from "../../apis/searchApi";
import UserDataInfo from "../common/UserDataInfo";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<searchResponse[]>([]);

  const searchInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const searchHandler = async () => {
    // 사용자 검색결과 setSearchResult에 저장
    const searchResponseResult = await searchUser(searchValue);
    if (searchResponseResult !== null) {
      setSearchResult(searchResponseResult);
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

  const enterKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") searchHandler();
  };

  return (
    <SearchPageWrapper>
      <SearchTitle>사용자 검색</SearchTitle>
      <InputContainer>
        <AddInput onChange={searchInputHandler} onKeyDown={enterKeyHandler} />
        <SubmitContainer>
          <SubmitSearch size={20} onClick={searchHandler} />
        </SubmitContainer>
      </InputContainer>
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
    </SearchPageWrapper>
  );
};

export default SearchPage;

const SearchPageWrapper = styled.div``;

const SearchTitle = styled.h2`
  font-size: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AddInput = styled.input`
  flex: 8;
  height: 30px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  font-family: "LeeSeoyun";
  font-size: 1.5rem;

  box-shadow: 0 0 5px rgb(137, 137, 137);
`;
const SubmitContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
`;
const SubmitSearch = styled(FaSearch)`
  cursor: pointer;
  &: hover {
    transform: scale(1.1);
  }
`;
