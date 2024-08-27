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
  canPlayerFly: true,
  flying: true,
  interfaceOpen: false,
  setInterfaceOpen: (value) => set({ interfaceOpen: value }),
}));

export default function Game({
  customModels,
  blockState,
  canPlayerFly,
  textures,
  chunks,
  renderDistance = 10,
  gravity = [0, -9, 0],
  pointLightPosition = [100, 100, 100],
  initialPlayerPosition = [1, 13, 0],
  isMouseLocked = undefined,  // `isMouseLocked` é opcional
}) {
  const [fps, setFps] = useState(0);
  const tickRef = useRef(0);

  const [chunkPosition, setChunkPosition] = useStore((state) => [
    state.chunkPosition,
    state.setChunkPosition,
  ]);

  const [flying, setFlying] = useStore((state) => [
    state.flying,
    state.set,
  ]);

  const [interfaceOpen, setInterfaceOpen] = useStore((state) => [
    state.interfaceOpen,
    state.setInterfaceOpen,
  ]);

  const [mouseLocked, setMouseLocked] = useState(isMouseLocked !== undefined ? isMouseLocked : true);

  const keyboardMap = [
    { name: 'forward', keys: ['w', 'W'] },
    { name: 'backward', keys: ['s', 'S'] },
    { name: 'left', keys: ['a', 'A'] },
    { name: 'right', keys: ['d', 'D'] },
    { name: 'shift', keys: ['Shift'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'inventory', keys: ['e', 'E'] },
    { name: 'layerp', keys: ['ArrowUp'] },
    { name: 'layerm', keys: ['ArrowDown'] },
    { name: 'escape', keys: ['ESC', 'Escape', 'Esc'] },
  ];

  useEffect(() => {
    console.log("Chunks:", chunks);
  }, [chunks]);

  useEffect(() => {
    if (isMouseLocked !== undefined) {
      setMouseLocked(isMouseLocked);
    }
  }, [isMouseLocked]);

  const handleMouseLockToggle = () => {
    if (isMouseLocked === undefined) {
      setMouseLocked(true);  // Trava o mouse se `isMouseLocked` não estiver definido
      setInterfaceOpen(false);  // Fecha a interface
    }
  };

  return (
    <>
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ fov: 45 }} style={{ position: 'fixed', zIndex: 0 }} className="top-0 bottom-0 w-full h-full">
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={10} />
          <PlayerModel position={[0, 5, 0]} />

          <pointLight castShadow intensity={1} position={pointLightPosition} />
          <Physics gravity={gravity}>
            <Player
              interfaceOpen={interfaceOpen}
              setInterfaceOpen={setInterfaceOpen}
              canPlayerFly={canPlayerFly}
              gravity={gravity}
              setChunkPosition={setChunkPosition}
              initialPosition={initialPlayerPosition}
              flying={flying}
            />
            <PlayerModel position={[0, 5, 0]} />
            <VoxelTerrain
              customModels={customModels}
              blockState={blockState}
              fullrender={true}
              chunks={chunks}
              textures={textures}
              clusterWidth={1}
              renderDistance={renderDistance}
            />
          </Physics>
          {!interfaceOpen && <PointerLockControls enabled={mouseLocked} />}
        </Canvas>
      </KeyboardControls>

      {interfaceOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <button onClick={handleMouseLockToggle}>Travar Mouse</button>
        </div>
      )}
    </>
  );
}
