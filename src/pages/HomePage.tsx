import React from 'react';
import { useNavigate } from 'react-router-dom';
import Intro from "../components/Intro";
import "./css/home.css";
import Footer from "../components/footer";
import KeyProjects from "../components/keyProjects";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = (action: string): void => {
        switch(action) {
            case 'project':
                navigate('/projects');
                break;
            case 'csci':
                navigate('/csci');
                break;
            case 'contact':
                navigate('/contact');
                break;
            default:
                break;
        }
    };

    return (
        <div className="home-container">
            <Intro />
            <div className="button-row">
                <button 
                    className="custom-button"
                    onClick={() => handleButtonClick('project')}
                >
                    Project
                </button>
                <button 
                    className="custom-button"
                    onClick={() => handleButtonClick('csci')}
                >
                    CSCI 1063
                </button>
                <button 
                    className="custom-button"
                    onClick={() => handleButtonClick('contact')}
                >
                    Contact Me
                </button>
            </div>

            <section className="key-projects-section">
                <KeyProjects />
            </section>

            <Footer />
        </div>
    );
};

export default HomePage; 