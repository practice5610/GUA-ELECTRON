import { callAPi } from './http-common';

const AddProfile = (data) => callAPi.post('/addProfile', data);
const getAllProfiles = () => callAPi.get('/getAllProfiles');

const profileServices = {
  AddProfile,
  getAllProfiles,
};

export default profileServices;
