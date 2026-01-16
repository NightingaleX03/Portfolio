import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RepoPage.css';
import './WorkflowRunPage.css';

const REPO_OWNER = 'NightingaleX03';
const REPO_NAME = 'Portfolio';

// Get dates matching the commits
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const fiveMonthsAgo = new Date(today);
fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

// Mock workflow run data
const getWorkflowRunData = (runId: string) => {
  const runNumber = parseInt(runId);
  let createdAt: Date;
  let commitHash: string;
  let branch: string;
  let route: string;
  
  if (runNumber === 3) {
    createdAt = yesterday;
    commitHash = 'a3f8b2c';
    branch = 'gh-pages';
    route = '/';
  } else if (runNumber === 2) {
    createdAt = fiveMonthsAgo;
    commitHash = 'a3f8b2c';
    branch = 'gh-pages';
    route = '/commit/v2';
  } else {
    createdAt = fiveMonthsAgo;
    commitHash = '7d4e9a1';
    branch = 'gh-pages';
    route = '/commit/v1';
  }
  
  return {
    id: runNumber,
    run_number: runNumber,
    name: 'pages build and deployment',
    status: 'success',
    conclusion: 'success',
    created_at: createdAt,
    commit_hash: commitHash,
    branch: branch,
    route: route,
    actor: 'NightingaleX03',
    duration: '36s',
    jobs: [
      { name: 'build', status: 'success', duration: '18s' },
      { name: 'report-build-status', status: 'success', duration: '3s' },
      { name: 'deploy', status: 'success', duration: '8s' }
    ],
    artifacts: [
      { name: 'github-pages', size: '9.76 MB', digest: 'sha256:062f74151a814ecb8dfeec0569f32f...', expired: true }
    ]
  };
};

