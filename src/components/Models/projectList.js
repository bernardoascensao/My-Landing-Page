import React, { useEffect, useState } from 'react';
import Icons from "../Models/icons"
import data from "../../data.json"


const ProjectCard = ({ name, description, url, languages = [] }) => {
  return (
    <a href={url} className="shadow-md rounded-lg p-5 m-4 w-64 border-blue-400 border-2 font-lexend text-slate-700 hover:bg-slate-200" target="_blank" rel="noopener noreferrer">
      <h3 className="text-lg font-bold mb-2 break-words ">{name}</h3>
      <div className="flex space-x-2 py-3 border-t-[1px] border-blue-400">
        {languages.map((lang, idx) => (
          <span key={idx} title={lang}>
            {Icons[lang] || <span className="text-sm">{lang}</span>}
          </span>
        ))}
      </div>
      <p className="mb-3">{description || "No description available."}</p>
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
        console.log(repos)
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
    <div className="w-full min-h-36 flex flex-wrap justify-center mb-32">
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
