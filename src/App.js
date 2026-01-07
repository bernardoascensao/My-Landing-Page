import Header from './components/Layouts/header';
import Home from './components/Page/home'
import About from './components/Page/about';
import Works from './components/Page/works';
import Skills from './components/Page/skills';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { Model3d } from './components/Models/model3d';
import { useState, useLayoutEffect, useRef } from 'react';

function App() {
  const [pages, setPages] = useState(4); // Start with a default of 4 pages
  const contentRef = useRef();

  useLayoutEffect(() => {
    const updatePages = () => {
      if (!contentRef.current) return;

      const contentHeight = contentRef.current.scrollHeight;
      const pagesNeeded = Math.max(
        1,
        contentHeight / window.innerHeight
      );

      setPages(Math.ceil(pagesNeeded));
    };

    updatePages();

    const ro = new ResizeObserver(updatePages);
    ro.observe(contentRef.current);

    window.addEventListener('resize', updatePages);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updatePages);
    };
  }, []);

  //const totalScrollDist = (pages - 1) * window.innerHeight;

  return (
    <div className='App min-h-screen flex flex-col bg-slate-100'>
      {/* <Header /> */}

      <div
        ref={contentRef}
        className="fixed top-0 left-0 w-full h-auto opacity-0 pointer-events-none overflow-hidden -z-10"
      >
        <Home />
        <About />
        <Works />
        <Skills />
      </div>

      <main className='h-[100vh] w-full'>
        <Canvas camera={{ position: [0, 0, 15], fov: 35 }}> 
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          
          <ScrollControls pages={pages} damping={0.2}>
            <Model3d totalPages={pages} />
            <Scroll html style={{ width: '100%' }}>
              <Home />
              <About />
              <Works />
              <Skills />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </main>
      
    </div>
  );
}

export default App;