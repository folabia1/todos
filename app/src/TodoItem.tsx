import styled from "styled-components";
import { api } from "./api/api";

type TodoItemProps = {
  id: number;
};

export default ({ id }: TodoItemProps) => {
  // imagine we're getting this todo from the server
  const todoItem = {
    id,
    title: `${Math.random()}`,
    completed: Math.random() > 0.5,
  };
  const [updateTodoMutation] = api.endpoints.updateTodoItem.useMutation();
  return (
    <div>
      <input
        type="checkbox"
        checked={todoItem.completed}
        onChange={() => {
          updateTodoMutation({ ...todoItem, completed: !todoItem.completed });
        }}
      />
      <p>{todoItem.title}</p>
    </div>
  );
};
