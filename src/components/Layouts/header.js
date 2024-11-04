import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon, CodeBracketIcon, Bars3Icon, XMarkIcon  } from '@heroicons/react/24/outline'; // Import the icons you need
import data from "../../data.json";




const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className='h-[10vh] w-full flex md:flex-col lg:flex-row items-center justify-between mb-5 lg:mb-0 px-10 md:px-20 pt-5'>
      <div>
        <Link to="/" className='font-lexend font-medium text-xl lg:text-3xl'>{data.person.firstName}</Link>
      </div>

      {/* Button and side icon for smaller screens */}
      <div className="md:hidden relative">
        {/* Menu button */}
        <div onClick={() => setMenuOpen(!menuOpen)} className="relative">
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8 text-blue-500" />
          ) : (
            <Bars3Icon className="h-8 w-8 text-blue-500" />
          )}
        </div>

        {/* Side menu */}
        {menuOpen && (
          <div className="absolute top-10 -right-10 w-40 bg-black bg-opacity-40 shadow-lg flex flex-col items-start p-6 gap-y-8 z-30 text-white rounded-lg">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
              <HomeIcon className="h-6 w-6" />
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
              <UserIcon className="h-6 w-6" />
              About
            </NavLink>
            <NavLink to="/skills" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
              <CogIcon className="h-6 w-6" />
              Skills
            </NavLink>
            <NavLink to="/works" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
              <CodeBracketIcon className="h-6 w-6" />
              Works
            </NavLink>
          </div>
        )}
      </div>

      <div className='hidden md:block'>
        <ul className='flex gap-10 text-lg lg:text-2xl font-semibold'>
          <li>
            <NavLink to="/" className="flex items-center gap-2 relative group"> {/* Class group for the effect */}
              <HomeIcon className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
              <p className="relative pr-2">Home</p>
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" /> {/* Efeito de sublinhado */}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="flex items-center gap-2 relative group">
              <UserIcon className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
              <p className="relative pr-2">About</p>
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className="flex items-center gap-2 relative group">
              <CogIcon className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
              <p className="relative pr-2">Skills</p>
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/works" className="flex items-center gap-2 relative group">
              <CodeBracketIcon className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
              <p className="relative pr-2">Works</p>
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header