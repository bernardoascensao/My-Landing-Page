import React from 'react';
import { motion } from 'framer-motion';
import SkillList from '../Models/skillsList';
import "@google/model-viewer";

const Skills = () => (
    <div className='flex flex-col mx-6 md:mx-24'>
        <div className='h-[90vh] flex flex-col-reverse items-center gap-16 md:gap-0 justify-end md:flex-row md:items-center  md:mb-4'>
            <motion.h1
                className='w-full md:w-[60%] font-lexend font-medium text-center md:text-start text-3xl md:text-6xl'
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                Here are some of my skills
            </motion.h1>

            <motion.div
                className='h-72 w-72 md:h-[60%] md:w-[40%] lg:h-[80%] lg:w-[40%]'
                initial={{ opacity: 0, x: 150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <model-viewer
                    src="/models/gear.glb"
                    alt="3D model"
                    auto-rotate
                    camera-controls
                    style={{ width: "100%", height: "100%"}}
                ></model-viewer>
            </motion.div>
        </div>
        <SkillList />
    </div>
);

export default Skills;
