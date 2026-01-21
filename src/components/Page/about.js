import data from "../../data.json";
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className='w-full h-[100vh] pt-[10vh] px-10 flex flex-col md:flex-row items-center'>
        {/* Left side: text */}
        <motion.div 
          className='w-full md:w-[50%] pt-12 md:pt-0 md:pl-20' 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
            <h1 className='font-lexend font-medium text-3xl md:text-4xl lg:text-5xl mb-4'>About Me</h1>
            {data.about.map((parag, idx) => (
                <p key={idx} className='font-light font-lexend text-xs md:text-base lg:text-lg mb-2'>{parag}</p>
            ))}
        </motion.div>

        {/* Right side: empty (allocates space to 3D model appears here) */}
        <div className='md:w-[50%]'></div>
    </div>
  )
}

export default About