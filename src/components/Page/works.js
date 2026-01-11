import { FaGithub } from 'react-icons/fa';
import ProjectList from '../Models/projectList';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const Works = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger once to avoid re-animating on further scrolls
    threshold: 0.1,    // When 10% of the element is visible
  });

  return (
    <div className='w-full'>
      <div className='h-[100vh] pt-[10vh] flex flex-col md:flex-row items-center justify-start gap-5 md:justify-around mx-4 md:mx-24 mt-8 md:my-0 space-y-8 md:space-y-0'>
        {/* Empty div */}
        <div className='w-full md:w-[50%] h-full'></div>

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
