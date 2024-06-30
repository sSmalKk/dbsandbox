import React, { useCallback, useRef, useState } from 'react';
import { useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import create from 'zustand';

export function Cube({
	id,
	position,
	faceIndex,
	onClick,
	textureArray,
	hasCubeLeft,
	hasCubeRight,
	hasCubeTop,
	hasCubeBottom,
	hasCubeFront,
	hasCubeBack,
}) {
	const ref = useRef();
	const setSelectedCube = useCubeStore(state => state.setSelectedCube);

	// Select texture array based on ID
	const selectedTextureArray = textureArray[id];
	const defaultTexture = useTexture(selectedTextureArray[0]);

	const [hoveredFace, setHoveredFace] = useState(null);

	const handleMouseEnter = useCallback(index => {
		setHoveredFace(index);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setHoveredFace(null);
	}, []);

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
			<RigidBody type="fixed" colliders="cuboid">
				{!hasCubeLeft &&
					<mesh
						position={[-0.5, 0, 0]}
						rotation={[0, -Math.PI / 2, 0]}
						onPointerOut={() => handleMouseLeave(0)}
						onPointerMove={() => handleMouseEnter(0)}
					>
						<planeGeometry />
						<meshStandardMaterial
							attach="material"
							map={defaultTexture}
							color={hoveredFace === 0 ? 'hotpink' : 'white'}
						/>
					</mesh>}

				{!hasCubeRight &&
					<mesh
						position={[0.5, 0, 0]}
						rotation={[0, Math.PI / 2, 0]}
						scale={[-1, 1, 1]}
						onPointerOut={() => handleMouseLeave(1)}
						onPointerMove={() => handleMouseEnter(1)}
					>
						<planeGeometry />
						<meshStandardMaterial
							attach="material"
							map={defaultTexture}
							color={hoveredFace === 1 ? 'hotpink' : 'white'}
						/>
					</mesh>}

				{!hasCubeTop &&
					<mesh
						position={[0, 0.5, 0]}
						rotation={[-Math.PI / 2, 0, 0]}
						onPointerOut={() => handleMouseLeave(2)}
						onPointerMove={() => handleMouseEnter(2)}
					>
						<planeGeometry />
						<meshStandardMaterial
							attach="material"
							map={defaultTexture}
							color={hoveredFace === 2 ? 'hotpink' : 'white'}
						/>
					</mesh>}

				{!hasCubeBottom &&
					<mesh
						position={[0, -0.5, 0]}
						rotation={[Math.PI / 2, 0, 0]}
						onPointerOut={() => handleMouseLeave(3)}
						onPointerMove={() => handleMouseEnter(3)}
					>
						<planeGeometry />
						<meshStandardMaterial
							attach="material"
							map={defaultTexture}
							color={hoveredFace === 3 ? 'hotpink' : 'white'}
						/>
					</mesh>}

				{!hasCubeFront &&
					<mesh
						position={[0, 0, 0.5]}
						rotation={[0, 0, 0]}
						onPointerOut={() => handleMouseLeave(4)}
						onPointerMove={() => handleMouseEnter(4)}
					>
						<planeGeometry />
						<meshStandardMaterial
							attach="material"
							map={defaultTexture}
							color={hoveredFace === 4 ? 'hotpink' : 'white'}
						/>
					</mesh>}

				{!hasCubeBack &&
					<mesh
						position={[0, 0, -0.5]}
						rotation={[0, Math.PI, 0]}
						onPointerOut={() => handleMouseLeave(5)}
						onPointerMove={() => handleMouseEnter(5)}
					>
						<planeGeometry />
						<meshStandardMaterial
							attach="material"
							map={defaultTexture}
							color={hoveredFace === 5 ? 'hotpink' : 'white'}
						/>
					</mesh>}
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
