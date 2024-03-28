/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import InputField from '../../shared/InputField';
import { registerUser } from '../../../redux/slice/authSlice';

const initialValues = {
  username: '',
  password: '',
};
function SignUp() {
  const navigate = useNavigate();
  const [values, setValue] = useState(initialValues);
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };
  const handleLoginClick = () => {
    navigate('/dashboard/login');
  };
  const handleSubmit = async () => {
    const datas = {
      ...values,
    };
    console.log(datas);
    try {
      const res = await dispatch(registerUser(datas));
      console.log(res);
      toast.success(res?.payload?.data?.message);
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
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
          <span style={{ color: '#b8bbd3' }}>have an account? </span>
          <p
            style={{
              color: '#50f5ac',
              cursor: 'pointer',
            }}
            onClick={handleLoginClick}
          >
            login
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
