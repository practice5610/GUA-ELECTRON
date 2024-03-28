/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import InputField from '../../shared/InputField';
import { loginUser } from '../../../redux/slice/authSlice';

const initialValues = {
  username: '',
  password: '',
};
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValue] = useState(initialValues);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  const handleRegisterClick = () => {
    navigate('/dashboard/signup');
  };
  const handleSubmit = async () => {
    const datas = {
      ...values,
    };
    try {
      const res = await dispatch(loginUser(datas));
      console.log(res);
      if (res?.payload?.data?.status === 200) {
        toast.success(res?.payload?.data?.message);
        navigate('/dashboard/proxy_setting');
        setValue(initialValues);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.payload?.data?.message);
    }
  };
  return (
    <div className="wrapper">
      <h1 className="page_heading text-center">Log In</h1>
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
          <button
            type="button"
            onClick={handleSubmit}
            className="btn_tertiary "
          >
            Log In
          </button>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
          <span style={{ color: '#b8bbd3' }}>dont have an account? </span>
          <p
            style={{
              color: '#50f5ac',
              cursor: 'pointer',
            }}
            onClick={handleRegisterClick}
          >
            register
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
