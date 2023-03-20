import { useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const MainContainer = styled.div`
  height: 90%;
  background-color: gray;
  padding: 2rem;
  border-radius: 10px;
`;

export default () => {
  const [todoItems, setTodoItems] = useState([1, 2, 3, 4]);
  return (
    <MainContainer>
      <h1>Todo Items</h1>
      {todoItems.map((todoItem, index) => {
        return <TodoItem key={index} id={index} />;
      })}
    </MainContainer>
  );
};
