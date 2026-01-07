import { useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export const Model3d = ({ totalPages }) => {
  const groupRef = useRef();
  const scroll = useScroll();
  const { scene } = useGLTF('/assets/scene.gltf');

  useFrame((state) => {
    const offset = scroll.offset; // 0 to 1
    const { width } = state.viewport; // Width of the 3D world based on the window

    const aboutStart = 0.08;

    const aboutCentered = 1 / (totalPages - 1);
    const worksCentered = 2 / (totalPages - 1);

    const responsiveX = width > 10 ? 6 : width / 3;

    let targetX = responsiveX;
    let targetY = 0;

    if (groupRef.current) {
      // 1. VISIBILITY: Only appears when About starts to enter the screen
      groupRef.current.visible = offset > aboutStart;
      
      // --- Y AXIS AND X AXIS LOGIC ---
      if (offset < aboutCentered) {
        // "ceiling" logic
        // from when about appears until works starts to appear, the 3d model follows the scroll
        targetY = (offset - aboutCentered) * 50;
        targetX = responsiveX;
      } 
      else if (offset >= aboutCentered && offset < worksCentered) {
        // works started to appear, so the transition down begins
        const travelProgress = scroll.range(aboutCentered, worksCentered - aboutCentered);
        targetX = THREE.MathUtils.lerp(responsiveX, -responsiveX, travelProgress);
        targetY = 0;  // keep the model in the center of the screen Y-wise
      }
      else {
        // "ground" logic
        targetY = -1 * (worksCentered - offset) * 50;
        targetX = -responsiveX;
      }

      const floatEffect = Math.sin(state.clock.elapsedTime) * 0.1;

      groupRef.current.position.x = targetX //THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + floatEffect, 0.1);
      
      // Constant rotation
      // groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={groupRef}
      object={scene} 
      scale={[3, 3, 3]} 
      position={[6, 0, 0]} 
    />
  );
};