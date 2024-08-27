import React, { useState } from 'react';
import Textures from './element/Textures';
import Models from './element/Models';
import BlockState from './element/BlockState';

const Dashboard = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [activePage, setActivePage] = useState(null);

  const renderActiveIcon = () => {
    switch (activeIcon) {
      case 'textures':
        return <Textures setActivePage={setActivePage} />;
      case 'models':
        return <Models setActivePage={setActivePage} />;
      case 'blockState':
        return <BlockState setActivePage={setActivePage} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '60px', height: '100%', zIndex: 10, backgroundColor: '#444', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <button onClick={() => { setActiveIcon('textures'); setActivePage(null); }} style={{ backgroundColor: '#666', color: '#fff', padding: '10px', borderRadius: '50%' }}>T</button>
        <button onClick={() => { setActiveIcon('models'); setActivePage(null); }} style={{ backgroundColor: '#666', color: '#fff', padding: '10px', borderRadius: '50%' }}>M</button>
        <button onClick={() => { setActiveIcon('blockState'); setActivePage(null); }} style={{ backgroundColor: '#666', color: '#fff', padding: '10px', borderRadius: '50%' }}>B</button>
      </div>
      {activePage ? (
        <div style={{ position: 'fixed', top: '60px', left: '60px', width: '300px', zIndex: 20, backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
          {activePage}
        </div>
      ) : (
        renderActiveIcon()
      )}
    </>
  );
};

export default Dashboard;
