import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { api } from "./api/api";
import { StyledTodoItem } from "./TodoItem";

export default ({ onComplete }: { onComplete: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [titleText, setTitleText] = useState("");
  const [triggerRefetchTodos, { isFetching: isFetchingTodos }] = api.endpoints.getTodoItems.useLazyQuery();
  const [createTodo, { isLoading: isCreatingTodo }] = api.endpoints.createTodoItem.useMutation();

  const onFinishedTyping = () => {
    if (titleText) {
      createTodo({ title: titleText })
        .unwrap()
        .finally(() => {
          triggerRefetchTodos({})
            .unwrap()
            .finally(() => {
              onComplete();
            });
        });
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <StyledTodoItem>
      <div className="left">
        <input type="checkbox" checked={false} disabled={true} />
        <input
          ref={inputRef}
          type="text"
          value={titleText}
          onChange={(e) => {
            setTitleText(e.target.value);
          }}
          disabled={isCreatingTodo || isFetchingTodos}
          onBlur={() => {
            onFinishedTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onFinishedTyping();
            }
          }}
        />
      </div>
    </StyledTodoItem>
  );
};
