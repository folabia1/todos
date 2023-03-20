import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { globalReducer } from './reducers';

export const store = configureStore({
    // store with multiple combined reducers
    reducer: {
        [api.reducerPath]: api.reducer,
        global: globalReducer
    },
    // Adding the api middleware enables caching, invalidation,
    // polling, and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
