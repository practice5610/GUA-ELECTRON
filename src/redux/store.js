/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import profileSlice from './slice/profileSlice';
import messageSlice from './slice/messageSlice';

const combineReducer = {
  user: authSlice,
  profile: profileSlice,
  message: messageSlice,
};

export const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
