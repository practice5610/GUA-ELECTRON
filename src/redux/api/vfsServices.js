import { callAPi } from './http-common';

const login = (data) => callAPi.post('/admin/login', data);

const vfsServices = {
  login,
};

export default vfsServices;
