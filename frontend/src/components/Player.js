import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';

export function Player({ setChunkPosition, initialPosition, speed, direction, frontVector, sideVector, rotation, lerp = THREE.MathUtils.lerp }) {
  const [playerPosition, setPlayerPosition] = useState(initialPosition);
  const body = useRef();
  const ref = useRef();
  const rapier = useRapier();
  const [, get] = useKeyboardControls();

  useEffect(() => {
    if (!ref.current) return;
    setPlayerPosition(ref.current.translation());
  }, []);

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();
    if (!ref.current) return;

    const velocity = ref.current.linvel();
    state.camera.position.set(...ref.current.translation());

    if (body.current && body.current.children[0]) {
      body.current.children[0].rotation.x = lerp(body.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1);
      body.current.rotation.copy(state.camera.rotation);
      body.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1));
    }

    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(state.camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

    const world = rapier.world.raw();
    const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }));
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });

    setChunkPosition([Math.round(state.camera.position.x / 16), 0, Math.round(state.camera.position.z / 16)]);
    setPlayerPosition(state.camera.position);
  });

  return (
    <RigidBody ref={ref} colliders={false} type="dynamic" position={initialPosition} enabledRotations={[false, false, false]}>
      <CapsuleCollider args={[0.75, 1]} position={[0, 1, 0]} />
      <group ref={body}>
        {/* Add your player model or other elements here */}
      </group>
    </RigidBody>
  );
}

Player.defaultProps = {
  speed: 5,
  direction: new THREE.Vector3(),
  frontVector: new THREE.Vector3(),
  sideVector: new THREE.Vector3(),
  rotation: new THREE.Euler(),
};
