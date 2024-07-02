import { Canvas } from '@react-three/fiber';
import { useEffect, useState, useRef } from 'react';
import { Sky, PointerLockControls, KeyboardControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import create from 'zustand';
import * as THREE from 'three';
import { Player } from "./Player";
import PlayerModel from "./Entity";
import VoxelTerrain from './VoxelTerrain';

const useStore = create((set) => ({
  playerPosition: [0, 10, 0],
  setPlayerPosition: (newPosition) => set({ playerPosition: newPosition }),
  chunkPosition: [0, 0, 0],
  setChunkPosition: (newPosition) => set({ chunkPosition: newPosition }),
  border: false,
}));

export default function Game() {
  const [fps, setFps] = useState(0);
  const tickRef = useRef(0);

  const [chunkPosition, setChunkPosition] = useStore((state) => [
    state.chunkPosition,
    state.setChunkPosition,
  ]);

  const textures = ['./assets/textures/dirt.jpg', './assets/textures/grass.jpg'];
  const chunks = [
    {
      cubesArray: [
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 1, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
      ],
    },
  ];
  
  return (
    <>
      <div className="top-0 right-0" style={{ position: 'fixed', zIndex: 99 }}>
        <h1>FPS: {Math.floor(fps)}</h1>
        <h1>TICK: {Math.floor(tickRef.current)}</h1>
      </div>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'jump', keys: ['Space'] },
        ]}
      >
        <Canvas shadows camera={{ fov: 45 }} style={{ position: 'fixed', zIndex: 0 }} className="top-0 bottom-0 w-full h-full">
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={10} />
          <pointLight castShadow intensity={10} position={[100, 100, 100]} />
          <Physics gravity={[0, -5, 0]}>
            <Player setChunkPosition={setChunkPosition} initialPosition={[0, 100, 0]} />
            <PlayerModel position={[0, 5, 0]} />
            <VoxelTerrain chunks={chunks} textures={textures} clusterWidth={10} />
          </Physics>
          <PointerLockControls />
        </Canvas>
      </KeyboardControls>
    </>
  );
}
