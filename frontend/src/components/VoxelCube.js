import React, { useMemo } from 'react';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const VoxelCube = ({
  position,
  id,
  textures,
  renderIndex,
  clusterWidth,
  hasCubeLeft,
  hasCubeRight,
  hasCubeBottom,
  hasCubeFront,
  hasCubeBack,
  hasCubeTop,
  hover = true,
  customModels = [],
}) => {
  const modelType = renderIndex[id]?.model || 'box';
  const textureName = renderIndex[id]?.texture;
  const rigidBodyType = renderIndex[id]?.RigidBody || "fixed";

  // Definir o tipo de colisor corretamente, mapeando para as funções disponíveis
  const rigidBodyShape = renderIndex[id]?.RigidBodyType === 'cuboid' 
    ? 'cuboid' 
    : renderIndex[id]?.RigidBodyType === 'sphere' 
    ? 'ball' 
    : 'cuboid'; // Default para 'cuboid'

  const material = useMemo(() => {
    const texturePath = textures[textureName];
    return new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(texturePath),
    });
  }, [textures, textureName]);

  const geometry = useMemo(() => {
    let geomArray = [];

    if (modelType === 'box') {
      geomArray = [
        { geometry: new THREE.PlaneGeometry(1, 1), position: [0, 0, 0.5], rotation: [0, 0, 0], render: !hasCubeFront },
        { geometry: new THREE.PlaneGeometry(1, 1), position: [0, 0, -0.5], rotation: [0, Math.PI, 0], render: !hasCubeBack },
        { geometry: new THREE.PlaneGeometry(1, 1), position: [0, 0.5, 0], rotation: [-Math.PI / 2, 0, 0], render: !hasCubeTop },
        { geometry: new THREE.PlaneGeometry(1, 1), position: [0, -0.5, 0], rotation: [Math.PI / 2, 0, 0], render: !hasCubeBottom },
        { geometry: new THREE.PlaneGeometry(1, 1), position: [0.5, 0, 0], rotation: [0, Math.PI / 2, 0], render: !hasCubeRight },
        { geometry: new THREE.PlaneGeometry(1, 1), position: [-0.5, 0, 0], rotation: [0, -Math.PI / 2, 0], render: !hasCubeLeft }
      ];
    } else if (modelType === 'globe') {
      geomArray = [
        { geometry: new THREE.SphereGeometry(0.5, 32, 32), position: [0, 0, 0], rotation: [0, 0, 0], render: true },
      ];
    } else if (customModels[modelType]) {
      geomArray = customModels[modelType].map((config) => ({
        geometry: new THREE.PlaneGeometry(1, 1),
        position: config.position,
        rotation: config.rotation,
        render: config.render
      }));
    }

    return geomArray;
  }, [modelType, hasCubeFront, hasCubeBack, hasCubeTop, hasCubeBottom, hasCubeRight, hasCubeLeft, customModels]);

  const adjustedPosition = position;

  const staticEdges = useMemo(() => {
    const edgeGeom = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
    return (
      <lineSegments geometry={edgeGeom}>
        <lineBasicMaterial attach="material" color={hover ? 'yellow' : 'white'} />
      </lineSegments>
    );
  }, [hover]);

  return (
    <group scale={clusterWidth} position={adjustedPosition}>
      <RigidBody type={rigidBodyType} colliders={rigidBodyShape}>
        {geometry.map(({ geometry, position, rotation, render }, index) =>
          render ? (
            <mesh
              key={index}
              geometry={geometry}
              material={material}
              position={position}
              rotation={rotation}
            />
          ) : null
        )}
        {hover && staticEdges} {/* Mostrar o contorno apenas se hover for verdadeiro */}
      </RigidBody>
    </group>
  );
};

export { VoxelCube };
