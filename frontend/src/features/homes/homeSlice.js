import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

export const homesSlice = createSlice({
  name: 'homes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getHomesByUser.matchFulfilled, (state, action) => {
        return action.payload; // Update state with fetched homes
      });
  },
});

export const selectHomes = (state) => state.homes;

export default homesSlice.reducer;
