import React from 'react';
import { VoxelCube } from './VoxelCube';

const Chunk = ({ customModels, renderIndex, position, cubesArray, textures, clusterWidth }) => {
  return (
    <group position={position}>
      {cubesArray.map(([x, y, z, id]) => {
        // Verificar se o bloco é do tipo "default" (modelType 'box')
        const isDefaultBlock = renderIndex[id]?.model === 'box';

        // Calcular oclusões somente para blocos do tipo "default"
        const hasCubeLeft = isDefaultBlock && cubesArray.some(([cx, cy, cz, cid]) => cx === x - 1 && cy === y && cz === z && renderIndex[cid]?.model === 'box');
        const hasCubeRight = isDefaultBlock && cubesArray.some(([cx, cy, cz, cid]) => cx === x + 1 && cy === y && cz === z && renderIndex[cid]?.model === 'box');
        const hasCubeTop = isDefaultBlock && cubesArray.some(([cx, cy, cz, cid]) => cx === x && cy === y + 1 && cz === z && renderIndex[cid]?.model === 'box');
        const hasCubeBottom = isDefaultBlock && cubesArray.some(([cx, cy, cz, cid]) => cx === x && cy === y - 1 && cz === z && renderIndex[cid]?.model === 'box');
        const hasCubeFront = isDefaultBlock && cubesArray.some(([cx, cy, cz, cid]) => cx === x && cy === y && cz === z + 1 && renderIndex[cid]?.model === 'box');
        const hasCubeBack = isDefaultBlock && cubesArray.some(([cx, cy, cz, cid]) => cx === x && cy === y && cz === z - 1 && renderIndex[cid]?.model === 'box');

        return (
          <VoxelCube
            renderIndex={renderIndex}
            key={`${x}-${y}-${z}-${id}`} // Garante que a chave seja única combinando posição e id
            position={[x, y, z]}
            textures={textures}
            hasCubeLeft={hasCubeLeft}
            hasCubeRight={hasCubeRight}
            hasCubeTop={hasCubeTop}
            hasCubeBottom={hasCubeBottom}
            hasCubeFront={hasCubeFront}
            hasCubeBack={hasCubeBack}
            clusterWidth={clusterWidth}
            id={id}
            customModels={customModels}
          />
        );
      })}
    </group>
  );
};

export default Chunk;
