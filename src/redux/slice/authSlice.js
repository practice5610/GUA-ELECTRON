/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authServices from '../api/authServices';
import vfsServices from '../api/vfsServices';

export const initialState = {
  data: [],
  userData: [],
  loading: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
  try {
    const res = await vfsServices.login(user);
    localStorage.setItem('token', res?.data?.data?.token);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user) => {
    try {
      const res = await authServices.signUp(user);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message);
      return error;
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.data = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = 'rejected';
      state.data = action.payload;
    });
  },
});

export default userSlice.reducer;
