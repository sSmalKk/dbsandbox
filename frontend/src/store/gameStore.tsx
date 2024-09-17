import create from "zustand";

export const useGameStore = create<GameStore>((set) => ({
  blockState: {
    0: {
      name: "Block1",
      texture: "stone",
      model: "stairs",
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
