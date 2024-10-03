import React, { useState } from "react";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { Sidebar, Button } from "../../components";
import create from "zustand";

// Tipagem correta para o Zustand store
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
};

type Chunk = {
  position: number[];
  cubesArray: number[][];
};

type GameStore = {
  blockState: BlockState;
  setBlockState: (index: number, newState: BlockState[number]) => void;
  customModels: { [key: string]: CustomModel[] };
  setCustomModels: (modelName: string, newConfig: CustomModel[]) => void;
  chunks: Chunk[];
  setChunks: (x: number, y: number, z: number, cubes: number[][]) => void;
  textures: { [key: string]: string };
  setTextures: (textureName: string, url: string) => void;
};

// Zustand store para gerenciar o estado do jogo
const useGameStore = create<GameStore>((set) => ({
  blockState: {
    0: {
      name: "Block1",
      texture: "stone",
      model: "box",
      textures: ["stone", "brick"],
      RigidBody: "fixed",
      RigidBodyType: "cuboid",
    },
  },
  setBlockState: (index, newState) =>
    set((state) => ({
      blockState: { ...state.blockState, [index]: newState },
    })),
  customModels: {
    stairs: [
      {
        position: [0, 0, 0.5],
        rotation: [0, 0, 0],
        render: true,
      },
      {
        position: [0, 0, 0],
        rotation: [-Math.PI / 2, 0, 0],
        render: true,
      },
    ],
  },
  setCustomModels: (modelName, newConfig) =>
    set((state) => ({
      customModels: { ...state.customModels, [modelName]: newConfig },
    })),

  // Definindo chunks com um valor padrão
  chunks: [
    {
      position: [0, 10, -10],
      cubesArray: [[1, 3, 4, 0]],
    },
  ],
  // Função para atualizar chunks, recebendo as coordenadas e o array de cubos
  setChunks: (x, y, z, cubes) =>
    set((state) => ({
      chunks: [
        ...state.chunks,
        {
          position: [x, y, z],
          cubesArray: cubes,
        },
      ],
    })),

  textures: {
    stone: "/assets/textures/cubes/stone.png",
  },
  setTextures: (textureName, url) =>
    set((state) => ({
      textures: { ...state.textures, [textureName]: url },
    })),
}));

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const {
    blockState,
    textures,
    setTextures,
    customModels,
    setCustomModels,
    chunks,
    setChunks,
  } = useGameStore(); // Agora você obtém o chunks e setChunks


  return (
    <>
      <Helmet>
        <title>Sandbox Creator</title>
      </Helmet>

      {/* Game in the background */}
      <div
        style={{
          position: "fixed",
          display: "flex", // Flexbox para alinhar sidebar e conteúdo
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Sidebar />

       
      </div>
      <Game
  customModels={customModels}
  blockState={blockState}
  canPlayerFly={true}
  textures={textures}
  chunks={chunks}
  renderDistance={15}
  gravity={[0, -9.81, 0]}
  pointLightPosition={[5, 10, 5]}
  initialPlayerPosition={[2, 20, 2]}
  isMouseLocked={true}
  sunPosition={[150, 50, 150]}
  ambientLightIntensity={1.5}
  pointLightIntensity={0.5}
  fov={60}
  keyboardMap={[
    { name: "forward", keys: ["w", "W"] },
    { name: "backward", keys: ["s", "S"] },
    { name: "left", keys: ["a", "A"] },
    { name: "right", keys: ["d", "D"] },
    { name: "shift", keys: ["Shift"] },
    { name: "jump", keys: ["Space"] },
    { name: "inventory", keys: ["e", "E"] },
    { name: "layerp", keys: ["ArrowUp"] },
    { name: "layerm", keys: ["ArrowDown"] },
    { name: "escape", keys: ["ESC", "Escape"] },
  ]}
/>
    </>
  );
};

export default Dashboard;
