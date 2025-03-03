import React, { useState } from 'react';
import SearchBar from '../components/searchBar';
import './css/project.css'; 
import ProjectList from "../components/projectList";

const Project = () => {
    const [filteredProjects, setFilteredProjects] = useState([]);

    const handleFilteredProjects = (filtered) => {
        setFilteredProjects(filtered);
    };

    return (
        <div className="project-container">
            <h1 class ="project-header">
                List of <span class="typing-effect">Projects</span>
            </h1>
            <br></br>
            <div className="search-container">
                <SearchBar onFilteredProjects={handleFilteredProjects} />
            </div>

            <br></br>
            <div className="columns">
                <div className="left-column">
                    <p>This is the left column, which takes up 1/3 of the page.</p>
                    <p>Content for left column here.</p>
                </div>
                <div className="right-column">
                    <div id="search-results" className="search-results">
                        <ProjectList filteredProjects={filteredProjects} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;
