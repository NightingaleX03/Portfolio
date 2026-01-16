import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RepoPage.css';
import './CommitPage.css';

const CommitPage: React.FC = () => {
  const navigate = useNavigate();
  const { commitHash } = useParams<{ commitHash: string }>();

  // Determine date based on commit hash
  const getCommitDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const fiveMonthsAgo = new Date(today);
    fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

    if (commitHash === 'a3f8b2c') {
      return yesterday;
    } else {
      return fiveMonthsAgo;
    }
  };

  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const commitDate = getCommitDate();

  return (
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
              <input type="text" placeholder="Type / to search" defaultValue="Type / to search" />
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
        <button className="repo-tab" onClick={() => navigate('/')}>
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

      {/* Commit Content */}
      <div className="commit-content">
        <div className="commit-header">
          <div className="commit-title-section">
            <h1 className="commit-title">Commit {commitHash}</h1>
            <div className="commit-meta">
              <div className="avatar-circle-small">SM</div>
              <a 
                href="https://github.com/NightingaleX03" 
                target="_blank" 
                rel="noopener noreferrer"
                className="commit-author"
              >
                NightingaleX03
              </a>
              <span className="commit-date">committed on {formatDate(commitDate)}</span>
              <div className="commit-checks">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="check-icon">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                </svg>
                <span>3/3</span>
              </div>
            </div>
          </div>
          <button className="browse-files-btn" title="secret <3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3h-4.836a.25.25 0 01-.177-.073L7.823 1.427A1.75 1.75 0 006.586 1H1.75zM1.5 2.75v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H6.5a.75.75 0 01-.53-.22L4.688 2.5H1.75a.25.25 0 00-.25.25z"></path>
            </svg>
            Browse files
          </button>
        </div>

        {/* Updates Section */}
        <div className="commit-updates-section">
          <div className="commit-branch-info">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M9.5 3.25a2.25 2.25 0 11-3 2.122 2.25 2.25 0 013-2.122zM5.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122 2.25 2.25 0 11-3-2.122zm9 2.122a2.25 2.25 0 11-3 2.122 2.25 2.25 0 013-2.122zM11.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm.968-4.03a2.25 2.25 0 111.415 1.415 2.25 2.25 0 01-1.415-1.415zM8 9.5a1 1 0 100-2 1 1 0 000 2z"></path>
            </svg>
            <span className="commit-branch-badge">gh-pages</span>
            <span className="commit-parent-info">1 parent {commitHash === 'a3f8b2c' ? '3894a7b' : '7d4e9a1'} commit {commitHash}</span>
            <button className="copy-commit-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 15h-7.5A1.75 1.75 0 010 13.25v-6.5z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Commit Layout */}
        <div className="commit-layout">
          {/* Left Sidebar - File Tree */}
          <div className="commit-sidebar">
            <div className="file-search-bar">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
              <input type="text" placeholder="Filter files..." />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.823 1.677L4.927 4.573A3.752 3.752 0 003.75 6.5v5.69l-.896.898a1.5 1.5 0 102.121 2.121l6.242-6.243a3.778 3.778 0 00.496-4.865l-1.677-1.677a.75.75 0 00-1.06 0zM7.823 2.737l1.677 1.677a2.25 2.25 0 01-.496 2.865L5.5 9.69V6.5a2.25 2.25 0 01.737-1.677zM3.75 13.19v-1.69l3.024-3.024a2.25 2.25 0 013.048-3.048l1.677 1.677-4.768 4.768a1.5 1.5 0 00-.354.354L3.75 13.19z"></path>
              </svg>
            </div>
            <div className="file-tree">
              <div className="file-tree-item unavailable">
                <span>Files unavailable</span>
              </div>
            </div>
          </div>

          {/* Main Content - Diff View */}
          <div className="commit-main">
            <div className="diff-summary-bar">
              <span className="diff-summary-text">
                <span className="unavailable-text">Files changed: unavailable</span>
              </span>
              <div className="diff-search">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                </svg>
                <input type="text" placeholder="Search within code" />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                  <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
                </svg>
              </div>
            </div>
            <div className="diff-content unavailable-section">
              <div className="unavailable-message">
                <h3>Code unavailable</h3>
                <p>The code changes for this commit are not available.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitPage;

