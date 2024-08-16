import React from 'react';
import Chunk from './Chunk';
import { VoxelCube } from './VoxelCube';

const VoxelTerrain = ({          renderIndex,  chunks = [], textures, clusterWidth, fullrender }) => {
  console.log('VoxelTerrain props:', { chunks, textures, clusterWidth });

  return (
    <group>
      {fullrender ? (
        chunks.map((chunk, index) => (
          <Chunk
          renderIndex={renderIndex}

            key={index}
            position={chunk.position}
            cubesArray={chunk.cubesArray}
            textures={textures}
            clusterWidth={clusterWidth}
          />
        ))
      ) : (
        chunks.map((chunk, index) => (
          <VoxelCube
          renderIndex={renderIndex}

            key={index}
            position={chunk.position}
            cubesArray={chunk.cubesArray}
            textures={textures}
            clusterWidth={clusterWidth*10}
          />
        ))
      )}
    </group>
  );
};

export default VoxelTerrain;
