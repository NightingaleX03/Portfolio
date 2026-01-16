import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode, SiDevpost } from 'react-icons/si';
import './V2Footer.css';

const V2Footer: React.FC = () => {
  return (
    <footer className="v2-footer">
      <div className="v2-footer-container">
        <div className="v2-footer-content">
          <div className="v2-footer-left">
            <p className="v2-footer-text">Built with ❤️ by Sarah Mathew</p>
            <p className="v2-footer-date">© 2025</p>
          </div>
          <div className="v2-footer-right">
            <div className="v2-footer-social">
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
        </div>
      </div>
    </footer>
  );
};

export default V2Footer;

