import React from 'react';
import Navbar from './components/navbar'; // Navbar component
import { BrowserRouter as Router, useRoutes} from 'react-router-dom';

// Pages
import Projects from './pages/Project'; // Projects page
import AboutPage from './pages/About'; // About page
import Contact from './pages/Contact'; // Contact page
import Homepage from './pages/HomePage'; // Home page

const AppRoutes = () => {
    return useRoutes([
        { path: "/", element: <Homepage /> },
        { path: "/projects", element: <Projects /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/contact", element: <Contact /> },
    ]);
};

const App = () => {
    return (
        <Router>
            <Navbar />
            <AppRoutes />
        </Router>
    );
};

export default App;
