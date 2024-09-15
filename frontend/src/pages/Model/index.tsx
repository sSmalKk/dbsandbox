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

const Model = () => {
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

        <div
          style={{
            padding: "20px",
            width: "100%",
            height: "100%",
          }}
        >
          <h3>{`Página ativa: `}</h3>

          <h3>{`Subpágina ativa:`}</h3>
        </div>
      </div>
      <Game
        blockState={blockState}
        customModels={customModels}
        textures={textures}
        chunks={chunks} // Agora o chunks é passado corretamente para o Game
        renderDistance={10}
        canPlayerFly={true}
      />
    </>
  );
};

export default Model;
