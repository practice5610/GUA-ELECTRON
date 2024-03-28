/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileServices from '../api/profileServices';

export const initialState = {
  data: [],
  userData: [],
  loading: 'idle',
  error: null,
};

export const addProfile = createAsyncThunk(
  'profile/addProfile',
  async (user) => {
    try {
      const res = await profileServices.AddProfile(user);
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
);

export const getAllProfiles = createAsyncThunk(
  'profile/getAllProfiles',
  async () => {
    try {
      const res = await profileServices.getAllProfiles();
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
);

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProfile.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(addProfile.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
    builder.addCase(addProfile.rejected, (state, action) => {
      state.loading = 'rejected';
      state.data = action.payload;
    });
    builder.addCase(getAllProfiles.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllProfiles.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
    builder.addCase(getAllProfiles.rejected, (state, action) => {
      state.loading = 'rejected';
      state.data = action.payload;
    });
  },
});

export default profileSlice.reducer;
