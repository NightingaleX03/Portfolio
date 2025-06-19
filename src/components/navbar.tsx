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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/journey">My Journey</Link></li>
                <li><Link to="/contact">Contact Me</Link></li>
            </ul>
            {/* <div className="navbar-theme-toggle">
                <ThemeToggle />
            </div> */}
        </nav>
    );
};

export default Navbar; 