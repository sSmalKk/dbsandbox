  import { Canvas } from "@react-three/fiber";
  import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei";
  import { Physics } from "@react-three/rapier";
  import { Player } from "./Player";
  import { World } from "./World";
  import { useEffect, useState, useRef } from "react";
  import * as THREE from "three";
  import create from "zustand";
  import PlayerModel from "./Entity"


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
  const [gameMode, setGameMode] = useState(1); // 1 = game mode, 2 = paused, 3 = chat open, 4 = inventory

  const [chunkPosition, setChunkPosition] = useStore((state) => [
    state.chunkPosition,
    state.setChunkPosition,
  ]);

  const [speed] = useState(5);
  const [direction] = useState(new THREE.Vector3());
  const [frontVector] = useState(new THREE.Vector3());
  const [sideVector] = useState(new THREE.Vector3());
  const [rotation] = useState(new THREE.Vector3());

  useEffect(() => {
    let lastFrameTime = performance.now();
    let lastTickTime = performance.now();
    let tickCount = 0;

    const updateLoop = () => {
      const now = performance.now();
      const deltaTime = now - lastFrameTime;

      // Update FPS
      setFps(Math.floor(1000 / deltaTime));

      // Check if 1 second has passed since the last tick update
      if (now - lastTickTime >= 50) {
        // 50ms = 1 second / 20 ticks
        // Update tick count
        tickCount++;
        lastTickTime = now; // Update last tick time
      }

      // Update tick count reference
      tickRef.current = tickCount;

      lastFrameTime = now;
      requestAnimationFrame(updateLoop);
    };

    // Start update loop
    updateLoop();

    // Cleanup function: cancel update loop
    return () => cancelAnimationFrame(updateLoop);
  }, []);

  // Texture and cube configurations (assuming you've defined these elsewhere in your code)
  const textureArray = {
    1: [
      "../assets/dirt.jpg", "../assets/dirt.jpg", "../assets/dirt.jpg",
      "../assets/dirt.jpg", "../assets/dirt.jpg", "../assets/dirt.jpg"
    ],
    2: [
      "../assets/dirt.jpg", "../assets/dirt.jpg", "../assets/dirt.jpg",
      "../assets/dirt.jpg", "../assets/dirt.jpg", "../assets/dirt.jpg"
    ],
    // Add more texture arrays as needed
  };

  const cubeConfigurations = {
    1: {
      type: "fixed",
      colliders: "cuboid",
      planes: [
        { position: [-0.5, 0, 0], rotation: [0, -Math.PI / 2, 0], textureIndex: 0 },
        { position: [0.5, 0, 0], rotation: [0, Math.PI / 2, 0], textureIndex: 1 },
        { position: [0, 0.5, 0], rotation: [-Math.PI / 2, 0, 0], textureIndex: 2 },
        { position: [0, -0.5, 0], rotation: [Math.PI / 2, 0, 0], textureIndex: 3 },
        { position: [0, 0, 0.5], rotation: [0, 0, 0], textureIndex: 4 },
        { position: [0, 0, -0.5], rotation: [0, Math.PI, 0], textureIndex: 5 }
      ]
    },
    // Add more block types as needed
  };

  // Function to toggle game modes (e.g., pause, chat open, inventory)
  const toggleGameMode = (mode) => {
    setGameMode(mode);
  };

  return (
    <>
      <div className="top-0 right-0" style={{ position: "fixed", zIndex: 99 }}>
        <h1>FPS: {Math.floor(fps)}</h1>
        <h1>TICK: {Math.floor(tickRef.current)}</h1>
      </div>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas shadows camera={{ fov: 45 }} style={{ position: 'fixed', zIndex: -9 }} className="top-0 bottom-0 w-full h-full">
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={10} />
          <pointLight castShadow intensity={10} position={[100, 100, 100]} />
          <Physics gravity={[0, 0, 0]}>
            {/* Conditionally render components based on game mode */}
            {gameMode === 1 && (
              <>
                <Player setChunkPosition={setChunkPosition} initialPosition={[0, 100, 0]} speed={speed} direction={direction} frontVector={frontVector} sideVector={sideVector} rotation={rotation} />
                <PlayerModel position={[0, 5, 0]} />
                <World
                  texturesArray={textureArray}
                  cubeConfigurations={cubeConfigurations}
                  playerPosition={chunkPosition}
                  clusterWidth={10}
                  renderDistance={1}
                  worldWidth={10}
                  worldHeight={3}
                />
              </>
            )}
            <PointerLockControls />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </>
  );
}
