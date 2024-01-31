interface props {
  currentDay: string;
}

const AccountDaily = ({ currentDay }: props) => {
  return (
    <div>
      <div>일 통계</div>
      <div>{currentDay}</div>
    </div>
  );
};

export default AccountDaily;
