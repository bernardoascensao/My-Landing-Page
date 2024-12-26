import React from 'react';
import { motion } from 'framer-motion';
import SkillList from '../Models/skillsList';
import { Model3d } from '../Models/model3d';

const Skills = () => {

  return (
    <div className='flex flex-col mx-6 md:mx-24'>
      <div className='h-[90vh] flex flex-col-reverse items-center gap-16 md:gap-0 justify-end md:flex-row md:items-center md:mb-4'>
        <motion.h1
          className='w-full md:w-[60%] font-lexend font-medium text-center md:text-start text-3xl md:text-6xl'
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Down here are some of my skills
        </motion.h1>

        <motion.div
          className='h-72 w-72 md:h-[60%] md:w-[40%] lg:h-[80%] lg:w-[40%] flex justify-center items-center'
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* O modelo 3D será renderizado aqui */}
          <Model3d />
        </motion.div>
      </div>
      <SkillList />
    </div>
  );
};

export default Skills;
