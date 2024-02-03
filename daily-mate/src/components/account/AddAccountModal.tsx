import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import {
  modalOriginAccountState,
  modalTypeState,
  openModalState,
} from "../../atoms/accountAtom";
import { accountByDateResponse, accountRequest } from "../../types/accountType";
import { addAccount, modifyAccount } from "../../apis/accountApi";

interface props {
  openType: string;
  originAccount: accountByDateResponse;
}

const AddAccountModal = ({ openType, originAccount }: props) => {
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [modalOriginAccount, setModalOriginAccount] = useRecoilState(
    modalOriginAccountState
  );

  const [date, setDate] = useState<string>(originAccount.date);
  const [category, setCategory] = useState<string>(originAccount.category);
  const [content, setContent] = useState<string>(originAccount.content);
  const [ammount, setAmmount] = useState<number>(originAccount.amount);

  const handleDate = () => {
    setDate("");
  };

  const handleCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };
  const handleContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleAmmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmmount(parseInt(event.target.value));
  };
  const submitAccount = () => {
    console.log(category);
    console.log(ammount);
    // add일때 modify일때 다르게 처리
    // openType="add" :  /account api POST 요청
    // openType="modify" :  /account/{accountId} api PATCH 요청
    const newAccount: accountRequest = {
      content: content,
      date: date,
      ammount: ammount,
      category: category,
    };
    if (openType === "add") {
      addAccount(newAccount);
    }

    if (openType === "modify") {
      modifyAccount(newAccount, originAccount.accountId);
    }
  };
  const handleCloseModal = () => {
    setModalType("");
    setOpenModal(false);
    setModalOriginAccount({
      accountId: 0,
      userId: 0,
      content: "",
      type: "",
      date: "",
      amount: 0,
      category: "",
    });
  };
  return (
    <div>
      <h3>가계부작성수정팝업</h3>
      {openType === "add" ? <h3>작성하기</h3> : <h3>수정하기</h3>}
      <div onClick={handleCloseModal}>닫기</div>
      <div>날짜</div>
      <input />
      <div>카테고리</div>
      <select value={category} onChange={handleCategory}>
        <option value="식비">식비</option>
        <option value="카페">카페</option>
        <option value="생활">생활</option>
        <option value="교통">교통</option>
        <option value="기타">기타</option>
      </select>
      <div>내용</div>
      <input onChange={handleContent} defaultValue={originAccount.content} />
      <div>금액</div>
      <input
        type="number"
        onChange={handleAmmount}
        defaultValue={originAccount.amount}
      />
      <div onClick={submitAccount}>완료</div>
    </div>
  );
};

export default AddAccountModal;
