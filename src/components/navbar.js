import React from 'react';
import logo from '../images/logonav.png'; // Import your logo image
import './navbar.css'; // Import your CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="My Logo" />
            </div>
            <ul className="nav-links">
                <li><a href="/">Welcome</a></li>
                <li><a href="/about">Projects</a></li>
                <li><a href="/about">Blog Page</a></li>
                <li><a href="/services">Contact Me</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
