import { useRef, useState } from "react";
import styled from "styled-components";
import { api } from "./api/api";
import { TodoItem as TodoItemType } from "./logic/types";

export const StyledTodoItem = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  .left {
    display: flex;
    gap: 0.4rem;
    input {
      font-size: 15px;
      border: none;
      background-color: transparent;
    }
  }
`;

export default ({ id, title, description, dueDate, completed }: TodoItemType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [titleText, setTitleText] = useState(title);
  const [triggerRefetchTodos] = api.endpoints.getTodoItems.useLazyQuery();
  const [deleteTodo, { isLoading: isDeleting }] = api.endpoints.deleteTodoItem.useMutation();
  const [updateTodo, { isLoading: isUpdatingTodo }] = api.endpoints.updateTodoItem.useMutation();

  return (
    <StyledTodoItem>
      <div className="left">
        <input
          type="checkbox"
          checked={completed}
          disabled={isDeleting || isUpdatingTodo}
          onChange={() => {
            updateTodo({ id, completed: !completed })
              .unwrap()
              .then(() => {
                triggerRefetchTodos({});
              });
          }}
        />
        <input
          ref={inputRef}
          type="text"
          value={titleText}
          onChange={(e) => {
            setTitleText(e.target.value);
          }}
          onBlur={() => {
            if (titleText !== title) updateTodo({ id, title: titleText });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (titleText !== title) updateTodo({ id, title: titleText });
              inputRef.current?.blur();
            }
          }}
          style={isDeleting ? { textDecoration: "line-through" } : {}}
        />
      </div>
      <button
        onClick={() => {
          deleteTodo({ id })
            .unwrap()
            .then(() => {
              triggerRefetchTodos({});
            });
        }}
        disabled={isDeleting || isUpdatingTodo}
      >
        Delete
      </button>
    </StyledTodoItem>
  );
};
