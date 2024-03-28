/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import InputField from '../../shared/InputField';

function AddProfile({ show, onHide }) {
  const [value, setValue] = useState('');
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="dialog_wrapper"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input_wrapper">
          <span className="select_title">Proxy Type</span>
          <select className="form-select" aria-label="Default select example">
            <option defaultValue>select</option>
            <option value="1">HTTP</option>
            <option value="2">Socks5</option>
          </select>
        </div>
        <InputField
          title="Proxy ID"
          name="proxy_id"
          type="number"
          value={value}
          onChange={handleOnChange}
        />
        <InputField
          title="Config (HOST:PORT:USERNAME:PASSWORD)"
          name="confiig"
          type="text"
          value={value}
          onChange={handleOnChange}
        />
        <InputField
          title="Proxy Rotational URL"
          name="rotational_url"
          type="text"
          value={value}
          onChange={handleOnChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn_primary" onClick={onHide}>
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProfile;
AddProfile.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};
