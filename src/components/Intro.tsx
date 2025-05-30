import React from 'react';
import './Intro.css';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { BsCodeSlash } from 'react-icons/bs';
import { DiJavascript1, DiReact, DiNodejs, DiMongodb, DiPython, DiJava } from 'react-icons/di';
import { SiTypescript, SiTailwindcss, SiExpress } from 'react-icons/si';
import myself from "../images/myself.jpg";

const Intro = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="intro-wrapper">
      <div className="hero-section">
        <div className="card-left">
          <h1 className="header-card">Hello World!</h1>
          <p className="paragraph-Text">
            👋 <i>How are you? </i><br />
            My name is <span>Sarah Mathew</span> and I hope you are doing well! <br /> <br />
            😮 <i> What am I doing right now? </i><br />
            Thank you for asking! I'm a recent graduate of Computer Programming at Seneca Polytechnic
            and a current student at Ontario Tech University studying Computer
            Science. <br />
            I'm a passionate software developer excited to venture into the world of tech learning
            about new technologies and creating innovative solutions. <br /> <br />
            <span>Fun Fact: </span>In my free time, I enjoy playing video games, stargazing, and volunteering.
          </p>
          <div className="social-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://leetcode.com/yourusername" target="_blank" rel="noopener noreferrer">
              <SiLeetcode />
            </a>
            <a href="mailto:your.email@example.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
        <div className="card-right">
          <img src={myself} alt="Profile" className="card-image" />
        </div>
      </div>

      <div className="skills-container">
        <h2 className="skills-header">Tech Stack</h2>
        <div className="skills-icons">
          <DiJavascript1 title="JavaScript" />
          <SiTypescript title="TypeScript" />
          <DiReact title="React" />
          <DiNodejs title="Node.js" />
          <SiExpress title="Express" />
          <DiMongodb title="MongoDB" />
          <SiTailwindcss title="Tailwind CSS" />
          <DiPython title="Python" />
          <DiJava title="Java" />
          <BsCodeSlash title="Algorithms" />
        </div>
      </div>
    </div>
  );
};

export default Intro; 