import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import create from "zustand";
import * as THREE from "three";
import { Player } from "./Player";
import PlayerModel from "./Entity";
import VoxelTerrain from "./VoxelTerrain";

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
  canPlayerFly = true,
  textures,
  chunks,
  renderDistance = 10,
  gravity = [0, -9, 0],
  pointLightPosition = [0, 0, 0],
  initialPlayerPosition = [1, 13, 0],
  isMouseLocked = undefined,
  sunPosition = [100, 20, 100],
  ambientLightIntensity = 3,
  pointLightIntensity = 0.2,
  fov = 45,
  keyboardMap,
}) {
  const [fps, setFps] = useState(0);
  const tickRef = useRef(0);

  const [chunkPosition, setChunkPosition] = useStore((state) => [
    state.chunkPosition,
    state.setChunkPosition,
  ]);

  const [flying, setFlying] = useStore((state) => [state.flying, state.set]);

  const [interfaceOpen, setInterfaceOpen] = useStore((state) => [
    state.interfaceOpen,
    state.setInterfaceOpen,
  ]);

  const [mouseLocked, setMouseLocked] = useState(
    isMouseLocked !== undefined ? isMouseLocked : true
  );

  useEffect(() => {
    if (isMouseLocked !== undefined) {
      setMouseLocked(isMouseLocked);
    }
  }, [isMouseLocked]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      if (document.pointerLockElement === null) {
        setInterfaceOpen(true);
      }
    };
    console.log(
      "customModels",
      customModels,
      "blockState",
      blockState,
      "chunks",
      chunks
    );

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("pointerlockerror", handlePointerLockChange);

    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
      document.removeEventListener("pointerlockerror", handlePointerLockChange);
    };
  }, [setInterfaceOpen]);

  const handleMouseLockToggle = () => {
    if (isMouseLocked === undefined) {
      setMouseLocked(true);
      setInterfaceOpen(false);
    }
  };

  return (
    <>
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{ fov: fov }}
          style={{ position: "fixed", zIndex: -1 }}
          className="top-0 bottom-0 w-full h-full"
        >
          <Sky sunPosition={sunPosition} />
          <ambientLight intensity={ambientLightIntensity} />
          <pointLight
            castShadow
            intensity={pointLightIntensity}
            position={pointLightPosition}
          />
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
            <PlayerModel />
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
        <>
          <div
            style={{
              backgroundColor: "#1d1f21",
              color: "#fff",
              position: "fixed",
              top: "90%",
              left: "15%",
              transform: "translate(-50%, -50%)",
              zIndex: 100,
            }}
          >
            <button onClick={handleMouseLockToggle}>Travar Mouse</button>
          </div>
        </>
      )}
    </>
  );
}
