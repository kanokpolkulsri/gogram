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
      <svg width="32" height="32" viewBox="0 0 46 46" fill="none">
        <path d="M23 5L8 14V32L23 41L38 32V14L23 5Z" fill="currentColor"/>
        <path d="M23 5L8 14L23 23L38 14L23 5Z" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
  {
    id: 'letters',
    label: 'LETTERS',
    path: '/letters',
    icon: (
      <svg width="32" height="32" viewBox="0 0 46 46" fill="none">
        <text x="10" y="33" fontFamily="Nunito, sans-serif" fontSize="28" fontWeight="800" fill="currentColor">字</text>
      </svg>
    ),
  },
  {
    id: 'practice',
    label: 'PRACTICE',
    path: '/practice',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8H4.69c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'leaderboards',
    label: 'LEADERBOARDS',
    path: '/leaderboard',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'quests',
    label: 'QUESTS',
    path: '/quests',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'shop',
    label: 'SHOP',
    path: '/shop',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'PROFILE',
    path: '/profile',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'more',
    label: 'MORE',
    path: null,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
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
