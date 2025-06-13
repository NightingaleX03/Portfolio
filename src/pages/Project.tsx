import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import ProjectCard from '../components/projectCard';
import data from '../projectsInfo.json';
import './css/project.css';
import Footer from '../components/footer';

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
  date?: string;
}

interface ProjectsData {
  [key: string]: Project;
}

const Project: React.FC = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: boolean }>({});
  const [selectedTech, setSelectedTech] = useState<{ [key: string]: boolean }>({});
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'oldest' | 'newest'>('newest');

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
    const selectedTechKeys = Object.keys(selectedTech).filter(tech => selectedTech[tech]);

    let filtered = allProjects.filter(project => {
      const matchesQuery = project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        (project.tools || []).some(tool => tool.toLowerCase().includes(query.toLowerCase()));

      const matchesRole = selectedRoleKeys.length === 0 ||
        (project.type && project.type.some(type => selectedRoleKeys.includes(type)));

      const matchesTech = selectedTechKeys.length === 0 ||
        (project.tools && project.tools.some(tool => selectedTechKeys.includes(tool)));

      return matchesQuery && matchesRole && matchesTech;
    });

    // Sort by date if available
    filtered = filtered.slice().sort((a, b) => {
      if (!a.date || !b.date) return 0;
      if (sortOrder === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    setFilteredProjects(filtered);
  }, [query, selectedRoles, selectedTech, allProjects, sortOrder]);

  // Toggle role selection
  const handleRoleClick = (role: string) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  // Toggle tech selection
  const handleTechClick = (tech: string) => {
    setSelectedTech((prev) => ({
      ...prev,
      [tech]: !prev[tech],
    }));
  };

  // Handle sort order change
  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'oldest' ? 'newest' : 'oldest'));
  };

  const uniqueRoles = Array.from(
    new Set(allProjects.flatMap((project) => project.type || []))
  );
  const techStackList = [
    'React', 'python', 'GenAI', 'TensorFlow', 'Google Cloud', 'MongoDB', 'Express', 'Google Gemini', 'Streamlit',
    'Cohere AI', 'Flet', 'Flask API', 'Firebase'
  ];
  const uniqueTech = techStackList;

  return (
    <div className="project-section">
      <div className="bubble-bg"></div>
      <div className="project-header">
        <h1 className="project-page-title">Projects</h1>
        <p className="project-page-description">A showcase of my work, spanning various roles and technologies. <br />
          <span style={{fontStyle: 'italic', color: '#aaa', opacity: 0.7}}>Browse by role, tech stack, or date.</span>
        </p>
      </div>
      <div className="search-sort-row">
        <div className="search-bar-center">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
      </div>
      <div className="project-layout">
        <div className="filter-sidebar">
          <div className="filter-section">
            <h3 className="filter-heading">Roles</h3>
            <div className="filter-checkboxes filter-checkboxes-vertical">
              {uniqueRoles.map((role, index) => (
                <label key={index} className="filter-checkbox-label filter-checkbox-label-vertical">
                  <input
                    type="checkbox"
                    checked={!!selectedRoles[role]}
                    onChange={() => handleRoleClick(role)}
                  />
                  <span>{role}</span>
                </label>
              ))}
            </div>
          </div>
          <div style={{marginBottom: '2rem'}}></div>
          <div className="filter-section">
            <h3 className="filter-heading">Tech Stack</h3>
            <div className="filter-checkboxes filter-checkboxes-grid-2col">
              {uniqueTech.map((tech, index) => (
                <label key={index} className="filter-checkbox-label filter-checkbox-label-grid">
                  <input
                    type="checkbox"
                    checked={!!selectedTech[tech]}
                    onChange={() => handleTechClick(tech)}
                  />
                  <span>{tech}</span>
                </label>
              ))}
            </div>
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
      <Footer />
    </div>
  );
};

export default Project; 