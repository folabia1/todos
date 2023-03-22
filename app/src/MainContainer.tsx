import { useEffect, useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { api } from "./api/api";
import NewTodoItem from "./NewTodoItem";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 90vh;
  width: 30rem;
  background-color: gray;
  padding: 2rem;
  overflow-y: scroll;
  border-radius: 10px;
  .todo-items {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
`;

export default () => {
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);
  const { data: todoItems, isLoading } = api.endpoints.getTodoItems.useQuery({});
  const allCompleted = todoItems?.data.every((todoItem) => todoItem.completed);

  return (
    <MainContainer>
      <h1>Todo Items</h1>
      <div className="todo-items">{todoItems && todoItems.data.map((todoItem) => <TodoItem key={todoItem.id} {...todoItem} />)}</div>
      {isLoading && <span>Loading...</span>}
      {isCreatingTodo ? (
        <NewTodoItem
          onComplete={() => {
            setIsCreatingTodo(false);
          }}
        />
      ) : (
        <button
          onClick={() => {
            setIsCreatingTodo(true);
          }}
        >
          Add New
        </button>
      )}
      {todoItems && todoItems.data.length > 1 && (
        <button
          onClick={() => {
            // markAllTodoItemsAsCompleted();
          }}
          disabled
        >
          {allCompleted ? "Deselect All" : "Select All"}
        </button>
      )}
    </MainContainer>
  );
};
