import React from 'react';
import logo from '../images/logonav.png';
import './navbar.css';
// import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="My Logo" />
            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/journey">My Journey</a></li>
                <li><a href="/contact">Contact Me</a></li>
            </ul>
            {/* <div className="navbar-theme-toggle">
                <ThemeToggle />
            </div> */}
        </nav>
    );
};

export default Navbar; 