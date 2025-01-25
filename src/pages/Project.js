import React from 'react';
import SearchBar from '../components/searchBar';
import './css/project.css';  // Assuming styles are in this CSS file

const Project = () => {
    return (
        <div className="project-container">
            <h1>Welcome to My Website!</h1>
            <div className="columns">
                <div className="left-column">
                    <p>This is the left column, which takes up 1/3 of the page.</p>
                    <p>Content for left column here.</p>
                </div>
                <div className="right-column">
                    {/* Place SearchBar here */}
                    <SearchBar />
                    <p>This is the right column, which takes up 2/3 of the page.</p>
                    <p>Content for the right column here.</p>
                </div>
            </div>
        </div>
    );
};

export default Project;
