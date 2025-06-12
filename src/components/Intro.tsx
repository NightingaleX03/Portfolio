import React from 'react';
import './Intro.css';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaJava, FaPython, FaNodeJs, FaHtml5, FaCss3Alt, FaReact, FaAngular, FaVuejs, FaAndroid, FaGitAlt, FaDatabase, FaChartBar, FaWindows } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiC, SiCplusplus, SiSpringboot, SiNextdotjs, SiOracle, SiFlask, SiJavascript } from 'react-icons/si';
import { BsCodeSlash } from 'react-icons/bs';
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
        </div>
        <div className="card-right">
          <img src={myself} alt="Profile" className="card-image" />
        </div>
      </div>

      <div className="social-links">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://leetcode.com/yourusername" target="_blank" rel="noopener noreferrer">
          {/* Leetcode icon can be added here if desired */}
        </a>
        <a href="mailto:your.email@example.com">
          <FaEnvelope />
        </a>
      </div>

      <div className="skills-container">
        <h2 className="skills-header">Tech Stack</h2>
        <div className="skills-icons">
          <div className="skills-icon-wrapper">
            <SiJavascript title="JavaScript" color="#f7df1e" />
            <span className="skills-icon-tooltip">JavaScript</span>
          </div>
          <div className="skills-icon-wrapper">
            <SiTypescript title="TypeScript" color="#3178c6" />
            <span className="skills-icon-tooltip">TypeScript</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaReact title="React" color="#61dafb" />
            <span className="skills-icon-tooltip">React</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaAngular title="Angular" color="#dd0031" />
            <span className="skills-icon-tooltip">Angular</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaNodeJs title="Node.js" color="#3c873a" />
            <span className="skills-icon-tooltip">Node.js</span>
          </div>
          <div className="skills-icon-wrapper">
            <SiExpress title="Express" color="#000" />
            <span className="skills-icon-tooltip">Express</span>
          </div>
          <div className="skills-icon-wrapper">
            <SiMongodb title="MongoDB" color="#47a248" />
            <span className="skills-icon-tooltip">MongoDB</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaPython title="Python" color="#3776ab" />
            <span className="skills-icon-tooltip">Python</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaJava title="Java" color="#007396" />
            <span className="skills-icon-tooltip">Java</span>
          </div>
          <div className="skills-icon-wrapper">
            <SiC title="C" color="#00599c" />
            <span className="skills-icon-tooltip">C</span>
          </div>
          <div className="skills-icon-wrapper">
            <SiCplusplus title="C++" color="#00599c" />
            <span className="skills-icon-tooltip">C++</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaHtml5 title="HTML5" color="#e34f26" />
            <span className="skills-icon-tooltip">HTML5</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaCss3Alt title="CSS3" color="#1572b6" />
            <span className="skills-icon-tooltip">CSS3</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaAndroid title="Android Studio" color="#3ddc84" />
            <span className="skills-icon-tooltip">Android Studio</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaWindows title="Visual Studio" color="#5c2d91" />
            <span className="skills-icon-tooltip">Visual Studio</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaChartBar title="Matplotlib" color="#11557c" />
            <span className="skills-icon-tooltip">Matplotlib</span>
          </div>
          <div className="skills-icon-wrapper">
            <SiSpringboot title="Spring Boot" color="#6db33f" />
            <span className="skills-icon-tooltip">Spring Boot</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaVuejs title="Vue.js" color="#42b883" />
            <span className="skills-icon-tooltip">Vue.js</span>
          </div>
          <div className="skills-icon-wrapper">
            <SiNextdotjs title="Next.js" color="#000" />
            <span className="skills-icon-tooltip">Next.js</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaGithub title="GitHub" color="#181717" />
            <span className="skills-icon-tooltip">GitHub</span>
          </div>
          <div className="skills-icon-wrapper">
            <FaDatabase title="SQL" color="#003b57" />
            <span className="skills-icon-tooltip">SQL</span>
          </div>
          <div className="skills-icon-wrapper">
            <SiOracle title="Oracle" color="#f80000" />
            <span className="skills-icon-tooltip">Oracle</span>
          </div>
          <div className="skills-icon-wrapper">
            <SiFlask title="Flask" color="#000" />
            <span className="skills-icon-tooltip">Flask</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro; 