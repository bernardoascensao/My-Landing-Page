import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export const Model3d = () => {
  const canvasRef = useRef(null);

    useEffect(() => {
        // Scene
        const scene = new THREE.Scene()
    
        // Camera
        const camera = new THREE.PerspectiveCamera(50, 1, 1, 1000)
        camera.position.z = 96
    
        // Renderer
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
        renderer.setClearColor(0x000000, 0); // Transparent

        // Synchronize canvas size with its parent
        const setCanvasSize = () => {
          const { width, height } = canvas.getBoundingClientRect();
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        setCanvasSize();
    
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        ambientLight.castShadow = true
        scene.add(ambientLight)
    
        // Spot light
        const spotLight = new THREE.SpotLight(0xffffff, 1)
        spotLight.castShadow = true
        spotLight.position.set(0, 64, 32)
        scene.add(spotLight)
    
        // Import 3D model
        let loadedModel
        const gltfLoader = new GLTFLoader()
        gltfLoader.load('/assets/scene.gltf', (gltfScene) => {
          loadedModel = gltfScene
          gltfScene.scene.position.y = 3
          gltfScene.scene.scale.set(30, 30, 30)
          scene.add(gltfScene.scene)
        })
    
        // OrbitControl
        const controls = new OrbitControls(camera, renderer.domElement)
    
        const animate = () => {
          if(loadedModel){
            loadedModel.scene.rotation.y += 0.003 
          }
          renderer.render(scene, camera)
          window.requestAnimationFrame(animate)
        }
        animate()
    
        // Resize handler
        const handleResize = () => {
          const width = window.innerWidth
          const height = window.innerHeight
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
        window.addEventListener('resize', handleResize)
    
        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }, [])

  return ( <canvas ref={canvasRef} className="h-full w-full" /> )
}
