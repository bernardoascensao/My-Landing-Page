import React/*, {useState} */from 'react'
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon, CodeBracketIcon, /* Bars3Icon, XMarkIcon */ } from '@heroicons/react/24/outline'; // Import the icons you need
import data from "../../data.json";


const Header = () => {
  // const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className='h-[10vh] w-full flex flex-col gap-4 md:flex-col lg:flex-row items-center justify-between mb-5 lg:mb-0 px-10 md:px-20 pt-5'>
      <div>
        <Link to="/" className='font-lexend font-medium text-xl lg:text-3xl'>{data.person.firstName}</Link>
      </div>


      <div className=''>
        <ul className='flex md:gap-10 text-base md:text-lg lg:text-2xl font-semibold'>
          <li>
            <NavLink to="/" className="flex items-center gap-2 relative group"> {/* Class group for the effect */}
              <HomeIcon className="w-5 h-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-blue-500" />
              <p className="relative pr-2">Home</p>
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" /> {/* Efeito de sublinhado */}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="flex items-center gap-2 relative group">
              <UserIcon className="w-5 h-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-blue-500" />
              <p className="relative pr-2">About</p>
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className="flex items-center gap-2 relative group">
              <CogIcon className="w-5 h-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-blue-500" />
              <p className="relative pr-2">Skills</p>
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/works" className="flex items-center gap-2 relative group">
              <CodeBracketIcon className="w-5 h-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-blue-500" />
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