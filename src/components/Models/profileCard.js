import { FaGithub, FaLinkedin, FaEnvelope, FaPaperclip } from 'react-icons/fa';
import profile_img from '../../assets/images/profile_picture.jpg';
import cv from '../../assets/documents/CV_Bernardo_Ascensao_PT.pdf'
import data from "../../data.json";


const SocialLinks = () => {
  const username = data.person.socials.filter((it) => it.name === "github")[0]?.username;
  const email = data.person.socials.filter((it) => it.name === "email")[0]?.email;
  return (
    <div className='flex justify-center gap-8'>
      <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
        <FaGithub className="h-8 w-8 md:h-10 md:w-10 text-blue-400 hover:text-blue-600 transition-colors duration-300" />
      </a>
      <a href="https://www.linkedin.com/in/bernardo-ascens%C3%A3o-4792a1331/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="h-8 w-8 md:h-10 md:w-10 text-blue-400 hover:text-blue-600 transition-colors duration-300" />
      </a>
      <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
        <FaEnvelope className="h-8 w-8 md:h-10 md:w-10 text-blue-400 hover:text-blue-600 transition-colors duration-300" />
      </a>
      <a href={cv} target="_blank" rel="noopener noreferrer">
        <FaPaperclip className="h-8 w-8 md:h-10 md:w-10 text-blue-400 hover:text-blue-600 transition-colors duration-300" />
      </a>
    </div>
  );
}

const ProfileCard = () => {
  return (
    <div className="relative flex justify-center">
      {/* Glow */}
      <div className="absolute -inset-3 rounded-xl bg-blue-500/25 blur-2xl" />

      {/* Card */}
      <div
        className="
          relative
          bg-neutral-900
          rounded-lg
          shadow-lg

          w-70 h-72
          flex flex-col items-center justify-center gap-4

          md:w-[520px] md:h-64
          md:flex-row
          md:items-center
          md:justify-center
          md:gap-8
          px-6
        "
      >
        {/* Profile Image */}
        <img
          src={profile_img}
          alt="Profile"
          className="
            w-28 h-28
            md:w-36 md:h-36
            rounded-full
            shadow-xl
          "
        />

        {/* Text + Socials */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="border-b border-gray-300 pb-3 mb-3 w-full">
            <h1 className="font-medium text-2xl">
              {data.person.name}
            </h1>
            <p className="text-lg text-gray-300">
              {data.person.occupation}
            </p>
          </div>

          <SocialLinks />
        </div>
      </div>
    </div>
  );
};


export default ProfileCard