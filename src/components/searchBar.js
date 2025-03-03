import React, { useState, useEffect } from 'react';
import './searchBar.css';
import samwise from "../images/samwise2.0.png";

const SearchBar = ({ onFilteredProjects }) => {
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Load project titles from a JSON file
  useEffect(() => {
    fetch('/projectsInfo.json')  // Make sure this file is accessible in the public/ directory
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error loading projects:', error));
  }, []);

  // Filter projects based on query
  useEffect(() => {
    const results = projects.filter(project =>
      project.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(results);

    // Pass filtered projects to parent component (Project.js)
    onFilteredProjects(results);
  }, [query, projects, onFilteredProjects]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        value={query}
        onChange={handleChange}
        placeholder="Search projects..."
      />
      <div className="images-container">
        <img src={samwise} alt="samwise version 1.0" className="image" />
        <img src={samwise} alt="samwise version 2.0" className="image" />
        <img src={samwise} alt="samwise version 3" className="image" />
      </div>
      

    </div>
  );
};

export default SearchBar;
