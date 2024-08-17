import React, { useState } from 'react';
import Game from 'components/Game';
import { Helmet } from 'react-helmet';
import { Button } from '../../components';
import * as THREE from 'three';
import create from 'zustand';

// Correctly typing the Zustand store
type BlockState = {
  [key: number]: {
    name: string;
    texture: string;
    model: string;
    textures: string[];
    RigidBody: string;
    RigidBodyType: string;
  };
};

type CustomModel = {
  position: number[];
  rotation: number[];
  render: boolean;
  color: THREE.Color;
};

type GameStore = {
  blockState: BlockState;
  setBlockState: (index: number, newState: BlockState[number]) => void;
  customModels: { [key: string]: CustomModel[] };
  setCustomModels: (modelName: string, newConfig: CustomModel[]) => void;
  textures: { [key: string]: string };
  setTextures: (textureName: string, url: string) => void;
};

// Zustand store for managing game state
const useGameStore = create<GameStore>((set) => ({
  blockState: {
    0: { name: 'Block1', texture: 'stone', model: 'box', textures: ['stone', 'brick'], RigidBody: "fixed", RigidBodyType: "cuboid" },
  },
  setBlockState: (index, newState) => set((state) => ({
    blockState: { ...state.blockState, [index]: newState }
  })),
  customModels: {
    stairs: [
      { position: [0, 0, 0.5], rotation: [0, 0, 0], render: true, color: new THREE.Color(Math.random() * 0xffffff) },
      { position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], render: true, color: new THREE.Color(Math.random() * 0xffffff) },
    ],
  },
  setCustomModels: (modelName, newConfig) => set((state) => ({
    customModels: { ...state.customModels, [modelName]: newConfig }
  })),
  textures: {
    stone: '/assets/textures/cubes/stone.png',
    wood: '/assets/textures/cubes/wood.png',
    brick: '/assets/textures/cubes/brick.png',
  },
  setTextures: (textureName, url) => set((state) => ({
    textures: { ...state.textures, [textureName]: url }
  })),
}));

const SandboxCreator = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { blockState, setBlockState, textures, setTextures, customModels, setCustomModels } = useGameStore();

  const handleIconClick = (panel: string) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleTextureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextures(event.target.name, event.target.value);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>, planeIndex: number) => {
    const { name, value } = event.target;
    const parsedValue = value.split(',').map(Number); // Parse the input value into a number array

    const newConfig = [...customModels.stairs];
    newConfig[planeIndex] = { ...newConfig[planeIndex], [name]: parsedValue };
    setCustomModels('stairs', newConfig);
  };

  const handleBlockStateChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof BlockState[number]) => {
    const newBlockState = { ...blockState[0], [key]: event.target.value };
    setBlockState(0, newBlockState);
  };

  return (
    <>
      <Helmet>
        <title>Sandbox Creator</title>
      </Helmet>

      {/* Game in the background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Game
          blockState={blockState}
          customModels={customModels}
          textures={textures}
          chunks={[]} // Add your chunks here
          renderDistance={10}
          canPlayerFly={true}
          isMouseLocked={true}
          setInterfaceOpen={undefined} interfaceOpen={undefined}
        />
      </div>

      {/* Sidebar on the left */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '60px', height: '100%', zIndex: 2, backgroundColor: '#444', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <Button onClick={() => handleIconClick('textures')} style={{ backgroundColor: '#666', color: '#fff', padding: '10px', borderRadius: '50%' }}>T</Button>
        <Button onClick={() => handleIconClick('models')} style={{ backgroundColor: '#666', color: '#fff', padding: '10px', borderRadius: '50%' }}>M</Button>
        <Button onClick={() => handleIconClick('blockState')} style={{ backgroundColor: '#666', color: '#fff', padding: '10px', borderRadius: '50%' }}>B</Button>
      </div>

      {/* Input Panel Overlay */}
      {activePanel === 'textures' && (
        <div style={{ position: 'fixed', top: 0, left: '60px', width: '300px', height: '100%', zIndex: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '10px' }}>
          <h3>Texture Editor</h3>
          {Object.keys(textures).map((textureName) => (
            <div key={textureName} style={{ marginBottom: '10px' }}>
              <label>
                {textureName}:
                <input
                  type="text"
                  name={textureName}
                  value={textures[textureName]}
                  onChange={handleTextureChange}
                  style={{ marginLeft: '10px', width: '100%' }}
                />
              </label>
              <Button onClick={() => setTextures(textureName, '')} style={{ backgroundColor: '#FF6666', color: '#fff', marginTop: '5px' }}>Delete</Button>
            </div>
          ))}
          <Button onClick={() => setTextures(`newTexture${Date.now()}`, '')} style={{ backgroundColor: '#66FF66', color: '#fff', marginTop: '20px' }}>Add New Texture</Button>
        </div>
      )}

      {activePanel === 'models' && (
        <div style={{ position: 'fixed', top: 0, left: '60px', width: '300px', height: '100%', zIndex: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '10px' }}>
          <h3>Model Editor</h3>
          {customModels.stairs.map((plane, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h4>Plane {index + 1}</h4>
              <label>
                Position:
                <input
                  type="text"
                  name="position"
                  value={plane.position.join(', ')} // Convert array to string
                  onChange={(e) => handleModelChange(e, index)}
                  style={{ marginLeft: '10px', width: '100%' }}
                />
              </label>
              <label>
                Rotation:
                <input
                  type="text"
                  name="rotation"
                  value={plane.rotation.join(', ')} // Convert array to string
                  onChange={(e) => handleModelChange(e, index)}
                  style={{ marginLeft: '10px', width: '100%' }}
                />
              </label>
            </div>
          ))}
          <Button onClick={() => setCustomModels('stairs', [...customModels.stairs, { position: [0, 0, 0], rotation: [0, 0, 0], render: true, color: new THREE.Color(Math.random() * 0xffffff) }])} style={{ backgroundColor: '#66FF66', color: '#fff', marginTop: '20px' }}>Add New Plane</Button>
        </div>
      )}

      {activePanel === 'blockState' && (
        <div style={{ position: 'fixed', top: 0, left: '60px', width: '300px', height: '100%', zIndex: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '10px' }}>
          <h3>Block State Editor</h3>
          <label>
            Name:
            <input
              type="text"
              value={blockState[0].name}
              onChange={(e) => handleBlockStateChange(e, 'name')}
              style={{ marginLeft: '10px', width: '100%' }}
            />
          </label>
          <label>
            Model:
            <input
              type="text"
              value={blockState[0].model}
              onChange={(e) => handleBlockStateChange(e, 'model')}
              style={{ marginLeft: '10px', width: '100%' }}
            />
          </label>
          <label>
            Textures:
            <input
              type="text"
              value={blockState[0].textures.join(', ')} // Convert array to string
              onChange={(e) => handleBlockStateChange(e, 'textures')}
              style={{ marginLeft: '10px', width: '100%' }}
            />
          </label>
        </div>
      )}
    </>
  );
};

export default SandboxCreator;
