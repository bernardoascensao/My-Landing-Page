import { Routes, Route } from 'react-router-dom';
import Header from './components/Layouts/header';
import Home from './components/Page/home'
import About from './components/Page/about';
import Works from './components/Page/works';
import Skills from './components/Page/skills';



function App() {
  return (
    <div className='App min-h-screen flex flex-col bg-slate-100'>
      <Header />

      <main className='flex-grow'>    {/* flex-grow to fill the screen */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />}/>
          <Route path='/works' element={<Works />}/>
          <Route path='/skills' element={<Skills />}/>
        </Routes>
      </main>
      
    </div>
  );
}

export default App;
