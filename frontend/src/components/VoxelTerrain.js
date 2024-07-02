import React from 'react';
import Chunk from './Chunk';

const VoxelTerrain = ({ chunks = [], textures, clusterWidth }) => {
  console.log('VoxelTerrain props:', { chunks, textures, clusterWidth });
  return (
    <group>
      {chunks.map((chunk, index) => (
        <Chunk
          key={index}
          cubesArray={chunk.cubesArray}
          textures={textures}
          clusterWidth={clusterWidth}
        />
      ))}
    </group>
  );
};

export default VoxelTerrain;
