import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  LeaderboardIcon,
  ProfileIcon,
  LettersIcon,
} from './icons';
import './Sidebar.css';

const sidebarTabs = [
  {
    id: 'categories',
    label: 'Categories',
    path: '/dashboard',
    Icon: HomeIcon,
  },
  {
    id: 'learn',
    label: 'Learn',
    path: '/learn',
    Icon: LettersIcon,
  },
  {
    id: 'leaderboards',
    label: 'Leaderboards',
    path: '/leaderboard',
    Icon: LeaderboardIcon,
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    Icon: ProfileIcon,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar" id="sidebar">
      {/* Sky banner with clouds and birds */}
      <div className="sidebar-banner">
        <svg viewBox="0 0 250 90" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="sidebarSkyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#75D2FF" />
              <stop offset="100%" stopColor="#BBE7FF" />
            </linearGradient>
          </defs>

          {/* Sky Background */}
          <rect width="250" height="90" fill="url(#sidebarSkyGradient)" />

          {/* Cloud 1 (Back Layer) */}
          <g className="sidebar-cloud cloud-back">
            <rect width="45" height="14" rx="7" fill="white" opacity="0.85" />
            <circle cx="15" cy="0" r="11" fill="white" opacity="0.85" />
            <circle cx="28" cy="-1" r="10" fill="white" opacity="0.85" />
          </g>

          {/* Cloud 2 (Front Layer) */}
          <g className="sidebar-cloud cloud-front">
            <rect width="55" height="16" rx="8" fill="white" />
            <circle cx="20" cy="-2" r="12" fill="white" />
            <circle cx="35" cy="-4" r="10" fill="white" />
          </g>

          {/* Bird 1 (Right to Left) */}
          <g className="sidebar-bird bird-r2l">
            <path className="bird-wing-up" d="M 0,6 Q 4,-2 8,4 Q 12,-2 16,6 Q 10,3 8,5 Q 6,3 0,6 Z" fill="#5B8FB9" />
            <path className="bird-wing-down" d="M 0,2 Q 4,10 8,4 Q 12,10 16,2 Q 10,3 8,5 Q 6,3 0,2 Z" fill="#5B8FB9" />
          </g>

          {/* Bird 2 (Left to Right) */}
          <g className="sidebar-bird bird-l2r">
            <path className="bird-wing-up" d="M 0,6 Q 4,-2 8,4 Q 12,-2 16,6 Q 10,3 8,5 Q 6,3 0,6 Z" fill="#5B8FB9" opacity="0.8" />
            <path className="bird-wing-down" d="M 0,2 Q 4,10 8,4 Q 12,10 16,2 Q 10,3 8,5 Q 6,3 0,2 Z" fill="#5B8FB9" opacity="0.8" />
          </g>
        </svg>
      </div>

      <div className="sidebar-content">
        {/* Logo — text only */}
        <Link to="/learn" className="sidebar-logo" id="sidebar-logo">
          <span className="sidebar-logo-text">GoGram</span>
        </Link>

        {/* Navigation — icon + label */}
        <nav className="sidebar-nav">
          {sidebarTabs.map((tab) => {
            const isActive = tab.path === '/learn'
              ? location.pathname.startsWith('/learn')
              : location.pathname === tab.path;

            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`sidebar-tab ${isActive ? 'active' : ''}`}
                id={`sidebar-${tab.id}`}
                title={tab.label}
              >
                <span className="sidebar-tab-icon">
                  <tab.Icon active={isActive} />
                </span>
                <span className="sidebar-tab-label">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
