/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/function-component-definition
const Test2 = () => {
  const navigate = useNavigate();

  return <div onClick={() => navigate('/test')}>Test2</div>;
};

export default Test2;
