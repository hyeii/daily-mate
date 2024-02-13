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
    <div>
      <div>캘린더 가계부 셀</div>
      <div>{input}</div>
      <div>{output}</div>
      <div>{date}</div>
    </div>
  );
};

export default AccountCell;
