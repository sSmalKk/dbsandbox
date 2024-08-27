import React from 'react';
import FunctionList from '../functions/FunctionList';
import BlockStatePage1 from '../pages/BlockStatePage1';

const BlockState = ({ setActivePage }) => {
  const functions = [
    { name: 'Function 1', component: <BlockStatePage1 /> }
  ];

  return (
    <FunctionList functions={functions} setActivePage={setActivePage} />
  );
};

export default BlockState;
