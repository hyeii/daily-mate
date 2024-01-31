interface props {
  totalInput: number | null;
  totalOutput: number | null;
}

const InOutMonthly = ({ totalInput, totalOutput }: props) => {
  return (
    <div>
      <div>수입</div>
      <div>{totalInput}</div>
      <div>지출</div>
      <div>{totalOutput}</div>
    </div>
  );
};

export default InOutMonthly;
