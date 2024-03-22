/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { Form, FormCheck } from 'react-bootstrap';
import InputField from '../../shared/InputField';

function AddProfile({ onHide }) {
  const [value, setValue] = useState('');
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <div className="d-flex justify-content-start">
        <button onClick={onHide} className="btn_primary">
          Back
        </button>
      </div>
      <div className="addProfile_header_wrapper">
        <h1 className="page_heading">Add New Profile</h1>
        <p>
          Please make sure the browser profile information and proxy selected
          below is the same as inside AdsPower{' '}
        </p>
      </div>

      <InputField
        title="Serial number"
        name="proxy_id"
        type="text"
        value={value}
        onChange={handleOnChange}
      />
      <div className="d-flex gap-4 justify-content-center">
        <div className="input_wrapper">
          <span className="select_title">Proxy ID</span>
          <select className="form-select" aria-label="Default select example">
            <option selected>select</option>
            <option value="1">HTTP</option>
            <option value="2">Socks5</option>
          </select>
        </div>
        <div className="input_wrapper">
          <span className="select_title">List to DM</span>
          <select className="form-select" aria-label="Default select example">
            <option selected>select</option>
            <option value="1">HTTP</option>
            <option value="2">Socks5</option>
          </select>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="page_heading text-center m-2 mt-5">DM Settings</h1>
        <Form.Check label="Use Default Settings" aria-label="option 1" />
      </div>
      <InputField
        title="Max number of dm per day"
        name="proxy_id"
        type="number"
        value={value}
        onChange={handleOnChange}
      />
      <InputField
        title="Max number of dm per hour"
        name="confiig"
        type="text"
        value={value}
        onChange={handleOnChange}
      />
      <div className="time_delay_input d-flex gap-3 align-items-center justify-content-center">
        <p className="m-0">Time delay between each dm:</p> <span>between</span>{' '}
        <input type="text" name="" value="" /> to{' '}
        <input type="text" name="" value="" /> <span>minutes</span>
      </div>
      <div className="time_delay_input d-flex gap-3 align-items-center justify-content-center">
        <p className="m-0">Time gap between 1 hour actions:</p>{' '}
        <span>between</span> <input type="text" name="" value="" /> to{' '}
        <input type="text" name="" value="" /> <span>minutes</span>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mt-4">
        <div className="d-flex flex-column justify-content-center align-items-start ">
          <Form.Check label="Skip private profiles" aria-label="option 1" />
          <div className="time_delay_input mt-0 d-flex gap-3 align-items-center justify-content-center">
            <FormCheck className="w-10" aria-label="option 1" />
            <p className="m-0">
              {' '}
              Only Dm profile with followers range of:
            </p>{' '}
            <input type="text" name="" value="" /> to{' '}
            <input type="text" name="" value="" />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <p className="text fw-bold">DM to Send:</p>
        <Form.Control
          as="textarea"
          // placeholder=""
          style={{ height: '100px', width: '300px' }}
        />
      </div>
      <div className=" text_2 d-flex flex-column  align-items-center justify-content-center">
        <p className="m-0">{'variables : {userName}, {firstName}'}</p>
        <p className="m-0">
          Separate multiple dm variations by using the bar simbol |{' '}
        </p>
        <p className="m-0">
          Example: {"hey {userName}, how's it going | hello {firstName}"}
        </p>
      </div>
      <div className="d-flex gap-3 justify-content-center mt-4 ">
        <input className="form-check-input" type="checkbox" value="" id="" />
        <p className="text fw-bold">
          Like and comment on user&apos;s last post
        </p>
      </div>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <p className="text fw-bold">Comment to post:</p>
        <Form.Control
          as="textarea"
          // placeholder=""
          style={{ height: '100px', width: '300px' }}
        />
      </div>
      <div className=" text_2 d-flex flex-column  align-items-center justify-content-center">
        <p className="m-0">{'variables : {userName}, {firstName}'}</p>
        <p className="m-0">
          Separate multiple dm variations by using the bar simbol |{' '}
        </p>
        <p className="m-0">
          Example: {"hey {userName}, how's it going | hello {firstName}"}
        </p>
      </div>
      <div className="d-flex justify-content-center my-4">
        <button className="btn_primary" onClick={onHide}>
          Add Pofile
        </button>
      </div>
    </div>
  );
}

export default AddProfile;
