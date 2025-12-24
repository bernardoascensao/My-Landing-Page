import { useEffect, useState } from 'react';
import Icons from "../Models/icons"
import data from "../../data.json"

const ProjectCard = ({ name, description, url, languages = [] }) => {
  return (
    <a 
      href={url} 
      className="
        snap-center 
        flex-shrink-0 
        shadow-md rounded-lg p-5 m-4 w-64 h-65 border-blue-400 border-2 
        font-lexend text-slate-700 hover:bg-slate-200 flex flex-col overflow-hidden
      " 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <h3 className="text-lg font-bold mb-2 break-words line-clamp-1" title={name}>
        {name}
      </h3>

      <div className="flex space-x-2 py-3 border-t-[1px] border-blue-400 min-h-[50px]">
        {languages.map((lang, idx) => (
          <span key={idx} title={lang}>
            {Icons[lang] || <span className="text-xs">{lang}</span>}
          </span>
        ))}
      </div>

      <p className="mt-2 text-sm text-slate-600 line-clamp-4 overflow-hidden">
        {description || "No description available."}
      </p>

      <div className="mt-auto pt-4">
        <span className="text-blue-500 text-xs font-bold">
          View on GitHub →
        </span>
      </div>
    </a>
  );
};


const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
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
      
      mb-32
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
