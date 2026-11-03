import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import myself from '../../../images/myself.jpg';
import './V2AboutPage.css';

gsap.registerPlugin(ScrollTrigger);

const V2AboutPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate sections on scroll
    if (contentRef.current) {
      const sections = contentRef.current.querySelectorAll('.v2-about-section');
      sections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="v2-about-page">
      <div className="v2-about-hero">
        <div className="v2-container">
          <h1 className="v2-about-title">About Me</h1>
        </div>
      </div>
      <div className="v2-container">
        <div ref={contentRef} className="v2-about-content">
          <div className="v2-about-section">
            <div className="v2-about-image-wrapper">
              <img src={myself} alt="Sarah Mathew" />
            </div>
          </div>
          <div className="v2-about-section">
            <h2 className="v2-about-section-title">Hello! 👋</h2>
            <p className="v2-about-text">
              My name is <strong>Sarah Mathew</strong> and I'm a passionate software developer 
              excited to venture into the world of tech, learning about new technologies and 
              creating innovative solutions.
            </p>
            <p className="v2-about-text">
              I'm a recent graduate of Computer Programming at Seneca Polytechnic and a current 
              student at Ontario Tech University studying Computer Science with a specialization 
              in Software Development.
            </p>
            <p className="v2-about-text">
              <strong>Fun Fact:</strong> In my free time, I enjoy playing video games, stargazing, 
              and volunteering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default V2AboutPage;

