import React from "react";
import { useNavigate } from "react-router-dom";
import Intro from "../components/Intro";
import Footer from "../components/footer";
import KeyProjects from "../components/keyProjects";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <Intro />
            <div className="button-row">
                <button className="custom-button" onClick={() => handleButtonClick("/projects")}>
                    View All Projects
                </button>
                <button className="custom-button" onClick={() => handleButtonClick("/about")}>
                    My Journey
                </button>
                <button className="custom-button" onClick={() => handleButtonClick("/contact")}>
                    Contact Me
                </button>
            </div>
            <div className="key-projects-section">
                <h2>Key Projects</h2>
                <p>Here are some of my notable projects that showcase my skills and experience.</p>
                <KeyProjects />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage; 