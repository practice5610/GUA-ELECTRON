import { callAPi } from './http-common';

const autoLogin = (data) => callAPi.post('/admin/auto-login', data);
const login = (data) => callAPi.post('/admin/login', data);

const vfsServices = {
  autoLogin,
  login,
};

export default vfsServices;
