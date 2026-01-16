import React, { Suspense } from 'react';
import { MemoryRouter, useRoutes, Navigate } from 'react-router-dom';
import "../../index.css";
import "../../styles/global.css";
import { ThemeProvider } from '../../context/ThemeContext';
import './PortfolioV2.css';

// V2 pages and components
import V2HomePage from './pages/V2HomePage';
import V2ProjectsPage from './pages/V2ProjectsPage';
import V2JourneyPage from './pages/V2JourneyPage';
import V2AboutPage from './pages/V2AboutPage';
import V2Navbar from './components/V2Navbar';
import V2Footer from './components/V2Footer';

const LoadingFallback: React.FC = () => (
    <div className="v2-loading-container">
        <div className="v2-loading-spinner"></div>
        <p>Loading...</p>
    </div>
);

// Routes for V2
const V2Routes: React.FC = () => {
    return useRoutes([
        { path: "/", element: <V2HomePage /> },
        { path: "/projects", element: <V2ProjectsPage /> },
        { path: "/journey", element: <V2JourneyPage /> },
        { path: "/about", element: <V2AboutPage /> },
        { path: "*", element: <Navigate to="/" replace /> }
    ]);
};

const PortfolioV2: React.FC = () => {
    return (
        <ThemeProvider>
            <MemoryRouter initialEntries={['/']}>
                <div className="v2-app-container">
                    <V2Navbar />
                    <main className="v2-main-content">
                        <Suspense fallback={<LoadingFallback />}>
                            <V2Routes />
                        </Suspense>
                    </main>
                    <V2Footer />
                </div>
            </MemoryRouter>
        </ThemeProvider>
    );
};

export default PortfolioV2;

