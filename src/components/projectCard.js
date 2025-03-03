import React from "react";
import { Github, Link, Globe } from "lucide-react"; // Import icons

const ProjectCard = ({ project }) => {
  const { title, tools, links, photoCover } = project;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 text-center">{title}</h2>
      
      {/* Project Image */}
      <div className="flex justify-center my-2">
        {photoCover ? (
          <img src={photoCover} alt={title} className="w-full h-40 object-cover rounded-md" />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      {/* Tools */}
      <div className="flex flex-wrap gap-2 my-2">
        {tools.map((tool, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">{tool}</span>
        ))}
      </div>

      {/* Links */}
      <div className="flex justify-center gap-4 mt-3">
        {links.github && (
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 text-gray-600 hover:text-black" />
          </a>
        )}
        {links.devpost && (
          <a href={links.devpost} target="_blank" rel="noopener noreferrer">
            <Link className="w-5 h-5 text-gray-600 hover:text-black" />
          </a>
        )}
        {links.demo && (
          <a href={links.demo} target="_blank" rel="noopener noreferrer">
            <Globe className="w-5 h-5 text-gray-600 hover:text-black" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
