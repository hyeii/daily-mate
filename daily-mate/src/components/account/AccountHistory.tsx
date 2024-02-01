import { accountByDateResponse } from "../../types/accountType";

interface props {
  accountList: accountByDateResponse[];
}

const AccountHistory = ({ accountList }: props) => {
  return (
    <div>
      <h3>거래내역</h3>
      <div>
        <div>날짜</div>
        <div>카테고리</div>
        <div>내용</div>
        <div>금액</div>
      </div>
    </div>
  );
};

export default AccountHistory;
