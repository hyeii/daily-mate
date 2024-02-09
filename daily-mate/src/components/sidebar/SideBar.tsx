import { useState } from "react";
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
  height: calc(100% - 60px);
  left: 0;
  width: ${({ isopen }) => (isopen === "open" ? "300px" : "0")};
  background-color: #fbeffb;
  overflow-x: hidden;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
`;
