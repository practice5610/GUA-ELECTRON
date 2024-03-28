/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../shared/InputField';
import { addProfile } from '../../redux/slice/profileSlice';

const initialValues = {
  profileId: '',
  serialNumber: '',
  group: '',
  userName: '',
  platform: '',
};
function Api() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValue] = useState(initialValues);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const datas = {
      ...values,
      serialNumber: 3454656,
      group: 'sample group',
      userName: 'test',
      platform: {
        username: 'test',
        password: 'test',
      },
    };

    try {
      const res = await dispatch(addProfile(datas));
      console.log(res);
      if (res?.payload?.success) {
        toast.success(res?.payload?.message);
        navigate('/dashboard/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="wrapper">
      <h1 className="page_heading text-center">Api Credentials</h1>
      <div>
        <p className="text">
          Enter the instagram login credentials you want to <br /> use for the
          API to scrape accounts. 2FA must be disabled <br /> on this account
          for this to work{' '}
        </p>
        <InputField
          title="Enter ProfileId"
          name="profileId"
          type="text"
          value={values?.profileId}
          onChange={handleOnChange}
        />

        <div className="w-full d-flex justify-content-center mt-4">
          <button className="btn_tertiary" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Api;
