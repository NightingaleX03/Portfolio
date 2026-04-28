import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import myself from '../../../images/myself.jpg';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode, SiDevpost } from 'react-icons/si';
import ParticleCube from '../components/ParticleCube';
import './V2HomePage.css';

gsap.registerPlugin(ScrollTrigger);

const V2HomePage: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero section on page load
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }

    // Animate sections on scroll
    const sections = [
      { ref: introRef, delay: 0 },
      { ref: skillsRef, delay: 0.1 },
      { ref: ctaRef, delay: 0.2 }
    ];

    sections.forEach(({ ref, delay }) => {
      if (ref.current) {
        gsap.fromTo(ref.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay
          }
        );
      }
    });

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="v2-home-page">
      {/* Main hero section with introduction */}
      <section ref={heroRef} className="v2-hero">
        <div className="v2-hero-content">
          <div className="v2-hero-text">
            <h1 className="v2-hero-title">
              <span className="v2-hero-greeting">Hello, I'm</span>
              <span className="v2-hero-name">Sarah Mathew</span>
            </h1>
            <p className="v2-hero-subtitle">
              Software Developer & Computer Science Student
            </p>
            <p className="v2-hero-description">
              Passionate about creating innovative solutions and exploring new technologies.
              Currently studying Computer Science at Ontario Tech University.
            </p>
            <div className="v2-hero-buttons">
              <button 
                className="v2-btn v2-btn-primary"
                onClick={() => navigate('/commit/v2/projects')}
              >
                View Projects
              </button>
              <button 
                className="v2-btn v2-btn-secondary"
                onClick={() => navigate('/commit/v2/journey')}
              >
                My Journey
              </button>
            </div>
            <div className="v2-hero-social">
              <a href="https://github.com/NightingaleX03" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/sarah-mathew-0a4a06204/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://leetcode.com/u/nightingaleX_03/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                <SiLeetcode />
              </a>
              <a href="mailto:smthayil03@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
              <a href="https://devpost.com/NightingaleX03" target="_blank" rel="noopener noreferrer" aria-label="DevPost">
                <SiDevpost />
              </a>
            </div>
          </div>
          <div className="v2-hero-image">
            <div className="v2-image-wrapper">
              <img src={myself} alt="Sarah Mathew" />
              <div className="v2-image-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Particle Cube Section */}
      <ParticleCube />

      {/* About me section */}
      <section ref={introRef} className="v2-intro">
        <div className="v2-container">
          <h2 className="v2-section-title">About Me</h2>
          <div className="v2-intro-content">
            <p className="v2-intro-text">
              I'm a recent graduate of Computer Programming at Seneca Polytechnic and a current student 
              at Ontario Tech University studying Computer Science. I'm passionate about software development 
              and excited to venture into the world of tech, learning about new technologies and creating 
              innovative solutions.
            </p>
            <p className="v2-intro-text">
              <strong>Fun Fact:</strong> In my free time, I enjoy playing video games, stargazing, and volunteering.
            </p>
          </div>
        </div>
      </section>

      {/* Tech stack showcase */}
      <section ref={skillsRef} className="v2-skills">
        <div className="v2-container">
          <h2 className="v2-section-title">Tech Stack</h2>
          <div className="v2-skills-grid">
            {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'MongoDB', 'TensorFlow'].map((skill, idx) => (
              <div key={idx} className="v2-skill-card">
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section ref={ctaRef} className="v2-cta">
        <div className="v2-container">
          <h2 className="v2-cta-title">Let's Build Something Together</h2>
          <p className="v2-cta-text">Check out my projects or learn more about my journey</p>
          <div className="v2-cta-buttons">
            <button 
              className="v2-btn v2-btn-primary"
              onClick={() => navigate('/commit/v2/projects')}
            >
              View Projects
            </button>
            <button 
              className="v2-btn v2-btn-outline"
              onClick={() => navigate('/commit/v2/journey')}
            >
              My Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default V2HomePage;

