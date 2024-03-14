import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { findSuccess } from "../../../apis/todoApi";

interface Props {
  date: string;
}

const TodoCell = ({ date }: Props) => {
  const navigate = useNavigate();
  const [successRate, setSuccessRate] = useState<number | null>(null);

  useEffect(() => {
    const getSuccess = async (date: string) => {
      const result: number | null = await findSuccess(date);
      if (result != null) {
        setSuccessRate(result);
      }
      // try {
      //   const response = await axios.get("http://localhost:8080/todo/success", {
      //     params: {
      //       date: date,
      //     },
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   });

      //   setSuccessRate(response.data);
      // } catch (error) {
      //   console.error("Error fetching todo list:", error);
      // }
    };

    getSuccess(date);
  }, [date]);

  const handleTodoPageNavigation = () => {
    navigate("/todo");
  };

  return (
    <Container onClick={handleTodoPageNavigation}>
      {successRate !== null && successRate >= 0 && (
        <>
          {successRate < 50 ? (
            <RedSpan>달성도: {successRate}%</RedSpan>
          ) : (
            <GreenSpan>달성도: {successRate}%</GreenSpan>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  border: none;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const GreenSpan = styled.span`
  color: green;
  font-size: 20px;
`;

const RedSpan = styled.span`
  color: red;
  font-size: 20px;
`;

export default TodoCell;
