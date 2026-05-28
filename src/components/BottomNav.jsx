import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const tabs = [
  {
    id: 'home',
    label: 'Home',
    path: '/learn',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'practice',
    label: 'Practice',
    path: '/practice',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M20.27 4.74a4.93 4.93 0 0 0-3.12-1.27c-1.3 0-2.5.46-3.47 1.34L12 6.42l-1.68-1.61A4.93 4.93 0 0 0 6.85 3.47c-1.17 0-2.28.44-3.12 1.27a4.93 4.93 0 0 0 0 6.82L12 20l8.27-8.44a4.93 4.93 0 0 0 0-6.82z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'leaderboard',
    label: 'Leagues',
    path: '/leaderboard',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav" id="bottom-nav">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className={`bottom-nav-tab ${isActive ? 'active' : ''}`}
            id={`nav-${tab.id}`}
          >
            <span className="bottom-nav-icon">{tab.icon}</span>
            <span className="bottom-nav-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
