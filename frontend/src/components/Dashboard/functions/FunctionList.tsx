import React from 'react';

const FunctionList = ({ functions, setActivePage }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: '60px', width: '200px', height: '100%', zIndex: 3, backgroundColor: '#333', color: '#fff', padding: '10px' }}>
      <h3>Functions</h3>
      {functions.map((func, index) => (
        <button
          key={index}
          onClick={() => setActivePage(func.component)}
          style={{ backgroundColor: '#555', color: '#fff', padding: '10px', margin: '5px 0', width: '100%' }}
        >
          {func.name}
        </button>
      ))}
    </div>
  );
};

export default FunctionList;
