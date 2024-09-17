import React, { useState } from "react";
import Game from "components/Game/Game";
import { Helmet } from "react-helmet";
import { Sidebar } from "../../../components";
import create from "zustand";
import Draggable from "react-draggable"; // Importando react-draggable
import { useParams } from "react-router-dom";

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
  chunks: [
    {
      position: [0, 10, -10],
      cubesArray: [[1, 3, 4, 0]],
    },
  ],
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

// Componente principal
const Item = () => {
  const { id } = useParams(); // Captura o id da URL

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const {
    blockState,
    textures,
    setTextures,
    customModels,
    setCustomModels,
    chunks,
    setChunks,
  } = useGameStore();

  const [inputs, setInputs] = useState<{ id: number; value: string }[]>([
    { id: 1, value: "" },
  ]);

  // Função para remover um input específico
  const removeInput = (id: number) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  };

  // Função para adicionar um novo input
  const addInput = () => {
    const newId = inputs.length > 0 ? inputs[inputs.length - 1].id + 1 : 1;
    setInputs((prev) => [...prev, { id: newId, value: "" }]);
  };

  // Função para manipular a mudança no input
  const handleInputChange = (id: number, value: string) => {
    setInputs((prev) =>
      prev.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  // Calcular posição central da janela
  const calculateCenterPosition = () => {
    const centerX = window.innerWidth / 2 - 150; // Considerando largura do card como 300px
    const centerY = window.innerHeight / 2 - 75; // Considerando altura do card como 150px
    return { left: centerX + "px", top: centerY + "px" };
  };

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
          zIndex: 5,
        }}
      >
        <Sidebar />
      </div>

      {/* Contêiner móvel: Inputs dinâmicos */}
      {inputs.map((input) => (
        <Draggable key={input.id}>
          <div
            className="cardwhite"
            style={{
              zIndex: 20,
              position: "absolute",
              ...calculateCenterPosition(), // Posição central para cada card
            }}
          >
            <div className="tools">
              <div className="circle">
                <span
                  className="red box"
                  onClick={() => removeInput(input.id)} // Botão vermelho para remover
                  style={{ cursor: "pointer" }}
                ></span>
              </div>
            </div>
            <div className="card__content">
              <h4>{`Card ${input.id}`}</h4>{" "}
              {/* Adicionando o título "Card %n" */}
              <input
                type="text"
                placeholder="Digite algo aqui..."
                value={input.value}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
            </div>
          </div>
        </Draggable>
      ))}

      {/* Card preto que lista os painéis criados */}
      <div
        className="black-card"
        style={{
          zIndex: 50,
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "20px",
          width: "300px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <h3>Painéis Criados</h3>
        <ul>
          {inputs.map((input) => (
            <li key={input.id}>{`Card ${input.id}`}</li>
          ))}
        </ul>

        {/* Botão para adicionar novos inputs */}
        <button
          onClick={addInput}
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "5px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          +
        </button>
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

export default Item;
