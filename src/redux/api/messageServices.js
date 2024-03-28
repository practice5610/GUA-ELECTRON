import { callAPi } from './http-common';

const Addmessage = (data) => callAPi.post('/addmessage', data);
const getAllMessages = () => callAPi.get('/getAllMessages');

const messageServices = {
  Addmessage,
  getAllMessages,
};

export default messageServices;
