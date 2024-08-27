import React from 'react';
import FunctionList from '../functions/FunctionList';
import TexturePage1 from '../pages/TexturePage1';
import TexturePage2 from '../pages/TexturePage2';

const Textures = ({ setActivePage }) => {
  const functions = [
    { name: 'Function 1', component: <TexturePage1 /> },
    { name: 'Function 2', component: <TexturePage2 /> }
  ];

  return (
    <FunctionList functions={functions} setActivePage={setActivePage} />
  );
};

export default Textures;
