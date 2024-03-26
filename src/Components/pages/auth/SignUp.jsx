/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import InputField from '../../shared/InputField';
import { registerUser } from '../../../redux/slice/authSlice';

const initialValues = {
  username: '',
  password: '',
};
function SignUp() {
  const [values, setValue] = useState(initialValues);
  const dispatch = useDispatch();
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
    };
    console.log(datas);
    try {
      const res = await dispatch(registerUser(datas));
      console.log(res);
      toast.success(res?.data?.data?.message);
      setValue(initialValues);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.payload?.data?.error?.message);
    }
  };
  return (
    <div className="wrapper">
      <h1 className="page_heading text-center">Sign Up</h1>
      <div>
        <InputField
          title="Enter Username"
          name="username"
          type="text"
          value={values?.username}
          onChange={handleOnChange}
        />
        <InputField
          title="Enter Password"
          name="password"
          type="password"
          value={values?.password}
          onChange={handleOnChange}
        />
        <div className="w-full d-flex justify-content-center mt-4">
          <button type="button" className="btn_tertiary" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
