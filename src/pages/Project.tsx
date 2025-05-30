import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import ProjectCard from '../components/projectCard';
import data from '../projectsInfo.json';
import './css/project.css';

interface Project {
  title: string;
  description: string;
  tools: string[];
  type?: string[];
  links: {
    github?: string;
    devpost?: string;
    demo?: string;
    githubTwo?: string;
  };
  photoCover?: string;
  role: string;
}

interface ProjectsData {
  [key: string]: Project;
}

const Project: React.FC = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: boolean }>({});
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Ensure all projects have a type field
    const projectsWithTypes = data.map(project => ({
      ...project,
      type: project.type || [project.role] // Use role as type if type is missing
    }));
    setAllProjects(projectsWithTypes);
    setFilteredProjects(projectsWithTypes);
  }, []);

  // Unified filtering effect
  useEffect(() => {
    const selectedRoleKeys = Object.keys(selectedRoles).filter(role => selectedRoles[role]);

    const filtered = allProjects.filter(project => {
      const matchesQuery = project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        (project.tools || []).some(tool => tool.toLowerCase().includes(query.toLowerCase()));

      const matchesRole = selectedRoleKeys.length === 0 ||
        (project.type && project.type.some(type => selectedRoleKeys.includes(type)));

      return matchesQuery && matchesRole;
    });

    setFilteredProjects(filtered);
  }, [query, selectedRoles, allProjects]);

  // Toggle role selection
  const handleRoleClick = (role: string) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  const uniqueRoles = Array.from(
    new Set(allProjects.flatMap((project) => project.type || []))
  );

  return (
    <div className="project-section">
      <div className="search-container">
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      <div className="project-layout">
        <div className="filter-sidebar">
          <div className="filter-buttons">
            {uniqueRoles.map((role, index) => (
              <button
                key={index}
                className={`filter-button ${selectedRoles[role] ? 'active' : ''}`}
                onClick={() => handleRoleClick(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))
          ) : (
            <p className="no-projects">No projects match your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project; 