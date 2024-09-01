import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

export const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getUsers.matchFulfilled, (state, action) => {
        return action.payload; // Update state with fetched users
      });
  },
});

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
