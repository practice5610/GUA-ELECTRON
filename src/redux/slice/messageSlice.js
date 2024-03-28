/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageServices from '../api/messageServices';

export const initialState = {
  data: [],
  userData: [],
  loading: 'idle',
  error: null,
};

export const addMessage = createAsyncThunk(
  'message/addMessage',
  async (data) => {
    try {
      const res = await messageServices.Addmessage(data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },
);
export const getAllMessage = createAsyncThunk(
  'message/getAllMessage',
  async () => {
    try {
      const res = await messageServices.getAllMessages();
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
    builder.addCase(addMessage.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
    builder.addCase(addMessage.rejected, (state, action) => {
      state.loading = 'rejected';
      state.data = action.payload;
    });
    builder.addCase(getAllMessage.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllMessage.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
    builder.addCase(getAllMessage.rejected, (state, action) => {
      state.loading = 'rejected';
      state.data = action.payload;
    });
  },
});

export default profileSlice.reducer;
