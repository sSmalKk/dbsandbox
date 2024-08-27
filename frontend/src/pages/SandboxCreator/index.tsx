import React, { useState } from 'react';
import Game from 'components/Game';
import { Helmet } from 'react-helmet';
import { Dashboard, Button } from '../../components';
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

      <Dashboard />
      {/* Game in the background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Game
          blockState={blockState}
          customModels={customModels}
          textures={textures}
          chunks={[]} // Add your chunks here
          renderDistance={10}
          canPlayerFly={true}
         />
      </div>


    </>
  );
};

export default SandboxCreator;
