import React, { useCallback, useRef } from 'react';
import { Cube } from './Cube'; // Ajuste o caminho conforme a estrutura do seu projeto

export function Chunk({ cubeConfigurations, blockIndex, textures, position, onClick, clusterPosition, cubesArray, isHover, clusterWidth }) {
	const ref = useRef();

	// Calcula a posição do elemento de hover deslocado 4.5 blocos para frente
	const hoverElementPosition = [position[0] + 4.5, position[1] + 4.5, position[2] + 4.5];

	const handleCubeClick = useCallback(
		(coords, faceIndex, button) => {
			const innerCoords = [
				coords[0] + position[0] * clusterWidth,
				coords[1] + position[1] * clusterWidth,
				coords[2] + position[2] * clusterWidth,
			];
			const globalCoords = [
				innerCoords[0] + clusterPosition[0] * clusterWidth,
				innerCoords[1] + clusterPosition[1] * clusterWidth,
				innerCoords[2] + clusterPosition[2] * clusterWidth,
			];
			onClick(coords, faceIndex, button, globalCoords);
		},
		[position, clusterPosition, onClick, clusterWidth]
	);

	const chunkIsFull = cubesArray.length === 100; // Verifica se cubesArray está cheio

	const checkOcclusion = (x, y, z) => {
		const hasCubeLeft = cubesArray.some(([cx, cy, cz]) => cx === x - 1 && cy === y && cz === z);
		const hasCubeRight = cubesArray.some(([cx, cy, cz]) => cx === x + 1 && cy === y && cz === z);
		const hasCubeTop = cubesArray.some(([cx, cy, cz]) => cx === x && cy === y + 1 && cz === z);
		const hasCubeBottom = cubesArray.some(([cx, cy, cz]) => cx === x && cy === y - 1 && cz === z);
		const hasCubeFront = cubesArray.some(([cx, cy, cz]) => cx === x && cy === y && cz === z + 1);
		const hasCubeBack = cubesArray.some(([cx, cy, cz]) => cx === x && cy === y && cz === z - 1);

		return { hasCubeLeft, hasCubeRight, hasCubeTop, hasCubeBottom, hasCubeFront, hasCubeBack };
	};

	return (
		<group>
			{/* Renderiza o elemento de hover deslocado 4.5 blocos para frente se isHover for verdadeiro */}
			{isHover && (
				<mesh position={hoverElementPosition} receiveShadow castShadow scale={clusterWidth}>
					<meshLambertMaterial attach="material" color={0xffffff10} wireframe />
					<boxGeometry />
				</mesh>
			)}

			{/* Renderiza o chunk principal */}
			{chunkIsFull ? (
				// Renderiza um único cubo representando o chunk completo
				<mesh ref={ref} receiveShadow castShadow position={position} scale={clusterWidth}>
					<Cube
						id={'fullChunk'} // Atribui um ID para indicar que é o chunk completo
						position={position} // Usa a posição do chunk para a posição do cubo
						onClick={handleCubeClick}
						textures={textures}
						cubeConfigurations={cubeConfigurations}
						cubesArray={cubesArray} // Passa cubesArray para Cube para verificações de oclusão
					/>
				</mesh>
			) : (
				// Renderiza cubos individuais
				<mesh ref={ref} receiveShadow castShadow position={position} scale={clusterWidth}>
					<group scale={0.1}>
						{cubesArray.map((coords, index) => {
							const [x, y, z, id] = coords;
							const { hasCubeLeft, hasCubeRight, hasCubeTop, hasCubeBottom, hasCubeFront, hasCubeBack } = checkOcclusion(x, y, z);
							// Pula a renderização de faces que estão ocultas
							return (
								<Cube
									key={index}
									id={id} // Assume que o id está no índice 3 do array coords
									position={[coords[0], coords[1], coords[2]]}
									faceIndex={index} // Índice de face, ajuste conforme necessário
									onClick={handleCubeClick}
									textures={textures[id]}
									blockIndex={blockIndex[id]}
									cubeConfigurations={cubeConfigurations[id]}
									cubesArray={cubesArray}
									hasCubeLeft={hasCubeLeft}
									hasCubeRight={hasCubeRight}
									hasCubeTop={hasCubeTop}
									hasCubeBottom={hasCubeBottom}
									hasCubeFront={hasCubeFront}
									hasCubeBack={hasCubeBack}
								/>
							);
						})}
					</group>
				</mesh>
			)}
		</group>
	);
}
