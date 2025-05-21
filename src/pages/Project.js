import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import './css/project.css'; 
import ProjectList from "../components/projectList";

const Project = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState(allProjects);
    const [selectedRoles, setSelectedRoles] = useState({
        'Back-end Developer': false,
        'Project Manager': false,
        'Full Stack Developer': false,
        'Web Developer': false,
        'Front-end Developer': false,
    });

    useEffect(() => {
        const fetchData = async () => {
            const projectsData = [
                { title: "Project A", type: "Back-end Developer" },
                { title: "Project B", type: "Project Manager" },
                { title: "Project C", type: "Full Stack Developer" },
                { title: "Project D", type: "Web Developer" },
                { title: "Project E", type: "Front-end Developer" },
            ];
            setAllProjects(projectsData);
        };

        fetchData();
    }, []);

    const handleRoleChange = (e) => {
        const { name, checked } = e.target;
        setSelectedRoles(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    useEffect(() => {
        const selectedRoleKeys = Object.keys(selectedRoles).filter(role => selectedRoles[role]);

        const filteredData = allProjects.filter(project => selectedRoleKeys.includes(project.role));

        setFilteredProjects(filteredData);
    }, [selectedRoles, allProjects]);

    return (
        <div className="project-container">
            <h1 className="project-header">
                List of <span className="typing-effect">Projects</span>
            </h1>
            <br />
            <div className="search-container">
                <SearchBar onFilteredProjects={setFilteredProjects} />
            </div>

            <br />
            <div className="columns">
            <br></br>
                <div className="left-column">
                    <br></br>
                    <h3>Filters</h3>
                    <br></br>

                    {/* Role Filters (Checkboxes) */}
                    <div className="filter-option">
                        <label>
                            <input
                                type="checkbox"
                                name="Back-end Developer"
                                checked={selectedRoles['Back-end Developer']}
                                onChange={handleRoleChange}
                            />
                            &emsp;Back-end Developer
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                name="Project Manager"
                                checked={selectedRoles['Project Manager']}
                                onChange={handleRoleChange}
                            />
                            &emsp;Project Manager
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                name="Full Stack Developer"
                                checked={selectedRoles['Full Stack Developer']}
                                onChange={handleRoleChange}
                            />
                            &emsp;Full Stack Developer
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                name="Web Developer"
                                checked={selectedRoles['Web Developer']}
                                onChange={handleRoleChange}
                            />
                            &emsp;Web Developer
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                name="Front-end Developer"
                                checked={selectedRoles['Front-end Developer']}
                                onChange={handleRoleChange}
                            />
                            &emsp;Front-end Developer
                        </label>
                    </div>
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
