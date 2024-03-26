/* eslint-disable promise/no-promise-in-callback */
import axios from 'axios';

const apiUrl = 'https://wv9pfwh9-3008.inc1.devtunnels.ms/api';

export const callAPi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});
callAPi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const callAPiMultiPart = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

callAPiMultiPart.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
