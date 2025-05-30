import React from "react";
import "./projectCard.css";

interface ProjectLinks {
  github?: string;
  devpost?: string;
  demo?: string;
  githubTwo?: string;
}

interface Project {
  title: string;
  tools: string[];
  links: ProjectLinks;
  photoCover?: string;
  role: string;
  description: string;
  type?: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, tools, links, photoCover, role, description } = project;

  return (
    <div className="project-card">
      <div className="project-content">
        <div className="project-image">
          <img src={project.photoCover} alt={project.title} />
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-role">{project.role}</p>
        <p className="project-description">{project.description}</p>
        <div className="project-tools">
          {project.tools.map((tool, index) => (
            <span key={index} className="tool">
              {tool}
            </span>
          ))}
        </div>
        <div className="project-links">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <img src={require("./../images/github.png")} alt="GitHub" />
            </a>
          )}
          {project.links.githubTwo && (
            <a href={project.links.githubTwo} target="_blank" rel="noopener noreferrer">
              <img src={require("./../images/github.png")} alt="GitHub" />
            </a>
          )}
          {project.links.devpost && (
            <a href={project.links.devpost} target="_blank" rel="noopener noreferrer">
              <img src={require("./../images/link.png")} alt="Devpost" />
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
              <img src={require("./../images/link.png")} alt="Demo" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 