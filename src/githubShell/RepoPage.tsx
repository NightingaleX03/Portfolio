import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './RepoPage.css';
import DiscoveryPopup from './DiscoveryPopup';
import { incrementVisitCount } from './visitCounterService';

interface Commit {
  hash: string;
  message: string;
  author: string;
  date: string;
  timeAgo: string;
  version: string;
  route: string;
}

// Get dates for commits (yesterday for v2, 5 months ago for v1)
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const fiveMonthsAgo = new Date(today);
fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const commits: Commit[] = [
  {
    hash: 'a3f8b2c',
    message: 'Enhanced portfolio with new UI + animations',
    author: 'Sarah Mathew',
    date: formatDate(yesterday),
    timeAgo: '1 day ago',
    version: 'v2',
    route: '/commit/v2'
  },
  {
    hash: '7d4e9a1',
    message: 'Initial portfolio build',
    author: 'Sarah Mathew',
    date: formatDate(fiveMonthsAgo),
    timeAgo: '5 months ago',
    version: 'v1',
    route: '/commit/v1'
  }
];

const RepoPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCommit, setHoveredCommit] = useState<string | null>(null);
  const commitListRef = useRef<HTMLDivElement>(null);
  const [showDiscoveryPopup, setShowDiscoveryPopup] = useState(false);
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    // check if they've seen the popup already
    const hasSeenPopup = localStorage.getItem('hasSeenDiscoveryPopup');
    
    if (!hasSeenPopup) {
      // first time visitor - show the popup
      setShowDiscoveryPopup(true);
      localStorage.setItem('hasSeenDiscoveryPopup', 'true');
      
      // increment the counter
      incrementVisitCount().then(count => {
        setVisitCount(count);
      });
    }

    // fade in animation for the commit list
    if (commitListRef.current) {
      gsap.fromTo(
        commitListRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  }, []);

  const handleCommitClick = (route: string, hash: string) => {
    const commitElement = document.querySelector(`[data-commit-hash="${hash}"]`);
    
    if (commitElement) {
      // Fade out before navigating
      gsap.to(commitElement, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          navigate(route);
        }
      });
    } else {
      navigate(route);
    }
  };

  return (
    <>
      {showDiscoveryPopup && (
        <DiscoveryPopup
          onClose={() => setShowDiscoveryPopup(false)}
          visitCount={visitCount}
        />
      )}
      <div className="github-repo-page">
      {/* Top Navigation Bar */}
      <nav className="top-navbar">
        <div className="top-navbar-content">
          <div className="top-navbar-left">
            <button className="nav-icon-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75z"></path>
              </svg>
            </button>
            <a href="https://github.com" className="github-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <div className="repo-path-nav">
              <a 
                href="https://github.com/NightingaleX03/Portfolio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="repo-path-link"
              >
                Portfolio
              </a>
            </div>
          </div>
          <div className="top-navbar-center">
            <div className="search-bar">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
              <input type="text" placeholder="is:open" defaultValue="is:open" />
            </div>
          </div>
          <div className="top-navbar-right">
            <button className="nav-icon-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
              </svg>
            </button>
            <button className="nav-icon-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1.5 3.25a2.25 2.25 0 113 2.122 5.5 5.5 0 003.434 4.508.75.75 0 11-.586 1.381A6.996 6.996 0 01.5 9.875v-.252a2.25 2.25 0 01-1-1.185v-.87a2.25 2.25 0 011.5-2.122zm11 2.122a2.25 2.25 0 10-3 2.122 5.5 5.5 0 003.434 4.508.75.75 0 10-.586-1.381 6.997 6.997 0 01-3.848-4.508v-.252a2.25 2.25 0 10-1.5-2.122v.87a2.25 2.25 0 001.5 2.122zM8 9.5a1 1 0 100-2 1 1 0 000 2z"></path>
              </svg>
            </button>
            <button className="nav-icon-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
              </svg>
            </button>
            <div className="user-avatar-nav">
              <div className="avatar-circle-small">SM</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Repository Header */}
      <div className="repo-header">
        <div className="repo-header-content">
          <div className="repo-title-section">
            <div className="repo-owner-info">
              <div className="repo-owner-avatar">
                <div className="avatar-circle">SM</div>
              </div>
              <div className="repo-title-group">
                <h1 className="repo-title">
                  <a 
                    href="https://github.com/NightingaleX03/Portfolio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="repo-owner-link"
                  >
                    Portfolio
                  </a>
                </h1>
                <span className="repo-visibility-badge">Public</span>
              </div>
            </div>
          </div>
          <div className="repo-actions">
            <button className="repo-action-btn secondary">
              Pin
            </button>
            <button className="repo-action-btn secondary">
              Unwatch <span className="action-count">1</span>
            </button>
            <button className="repo-action-btn secondary">
              Fork <span className="action-count">0</span>
            </button>
            <button className="repo-action-btn secondary">
              Star <span className="action-count">1</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="repo-tabs">
        <button className="repo-tab active">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
          </svg>
          Code
        </button>
        <button className="repo-tab" onClick={() => navigate('/issues')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            <path fillRule="evenodd" d="M1.38 8.43a.75.75 0 011.5-.86l1.5 2.6a.75.75 0 01-.65 1.1H1.5a.75.75 0 010-1.5h.88l-.5-.86zm12.24 0a.75.75 0 00-1.5-.86l-1.5 2.6a.75.75 0 00.65 1.1h2.72a.75.75 0 000-1.5h-.88l.5-.86zM8 1a7 7 0 100 14A7 7 0 008 1zM.5 8a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"></path>
          </svg>
          Issues
        </button>
        <button className="repo-tab" onClick={() => navigate('/pulls')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1.5 3.25a2.25 2.25 0 113 2.122 5.5 5.5 0 003.434 4.508.75.75 0 11-.586 1.381A6.996 6.996 0 01.5 9.875v-.252a2.25 2.25 0 01-1-1.185v-.87a2.25 2.25 0 011.5-2.122zm11 2.122a2.25 2.25 0 10-3 2.122 5.5 5.5 0 003.434 4.508.75.75 0 10-.586-1.381 6.997 6.997 0 01-3.848-4.508v-.252a2.25 2.25 0 10-1.5-2.122v.87a2.25 2.25 0 001.5 2.122zM8 9.5a1 1 0 100-2 1 1 0 000 2z"></path>
          </svg>
          Pull requests
        </button>
        <button className="repo-tab" onClick={() => {
          navigate('/actions');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM5 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM7 12a.5.5 0 000 1h2a.5.5 0 000-1H7z"></path>
          </svg>
          Actions
        </button>
        <button className="repo-tab" onClick={() => navigate('/projects')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM5 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM7 12a.5.5 0 000 1h2a.5.5 0 000-1H7z"></path>
          </svg>
          Projects
        </button>
        <button className="repo-tab">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM5 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM7 12a.5.5 0 000 1h2a.5.5 0 000-1H7z"></path>
          </svg>
          Wiki
        </button>
        <button className="repo-tab">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
            <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
          </svg>
          Security
        </button>
        <button className="repo-tab">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 2.75A2.75 2.75 0 013.75 0h8.5A2.75 2.75 0 0115 2.75v10.5A2.75 2.75 0 0112.25 16h-8.5A2.75 2.75 0 011 13.25V2.75zM3.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-8.5zM8 4a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm-2.25.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5zm4.5 0a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5z"></path>
          </svg>
          Insights
        </button>
        <button className="repo-tab">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8.2 8.2 0 00-3.1.58l3.1 3.1A6.5 6.5 0 0114.5 8a6.5 6.5 0 01-6.5 6.5 6.5 6.5 0 01-6.5-6.5A8.2 8.2 0 008 0zm0 13.5a5 5 0 100-10 5 5 0 000 10z"></path>
            <path d="M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM5.5 8a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"></path>
          </svg>
          Settings
        </button>
      </div>

      {/* Main Content Area */}
      <div className="repo-main-content">
        <div className="repo-content-left">
          {/* File Browser Header */}
          <div className="file-browser-header">
            <div className="file-browser-controls">
              <div className="branch-selector-wrapper">
                <div className="branch-selector">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3.75 1a.75.75 0 00-.75.75v12.5a.75.75 0 00.75.75h8.5a.75.75 0 00.75-.75V1.75A.75.75 0 0012.25 1h-8.5zM3 2.5h10v11H3V2.5zm2 2.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5H5zm0 3a.75.75 0 000 1.5h6a.75.75 0 000-1.5H5z"></path>
                  </svg>
                  <span className="branch-name">main</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.427 9.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 9H4.604a.25.25 0 00-.177.427z"></path>
                  </svg>
                </div>
                <div className="branch-info">
                  <span>1 Branch</span>
                  <span className="separator">·</span>
                  <span>0 Tags</span>
                </div>
              </div>
              <div className="file-browser-actions">
                <div className="go-to-file">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11 2a1 1 0 100 2h1.586l-6.293 6.293a1 1 0 101.414 1.414L14 5.414V7a1 1 0 102 0V3a1 1 0 00-1-1h-4z"></path>
                    <path d="M2 5a2 2 0 012-2h4a1 1 0 010 2H4v7h7v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span>Go to file</span>
                </div>
                <button className="add-file-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 010 1.5H8.5v4.25a.75.75 0 01-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
                  </svg>
                  Add file
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.427 9.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 9H4.604a.25.25 0 00-.177.427z"></path>
                  </svg>
                </button>
                <button className="code-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1 2.75A2.75 2.75 0 013.75 0h8.5A2.75 2.75 0 0115 2.75v10.5A2.75 2.75 0 0112.25 16h-8.5A2.75 2.75 0 011 13.25V2.75zM3.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-8.5zM8 4a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm-2.25.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5zm4.5 0a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5z"></path>
                  </svg>
                  Code
                </button>
              </div>
            </div>
          </div>

          {/* Commit History Section */}
          <div className="commit-history-section" ref={commitListRef}>
            <div className="commit-history-header">
              <h2 className="commit-history-title">Commits</h2>
            </div>
            <div className="commit-list">
              {commits.map((commit) => (
                <div
                  key={commit.hash}
                  data-commit-hash={commit.hash}
                  className={`commit-row ${hoveredCommit === commit.hash ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredCommit(commit.hash)}
                  onMouseLeave={() => setHoveredCommit(null)}
                  onClick={() => handleCommitClick(commit.route, commit.hash)}
                >
                  <div className="commit-avatar">
                    <div className="avatar-circle">SM</div>
                  </div>
                  <div className="commit-info">
                    <div className="commit-message">{commit.message}</div>
                    <div className="commit-meta">
                      <span className="commit-author">{commit.author}</span>
                      <span className="commit-date">{commit.timeAgo}</span>
                    </div>
                  </div>
                  <div className="commit-hash">
                    <code>{commit.hash}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* README Section */}
          <div className="readme-section">
            <div className="readme-header">
              <div className="readme-tabs">
                <button className="readme-tab active">README</button>
              </div>
              <div className="readme-actions">
                <button className="readme-action-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path>
                  </svg>
                </button>
                <button className="readme-action-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1 2.75A2.75 2.75 0 013.75 0h8.5A2.75 2.75 0 0115 2.75v10.5A2.75 2.75 0 0112.25 16h-8.5A2.75 2.75 0 011 13.25V2.75zM3.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-8.5zM8 4a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm-2.25.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5zm4.5 0a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="readme-content">
              <h1 className="readme-title">About me - <em>nightingaleX</em></h1>
              <div className="readme-date">2024-12-22 / 2025-12-21</div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="repo-sidebar">
          <div className="sidebar-section">
            <div className="special-repo-notice">
              <p><strong>NightingaleX03/portfolio</strong> is a special repository. Its README.md will appear on your public profile.</p>
              <div className="special-repo-buttons">
                <button className="edit-readme-btn">Edit README</button>
                <button className="visit-profile-btn">Visit profile</button>
              </div>
            </div>
          </div>
          <div className="sidebar-section">
            <div className="about-section">
              <h3 className="about-title">
                About
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                  <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
                </svg>
              </h3>
              <p className="about-description">No description, website, or topics provided.</p>
              <div className="about-links">
                <a href="#" className="about-link">Readme</a>
                <a href="#" className="about-link">Activity</a>
                <a href="#" className="about-link">1 star</a>
                <a href="#" className="about-link">1 watching</a>
                <a href="#" className="about-link">0 forks</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RepoPage;
