/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import InputField from '../shared/InputField';

function Api() {
  const [value, setValue] = useState('');
  const handleOnChange = (e) => {
    setValue(e.target.value);
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
          title="Enter Username"
          name="userName"
          type="text"
          value={value}
          onChange={handleOnChange}
        />
        <InputField
          title="Enter Password"
          name="password"
          type="password"
          value={value}
          onChange={handleOnChange}
        />
        <div className="w-full d-flex justify-content-center mt-4">
          <button className="btn_tertiary ">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Api;
