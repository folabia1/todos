import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  TodoItem,
  TodoItemAtCreation,
  TodoItemAtUpdate,
} from "../logic/types";
import { RootState } from "../redux/store";

// * Define endpoints
// Usage example
// import { api } from 'path/to/this/file/api'
// const [getMySettingsQuery] = api.endpoints.getMySettings.useQuery();
// const [loginMutation] = api.endpoints.login.useMutation();

// use consistent naming for request methods (where relevant)
// GET: get (e.g. getMe)
// POST: create (e.g. createConnection)
// PUT: update (e.g. updateSettings)
// DELETE: delete

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5001/",
    prepareHeaders: (headers, { getState }) => {
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
    getTodoItems: builder.query<[TodoItem], { ids: [number] }>({
      query: ({ ids }) => ({
        url: `todos`,
        params: { ids },
      }),
    }),
    updateTodoItem: builder.mutation<TodoItem, TodoItemAtUpdate>({
      query: ({ id }) => ({
        url: `todos`,
        method: "PUT",
        body: { id },
      }),
    }),
    createTodoItem: builder.mutation<TodoItem, TodoItemAtCreation>({
      query: (todoItem) => ({
        url: `todos`,
        method: "POST",
        body: todoItem,
      }),
    }),
    deleteTodoItem: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `todos`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});
