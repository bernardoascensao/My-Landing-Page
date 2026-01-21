import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const username = data.person.socials.filter((it) => it.name === "github")[0]?.username;
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(async (repos) => {
          const projectData = await Promise.all(repos.map(async (repo) => {
            const languagesResponse = await fetch(repo.languages_url);
            const languagesData = await languagesResponse.json();
            const languages = Object.keys(languagesData);
            
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description,
              url: repo.html_url,
              languages,
            };
          }));
          
          setProjects(projectData);
        })
        .catch(error => console.error('Error fetching data from GitHub:', error));
      return;
    }
    setProjects(fakeProjects);    
  }, []);

  return (
    <div className="
      w-full 
      flex 
      /* Mobile: Horizontal scroll, mandatory snap, and side padding with gradient mask */
      overflow-x-auto 
      snap-x 
      snap-mandatory 
      gap-2
      px-6
      [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
      
      /* Desktop: Back to normal (wrap, with no horizontal scroll, centered) */
      md:flex-wrap 
      md:justify-center 
      md:overflow-visible 
      md:px-0
      md:[mask-image:none]
    ">
      {projects.map(project => (
        project.languages.length !== 0 && (
          <ProjectCard
            key={project.id}
            name={project.name}
            description={project.description}
            url={project.url}
            languages={project.languages}
          />
        )
      ))}
    </div>
  );
};

export default ProjectList;
