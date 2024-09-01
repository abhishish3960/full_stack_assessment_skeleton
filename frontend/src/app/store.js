import { configureStore } from '@reduxjs/toolkit';
import { api } from '../features/api';
import usersReducer from '../features/users/userSlice';
import homesReducer from '../features/homes/homeSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    homes: homesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
