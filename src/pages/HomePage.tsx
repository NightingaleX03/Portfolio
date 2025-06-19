import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Intro from "../components/Intro";
import Footer from "../components/footer";
import KeyProjects from "../components/keyProjects";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    // Refs for sections
    const introRef = useRef<HTMLDivElement>(null);
    const buttonRowRef = useRef<HTMLDivElement>(null);
    const keyProjectsRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sections = [introRef, buttonRowRef, keyProjectsRef];
        sections.forEach(ref => {
            if (ref.current) {
                gsap.fromTo(
                    ref.current,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ref.current,
                            start: "top 85%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            }
        });
    }, []);

    const handleButtonClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <div ref={introRef}><Intro /></div>
            <div className="button-row" ref={buttonRowRef}>
                <button className="custom-button" onClick={() => handleButtonClick("/projects")}>View All Projects</button>
                <button className="custom-button" onClick={() => handleButtonClick("/about")}>My Journey</button>
                <button className="custom-button" onClick={() => handleButtonClick("/contact")}>Contact Me</button>
            </div>
            <div className="key-projects-section" ref={keyProjectsRef}>
                <h2 className="key-projects-title">Key Projects</h2>
                <p className="key-projects-description">Here are some of my notable projects that showcase my skills and experience.</p>
                <KeyProjects />
            </div>
            <div ref={footerRef}><Footer /></div>
        </div>
    );
};

export default HomePage; 