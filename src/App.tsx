import React, { Suspense } from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import "./index.css";
import "./styles/global.css";
import { ThemeProvider } from './context/ThemeContext';

// Import pages directly instead of lazy loading for now
import Projects from './pages/Project';
import JourneyPage from './pages/JourneyPage';
import Contact from './pages/Contact';
import Homepage from './pages/HomePage';

// Loading component
const LoadingFallback: React.FC = () => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
    </div>
);

// Routes component
const AppRoutes: React.FC = () => {
    return useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/projects", element: <Projects /> },
        { path: "/journey", element: <JourneyPage /> },
        { path: "/contact", element: <Contact /> },
        { path: "*", element: <Navigate to="/" replace /> }
    ]);
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
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
        </ThemeProvider>
    );
};

export default App; 