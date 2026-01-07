import data from "../../data.json";
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className='w-full h-[100vh] px-10 flex flex-col md:flex-row items-center'>
        {/* Lado Esquerdo: Texto */}
        <motion.div 
          className='w-full md:w-[50%] md:pl-20' 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
            <h1 className='font-lexend font-medium text-4xl md:text-5xl mb-4'>About Me</h1>
            {data.about.map((parag, idx) => (
                <p key={idx} className='font-light font-lexend text-sm md:text-lg mb-2'>{parag}</p>
            ))}
        </motion.div>

        {/* Lado Direito: VAZIO (Onde o modelo 3D aparecerá em x: 2) */}
        <div className='w-full md:w-[50%]'></div>
    </div>
  )
}

export default About