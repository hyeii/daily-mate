import { useRecoilState } from "recoil";
import styled from "styled-components";
import { sideBarOpenState } from "../../atoms/sideBarAtom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useRecoilState(sideBarOpenState);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <SidebarContainer isopen={isOpen ? "open" : "close"}>
      사이드바
      <button onClick={handleOpen}>버튼</button>
    </SidebarContainer>
  );
};

export default SideBar;

interface SidebarProps {
  isopen: string;
}

const SidebarContainer = styled.div<SidebarProps>`
  position: fixed;
  height: 100vh;
  left: ${({ isopen }) => (isopen === "open" ? "0" : "-300px")};
  width: 300px;
  background-color: #fbeffb;
  overflow-x: hidden;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
`;
