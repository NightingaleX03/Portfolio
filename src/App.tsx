import React, { Suspense } from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import "./index.css";

// Import pages directly instead of lazy loading for now
import Projects from './pages/Project';
import AboutPage from './pages/BlogPage';
import Contact from './pages/Contact';
import Homepage from './pages/HomePage';

// Loading component
const LoadingFallback: React.FC = () => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
    </div>
);

const AppRoutes: React.FC = () => {
    return useRoutes([
        { 
            path: "/", 
            element: <Homepage />,
            index: true
        },
        { 
            path: "/home", 
            element: <Navigate to="/" replace /> 
        },
        { 
            path: "/projects", 
            element: <Projects /> 
        },
        { 
            path: "/about", 
            element: <AboutPage /> 
        },
        { 
            path: "/contact", 
            element: <Contact /> 
        },
        { 
            path: "*", 
            element: <Navigate to="/" replace /> 
        },
    ]);
};

const App: React.FC = () => {
    return (
        <Router basename="/">
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <Suspense fallback={<LoadingFallback />}>
                        <AppRoutes />
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App; 