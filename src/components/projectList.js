import React, { useState, useEffect } from "react";
import ProjectCard from "./projectCard";

const ProjectList = ({ filteredProjects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project, index) => <ProjectCard key={index} project={project} />)
      ) : (
        <p className="col-span-3 text-center text-gray-500">No matching projects found</p>
      )}
    </div>
  );
};

export default ProjectList;
