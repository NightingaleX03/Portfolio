import React from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaDev } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import "./footer.css";
import samewise from "../images/samewise.png";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <br />
      <div className="footer-container">
        {/* Left Column */}
        <div className="footer-left">
          <img src={samewise} alt="Logo" className="footer-logo" />
          <p className="footer-message">Thank you for stopping by!</p>
        </div>

        {/* Right Column */}
        <div className="footer-right">
          <p className="footer-created-by">Created by: Sarah Mathew</p>
          <p className="footer-date">2025/01/26</p>
          <div className="footer-icons">
            <a
              href="https://www.instagram.com/nightingalex03/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://github.com/NightingaleX03"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/sarah-mathew-0a4a06204/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://leetcode.com/u/nightingaleX_03/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <SiLeetcode size={20} />
            </a>
            <a
              href="https://devpost.com/NightingaleX03"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <FaDev size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer; 