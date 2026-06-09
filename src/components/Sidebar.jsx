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
    </aside>
  );
}
