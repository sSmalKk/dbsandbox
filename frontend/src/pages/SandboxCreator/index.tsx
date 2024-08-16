import React, { useState } from 'react';
import Game from 'components/Game';
import { Helmet } from 'react-helmet';
import { Button } from '../../components';

const BlockCreator = () => {
  const [activeTab, setActiveTab] = useState('camera'); // Controla a interface ativa no dashboard
  const [cameraPosition, setCameraPosition] = useState([0, 5, 10]); // Posição da câmera no jogo

  // Função para mudar a aba ativa no dashboard
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Helmet>
        <title>Block Creator</title>
      </Helmet>

      {/* Jogo no fundo */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Game
          cameraPosition={cameraPosition} // Passa a posição da câmera para o jogo
          renderDistance={10}
          canPlayerFly={true}
          isMouseLocked={true}
        />
      </div>

      {/* Dashboard à direita */}
      <div style={{ position: 'fixed', top: 0, right: 0, width: '300px', height: '100%', zIndex: 2, backgroundColor: '#f4f4f4' }}>
        <div style={{ padding: '10px' }}>
          <h2>Block Creator</h2>

          {/* Barra de Navegação do Dashboard */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => handleTabChange('camera')}>Camera</Button>
            <Button onClick={() => handleTabChange('models')}>Models</Button>
            <Button onClick={() => handleTabChange('textures')}>Textures</Button>
            <Button onClick={() => handleTabChange('index')}>Index</Button>
          </div>

          {/* Conteúdo dinâmico do dashboard */}
          <div style={{ marginTop: '20px' }}>
            {activeTab === 'camera' && (
              <div>
                <h3>Camera Controls</h3>
                <label>X: <input type="range" min="-10" max="10" value={cameraPosition[0]} onChange={(e) => setCameraPosition([+e.target.value, cameraPosition[1], cameraPosition[2]])} /></label>
                <label>Y: <input type="range" min="-10" max="10" value={cameraPosition[1]} onChange={(e) => setCameraPosition([cameraPosition[0], +e.target.value, cameraPosition[2]])} /></label>
                <label>Z: <input type="range" min="-10" max="20" value={cameraPosition[2]} onChange={(e) => setCameraPosition([cameraPosition[0], cameraPosition[1], +e.target.value])} /></label>
              </div>
            )}

            {activeTab === 'models' && (
              <div>
                <h3>Model Creator</h3>
                {/* Implementar a interface para criar modelos */}
              </div>
            )}

            {activeTab === 'textures' && (
              <div>
                <h3>Texture Creator</h3>
                {/* Implementar a interface para criar texturas */}
              </div>
            )}

            {activeTab === 'index' && (
              <div>
                <h3>Index Creator</h3>
                {/* Implementar a interface para unir modelos e texturas */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlockCreator;
