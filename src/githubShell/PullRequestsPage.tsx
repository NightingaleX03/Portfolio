import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RepoPage.css';
import './PullRequestsPage.css';

interface GitHubPullRequest {
  id: number;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  comments: number;
  labels: Array<{
    name: string;
    color: string;
  }>;
  pull_request: {
    html_url: string;
    diff_url: string;
    patch_url: string;
  };
}

const REPO_OWNER = 'NightingaleX03';
const REPO_NAME = 'Portfolio';

const PullRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [pullRequests, setPullRequests] = useState<GitHubPullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<'open' | 'closed'>('open');
  const [searchQuery, setSearchQuery] = useState('is:pr is:open');

  useEffect(() => {
    fetchPullRequests();
  }, [filterState]);

  const fetchPullRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=${filterState}&per_page=100`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch pull requests');
      }

      const data = await response.json();
      setPullRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching pull requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  const openPRsCount = pullRequests.filter(pr => pr.state === 'open').length;
  const closedPRsCount = pullRequests.filter(pr => pr.state === 'closed').length;

  return (
    <div className="github-repo-page">
      {/* Top Navigation Bar - Same as RepoPage */}
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
              <input 
                type="text" 
                placeholder="is:pr is:open" 
                defaultValue="is:pr is:open"
              />
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
        <button className="repo-tab active">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1.5 3.25a2.25 2.25 0 113 2.122 5.5 5.5 0 003.434 4.508.75.75 0 11-.586 1.381A6.996 6.996 0 01.5 9.875v-.252a2.25 2.25 0 01-1-1.185v-.87a2.25 2.25 0 011.5-2.122zm11 2.122a2.25 2.25 0 10-3 2.122 5.5 5.5 0 003.434 4.508.75.75 0 10-.586-1.381 6.997 6.997 0 01-3.848-4.508v-.252a2.25 2.25 0 10-1.5-2.122v.87a2.25 2.25 0 001.5 2.122zM8 9.5a1 1 0 100-2 1 1 0 000 2z"></path>
          </svg>
          Pull requests {pullRequests.length > 0 && <span className="tab-count">{openPRsCount}</span>}
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

      {/* Pull Requests Content */}
      <div className="pr-content">
        <div className="pr-header">
          <div className="pr-header-left">
            <button className="pr-filter-btn">
              <span>Filters</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.427 9.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 9H4.604a.25.25 0 00-.177.427z"></path>
              </svg>
            </button>
            <div className="pr-search-bar">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Search all pull requests..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="pr-header-right">
            <button className="pr-toolbar-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2.5 1.75v11.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25zm11.5 13H2.75A1.75 1.75 0 011 13.25V1.75C1 .784 1.784 0 2.75 0h10.5C14.216 0 15 .784 15 1.75v11.5A1.75 1.75 0 0113.25 15zM5.75 6a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"></path>
                <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v11.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V2.75zm1.75-.25a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25H2.75z"></path>
              </svg>
              Labels
              <span className="pr-badge">9</span>
            </button>
            <button className="pr-toolbar-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122 5.5 5.5 0 00-3.434 4.508.75.75 0 101.5.058 4 4 0 012.434-3.558 2.25 2.25 0 01-1.5-2.122zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
              </svg>
              Milestones
              <span className="pr-badge">0</span>
            </button>
            <button className="pr-toolbar-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1.5 3.25a2.25 2.25 0 113 2.122 5.5 5.5 0 003.434 4.508.75.75 0 11-.586 1.381A6.996 6.996 0 01.5 9.875v-.252a2.25 2.25 0 01-1-1.185v-.87a2.25 2.25 0 011.5-2.122zm11 2.122a2.25 2.25 0 10-3 2.122 5.5 5.5 0 003.434 4.508.75.75 0 10-.586-1.381 6.997 6.997 0 01-3.848-4.508v-.252a2.25 2.25 0 10-1.5-2.122v.87a2.25 2.25 0 001.5 2.122zM8 9.5a1 1 0 100-2 1 1 0 000 2z"></path>
              </svg>
            </button>
            {/* New Pull Request button - DISABLED so no one can create PRs */}
            <button className="new-pr-btn-disabled" disabled title="Pull request creation is disabled">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 010 1.5H8.5v4.25a.75.75 0 01-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
              </svg>
              New pull request
            </button>
          </div>
        </div>

        {/* Pull Requests List or Empty State */}
        <div className="pr-list-container">
          {loading ? (
            <div className="pr-empty-state">
              <p>Loading pull requests...</p>
            </div>
          ) : error ? (
            <div className="pr-empty-state">
              <p>Error loading pull requests: {error}</p>
              <button onClick={fetchPullRequests} className="retry-btn">Retry</button>
            </div>
          ) : pullRequests.length === 0 ? (
            <div className="pr-empty-state">
              <div className="pr-empty-icon">
                <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 3.25a2.25 2.25 0 113 2.122 5.5 5.5 0 003.434 4.508.75.75 0 11-.586 1.381A6.996 6.996 0 01.5 9.875v-.252a2.25 2.25 0 01-1-1.185v-.87a2.25 2.25 0 011.5-2.122zm11 2.122a2.25 2.25 0 10-3 2.122 5.5 5.5 0 003.434 4.508.75.75 0 10-.586-1.381 6.997 6.997 0 01-3.848-4.508v-.252a2.25 2.25 0 10-1.5-2.122v.87a2.25 2.25 0 001.5 2.122zM8 9.5a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
              </div>
              <h2 className="pr-empty-title">Welcome to pull requests!</h2>
              <p className="pr-empty-text">
                Pull requests help you collaborate on code with other people. As pull requests are created, they'll appear here in a searchable and filterable list. To get started, you should{' '}
                <span className="pr-empty-link-disabled">create a pull request</span>.
              </p>
            </div>
          ) : (
            <div className="pr-list">
              {pullRequests
                .filter(pr => pr && pr.pull_request && pr.pull_request.html_url)
                .map((pr) => (
                <div key={pr.id} className="pr-item">
                  <div className="pr-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M1.5 3.25a2.25 2.25 0 113 2.122 5.5 5.5 0 003.434 4.508.75.75 0 11-.586 1.381A6.996 6.996 0 01.5 9.875v-.252a2.25 2.25 0 01-1-1.185v-.87a2.25 2.25 0 011.5-2.122zm11 2.122a2.25 2.25 0 10-3 2.122 5.5 5.5 0 003.434 4.508.75.75 0 10-.586-1.381 6.997 6.997 0 01-3.848-4.508v-.252a2.25 2.25 0 10-1.5-2.122v.87a2.25 2.25 0 001.5 2.122zM8 9.5a1 1 0 100-2 1 1 0 000 2z"></path>
                    </svg>
                  </div>
                  <div className="pr-content-info">
                    <div className="pr-title-row">
                      <a 
                        href={pr.pull_request?.html_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/pull/${pr.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pr-title-link"
                      >
                        {pr.title}
                      </a>
                      {pr.labels && pr.labels.map((label) => (
                        <span 
                          key={label.name} 
                          className="pr-label"
                          style={{ backgroundColor: `#${label.color}` }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                    <div className="pr-meta">
                      <span className="pr-number">#{pr.number}</span>
                      <span className="pr-separator">{pr.state === 'open' ? 'opened' : 'closed'}</span>
                      <span className="pr-time">{formatDate(pr.created_at)}</span>
                      <span className="pr-separator">by</span>
                      <a 
                        href={`https://github.com/${pr.user?.login || REPO_OWNER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pr-author"
                      >
                        {pr.user?.login || 'Unknown'}
                      </a>
                      {pr.comments > 0 && (
                        <>
                          <span className="pr-separator">·</span>
                          <a 
                            href={`${pr.pull_request?.html_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/pull/${pr.number}`}#comments`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pr-comments"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.458 1.458 0 014 13.896V12H2.75A1.75 1.75 0 011 10.25v-7.5zM2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75z"></path>
                            </svg>
                            {pr.comments}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ProTip Footer */}
        <div className="pr-footer">
          <div className="pr-tip">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zm7.25-3.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
            </svg>
            <span>ProTip! Mix and match filters to narrow down what you're looking for.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullRequestsPage;

