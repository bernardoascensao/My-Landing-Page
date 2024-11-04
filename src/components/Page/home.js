import React from 'react';
import data from "../../data.json";
import ProfileCard from '../Models/profileCard';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className='h-auto lg:h-[90vh] my-16 lg:my-0 flex flex-col lg:flex-row gap-y-40 items-center justify-around px-10 md:px-24'>
      <motion.div
        initial={{ opacity: 0, x: -50 }}        // starts invisible and -50 left
        animate={{ opacity: 1, x: 0 }}          // moves to center and opacity 1
        transition={{ duration: 0.8 }}          // duration of animation
        className='w-auto text-start flex flex-col gap-5'
      >
        <h1 className='font-lexend text-5xl lg:text-6xl font-light'>Hi,</h1>
        <h2 className='font-lexend text-4xl lg:text-5xl'>I'm <strong className='font-semibold text-blue-400'>{data.person.name}</strong></h2>
        <p className='font-lexend text-lg lg:text-xl'>{data.person.course}</p>
        <p className='font-lexend text-2xl lg:text-3xl'>{data.person.location}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className='w-auto flex justify-center'>
          <ProfileCard />
      </motion.div>

    </div>
    
  )
}

export default Home