/**
 * Model3d: Rendering and behavior controller for the 3D model.
 *
 * HOW IT WORKS:
 * 1. DYNAMIC RESPONSIVENESS: Uses MathUtils.mapLinear to smoothly compute scale and X position,
 *    mapping window width (pixels) to 3D world units to avoid abrupt jumps between desktop and mobile.
 *
 * 2. SCROLL CINEMATICS: The model has 3 main scroll-based states:
 *    - "Ceiling" (Before About): The model rises from the bottom, following the scroll.
 *    - "Transition" (Between About and Works): The model travels horizontally (X) and
 *      flips its rotation (Y) according to the progress between sections.
 *    - "Ground" (After Works): The model continues rising toward the top of the page,
 *      staying “anchored” to the ground of the Works section.
 *
 * 3. MOBILE ADAPTATION: When width is below 768px, the model uses a centered layout with a vertical
 *    offset proportional to the viewport height.
 *
 * 4. SMOOTHING: Applies lerp (linear interpolation) so scale, position, and rotation changes feel natural,
 *    with an added floating effect via Math.sin.
 */

import { useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export const Model3d = ({ aboutCentered, worksCentered }) => {
  const groupRef = useRef();
  const scroll = useScroll();
  const { scene } = useGLTF('/assets/scene.gltf');

  useFrame((state) => {
    const offset = scroll.offset; // 0 to 1
    const { height } = state.viewport; // width of the 3D world based on the window
    const { width } = state.size; // width of the viewport in pixels

    // DEFINE WIDTH LIMITS (Pixels)
    const minWidth = 768;  // Point where it starts to be "Desktop"
    const maxWidth = 1600; // Point where the model reaches maximum position (4)

    // DYNAMIC CALCULATION OF X AND SCALE
    // mapLinear(currentValue, minInput, maxInput, minOutput, maxOutput)
    let dynamicX = THREE.MathUtils.mapLinear(width, minWidth, maxWidth, 0.8, 4);
    let dynamicScale = THREE.MathUtils.mapLinear(width, minWidth, maxWidth, 1.8, 3);

    // Ensure that values don't exceed limits (Clamp)
    const responsiveX = THREE.MathUtils.clamp(dynamicX, 0, 4);
    const responsiveScale = THREE.MathUtils.clamp(dynamicScale, 1.8, 3);

    // MOBILE LOGIC
    const isMobile = width < 768;
    const mobileYOffset = -height * 0.15;

    let targetX = isMobile ? -0.5 : responsiveX;
    let targetY = 0;

    const lookLeft = -1;
    const lookRight = 1;
    let targetRotationY = lookLeft;

    if (groupRef.current) {
      // only appears when About starts to enter the screen
      groupRef.current.visible = true;

      // scale logic (lerp for smooth scaling)
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, responsiveScale, 0.1));
      
      // --- Y AXIS AND X AXIS LOGIC ---
      if (offset < aboutCentered) {
        // "ceiling" logic
        // from when about appears until works starts to appear, the 3d model follows the scroll
        targetY = (offset - aboutCentered) * 50;
        if (isMobile) { targetY += mobileYOffset; } // to keep it a bit under about paragraph on mobile
        targetX = isMobile ? -0.5 : responsiveX;
        targetRotationY = lookLeft;
      } 
      else if (offset >= aboutCentered && offset < worksCentered) {
        // works started to appear, so the transition down begins
        const travelProgress = scroll.range(aboutCentered, worksCentered - aboutCentered);
        targetX = THREE.MathUtils.lerp(responsiveX, -responsiveX, travelProgress);
        targetY = 0;  // keep the model in the center of the screen Y-wise

        if (isMobile) { targetX = -0.5; targetY = (offset - aboutCentered) * 40 - 1.5; }

        targetRotationY = THREE.MathUtils.lerp(lookLeft, lookRight, travelProgress);
      }
      else {
        // "ground" logic
        targetY = -1 * (worksCentered - offset) * 50;
        targetX = -responsiveX;

        if (isMobile) { targetX = -0.5; targetY = (offset - aboutCentered) * 40 - 1.5; }

        targetRotationY = lookRight;
      }

      const floatEffect = Math.sin(state.clock.elapsedTime) * 0.1;

      groupRef.current.position.x = targetX //THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + floatEffect, 0.1);
      

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        targetRotationY, 
        0.1
      );
      // Constant rotation
      // groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={groupRef}
      object={scene} 
      scale={[3, 3, 3]} 
      // position={[6, 0, 0]} 
    />
  );
};