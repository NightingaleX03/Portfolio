import React from 'react';
import logo from '../images/logonav.png';
import { Link } from "react-router-dom";
import './navbar.css';
// import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="My Logo" />
            </div>
            <ul className="nav-links">
                <li><Link to="/commit/v1">Home</Link></li>
                <li><Link to="/commit/v1/projects">Projects</Link></li>
                <li><Link to="/commit/v1/journey">My Journey</Link></li>
            </ul>
            {/* <div className="navbar-theme-toggle">
                <ThemeToggle />
            </div> */}
        </nav>
    );
};

export default Navbar; 