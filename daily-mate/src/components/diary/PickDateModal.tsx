import styled from "styled-components";
import { LuX } from "react-icons/lu";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { writeDate } from "../../atoms/diaryAtom";

interface props {
  setOpenDatePickModal: Dispatch<SetStateAction<boolean>>;
}

const PickDateModal = ({ setOpenDatePickModal }: props) => {
  const [getWriteDate, setGetWriteDate] = useRecoilState(writeDate);
  const [writeDateValue, setWriteDateValue] = useState<string>("");

  useEffect(() => {
    setWriteDateValue(getWriteDate);
  }, []);

  const handlePickDate = (event: ChangeEvent<HTMLInputElement>) => {
    setWriteDateValue(event.target.value);
  };

  const submitPickDate = () => {
    setGetWriteDate(writeDateValue);
    setOpenDatePickModal(false);
  };

  return (
    <ModalBackDrop>
      <ModalContainer>
        <h3>날짜를 선택해주세요</h3>
        <input
          type="date"
          defaultValue={getWriteDate}
          onChange={handlePickDate}
        />
        <button onClick={submitPickDate}>적용하기</button>
        <CloseBtn size={26} onClick={() => setOpenDatePickModal(false)} />
      </ModalContainer>
    </ModalBackDrop>
  );
};

export default PickDateModal;

const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const ModalContainer = styled.div`
  padding: 1.5rem 2rem;

  z-index: 999;
  font-size: 1rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: #ffffff;
  box-shadow: 0px 0px 15px #000000;
  border-radius: 30px;
  width: 300px;
  height: 350px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CloseBtn = styled(LuX)`
  position: absolute;
  top: 0px;
  right: -40px;
  cursor: pointer;
`;
