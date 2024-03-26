import { callAPi } from './http-common';

const login = (data) => callAPi.post('/loginUser', data);
const signUp = (data) => callAPi.post('/userRegister', data);

const authServices = {
  login,
  signUp,
};

export default authServices;
