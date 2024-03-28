/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Modal } from 'react-bootstrap';
import InputField from '../../shared/InputField';
import { addMessage } from '../../../redux/slice/messageSlice';

const initialValues = {
  userId: '',
  message: '',
  target_full_name: '',
  target_username_name: '',
};

function AddMessage({ show, onHide }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

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
    };

    try {
      const res = await dispatch(addMessage(datas));
      console.log(res);
      if (res?.payload?.success) {
        toast.success(res?.payload?.message);
        onHide();
      } else {
        toast.error(res?.payload?.message);
        onHide();
      }
    } catch (error) {
      console.log(error);
    }
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
          Add Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputField
          title="userId"
          name="userId"
          type="text"
          value={values?.userId}
          onChange={handleOnChange}
        />
        <InputField
          title="target_full_name"
          name="target_full_name"
          type="text"
          value={values?.target_full_name}
          onChange={handleOnChange}
        />
        <InputField
          title="target_username_name"
          name="target_username_name"
          type="text"
          value={values?.target_username_name}
          onChange={handleOnChange}
        />
        <div className="input_wrapper">
          <span>Message </span>
          <Form.Control
            as="textarea"
            name="message"
            value={values?.message}
            onChange={handleOnChange}
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn_primary" onClick={handleSubmit}>
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMessage;
AddMessage.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};
