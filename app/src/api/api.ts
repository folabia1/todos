import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TodoItem, TodoItemAtCreation, TodoItemAtUpdate } from "../logic/types";
import { RootState } from "../redux/store";

// * Define endpoints
// Usage example
// import { api } from 'path/to/this/file/api'
// const [getMySettingsQuery] = api.endpoints.getTodoItems.useQuery();
// const [loginMutation] = api.endpoints.login.useMutation();

// use consistent naming for request methods (where relevant)
// GET: get (e.g. getMe)
// POST: create (e.g. createConnection)
// PUT: update (e.g. updateSettings)
// DELETE: delete

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/",
    prepareHeaders: (headers, { type, getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).global.auth.token;
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // for todos
    getTodoItems: builder.query<{ data: TodoItem[] }, { ids?: [number] }>({
      query: ({ ids }) => ({
        url: `todos`,
        params: { ids },
      }),
    }),
    createTodoItem: builder.mutation<{ data: TodoItem; message: String }, TodoItemAtCreation>({
      query: (newTodoItem) => ({
        url: `todos`,
        method: "POST",
        body: newTodoItem,
      }),
    }),
    updateTodoItem: builder.mutation<{ data: TodoItem; message: String }, TodoItemAtUpdate>({
      query: (todoItemToUpdate) => {
        return {
          url: `todos`,
          method: "PUT",
          body: todoItemToUpdate,
        };
      },
    }),
    deleteTodoItem: builder.mutation<{ message: String }, { id: number }>({
      query: ({ id }) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
