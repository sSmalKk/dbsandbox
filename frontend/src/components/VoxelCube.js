import React, { useMemo } from 'react';
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
  hover = true, // Booleano para ativar/desativar o contorno
}) => {
  const modelType = renderIndex[id]?.model;
  const textureName = renderIndex[id]?.texture;

  const material = useMemo(() => {
    const texturePath = textures[textureName];
    return new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(texturePath),
    });
  }, [textures, textureName]);

  const geometry = useMemo(() => {
    let geom;
    switch (modelType) {
      case 'box':
        geom = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          0, 0, 0,
          1, 0, 0,
          1, 1, 0,
          0, 1, 0,
          0, 1, 1,
          1, 1, 1,
          1, 0, 1,
          0, 0, 1,
        ]);

        const indices = [
          0, 1, 2, 0, 2, 3, // Frente
          4, 5, 6, 4, 6, 7, // Trás
          2, 1, 5, 2, 5, 4, // Topo
          3, 2, 4, 3, 4, 7, // Fundo
          0, 3, 7, 0, 7, 6, // Esquerda
          1, 0, 6, 1, 6, 5  // Direita
        ];

        geom.setIndex(indices);
        geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geom.computeVertexNormals();
        break;

      case 'globe':
        geom = new THREE.SphereGeometry(0.5, 32, 32);
        break;

      case 'stairs':
        geom = new THREE.BoxGeometry(1, 1, 1);
        break;

      default:
        geom = new THREE.BoxGeometry(1, 1, 1);
        break;
    }
    return geom;
  }, [modelType]);

  // Movendo o bloco voxel (modelo de cubo) para -5 em todas as direções
  const adjustedPosition = modelType === 'box' 
    ? [position[0] - 5, position[1] - 5, position[2] - 5] 
    : position;

  // Linhas estáticas ao redor do voxel (contorno do cubo)
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
      <mesh geometry={geometry} material={material} />
      {hover && staticEdges} {/* Mostrar o contorno apenas se hover for verdadeiro */}
    </group>
  );
};

export { VoxelCube };
