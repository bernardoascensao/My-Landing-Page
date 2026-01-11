import Header from './components/Layouts/header';
import Home from './components/Page/home'
import About from './components/Page/about';
import Works from './components/Page/works';
import Skills from './components/Page/skills';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { Model3d } from './components/Models/model3d';
import { useState, useLayoutEffect, useRef } from 'react';
import { useScroll } from '@react-three/drei';

// to get the scroll element from drei ScrollControls
function ScrollCapture({ onScrollEl }) {
  const scroll = useScroll();
  useLayoutEffect(() => {
    if (scroll.el) onScrollEl(scroll.el);
  }, [scroll.el, onScrollEl]);
  return null;
}

function App() {
  const [pages, setPages] = useState(4); // Start with a default of 4 pages
  const [scrollEl, setScrollEl] = useState(null);
  const contentRef = useRef();

  const scrollToSection = (id) => {
    if (!scrollEl) return;

    const target = scrollEl.querySelector(`#${id}`);

    if (target) {
      const offSetTop = target.offsetTop;
      
      // Ratio between total scroll size and how much the HTML moves.
      // Because the first page is always visible, total scroll is larger than the HTML movement.
      // For example, with 4 pages the HTML only moves 3 pages (the first stays visible).
      // The ratio is 4 / (4 - 1) = 1.33, so multiply the desired element offset by the ratio to get the correct scroll position.
      const ratio = pages / (pages - 1);
      
      const scrollTarget = offSetTop * ratio;

      console.log("ID:", id);
      console.log("Offset Original:", offSetTop);
      console.log("Rácio aplicado:", ratio);
      console.log("Scroll Final:", scrollTarget);

      scrollEl.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
    }
  };

  useLayoutEffect(() => {
    const updatePages = () => {
      if (!contentRef.current) return;

      const contentHeight = contentRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const pagesNeeded = Math.max(
        1,
        contentHeight / viewportHeight
      );

      setPages(pagesNeeded);
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

  return (
    <div className='App min-h-screen flex flex-col bg-black text-white'>
      <Header scrollToSection={scrollToSection} />

      {/* content only to measure height because in ScrollControls we cannot measure height directly
      and we need to know how many pages to set */}
      <div 
        ref={contentRef}
        className="fixed top-0 left-0 w-full h-auto opacity-0 pointer-events-none overflow-hidden -z-10"
      >
        <section><Home /></section>
        <section><About /></section>
        <section><Works /></section>
        <section><Skills /></section>
      </div>

      <main className='h-[100vh] w-full'>
        <Canvas camera={{ position: [0, 0, 15], fov: 35 }}> 
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          
          {/* KEY is vital: if the number of pages changes (including decimals),
          ScrollControls resets and recalculates scroll bounds */}
          <ScrollControls key={pages} pages={pages} damping={0.2}>
            <ScrollCapture onScrollEl={setScrollEl} />

            <Model3d totalPages={pages} />
            <Scroll html style={{ width: '100%' }}>
              <section id="home"><Home /></section>
              <section id="about"><About /></section>
              <section id="works"><Works /></section>
              <section id="skills"><Skills /></section>
            </Scroll>

          </ScrollControls>
        </Canvas>
      </main>
      
    </div>
  );
}

export default App;