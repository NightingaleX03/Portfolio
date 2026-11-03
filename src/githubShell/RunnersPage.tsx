import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RepoPage.css';
import './ActionsPage.css';
import './RunnersPage.css';

const RunnersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('uottawa');

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

      {/* Runners Content */}
      <div className="actions-content">
        <div className="actions-layout">
          {/* Left Sidebar */}
          <div className="actions-sidebar">
            <div className="actions-sidebar-header">
              <h2 className="actions-title">Actions</h2>
              <button className="new-workflow-btn" disabled title="Workflow creation is disabled">
                New workflow
              </button>
            </div>
            <div className="workflows-nav">
              <div className="workflow-nav-item" onClick={() => navigate('/actions')}>
                <span>All workflows</span>
              </div>
              <div className="workflow-nav-item" onClick={() => navigate('/actions')}>
                <span>pages-build-deployment</span>
              </div>
            </div>
            <div className="actions-separator"></div>
            <div className="management-section">
              <h3 className="management-title">Management</h3>
              <div className="management-item" onClick={() => navigate('/actions/caches')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 1.75v11.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25zm11.5 13H2.75A1.75 1.75 0 011 13.25V1.75C1 .784 1.784 0 2.75 0h10.5C14.216 0 15 .784 15 1.75v11.5A1.75 1.75 0 0113.25 15zM5.75 6a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"></path>
                </svg>
                <span>Caches</span>
              </div>
              <div className="management-item" onClick={() => navigate('/actions/deployments')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                  <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
                </svg>
                <span>Deployments</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="external-icon">
                  <path d="M3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"></path>
                  <path d="M6.22 4.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 9.5H6.75a.75.75 0 010-1.5h3.19L6.22 5.28a.75.75 0 010-1.06z"></path>
                </svg>
              </div>
              <div className="management-item" onClick={() => navigate('/actions/attestations')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                  <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
                </svg>
                <span>Attestations</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="external-icon">
                  <path d="M3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"></path>
                  <path d="M6.22 4.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 9.5H6.75a.75.75 0 010-1.5h3.19L6.22 5.28a.75.75 0 010-1.06z"></path>
                </svg>
              </div>
              <div className="management-item active">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 3.25a2.25 2.25 0 113 2.122 5.5 5.5 0 003.434 4.508.75.75 0 11-.586 1.381A6.996 6.996 0 01.5 9.875v-.252a2.25 2.25 0 01-1-1.185v-.87a2.25 2.25 0 011.5-2.122zm11 2.122a2.25 2.25 0 10-3 2.122 5.5 5.5 0 003.434 4.508.75.75 0 10-.586-1.381 6.997 6.997 0 01-3.848-4.508v-.252a2.25 2.25 0 10-1.5-2.122v.87a2.25 2.25 0 001.5 2.122zM8 9.5a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                <span>Runners</span>
              </div>
              <div className="management-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                  <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
                </svg>
                <span>Usage metrics</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="external-icon">
                  <path d="M3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"></path>
                  <path d="M6.22 4.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 9.5H6.75a.75.75 0 010-1.5h3.19L6.22 5.28a.75.75 0 010-1.06z"></path>
                </svg>
              </div>
              <div className="management-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                  <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
                </svg>
                <span>Performance metrics</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="external-icon">
                  <path d="M3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"></path>
                  <path d="M6.22 4.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 9.5H6.75a.75.75 0 010-1.5h3.19L6.22 5.28a.75.75 0 010-1.06z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="runners-main-content">
            <div className="runners-header">
              <div>
                <h1 className="runners-title">Runners</h1>
                <p className="runners-subtitle">Runners available to this repository</p>
              </div>
              <button className="new-runner-btn" disabled title="Runner creation is disabled">
                New runner
              </button>
            </div>

            {/* Introduction Section */}
            <div className="runners-intro-section">
              <h2 className="runners-section-title">What are Runners?</h2>
              <p className="runners-intro-text">
                In GitHub Actions, runners are the machines that execute your workflows. They can be GitHub-hosted 
                (managed by GitHub) or self-hosted (machines you configure and manage). Runners help automate your 
                CI/CD pipelines, running tests, building applications, and deploying code automatically.
              </p>
              <p className="runners-intro-text">
                While runners in GitHub help with continuous integration and deployment, here are what I did during 
                my runs in university/college:
              </p>
            </div>

            {/* University Tabs */}
            <div className="runners-tabs">
              <button 
                className={`runners-tab ${activeTab === 'uottawa' ? 'active' : ''}`}
                onClick={() => setActiveTab('uottawa')}
              >
                University of Ottawa
              </button>
              <button 
                className={`runners-tab ${activeTab === 'seneca' ? 'active' : ''}`}
                onClick={() => setActiveTab('seneca')}
              >
                Seneca Polytechnic
              </button>
              <button 
                className={`runners-tab ${activeTab === 'ontariotech' ? 'active' : ''}`}
                onClick={() => setActiveTab('ontariotech')}
              >
                Ontario Tech University
              </button>
            </div>

            {/* Tab Content */}
            <div className="runners-tab-content">
              {activeTab === 'uottawa' && (
                <div className="university-content">
                  <div className="university-header">
                    <h3 className="university-name">University of Ottawa</h3>
                    <span className="university-dates">2021 - 2023</span>
                  </div>
                  <p className="university-status">Not completed - Transferred to Ontario Tech University</p>
                  <p className="university-description">
                    During my time at the University of Ottawa from 2021 to 2023, I focused on building a strong 
                    foundation in computer science and software engineering. I worked on various projects that helped 
                    me develop my skills in programming, algorithms, and software design.
                  </p>
                  {/* Add more specific content about University of Ottawa here */}
                </div>
              )}

              {activeTab === 'seneca' && (
                <div className="university-content">
                  <div className="university-header">
                    <h3 className="university-name">Seneca Polytechnic</h3>
                    <span className="university-dates">Sept. 2023 – Dec. 2024</span>
                  </div>
                  <p className="university-description">
                    At Seneca Polytechnic from 2023 to 2024, I gained hands-on experience in software development 
                    and practical programming skills. The program emphasized real-world applications and 
                    industry-relevant technologies, helping me prepare for professional software development roles.
                  </p>
                  {/* Add more specific content about Seneca Polytechnic here */}
                </div>
              )}

              {activeTab === 'ontariotech' && (
                <div className="university-content">
                  <div className="university-header">
                    <h3 className="university-name">Ontario Tech University</h3>
                    <span className="university-dates">Sept. 2024 – May 2028</span>
                  </div>
                  <p className="university-description">
                    My experience at Ontario Tech University from Sept. 2024 to May 2028 (expected) has provided me with 
                    advanced knowledge in computer science and technology. I engage in cutting-edge research and 
                    projects that expand my understanding of modern software systems and emerging technologies.
                  </p>
                  {/* Add more specific content about Ontario Tech University here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunnersPage;

