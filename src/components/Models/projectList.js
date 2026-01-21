import { useEffect, useState, useRef } from 'react';
import Icons from "../Models/icons"
import data from "../../data.json"
import fakeProjects from '../../fakeProjects.json';

const ProjectCard = ({ name, description, url, languages = [] }) => {
  return (
    <a 
      href={url} 
      target="_blank"
      rel="noopener noreferrer"
      className="
        snap-center 
        flex-shrink-0
        flex flex-col

        w-56 md:w-64
        min-h-40 md:min-h-56

        p-4 md:p-5
        m-3

        border-2 border-blue-400
        rounded-lg
        shadow-md
        font-lexend
        text-white
        hover:bg-slate-700
      "
    >
      {/* Title */}
      <h3
        className="
          font-bold
          text-base md:text-lg
          mb-2
          break-words
          line-clamp-1
        "
        title={name}
      >
        {name}
      </h3>

      {/* Languages */}
      <div className="
        flex space-x-2
        py-2
        border-t border-blue-400
        min-h-[44px]
      ">
        {languages.map((lang, idx) => (
          <span key={idx} title={lang}>
            {Icons[lang] || (
              <span className="text-[10px] md:text-xs">{lang}</span>
            )}
          </span>
        ))}
      </div>

      {/* Description */}
      <p
        className="
          mt-2
          text-xs md:text-sm
          text-white
          line-clamp-3 md:line-clamp-4
        "
      >
        {description || "No description available."}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-3">
        <span className="text-blue-500 text-[11px] md:text-xs font-bold">
          View on GitHub →
        </span>
      </div>
    </a>
  );
};


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null); // Ref to control the scroll element

  // Function to scroll the carousel
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll exactly the visible size of the container
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const username = data.person.socials.find((it) => it.name === "github")?.username;
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(async (repos) => {
          const projectData = await Promise.all(repos.map(async (repo) => {
            const languagesResponse = await fetch(repo.languages_url);
            const languagesData = await languagesResponse.json();
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description,
              url: repo.html_url,
              languages: Object.keys(languagesData),
            };
          }));
          setProjects(projectData.filter(p => p.languages.length > 0));
        })
        .catch(error => console.error('Error:', error));
      return;
    }
    setProjects(fakeProjects);    
  }, []);

  return (
    <div className="relative w-full group">
      {/* Left Button (Only appears if there are many projects and on desktop) */}
      {projects.length > 3 && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-blue-500/20 hover:bg-blue-500/50 p-2 rounded-full hidden md:block backdrop-blur-sm transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="
          w-full 
          flex 
          overflow-x-auto 
          snap-x 
          snap-mandatory 
          gap-2
          px-6
          scrollbar-hide
          [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
          md:[mask-image:none]
          /* Desktop: We keep horizontal scroll but hide the bar to use the buttons */
          md:overflow-x-hidden 
        "
      >
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.description}
            url={project.url}
            languages={project.languages}
          />
        ))}
      </div>

      {/* Right Button */}
      {projects.length > 3 && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-blue-500/20 hover:bg-blue-500/50 p-2 rounded-full hidden md:block backdrop-blur-sm transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}

      {/* Visual indicator for Mobile (Optional) */}
      <div className="text-center mt-4 md:hidden text-blue-400 text-xs animate-pulse">
        Swipe to see more →
      </div>
    </div>
  );
};

export default ProjectList;
