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
  {
    id: 'admin',
    label: 'Admin Panel',
    path: '/admin',
    Icon: GearIcon,
  },
];

export default function Sidebar() {
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="sidebar" id="sidebar">
      {/* Logo — owl icon + text */}
      <Link to="/learn" className="sidebar-logo" id="sidebar-logo" onClick={handleScrollToTop}>
        <svg width="32" height="32" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="100" fill="#FF9600" />
          {/* Eye whites */}
          <circle cx="68" cy="90" r="24" fill="white" />
          <circle cx="132" cy="90" r="24" fill="white" />
          {/* Pupils */}
          <circle cx="68" cy="90" r="12" fill="#333" />
          <circle cx="132" cy="90" r="12" fill="#333" />
          {/* Highlights */}
          <circle cx="71" cy="87" r="4" fill="white" />
          <circle cx="135" cy="87" r="4" fill="white" />
          {/* Beak */}
          <ellipse cx="100" cy="122" rx="9" ry="5" fill="#FFC800" />
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
              onClick={handleScrollToTop}
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