const WorkflowRunPage: React.FC = () => {
  const navigate = useNavigate();
  const { runId } = useParams<{ runId: string }>();
  const [workflowRun, setWorkflowRun] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'usage'>('summary');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const artifactsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (runId) {
      const data = getWorkflowRunData(runId);
      setWorkflowRun(data);
    }
  }, [runId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.workflow-menu-container') && !target.closest('.workflow-run-menu-btn')) {
        setShowMenu(false);
      }
      if (!target.closest('.workflow-sidebar-header') && !target.closest('.filter-dropdown')) {
        setShowFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDurationClick = () => {
    setActiveTab('usage');
  };

  const handleArtifactsClick = () => {
    artifactsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleJobClick = (jobName: string) => {
    setSelectedJob(jobName);
    setActiveTab('summary');
  };

  const handleUsageJobClick = (jobName: string) => {
    setSelectedJob(jobName);
    setActiveTab('summary');
  };

  const handleGraphNodeClick = (jobName: string) => {
    setSelectedJob(jobName);
    setActiveTab('summary');
  };

  if (!workflowRun) {
    return <div>Loading...</div>;
  }

  const renderMainContent = () => {
    if (activeTab === 'usage') {
      return (
        <div className="usage-content">
          <h2 className="usage-title">Run time</h2>
          <a 
            href="#/" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="usage-link"
          >
            Let's head back to the github protfolio home
          </a>
          <div className="usage-table">
            <div className="usage-table-header">
              <div className="usage-header-col">Job</div>
              <div className="usage-header-col">Run time</div>
            </div>
            {workflowRun.jobs.map((job: any) => (
              <div 
                key={job.name} 
                className="usage-table-row usage-clickable"
                onClick={() => handleUsageJobClick(job.name)}
              >
                <div className="usage-col-job">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="usage-check-icon">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                  </svg>
                  <span>{job.name}</span>
                </div>
                <div className="usage-col-time">{job.duration}</div>
              </div>
            ))}
            <div className="usage-table-row usage-total">
              <div className="usage-col-job">Total</div>
              <div className="usage-col-time">{workflowRun.duration}</div>
            </div>
          </div>
        </div>
      );
    }

    if (selectedJob) {
      return (
        <div className="job-details-content">
          <div className="job-details-empty">
            <svg width="64" height="64" viewBox="0 0 16 16" fill="currentColor" className="job-empty-icon">
              <path d="M3.75 0a.75.75 0 00-.25 1.5h.5a.25.25 0 01.25.25v.5a.75.75 0 001.5 0v-.5A1.75 1.75 0 004.75 0h-.5zM11.75 0a.75.75 0 00-.25 1.5h.5a.25.25 0 01.25.25v.5a.75.75 0 001.5 0v-.5A1.75 1.75 0 0012.75 0h-.5zM2 4.75A.75.75 0 012.75 4h10.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2.75 6h10.5a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5zM2 9.25A.75.75 0 012.75 8.5h10.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.25z"></path>
            </svg>
            <p className="job-empty-text">The logs for this run have expired and are no longer available.</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Workflow Overview Card */}
        <div className="workflow-overview-card">
          <div className="workflow-overview-row">
            <span className="workflow-overview-label">Triggered via</span>
            <span className="workflow-overview-value">dynamic</span>
            <span className="workflow-overview-time">{formatTimeAgo(workflowRun.created_at)}</span>
          </div>
              <div className="workflow-overview-row">
                <div className="workflow-actor-info">
                  <div className="avatar-circle-small">SM</div>
                  <a 
                    href="https://github.com/NightingaleX03" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="workflow-actor-name"
                  >
                    {workflowRun.actor}
                  </a>
                  <code className="workflow-commit-hash">{workflowRun.commit_hash}</code>
                  <a 
                    href="#/" 
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                    }}
                    className="workflow-branch-badge"
                  >
                    {workflowRun.branch}
                  </a>
                </div>
              </div>
          <div className="workflow-overview-stats">
            <div className="workflow-stat">
              <span className="workflow-stat-label">Status</span>
              <span className="workflow-stat-value">Success</span>
            </div>
            <div className="workflow-stat">
              <span className="workflow-stat-label">Total duration</span>
              <span className="workflow-stat-value underlined" onClick={handleDurationClick} style={{ cursor: 'pointer' }}>{workflowRun.duration}</span>
            </div>
            <div className="workflow-stat">
              <span className="workflow-stat-label">Artifacts</span>
              <span className="workflow-stat-value underlined" onClick={handleArtifactsClick} style={{ cursor: 'pointer' }}>{workflowRun.artifacts.length}</span>
            </div>
          </div>
        </div>

        {/* Workflow Graph Card */}
        <div className="workflow-graph-card">
          <div className="workflow-graph-header">
            <div>
              <div className="workflow-graph-title">pages-build-deployment</div>
              <div className="workflow-graph-subtitle">on: dynamic</div>
            </div>
            <div className="workflow-graph-controls">
              <button className="graph-control-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1 2.75A2.75 2.75 0 013.75 0h8.5A2.75 2.75 0 0115 2.75v10.5A2.75 2.75 0 0112.25 16h-8.5A2.75 2.75 0 011 13.25V2.75zM3.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-8.5z"></path>
                </svg>
              </button>
              <button className="graph-control-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                  <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
                </svg>
              </button>
              <button className="graph-control-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                  <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="workflow-graph-visual">
            <div 
              className={`workflow-graph-node ${hoveredNode === 'build' ? 'hovered' : ''} ${hoveredNode === 'report-build-status' || hoveredNode === 'deploy' ? 'faded' : ''}`}
              onClick={() => handleGraphNodeClick('build')}
              onMouseEnter={() => setHoveredNode('build')}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              <div className="graph-node-content">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="graph-node-icon success">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                </svg>
                <span className="graph-node-name">build</span>
                <span className="graph-node-duration">18s</span>
              </div>
            </div>
            <div className="workflow-graph-arrows">
              <div className={`graph-arrow ${(hoveredNode === 'build' || hoveredNode === 'report-build-status') ? 'blue' : ''}`}></div>
              <div className={`graph-arrow ${(hoveredNode === 'build' || hoveredNode === 'deploy') ? 'blue' : ''}`}></div>
            </div>
            <div className="workflow-graph-nodes-row">
              <div 
                className={`workflow-graph-node ${hoveredNode === 'report-build-status' ? 'hovered' : ''} ${hoveredNode === 'deploy' ? 'faded' : ''}`}
                onClick={() => handleGraphNodeClick('report-build-status')}
                onMouseEnter={() => setHoveredNode('report-build-status')}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <div className="graph-node-content">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="graph-node-icon success">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                  </svg>
                  <span className="graph-node-name">report-build-status</span>
                  <span className="graph-node-duration">3s</span>
                </div>
              </div>
              <div 
                className={`workflow-graph-node ${hoveredNode === 'deploy' ? 'hovered' : ''} ${hoveredNode === 'report-build-status' ? 'faded' : ''}`}
                onClick={() => handleGraphNodeClick('deploy')}
                onMouseEnter={() => setHoveredNode('deploy')}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <div className="graph-node-content">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="graph-node-icon success">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                  </svg>
                      <span className="graph-node-name">deploy</span>
                      <span className="graph-node-duration">8s</span>
                      <a 
                        href={`#${workflowRun.route}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(workflowRun.route);
                        }}
                        className="graph-node-url"
                      >
                        {workflowRun.route === '/' ? 'http://localhost:3000/Portfolio#/' : `http://localhost:3000/Portfolio#${workflowRun.route}`}
                      </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Artifacts Section */}
        <div className="artifacts-section" ref={artifactsRef}>
          <h3 className="artifacts-title">Artifacts</h3>
          <p className="artifacts-subtitle">Produced during runtime</p>
          <div className="artifacts-table">
            <div className="artifacts-table-header">
              <div className="artifacts-header-col">Name</div>
              <div className="artifacts-header-col">Size</div>
              <div className="artifacts-header-col">Digest</div>
            </div>
            {workflowRun.artifacts.map((artifact: any, index: number) => (
              <div key={index} className="artifacts-table-row">
                <div className="artifacts-col-name">
                  <span>{artifact.name}</span>
                  {artifact.expired && (
                    <span className="artifact-expired-badge">Expired</span>
                  )}
                </div>
                <div className="artifacts-col-size">{artifact.size}</div>
                <div className="artifacts-col-digest">
                  <code>{artifact.digest}</code>
                  <button className="copy-digest-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 0110.25 15h-7.5A1.75 1.75 0 011 13.25v-7.5z"></path>
                      <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

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
        <button className="repo-tab active" onClick={() => {
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

      {/* Workflow Run Content */}
      <div className="workflow-run-content">
        <div className="workflow-run-layout">
          {/* Left Sidebar */}
          <div className="workflow-run-sidebar">
            <div className="workflow-sidebar-section">
              <div 
                className={`workflow-sidebar-item ${activeTab === 'summary' && !selectedJob ? 'active' : ''}`}
                onClick={() => { setActiveTab('summary'); setSelectedJob(null); }}
                style={{ cursor: 'pointer' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                  <path d="M8 4.5a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4.5z"></path>
                </svg>
                <span>Summary</span>
              </div>
            </div>
            <div className="workflow-sidebar-section">
              <div className="workflow-sidebar-header">
                <span>All jobs</span>
                <button 
                  className="filter-icon-btn"
                  onClick={() => setShowFilter(!showFilter)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm2 4A.75.75 0 013.75 6h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 013 6.75zm2 4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 015 10.75z"></path>
                  </svg>
                </button>
                {showFilter && (
                  <div className="filter-dropdown">
                    <div className="filter-dropdown-item active">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                      </svg>
                      <span>All</span>
                      <span className="filter-count">3</span>
                    </div>
                    <div className="filter-dropdown-item">
                      <span>Queued</span>
                      <span className="filter-count">0</span>
                    </div>
                    <div className="filter-dropdown-item">
                      <span>In progress</span>
                      <span className="filter-count">0</span>
                    </div>
                    <div className="filter-dropdown-item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                      </svg>
                      <span>Successful</span>
                      <span className="filter-count">3</span>
                    </div>
                    <div className="filter-dropdown-item">
                      <span>Failed</span>
                      <span className="filter-count">0</span>
                    </div>
                    <div className="filter-dropdown-item">
                      <span>Cancelled</span>
                      <span className="filter-count">0</span>
                    </div>
                    <div className="filter-dropdown-item">
                      <span>Skipped</span>
                      <span className="filter-count">0</span>
                    </div>
                    <div className="filter-dropdown-item">
                      <span>Action required</span>
                      <span className="filter-count">0</span>
                    </div>
                    <div className="filter-dropdown-item">
                      <span>Timed out</span>
                      <span className="filter-count">0</span>
                    </div>
                  </div>
                )}
              </div>
              {workflowRun.jobs.map((job: any) => (
                <div 
                  key={job.name} 
                  className={`workflow-job-item ${selectedJob === job.name ? 'active' : ''}`}
                  onClick={() => handleJobClick(job.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="job-status-icon success">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                  </svg>
                  <span>{job.name}</span>
                </div>
              ))}
            </div>
            <div className="workflow-sidebar-separator"></div>
            <div className="workflow-sidebar-section">
              <div 
                className={`workflow-sidebar-item ${activeTab === 'usage' ? 'active' : ''}`}
                onClick={() => { setActiveTab('usage'); setSelectedJob(null); }}
                style={{ cursor: 'pointer' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zm7.25-3.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>
                </svg>
                <span>Usage</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="workflow-run-main">
            <div className="workflow-run-header">
              <div className="workflow-run-title">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" className="workflow-status-icon success">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                </svg>
                <a 
                  href={`#${workflowRun.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(workflowRun.route);
                  }}
                  className="workflow-run-title-link"
                >
                  {workflowRun.name} #{workflowRun.run_number}
                </a>
              </div>
              <div className="workflow-menu-container" style={{ position: 'relative' }}>
                <button 
                  className="workflow-run-menu-btn"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  </svg>
                </button>
                {showMenu && (
                  <div className="workflow-menu-dropdown">
                    <div className="workflow-menu-item">Hope you enjoyed viewing this log</div>
                  </div>
                )}
              </div>
            </div>

            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowRunPage;
