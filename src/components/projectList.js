import React from "react";
import ProjectCard from "./projectCard";

const ProjectList = ({ filteredProjects }) => {
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
