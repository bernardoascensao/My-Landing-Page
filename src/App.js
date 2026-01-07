import Header from './components/Layouts/header';
import Home from './components/Page/home'
import About from './components/Page/about';
import Works from './components/Page/works';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { Model3d } from './components/Models/model3d';

function App() {
  return (
    <div className='App min-h-screen flex flex-col bg-slate-100'>
      <Header />

      <main className='h-screen w-full'>
        <Canvas camera={{ position: [0, 0, 15], fov: 35 }}> 
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          
          <ScrollControls pages={4} damping={0.2}>
            <Model3d />
            <Scroll html style={{ width: '100%' }}>
              <Home />
              <About />
              <Works />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </main>
      
    </div>
  );
}

export default App;
