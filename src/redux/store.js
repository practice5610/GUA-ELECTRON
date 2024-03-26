/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';

const combineReducer = {
  user: authSlice,
};

export const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
