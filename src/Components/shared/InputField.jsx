/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function InputField({ title, name, type, value, onChange }) {
  return (
    <div className="input_wrapper">
      <span>{title} </span>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
}

export default InputField;
InputField.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
