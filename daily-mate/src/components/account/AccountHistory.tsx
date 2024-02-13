import { useRecoilState } from "recoil";
import { accountByDateResponse } from "../../types/accountType";
import {
  modalOriginAccountState,
  modalTypeState,
  openModalState,
} from "../../atoms/accountAtom";
import { deleteAccount } from "../../apis/accountApi";

interface props {
  accountList: accountByDateResponse[];
}

const AccountHistory = ({ accountList }: props) => {
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [modalOriginAccount, setModalOriginAccount] = useRecoilState(
    modalOriginAccountState
  );

  const handleUpdateAccount = (item: accountByDateResponse) => {
    // AddAccountModal 열기 openType="modify"
    // accountId만 가져가는게 아니라 아예 item을 가져가야? => recoil로 가져가기
    setModalOriginAccount(item);
    setModalType("modify");
    setOpenModal(true);
  };

  const handleDeleteAccount = (accountId: number) => {
    deleteAccount(accountId);
  };
  return (
    <div>
      <h3>거래내역</h3>
      <div>
        <div>날짜</div>
        <div>카테고리</div>
        <div>내용</div>
        <div>금액</div>
        {accountList.map((item) => (
          <div key={item.accountId}>
            <div>{item.category}</div>
            <div>{item.content}</div>
            <div>{item.amount}</div>
            <div onClick={() => handleUpdateAccount(item)}>수정</div>
            <div onClick={() => handleDeleteAccount(item.accountId)}>삭제</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountHistory;
