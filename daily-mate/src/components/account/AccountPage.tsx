import AccountCalendar from "./AccountCalendar";
import AccountMonthly from "./AccountMonthly";
import AccountDaily from "./AccountDaily";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  accountTabState,
  modalOriginAccountState,
  modalTypeState,
  openModalState,
  selectedDateState,
} from "../../atoms/accountAtom";
import AddAccountModal from "./AddAccountModal";
import { useState } from "react";
import styled from "styled-components";

const AccountPage = () => {
  const [accountTab, setAccountTab] = useRecoilState(accountTabState);
  const selectedDateNow = useRecoilValue(selectedDateState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [modalOriginAccount, setModalOriginAccount] = useRecoilState(
    modalOriginAccountState
  );

  const handleCalendar = () => {
    setAccountTab("calendar");
  };
  const handleMonthly = () => {
    setAccountTab("monthly");
  };
  const handleDaily = () => {
    setAccountTab("daily");
  };

  const handleOpenModal = () => {
    setModalType("add");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // AccountPage에서 onClick => openType="add"
  // AccountHistory에서 onClick => openType="modify"

  return (
    <div>
      <AccountTabContainer>
        <AccountTabText onClick={handleCalendar}>달력</AccountTabText>
        <AccountTabText onClick={handleMonthly}>월 통계</AccountTabText>
        <AccountTabText onClick={handleDaily}>일 통계</AccountTabText>
        <AccountTabText onClick={handleOpenModal}>항목 추가</AccountTabText>
      </AccountTabContainer>
      <div>
        {accountTab === "calendar" ? (
          <AccountCalendar />
        ) : accountTab === "monthly" ? (
          <AccountMonthly />
        ) : (
          <AccountDaily currentDay={selectedDateNow} />
        )}
      </div>
      {openModal && (
        <AddAccountModal
          openType={modalType}
          originAccount={modalOriginAccount}
        />
      )}
    </div>
  );
};

export default AccountPage;

const Wrapper = styled.div``;
const AccountTabContainer = styled.div`
  display: flex;
`;

const AccountTabText = styled.h3`
  margin-right: 2rem;
  font-size: 1.2rem;
  font-weight: normal;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;
