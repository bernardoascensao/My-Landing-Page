import React from 'react'
import data from "../../data.json";
import gifImage from '../../assets/videos/animation2.gif'
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className='w-full h-[90vh] px-10 mb-16 md:mb-0 flex flex-col-reverse md:flex-row justify-end md:items-center'>
        <motion.div className='w-auto md:w-[50%] md:pl-20' initial={{ opacity: 0, x: -150 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className='font-lexend font-medium text-4xl text-center md:text-start md:text-5xl mb-4'>About Me</h1>
            {data.about.map((parag, idx) => {
                return (
                    <p className='font-light font-lexend text-sm md:text-lg mb-2'>
                        {parag}
                    </p>
                );
            })}
        </motion.div>
        <div className='w-auto md:w-[50%]'>
            <img src={gifImage} alt="GIF animado" className="w-full h-auto md:h-full" />
        </div>
    </div>
  )
}

export default About