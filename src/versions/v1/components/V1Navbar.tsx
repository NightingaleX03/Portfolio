import React from 'react';
import logo from '../../../images/logonav.png';
import { Link } from "react-router-dom";
import './V1Navbar.css';

const V1Navbar: React.FC = () => {
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
        </nav>
    );
};

export default V1Navbar;

