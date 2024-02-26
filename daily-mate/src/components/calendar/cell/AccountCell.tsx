import styled from "styled-components";

interface props {
  date: string;
  input: number;
  output: number;
}

const AccountCell = ({ date, input, output }: props) => {
  // 가계부 셀에 필요한 정보
  // 해당 일자의 수입 및 지출 내역
  // 해당 일자
  return (
    <AccountCellWrapper>
      {input === 0 ? (
        <div> </div>
      ) : (
        <AmountNumber texttype="in">+{input}</AmountNumber>
      )}
      {output === 0 ? (
        <div> </div>
      ) : (
        <AmountNumber texttype="out">{output}</AmountNumber>
      )}
    </AccountCellWrapper>
  );
};

export default AccountCell;

const AccountCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

interface ammountProps {
  texttype: string;
}

const AmountNumber = styled.div<ammountProps>`
  font-size: 1rem;
  color: ${({ texttype }) =>
    texttype === "in" ? "#478FFA" : texttype === "out" ? "#FF4242" : "black"};
`;
