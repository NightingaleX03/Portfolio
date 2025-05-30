import React from "react";
import ProjectCard from "./projectCard";

interface Project {
  title: string;
  tools: string[];
  links: {
    github?: string;
    devpost?: string;
    demo?: string;
  };
  photoCover?: string;
  role: string;
  description: string;
}

interface ProjectListProps {
  filteredProjects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ filteredProjects }) => {
  return (
    <div className="project-grid">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))
      ) : (
        <p className="no-projects">No matching projects found</p>
      )}
    </div>
  );
};

export default ProjectList; 