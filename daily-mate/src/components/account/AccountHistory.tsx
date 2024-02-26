import { useRecoilState } from "recoil";
import { accountByDateResponse } from "../../types/accountType";
import {
  modalOriginAccountState,
  modalTypeState,
  openModalState,
} from "../../atoms/accountAtom";
import { LuPencil, LuX } from "react-icons/lu";
import { deleteAccount } from "../../apis/accountApi";
import styled from "styled-components";
import { useState } from "react";

interface props {
  accountList: accountByDateResponse[] | null;
}

const AccountHistory = ({ accountList }: props) => {
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [modalOriginAccount, setModalOriginAccount] = useRecoilState(
    modalOriginAccountState
  );

  const [openIcon, setOpenIcon] = useState<number>(0);

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
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeaderCell>카테고리</TableHeaderCell>
              <TableHeaderCell>내용</TableHeaderCell>
              <TableHeaderCell>금액</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {accountList &&
              accountList.map((item) => (
                <tr
                  key={item.accountId}
                  onMouseEnter={() => setOpenIcon(item.accountId)}
                  onMouseLeave={() => setOpenIcon(0)}
                >
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.content}</TableCell>
                  <TableCell>
                    <AmountCell>
                      <div>{item.amount}</div>
                      <IconStyles
                        style={{ opacity: openIcon === item.accountId ? 1 : 0 }}
                      >
                        <LuPencil onClick={() => handleUpdateAccount(item)} />
                        <LuX
                          onClick={() => handleDeleteAccount(item.accountId)}
                        />
                      </IconStyles>
                    </AmountCell>
                  </TableCell>
                </tr>
              ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AccountHistory;

const IconStyles = styled.div`
  opacity: 0;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const TableContainer = styled.div`
  width: 80vw;
  overflow: auto;
`;

const Table = styled.table`
  width: auto;
  border-collapse: collapse;
`;

const TableHeaderCell = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 8px;

  &:nth-child(1) {
    width: 15%;
  }
  &:nth-child(2) {
    width: 60%;
  }
  &:nth-child(3) {
    width: 25%;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
`;

const AmountCell = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 0.7rem;
  text-align: end;
`;
