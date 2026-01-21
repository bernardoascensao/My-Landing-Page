import { motion } from 'framer-motion';
import SkillList from '../Models/skillsList';

const Skills = () => {

  return (
    <div className='min-h-[100vh] pt-[10vh] w-[100vw] flex flex-col items-center gap-0 justify-center md:justify-between px-6'>
      <motion.h1
        className='font-lexend font-medium text-center pt-4 md:pt-32 text-3xl md:text-4xl lg:text-6xl'
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        These are some of my skills
      </motion.h1>

      {/* Bottom: skill cards */}
      <SkillList />
    </div>
  );
};

export default Skills;
