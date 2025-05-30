import React from 'react';
import logo from '../images/logonav.png';
import './navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="My Logo" />
            </div>
            <ul className="nav-links">
                <li><a href="/">Welcome</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/contact">Contact Me</a></li>
            </ul>
        </nav>
    );
};

export default Navbar; 