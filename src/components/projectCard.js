import React from "react";
import { Github, Link, Globe } from "lucide-react"; // Import icons
import "./projectCard.css"; // Import CSS file

const ProjectCard = ({ project }) => {
  const { title, tools, links, photoCover, role, description } = project;

  return (
    <div className="project-card">
      {/* Title */}
      <h2 className="project-title">{title}</h2>
      
      {/* Project Image */}
      <div className="project-image">
        {photoCover ? (
          <img src={photoCover} alt={title} className="image" />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      {/* Role */}
      <p className="project-role"><strong>Role:</strong> {role}</p>

      {/* Description */}
      <p className="project-description">{description}</p>

      {/* Tools */}
      <div className="project-tools">
        {tools.map((tool, index) => (
          <span key={index} className="tool">{tool}</span>
        ))}
      </div>

      {/* Links */}
      <div className="project-links">
        {links.github && (
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            <Github className="icon" />
          </a>
        )}
        {links.devpost && (
          <a href={links.devpost} target="_blank" rel="noopener noreferrer">
            <Link className="icon" />
          </a>
        )}
        {links.demo && (
          <a href={links.demo} target="_blank" rel="noopener noreferrer">
            <Globe className="icon" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
