import { useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export const Model3d = () => {
  const groupRef = useRef();
  const scroll = useScroll();
  const { scene } = useGLTF('/assets/scene.gltf');

  useFrame((state) => {
    const offset = scroll.offset; // 0 a 1
    const { width } = state.viewport; // Largura do mundo 3D baseada na janela

    //let targetX = groupRef.current.position.x;
    //let targetY = groupRef.current.position.y;

    // Definimos os pontos de paragem baseados nas secções
    const aboutStart = 0.08;
    const aboutCentered = 0.33;
    const worksCentered = 0.63;
    const heightAdjustment = 1.5; // (Equivale aos teus 0.05 * 30)

    const responsiveX = width > 10 ? 6 : width / 3;

    let targetX = responsiveX;
    let targetY = heightAdjustment;

    if (groupRef.current) {
      // 1. VISIBILIDADE: Só aparece quando o About começa a entrar no ecrã
      groupRef.current.visible = offset > aboutStart;

      // --- LÓGICA DO EIXO Y e EIXO X ---
      if (offset < aboutCentered) {
        // lógica de "teto"
        // desde que o about aparece até o works começar a aparecer o modelo 3d acompanha o scroll
        targetY = (offset - aboutCentered) * 30 + heightAdjustment;
        targetX = responsiveX;
      } 
      else if (offset >= aboutCentered && offset < worksCentered) {
        // começou a aparecer o works, por isso começa a transação para baixo
        const travelProgress = scroll.range(aboutCentered, worksCentered - aboutCentered);
        targetX = THREE.MathUtils.lerp(responsiveX, -responsiveX, travelProgress);
        targetY = heightAdjustment;
      }
      else {
        // lógica de "chão"
        // targetY = (-1 * ((worksCentered - offset) - heightAdjustment)) * 30;
        targetY = -1 * (worksCentered - offset) * 30 + heightAdjustment;
        targetX = -responsiveX;
      }

      const floatEffect = Math.sin(state.clock.elapsedTime) * 0.1;


      groupRef.current.position.x = targetX //THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + floatEffect, 0.1);
      
      // Rotação constante
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