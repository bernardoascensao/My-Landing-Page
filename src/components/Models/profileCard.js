import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperclip } from 'react-icons/fa';
import profile_img from '../../assets/images/profile_picture.jpg';
import cv from '../../assets/documents/CV_Bernardo_EN.pdf'
import data from "../../data.json";


const SocialLinks = () => {
  const username = data.person.socials.filter((it) => it.name === "github")[0]?.username;
  const email = data.person.socials.filter((it) => it.name === "email")[0]?.email;
  return (
    <div className='flex justify-center gap-8'>
      <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
        <FaGithub className="h-10 w-10 text-blue-400 hover:text-blue-600 transition-colors duration-300" />
      </a>
      <a href="https://www.linkedin.com/in/bernardo-ascens%C3%A3o-4792a1331/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="h-10 w-10 text-blue-400 hover:text-blue-600 transition-colors duration-300" />
      </a>
      <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
        <FaEnvelope className="h-10 w-10 text-blue-400 hover:text-blue-600 transition-colors duration-300" />
      </a>
      <a href={cv} target="_blank" rel="noopener noreferrer">
        <FaPaperclip className="h-10 w-10 text-blue-400 hover:text-blue-600 transition-colors duration-300" />
      </a>
    </div>
  );
}

const ProfileCard = () => {
  return (
    <div className='bg-white w-80 h-80 md:w-96 md:h-96 text-center rounded-lg shadow-lg relative'>
        <img 
            src={profile_img}
            alt="Profile"
            className='w-48 h-48  md:w-52 md:h-52 rounded-full mx-auto mb-4 shadow-xl absolute -top-24 left-16 md:-top-1/4 md:left-[22.91%]'
        />

        <div className='w-full px-5 h-[60%] flex flex-col justify-start absolute top-[40%] left-0'>
            <div className='border-b border-gray-300 my-4 pb-4'>
                <h1 className='font-medium text-2xl md:text-3xl'>{data.person.name}</h1>
                <p className='text-xl md:text-2xl'>{data.person.occupation}</p>
            </div>

            <div className='flex justify-center items-center mt-3 md:mt-6'>
                <SocialLinks />
            </div>
        </div>
    </div>
  )
}

export default ProfileCard