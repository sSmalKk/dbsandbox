import React, { useCallback, useRef } from 'react';
import { Cube } from './Cube';

export function Chunk({ textures, position, onClick, clusterPosition, cubesArray, isHover, clusterWidth }) {
	const ref = useRef();

	// Calculates the position of the hover element shifted 4.5 blocks forward
	const hoverElementPosition = [position[0] + 4.5, position[1] + 4.5, position[2] + 4.5];

	const handleCubeClick = useCallback(
		(coords, faceIndex, button) => {
			const innercoords = [
				coords[0] + position[0] * clusterWidth,
				coords[1] + position[1] * clusterWidth,
				coords[2] + position[2] * clusterWidth,
			];
			const globalCoords = [
				innercoords[0] + clusterPosition[0] * clusterWidth,
				innercoords[1] + clusterPosition[1] * clusterWidth,
				innercoords[2] + clusterPosition[2] * clusterWidth,
			];
			onClick(coords, faceIndex, button, globalCoords);
		},
		[position, clusterPosition, onClick, clusterWidth]
	);

	const chunkIsFull = cubesArray.length === 0; // Check if cubesArray is empty

	return (
		<group>
			{/* Renders the element hover shifted 4.5 blocks forward */}
			{isHover &&
				<mesh position={hoverElementPosition} receiveShadow castShadow scale={clusterWidth}>
					<meshLambertMaterial attach="material" color={0xffffff10} wireframe />
					<boxGeometry />
				</mesh>}

			{/* Renders the main chunk */}
			{chunkIsFull
				? // Render a single cube representing the full chunk
					<mesh ref={ref} receiveShadow castShadow position={position} scale={clusterWidth}>
						<Cube
							position={position} // Use chunk position for cube position
							onClick={handleCubeClick}
							textureArray={textures}
							id={'fullChunk'} // Assign an ID to indicate full chunk
							hasCubeLeft={false} // Placeholder, should be dynamically determined
							hasCubeRight={false} // Placeholder, should be dynamically determined
							hasCubeTop={false} // Placeholder, should be dynamically determined
							hasCubeBottom={false} // Placeholder, should be dynamically determined
							hasCubeFront={false} // Placeholder, should be dynamically determined
							hasCubeBack={false} // Placeholder, should be dynamically determined
						/>
					</mesh>
				: // Render individual cubes
					<mesh ref={ref} receiveShadow castShadow position={position} scale={clusterWidth}>
						<group scale={0.1}>
							{cubesArray.map((coords, index) =>
								<Cube
									key={index}
									position={coords}
									faceIndex={index}
									onClick={handleCubeClick}
									textureArray={textures}
									id={coords[3]} // Assuming id is at index 3 of coords array
									hasCubeLeft={false} // Placeholder, should be dynamically determined
									hasCubeRight={false} // Placeholder, should be dynamically determined
									hasCubeTop={false} // Placeholder, should be dynamically determined
									hasCubeBottom={false} // Placeholder, should be dynamically determined
									hasCubeFront={false} // Placeholder, should be dynamically determined
									hasCubeBack={false} // Placeholder, should be dynamically determined
								/>
							)}
						</group>
					</mesh>}
		</group>
	);
}
