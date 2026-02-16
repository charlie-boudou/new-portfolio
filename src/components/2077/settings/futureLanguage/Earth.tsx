'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Earth() {
  const groupRef = useRef<THREE.Group>(null);

  const originalMask = useTexture('/textures/earth_mask.jpg');

  const mask = useMemo(() => {
    const cloned = originalMask.clone();
    cloned.wrapS = THREE.ClampToEdgeWrapping;
    cloned.wrapT = THREE.ClampToEdgeWrapping;
    cloned.anisotropy = 8;
    cloned.needsUpdate = true;
    return cloned;
  }, [originalMask]);


  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef} rotation={[0.3, Math.PI * 1.4, 0]}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#22d3ee"
          alphaMap={mask}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.05}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

    </group>
  );
}

