import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  LeaderboardIcon,
  ProfileIcon,
  LettersIcon,
  GearIcon,
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

  const handleScrollToTop = (isActive) => {
    if (isActive) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <aside className="sidebar" id="sidebar">
      {/* Logo — brand icon + text */}
      <Link to="/learn" className="sidebar-logo" id="sidebar-logo" onClick={() => handleScrollToTop(location.pathname.startsWith('/learn'))}>
        <svg className="sidebar-logo-icon" width="32" height="32" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB000" />
              <stop offset="100%" stopColor="#FF8500" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="100" fill="url(#logo-grad)" />
          {/* A beautiful white letter 'G' in the center */}
          <path d="M135 70C125 55 110 45 90 45C60 45 40 70 40 100C40 130 60 155 90 155C120 155 135 130 135 110H95" stroke="white" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <span className="sidebar-logo-text">GramGo</span>
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
              onClick={() => handleScrollToTop(isActive)}
            >
              <span className="sidebar-tab-icon">
                <tab.Icon active={isActive} />
              </span>
              <span className="sidebar-tab-label">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
