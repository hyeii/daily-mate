import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import {
  modalOriginAccountState,
  modalTypeState,
  openModalState,
} from "../../atoms/accountAtom";
import { accountByDateResponse, accountRequest } from "../../types/accountType";
import { addAccount, modifyAccount } from "../../apis/accountApi";
import styled from "styled-components";
import { LuX } from "react-icons/lu";
import { format } from "date-fns";

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

  const [date, setDate] = useState<string>(
    originAccount.date !== ""
      ? originAccount.date
      : format(new Date(), "yyyy-MM-dd")
  );
  const [category, setCategory] = useState<string>(
    originAccount.category !== "" ? originAccount.category : "식비"
  );
  const [content, setContent] = useState<string>(originAccount.content);
  const [ammount, setAmmount] = useState<number>(originAccount.amount);
  const [addType, setAddType] = useState<string>("out");

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };
  const handleContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleAmmount = (event: ChangeEvent<HTMLInputElement>) => {
    let numberOnly = event.target.value.replace(/[^0-9]/g, "");
    event.target.value = numberOnly.replace(/\d(?=(?:\d{3})+$)/g, "$&,");
    setAmmount(parseInt(numberOnly));
  };

  const handleAddTypeIn = () => {
    setAddType("in");
    setCategory("");
  };
  const handleAddTypeOut = () => {
    setAddType("out");
    if (originAccount.category !== "") setCategory(originAccount.category);
    else setCategory("식비");
  };
  const submitAccount = () => {
    // add일때 modify일때 다르게 처리
    // openType="add" :  /account api POST 요청
    // openType="modify" :  /account/{accountId} api PATCH 요청
    const ammountData = () =>
      addType === "in" ? Math.abs(ammount) : -Math.abs(ammount);

    const newAccount: accountRequest = {
      content: content,
      date: date,
      amount: ammountData(),
      category: category,
    };
    if (openType === "add") {
      if (addAccount(newAccount) !== null) {
        alert("가계부 등록 완료");
        handleCloseModal();
        window.location.reload();
      }
    }

    if (openType === "modify") {
      if (modifyAccount(newAccount, originAccount.accountId) !== null) {
        alert("가계부 수정 완료");
        handleCloseModal();
        window.location.reload();
      }
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
    <ModalBackDrop>
      <ModalContainer>
        {openType === "add" ? (
          <h3 style={{ margin: "5px 0" }}>항목 추가</h3>
        ) : (
          <h3 style={{ margin: "5px 0" }}>항목 수정</h3>
        )}
        <AddContainer>
          <div style={{ visibility: "hidden" }}>공백</div>
          <InOutContainer>
            <InOutBox type="in" state={addType} onClick={handleAddTypeIn}>
              수입
            </InOutBox>
            <InOutBox type="out" state={addType} onClick={handleAddTypeOut}>
              지출
            </InOutBox>
          </InOutContainer>
          <AddBox>날짜</AddBox>
          <AddInput
            type="date"
            key={date}
            defaultValue={date}
            onChange={handleDate}
          />

          <AddBox>카테고리</AddBox>
          {addType === "out" ? (
            <AddSelect
              defaultValue={category}
              key={category}
              onChange={handleCategory}
            >
              <option value="식비">식비</option>
              <option value="카페">카페</option>
              <option value="생활">생활</option>
              <option value="교통">교통</option>
              <option value="기타">기타</option>
            </AddSelect>
          ) : (
            <AddSelect value={""} onChange={handleCategory}>
              <option value="">수입</option>
            </AddSelect>
          )}

          <AddBox>내용</AddBox>
          <AddInput
            onChange={handleContent}
            defaultValue={originAccount.content}
          />

          <AddBox>금액</AddBox>
          <AddInput
            type="text"
            onChange={handleAmmount}
            defaultValue={Math.abs(originAccount.amount)}
          />
        </AddContainer>
        <BtnBox>
          <CompleteBtn onClick={submitAccount}>완료</CompleteBtn>
        </BtnBox>
        <CloseBtn size={26} onClick={handleCloseModal}>
          닫기
        </CloseBtn>
      </ModalContainer>
    </ModalBackDrop>
  );
};

export default AddAccountModal;

const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const ModalContainer = styled.div`
  padding: 1.5rem 2rem;

  z-index: 999;
  font-size: 1rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: #ffffff;
  box-shadow: 0px 0px 15px #000000;
  border-radius: 30px;
  width: 450px;
  height: 350px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AddContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-row-gap: 0.7rem;
  height: 230px;
`;

const AddBox = styled.div`
  display: flex;
  align-items: center;
`;

const AddInput = styled.input`
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  font-family: "S-CoreDream-3Light";
`;

const InOutContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

interface InOutProps {
  type: string;
  state: string;
}
const InOutBox = styled.span<InOutProps>`
  color: ${({ type, state }) => (type === state ? "#ff6161" : "#afafaf")};
  font-weight: ${({ type, state }) => (type === state ? "bold" : "default")};
  cursor: pointer;
`;

const AddSelect = styled.select`
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
  font-family: "S-CoreDream-3Light";
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 12px;
`;
const CompleteBtn = styled.button`
  background-color: #ff6161;
  color: white;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
  padding: 6px 18px;
  font-family: "S-CoreDream-3Light";
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    background-color: #e45757;
  }

  &:active {
    transform: scale(1.05);
  }
`;

const CloseBtn = styled(LuX)`
  position: absolute;
  top: 0px;
  right: -40px;
  cursor: pointer;
`;
