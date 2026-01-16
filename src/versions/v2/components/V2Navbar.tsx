import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './V2Navbar.css';

const V2Navbar: React.FC = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (navRef.current) {
            gsap.fromTo(navRef.current, 
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
            );
        }
    }, []);

    return (
        <nav ref={navRef} className={`v2-navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="v2-navbar-container">
                <Link to="/commit/v2" className="v2-navbar-logo">
                    <span className="v2-logo-text">SM</span>
                </Link>
                <ul className="v2-nav-links">
                    <li>
                        <Link to="/commit/v2" className={location.pathname === '/commit/v2' || location.pathname === '/commit/v2/' ? 'active' : ''}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/commit/v2/projects" className={location.pathname === '/commit/v2/projects' ? 'active' : ''}>
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="/commit/v2/journey" className={location.pathname === '/commit/v2/journey' ? 'active' : ''}>
                            Journey
                        </Link>
                    </li>
                    <li>
                        <Link to="/commit/v2/about" className={location.pathname === '/commit/v2/about' ? 'active' : ''}>
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default V2Navbar;

