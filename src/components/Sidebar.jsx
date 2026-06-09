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
      {/* Logo — owl icon + text */}
      <Link to="/learn" className="sidebar-logo" id="sidebar-logo">
        <svg width="32" height="32" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" fill="#58CC02" />
          <ellipse cx="100" cy="110" rx="50" ry="55" fill="#89E219" />
          <circle cx="82" cy="85" r="14" fill="white" />
          <circle cx="118" cy="85" r="14" fill="white" />
          <circle cx="86" cy="85" r="7" fill="#333" />
          <circle cx="122" cy="85" r="7" fill="#333" />
          <circle cx="88" cy="83" r="2.5" fill="white" />
          <circle cx="124" cy="83" r="2.5" fill="white" />
          <ellipse cx="100" cy="102" rx="7" ry="4" fill="#FFC800" />
        </svg>
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
    </aside>
  );
}
