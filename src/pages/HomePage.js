import React from 'react';
import Intro from "../components/Intro";
import "./css/home.css";
import Footer from "../components/footer";
import KeyProjects from "../components/keyProjects";

const HomePage = () => {
    return (
        <div>
            <Intro />
            <div className="button-row">
                <button className="custom-button">
                    Project
                </button>
                <button className="custom-button">
                    CSCI 1063
                </button>
                <button className="custom-button">
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
