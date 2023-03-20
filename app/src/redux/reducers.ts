import { createAction, createReducer } from "@reduxjs/toolkit";

// * write action names as "reducerName/whatHappened" *
// try to use CRUD (Created, ~Read, Updated, Deleted) language for whatHappened

/* GLOBAL */
const globalReducerInitialState = {
  value: 0,
  todoItems: [],
  auth: { token: "" },
};

export const globalReducer = createReducer(
  globalReducerInitialState,
  (builder) => {
    builder
      .addCase(createAction("global/counterIncremented"), (state, action) => {
        state.value++;
      })
      .addCase(createAction("global/counterDecremented"), (state, action) => {
        state.value--;
      })
      .addCase(
        createAction<number>("global/counterUpdated"),
        (state, action) => {
          state.value = action.payload;
        }
      )
      .addCase(
        createAction<string>("global/newTodoCreated"),
        (state, action) => {
          state.auth.token = action.payload;
        }
      );
  }
);
