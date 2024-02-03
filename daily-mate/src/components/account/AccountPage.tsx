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
      <h3>가계부 페이지</h3>
      <div>
        <span onClick={handleCalendar}>달력</span>
        <span onClick={handleMonthly}>월 통계</span>
        <span onClick={handleDaily}>일 통계</span>
        <span onClick={handleOpenModal}>항목 추가</span>
      </div>
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
