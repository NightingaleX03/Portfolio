import React from "react";
import "./projectCard.css";

import portfolio from '../projectsImages/portfolio.png';
import rentEase from '../projectsImages/rentEase.png';
import noteEase from '../projectsImages/noteEase.png';
import nomore404 from '../projectsImages/nomore404.png';
import sakurasound from '../projectsImages/sakurasound.png';
import syntaxsisters from '../projectsImages/syntaxsisters.png';
import CareMate from '../projectsImages/CareMate.png';
import EcoGrocer from '../projectsImages/EcoGrocer.png';
import focusflow from '../projectsImages/focusflow.png';
import mealer from '../projectsImages/mealer.png';
import sudoku from '../projectsImages/3sudoku-shuffle.png';
import startupConnect from '../projectsImages/startupConnect.png';

const imageMap: { [key: string]: string } = {
  'portfolio.png': portfolio,
  'rentEase.png': rentEase,
  'noteEase.png': noteEase,
  'nomore404.png': nomore404,
  'sakurasound.png': sakurasound,
  'syntaxsisters.png': syntaxsisters,
  'CareMate.png': CareMate,
  'EcoGrocer.png': EcoGrocer,
  'focusflow.png': focusflow,
  'mealer.png': mealer,
  '3sudoku-shuffle.png': sudoku,
  'startupConnect.png': startupConnect,
};

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
          <img src={photoCover ? imageMap[photoCover] : undefined} alt={title} />
        </div>
        <h3 className="project-title">{title}</h3>
        <p className="project-role">{role}</p>
        <p className="project-description">{description}</p>
        <div className="project-tools">
          {tools.map((tool, index) => (
            <span key={index} className="tool">
              {tool}
            </span>
          ))}
        </div>
        <div className="project-links">
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              <img src={require("./../images/github.png")} alt="GitHub" />
            </a>
          )}
          {links.githubTwo && (
            <a href={links.githubTwo} target="_blank" rel="noopener noreferrer">
              <img src={require("./../images/github.png")} alt="GitHub" />
            </a>
          )}
          {links.devpost && (
            <a href={links.devpost} target="_blank" rel="noopener noreferrer">
              <img src={require("./../images/link.png")} alt="Devpost" />
            </a>
          )}
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer">
              <img src={require("./../images/link.png")} alt="Demo" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 