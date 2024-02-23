import styled from "styled-components";

interface props {
  date: string;
  input: number | null;
  output: number | null;
}

const AccountCell = ({ date, input, output }: props) => {
  // 가계부 셀에 필요한 정보
  // 해당 일자의 수입 및 지출 내역
  // 해당 일자
  return (
    <AccountCellWrapper>
      {input === 0 || input === null || input === undefined ? (
        <div> </div>
      ) : (
        <AmountNumber textType="in">+{input}</AmountNumber>
      )}
      {output === 0 || output === null || output === undefined ? (
        <div> </div>
      ) : (
        <AmountNumber textType="out">{output}</AmountNumber>
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
  textType: string;
}

const AmountNumber = styled.div<ammountProps>`
  font-size: 1rem;
  color: ${({ textType }) =>
    textType === "in" ? "#478FFA" : textType === "out" ? "#FF4242" : "black"};
`;
