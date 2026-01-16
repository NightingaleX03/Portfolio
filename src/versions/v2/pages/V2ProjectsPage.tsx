import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../../../projectsInfo.json';
import './V2ProjectsPage.css';

// Project images
import portfolio from '../../../projectsImages/portfolio.png';
import rentEase from '../../../projectsImages/rentEase.png';
import noteEase from '../../../projectsImages/noteEase.png';
import nomore404 from '../../../projectsImages/nomore404.png';
import sakurasound from '../../../projectsImages/sakurasound.png';
import syntaxsisters from '../../../projectsImages/syntaxsisters.png';
import CareMate from '../../../projectsImages/CareMate.png';
import EcoGrocer from '../../../projectsImages/EcoGrocer.png';
import focusflow from '../../../projectsImages/focusflow.png';
import mealer from '../../../projectsImages/mealer.png';
import sudoku from '../../../projectsImages/3sudoku-shuffle.png';
import startupConnect from '../../../projectsImages/startupConnect.png';

gsap.registerPlugin(ScrollTrigger);

const imageMap: { [key: string]: string } = {
  'portfolio.png': portfolio,
  'rentEase.png': rentEase,
  'noteEase.png': noteEase,
  'nomore404.png': nomore404,
  'sakurasound.png': sakurasound,
  'syntaxsisters.png': syntaxsisters,
  'CareMate.png': CareMate,
  'EcoGrocer.png': EcoGrocer,
  'focusflow.png': focusflow,
  'mealer.png': mealer,
  '3sudoku-shuffle.png': sudoku,
  'startupConnect.png': startupConnect,
};

interface Project {
  title: string;
  description: string;
  tools: string[];
  links: {
    github?: string;
    devpost?: string;
    demo?: string;
    githubTwo?: string;
  };
  photoCover?: string;
  role: string;
}

const V2ProjectsPage: React.FC = () => {
  const [projects] = useState<Project[]>(projectsData as Project[]);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate project cards on scroll
    if (projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.v2-project-card');
      projectCards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
          }
        );
      });
    }

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects]);

  return (
    <div className="v2-projects-page">
      <div className="v2-projects-hero">
        <div className="v2-container">
          <h1 className="v2-projects-title">Projects</h1>
          <p className="v2-projects-subtitle">
            A showcase of my work, spanning various roles and technologies
          </p>
        </div>
      </div>
      <div className="v2-container">
        <div ref={projectsRef} className="v2-projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="v2-project-card">
              {project.photoCover && imageMap[project.photoCover] && (
                <div className="v2-project-image">
                  <img 
                    src={imageMap[project.photoCover]} 
                    alt={project.title}
                  />
                </div>
              )}
              <div className="v2-project-content">
                <h3 className="v2-project-title">{project.title}</h3>
                <p className="v2-project-role">{project.role}</p>
                <p className="v2-project-description">{project.description}</p>
                <div className="v2-project-tools">
                  {project.tools.slice(0, 5).map((tool, idx) => (
                    <span key={idx} className="v2-project-tool">{tool}</span>
                  ))}
                </div>
                <div className="v2-project-links">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="v2-project-link">
                      GitHub
                    </a>
                  )}
                  {project.links.devpost && (
                    <a href={project.links.devpost} target="_blank" rel="noopener noreferrer" className="v2-project-link">
                      DevPost
                    </a>
                  )}
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="v2-project-link">
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default V2ProjectsPage;

