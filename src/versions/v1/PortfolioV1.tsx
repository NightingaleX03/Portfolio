import React, { Suspense } from 'react';
import V1Navbar from './components/V1Navbar';
import { MemoryRouter, useRoutes, Navigate } from 'react-router-dom';
import "../../index.css";
import "../../styles/global.css";
import { ThemeProvider } from '../../context/ThemeContext';

// V1 pages
import V1HomePage from './pages/V1HomePage';
import V1Project from './pages/V1Project';
import V1JourneyPage from './pages/V1JourneyPage';

const LoadingFallback: React.FC = () => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
    </div>
);

// Routes for V1
const V1Routes: React.FC = () => {
    return useRoutes([
        { path: "/", element: <V1HomePage /> },
        { path: "/projects", element: <V1Project /> },
        { path: "/journey", element: <V1JourneyPage /> },
        { path: "*", element: <Navigate to="/" replace /> }
    ]);
};

const PortfolioV1: React.FC = () => {
    return (
        <ThemeProvider>
            <MemoryRouter initialEntries={['/']}>
                <div className="app-container">
                    <V1Navbar />
                    <main className="main-content">
                        <Suspense fallback={<LoadingFallback />}>
                            <V1Routes />
                        </Suspense>
                    </main>
                </div>
            </MemoryRouter>
        </ThemeProvider>
    );
};

export default PortfolioV1;

