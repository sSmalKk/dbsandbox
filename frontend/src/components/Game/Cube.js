import React, { useCallback, useRef, useState } from 'react';
import { useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import create from 'zustand';

export function Cube({
	id,
	position,
	faceIndex,
	onClick,
	textures,
	Index,
	cubeConfigurations,
	hasCubeLeft,
	hasCubeRight,
	hasCubeTop,
	hasCubeBottom,
	hasCubeFront,
	hasCubeBack,
}) {
	const ref = useRef();
	const setSelectedCube = useCubeStore(state => state.setSelectedCube);

	// Get the cube configuration or use default
	const cubeConfig = cubeConfigurations || {
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
	};
	const [hoveredFace, setHoveredFace] = useState(null);

	const handleMouseEnter = useCallback(index => {
		setHoveredFace(index);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setHoveredFace(null);
	}, []);
	const texturemap = useTexture(textures);

	const handleMouseClick = useCallback(
		e => {
			const clickedFaceIndex = Math.floor(e.faceIndex / 2);
			const button = e.button;
			const coords = position;

			console.debug('Face:', clickedFaceIndex, 'Button:', button, 'Coords:', coords);

			onClick(coords, clickedFaceIndex, button);
		},
		[onClick, position]
	);

	return (
		<group position={position} receiveShadow castShadow onClick={handleMouseClick} ref={ref}>
			<RigidBody type={cubeConfig.type} colliders={cubeConfig.colliders}>
				{cubeConfig.planes.map((plane, index) => (
					<mesh
						key={index}
						position={plane.position}
						rotation={[plane.rotation[0], plane.rotation[1], plane.rotation[2]]}
						onPointerOut={() => handleMouseLeave(index)}
						onPointerMove={() => handleMouseEnter(index)}
					>
						<planeGeometry />
						<meshStandardMaterial
							attach="material"
							map={texturemap}
							color={hoveredFace === index ? 'hotpink' : 'white'}
						/>

					</mesh>
				))}
			</RigidBody>
		</group>
	);
}

// Zustand store for managing cube selection
const useCubeStore = create(set => ({
	selectedCube: null,
	selectedFace: null,
	selectedMouseButton: null,
	setSelectedCube: (coords, faceIndex, mouseButton) =>
		set({
			selectedCube: coords,
			selectedFace: faceIndex,
			selectedMouseButton: mouseButton,
		}),
}));
