import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  LeaderboardIcon,
  QuestsIcon,
  GemIcon,
  ProfileIcon,
  MoreIcon,
} from './icons';
import './Sidebar.css';

const sidebarTabs = [
  {
    id: 'learn',
    label: 'LEARN',
    path: '/learn',
    Icon: HomeIcon,
  },
  {
    id: 'leaderboards',
    label: 'LEADERBOARDS',
    path: '/leaderboard',
    Icon: LeaderboardIcon,
  },
  {
    id: 'quests',
    label: 'QUESTS',
    path: '/quests',
    Icon: QuestsIcon,
  },
  {
    id: 'shop',
    label: 'SHOP',
    path: '/shop',
    Icon: GemIcon,
  },
  {
    id: 'profile',
    label: 'PROFILE',
    path: '/profile',
    Icon: ProfileIcon,
  },
  {
    id: 'more',
    label: 'MORE',
    path: null,
    Icon: MoreIcon,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    }

    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoreMenu]);

  return (
    <aside className="sidebar" id="sidebar">
      {/* Logo */}
      <Link to="/learn" className="sidebar-logo" id="sidebar-logo">
        <svg width="30" height="30" viewBox="0 0 200 200" fill="none">
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
        <span className="sidebar-logo-text">duolingo</span>
      </Link>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {sidebarTabs.map((tab) => {
          const isActive = tab.path && location.pathname === tab.path;
          
          if (!tab.path) {
            return (
              <div key={tab.id} className="sidebar-more-container" ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  className={`sidebar-tab ${showMoreMenu ? 'active' : ''}`}
                  id={`sidebar-${tab.id}`}
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                >
                  <span className="sidebar-tab-icon">
                    <tab.Icon active={showMoreMenu} />
                  </span>
                  <span className="sidebar-tab-label">{tab.label}</span>
                </button>
                {showMoreMenu && (
                  <div className="sidebar-more-dropdown" id="sidebar-more-dropdown">
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowMoreMenu(false)}>
                      <span className="dropdown-item-emoji">⚙️</span>
                      <span className="dropdown-item-label">SETTINGS</span>
                    </Link>
                    <a href="https://support.duolingo.com" target="_blank" rel="noopener noreferrer" className="dropdown-item" onClick={() => setShowMoreMenu(false)}>
                      <span className="dropdown-item-emoji">❓</span>
                      <span className="dropdown-item-label">HELP</span>
                    </a>
                    <hr className="dropdown-divider" />
                    <Link to="/" className="dropdown-item logout" onClick={() => setShowMoreMenu(false)}>
                      <span className="dropdown-item-emoji">🚪</span>
                      <span className="dropdown-item-label">LOG OUT</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`sidebar-tab ${isActive ? 'active' : ''}`}
              id={`sidebar-${tab.id}`}
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
