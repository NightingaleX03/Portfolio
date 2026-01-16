import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, useRoutes, Navigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import "./index.css";
import "./styles/global.css";
import { ThemeProvider } from './context/ThemeContext';

// Main GitHub repo page - the landing page
import RepoPage from './githubShell/RepoPage';
import IssuesPage from './githubShell/IssuesPage';
import PullRequestsPage from './githubShell/PullRequestsPage';
import ActionsPage from './githubShell/ActionsPage';
import WorkflowRunPage from './githubShell/WorkflowRunPage';
import CachesPage from './githubShell/CachesPage';
import DeploymentsPage from './githubShell/DeploymentsPage';
import AttestationsPage from './githubShell/AttestationsPage';
import RunnersPage from './githubShell/RunnersPage';
import CommitPage from './githubShell/CommitPage';
import ProjectsPage from './githubShell/ProjectsPage';

// V1 components (the original portfolio)
import V1Navbar from './versions/v1/components/V1Navbar';
import V1HomePage from './versions/v1/pages/V1HomePage';
import V1Project from './versions/v1/pages/V1Project';
import V1JourneyPage from './versions/v1/pages/V1JourneyPage';

// V2 components (the new upgraded version)
import V2Navbar from './versions/v2/components/V2Navbar';
import V2Footer from './versions/v2/components/V2Footer';
import V2HomePage from './versions/v2/pages/V2HomePage';
import V2ProjectsPage from './versions/v2/pages/V2ProjectsPage';
import V2JourneyPage from './versions/v2/pages/V2JourneyPage';
import V2AboutPage from './versions/v2/pages/V2AboutPage';

// Just a simple loading spinner
const LoadingFallback: React.FC = () => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
    </div>
);

// Handles smooth page transitions
const TransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const contentRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: 'power2.out' }
            );
        }
    }, [location.pathname]);

    return (
        <div ref={contentRef} style={{ minHeight: '100vh' }}>
            {children}
        </div>
    );
};

// All the routes
const AppRoutes: React.FC = () => {
    return useRoutes([
        // Homepage - shows the GitHub repo UI
        { path: "/", element: <RepoPage /> },
        // Issues page
        { path: "/issues", element: <IssuesPage /> },
        // Pull Requests page
        { path: "/pulls", element: <PullRequestsPage /> },
        // Actions page
        { path: "/actions", element: <ActionsPage /> },
        // Workflow Run page
        { path: "/actions/runs/:runId", element: <WorkflowRunPage /> },
        // Caches page
        { path: "/actions/caches", element: <CachesPage /> },
        // Deployments page
        { path: "/actions/deployments", element: <DeploymentsPage /> },
        // Attestations page
        { path: "/actions/attestations", element: <AttestationsPage /> },
        // Runners page
        { path: "/actions/runners", element: <RunnersPage /> },
        // Projects page
        { path: "/projects", element: <ProjectsPage /> },
        // Commit page
        { path: "/commit/:commitHash", element: <CommitPage /> },
        
        // V1 routes (original portfolio)
        { path: "/commit/v1", element: (
            <div className="app-container">
                <V1Navbar />
                <main className="main-content">
                    <Suspense fallback={<LoadingFallback />}>
                        <V1HomePage />
                    </Suspense>
                </main>
            </div>
        )},
        { path: "/commit/v1/projects", element: (
            <div className="app-container">
                <V1Navbar />
                <main className="main-content">
                    <Suspense fallback={<LoadingFallback />}>
                        <V1Project />
                    </Suspense>
                </main>
            </div>
        )},
        { path: "/commit/v1/journey", element: (
            <div className="app-container">
                <V1Navbar />
                <main className="main-content">
                    <Suspense fallback={<LoadingFallback />}>
                        <V1JourneyPage />
                    </Suspense>
                </main>
            </div>
        )},
        
        // V2 routes (new upgraded version)
        { path: "/commit/v2", element: (
            <div className="v2-app-container">
                <V2Navbar />
                <main className="v2-main-content">
                    <Suspense fallback={<LoadingFallback />}>
                        <V2HomePage />
                    </Suspense>
                </main>
                <V2Footer />
            </div>
        )},
        { path: "/commit/v2/projects", element: (
            <div className="v2-app-container">
                <V2Navbar />
                <main className="v2-main-content">
                    <Suspense fallback={<LoadingFallback />}>
                        <V2ProjectsPage />
                    </Suspense>
                </main>
                <V2Footer />
            </div>
        )},
        { path: "/commit/v2/journey", element: (
            <div className="v2-app-container">
                <V2Navbar />
                <main className="v2-main-content">
                    <Suspense fallback={<LoadingFallback />}>
                        <V2JourneyPage />
                    </Suspense>
                </main>
                <V2Footer />
            </div>
        )},
        { path: "/commit/v2/about", element: (
            <div className="v2-app-container">
                <V2Navbar />
                <main className="v2-main-content">
                    <Suspense fallback={<LoadingFallback />}>
                        <V2AboutPage />
                    </Suspense>
                </main>
                <V2Footer />
            </div>
        )},
        
        { path: "*", element: <Navigate to="/" replace /> }
    ]);
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <div className="app-container">
                    <Suspense fallback={<LoadingFallback />}>
                        <TransitionWrapper>
                            <AppRoutes />
                        </TransitionWrapper>
                    </Suspense>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
