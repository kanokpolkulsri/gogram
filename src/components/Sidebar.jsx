import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../data/userStore';
import './Sidebar.css';

const sidebarTabs = [
  {
    id: 'learn',
    label: 'LEARN',
    path: '/learn',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6L6 20H42L24 6Z" fill="#FF4B4B" />
        <path d="M24 6L24 20H42L24 6Z" fill="#EA2C2C" opacity="0.15" />
        <path d="M9 20V40C9 41.1 9.9 42 11 42H37C38.1 42 39 41.1 39 40V20H9Z" fill="#FFC800" />
        <path d="M20 30V42H28V30H20Z" fill="#FF4B4B" />
        <circle cx="22" cy="36" r="1.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'letters',
    label: 'LETTERS',
    path: '/letters',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="24" y="36" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="34" fontWeight="900" fill="#1CB0F6">あ</text>
      </svg>
    ),
  },
  {
    id: 'practice',
    label: 'PRACTICE',
    path: '/practice',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(-45 24 24)">
          <rect x="10" y="21" width="28" height="6" rx="3" fill="#1CB0F6" />
          <rect x="6" y="14" width="6" height="20" rx="3" fill="#0092DF" />
          <rect x="2" y="10" width="4" height="28" rx="2" fill="#1CB0F6" />
          <rect x="36" y="14" width="6" height="20" rx="3" fill="#0092DF" />
          <rect x="42" y="10" width="4" height="28" rx="2" fill="#1CB0F6" />
        </g>
      </svg>
    ),
  },
  {
    id: 'leaderboards',
    label: 'LEADERBOARDS',
    path: '/leaderboard',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4L8 8V22C8 32.4 14.8 42.1 24 44C33.2 42.1 40 32.4 40 22V8L24 4Z" fill="#FFC800" />
        <path d="M24 4L24 44C33.2 42.1 40 32.4 40 22V8L24 4Z" fill="#FF9600" opacity="0.15" />
        <path d="M24 10L14 12V22C14 29 18.2 35.5 24 38V10Z" fill="#FFE57F" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'quests',
    label: 'QUESTS',
    path: '/quests',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="18" width="36" height="24" rx="4" fill="#C67600" />
        <rect x="6" y="18" width="36" height="24" rx="4" fill="#A05A00" clipPath="polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" />
        <path d="M6 18H42V14C42 10.7 39.3 8 36 8H12C8.7 8 6 10.7 6 14V18Z" fill="#FFB300" />
        <rect x="20" y="15" width="8" height="8" rx="2" fill="#E5A93C" stroke="#A05A00" strokeWidth="2" />
        <circle cx="24" cy="19" r="1.5" fill="#333" />
        <rect x="10" y="8" width="4" height="34" fill="#FFC800" opacity="0.7" />
        <rect x="34" y="8" width="4" height="34" fill="#FFC800" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'shop',
    label: 'SHOP',
    path: '/shop',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="18" width="36" height="24" rx="4" fill="#C67600" />
        <rect x="6" y="18" width="36" height="24" rx="4" fill="#A05A00" clipPath="polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" />
        <path d="M6 18H42V14C42 10.7 39.3 8 36 8H12C8.7 8 6 10.7 6 14V18Z" fill="#FFB300" />
        <rect x="20" y="15" width="8" height="8" rx="2" fill="#E5A93C" stroke="#A05A00" strokeWidth="2" />
        <circle cx="24" cy="19" r="1.5" fill="#333" />
        <rect x="10" y="8" width="4" height="34" fill="#FFC800" opacity="0.7" />
        <rect x="34" y="8" width="4" height="34" fill="#FFC800" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'PROFILE',
    path: '/profile',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18" fill="#CE82FF" />
        <circle cx="24" cy="25" r="13" fill="#FFD0A1" />
        <path d="M11 25C11 17.8 16.8 12 24 12C31.2 12 37 17.8 37 25H11Z" fill="#CE82FF" />
        <path d="M24 12C20 12 16 15 15 19C17 18 20 19 22 21C23 18 26 16 29 17C28 14 26 12 24 12Z" fill="#B566E6" opacity="0.3" />
        <path d="M18 25Q20 27 22 25" stroke="#4B4B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M26 25Q28 27 30 25" stroke="#4B4B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M21 30Q24 33 27 30" stroke="#FF4B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'more',
    label: 'MORE',
    path: null,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#4B4B4B" />
      </svg>
    ),
  },
];


export default function Sidebar() {
  const location = useLocation();
  const user = useUser();
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
                  <span className="sidebar-tab-icon">{tab.icon}</span>
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
              <span className="sidebar-tab-icon">{tab.icon}</span>
              <span className="sidebar-tab-label">{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Chess promo (bottom of sidebar) */}
      <div className="sidebar-promo" id="sidebar-promo">
        <div className="sidebar-promo-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#AFAFAF">
            <path d="M17.71 6.15l1.44-1.44a.996.996 0 10-1.41-1.41L16.3 4.73C14.76 3.65 12.95 3 11 3 6.03 3 2 7.03 2 12s4.03 9 9 9 9-4.03 9-9c0-1.95-.65-3.76-1.73-5.21l1.44-1.44-.71-.71-1.29 1.29L17.71 6.15zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
            <path d="M12.5 8H11v5l4.28 2.54.72-1.21-3.5-2.08V8z"/>
          </svg>
        </div>
        <div className="sidebar-promo-text">
          <span className="sidebar-promo-title">Want to learn chess?</span>
          <span className="sidebar-promo-sub">Duolingo makes it easy!</span>
        </div>
        <button className="sidebar-promo-btn">TRY CHESS</button>
      </div>
    </aside>
  );
}
