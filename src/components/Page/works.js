import React from 'react'
import { FaGithub } from 'react-icons/fa';
import ProjectList from '../Models/projectList';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gifImage from '../../assets/videos/animation1.gif'


const Works = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger once to avoid re-animating on further scrolls
    threshold: 0.1,    // When 10% of the element is visible
  });

  return (
    <div className='w-full mt-10'>
      <div className='h-[90vh] flex flex-col md:flex-row items-center justify-start gap-5 md:justify-around mx-4 md:mx-24 md:mb-10 mt-8 md:my-0 space-y-8 md:space-y-0'>
        {/* Video Section */}
        <motion.div 
          className='w-full md:w-[50%] flex justify-center'
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <img src={gifImage} alt="GIF animado" className="w-full h-auto md:h-full" />
        </motion.div>

        {/* Text and GitHub Button Section */}
        <motion.div 
          className='w-full md:w-[50%] text-center md:text-left px-4'
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h1 className='font-lexend font-medium text-3xl lg:text-5xl mb-4'>
            These are some projects that can be found on my GitHub
          </h1>
          <div className="flex justify-center md:justify-start">
            <a 
              href="https://github.com/bernardoascensao" 
              target="_blank" 
              rel="noopener noreferrer" 
              className='flex items-center p-2 rounded-lg bg-blue-400 hover:bg-blue-500 transition-colors duration-300 md:w-32 justify-center'
            >
              <FaGithub className="h-6 w-6 text-white mr-2" />
              <p className='text-white text-xs md:text-sm font-lexend'>GitHub</p>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Project List */}
      <motion.div 
        ref={ref} 
        initial={{ opacity: 0, y: 70 }} 
        animate={inView ? { opacity: 1, y: 0 } : {}} 
        transition={{ duration: 0.8 }} 
        className="md:mx-24"
      >
        <ProjectList />
      </motion.div>
    </div>
  )
}

export default Works
