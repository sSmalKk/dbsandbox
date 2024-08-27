import React from 'react';
import FunctionList from '../functions/FunctionList';
import ModelPage1 from '../pages/ModelPage1';

const Models = ({ setActivePage }) => {
  const functions = [
    { name: 'Function 1', component: <ModelPage1 /> }
  ];

  return (
    <FunctionList functions={functions} setActivePage={setActivePage} />
  );
};

export default Models;
