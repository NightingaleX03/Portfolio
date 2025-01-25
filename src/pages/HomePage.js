import React from 'react';
import Intro from "../components/Intro";
import "./css/home.css";
import samwise from "../images/samwise2.0.png";

const HomePage = () => {
    return (
        <div>
            <Intro />
            <br></br>
            <br></br>
            <div className="button-row">
                <button className="custom-button">
                    <img src={samwise} alt="corner" className="corner-image2" />
                    Project
                </button>
                <button className="custom-button">
                    <img src={samwise} alt="corner" className="corner-image2" />
                    Blog Page
                </button>
                <button className="custom-button">
                    <img src={samwise} alt="corner" className="corner-image2" />
                    Contact Me
                </button>
            </div>
        </div>
    );
};

export default HomePage;
