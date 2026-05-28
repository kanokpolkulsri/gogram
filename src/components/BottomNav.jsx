import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const HomeIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L6 20H42L24 6Z" fill="#FF4B4B" />
    <path d="M24 6L24 20H42L24 6Z" fill="#EA2C2C" opacity="0.15" />
    <path d="M9 20V40C9 41.1 9.9 42 11 42H37C38.1 42 39 41.1 39 40V20H9Z" fill="#FFC800" />
    <path d="M20 30V42H28V30H20Z" fill="#FF4B4B" />
    <circle cx="22" cy="36" r="1.5" fill="#FFFFFF" />
  </svg>
);

const LettersIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="24" y="34" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="32" fontWeight="900" fill="#1CB0F6">あ</text>
  </svg>
);

const PracticeIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-45 24 24)">
      <rect x="10" y="21" width="28" height="6" rx="3" fill="#1CB0F6" />
      <rect x="6" y="14" width="6" height="20" rx="3" fill="#0092DF" />
      <rect x="2" y="10" width="4" height="28" rx="2" fill="#1CB0F6" />
      <rect x="36" y="14" width="6" height="20" rx="3" fill="#0092DF" />
      <rect x="42" y="10" width="4" height="28" rx="2" fill="#1CB0F6" />
    </g>
  </svg>
);

const LeaderboardIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L8 8V22C8 32.4 14.8 42.1 24 44C33.2 42.1 40 32.4 40 22V8L24 4Z" fill="#FFC800" />
    <path d="M24 4L24 44C33.2 42.1 40 32.4 40 22V8L24 4Z" fill="#FF9600" opacity="0.15" />
    <path d="M24 10L14 12V22C14 29 18.2 35.5 24 38V10Z" fill="#FFE57F" opacity="0.4" />
  </svg>
);

const QuestsIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="18" width="36" height="24" rx="4" fill="#C67600" />
    <rect x="6" y="18" width="36" height="24" rx="4" fill="#A05A00" clipPath="polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" />
    <path d="M6 18H42V14C42 10.7 39.3 8 36 8H12C8.7 8 6 10.7 6 14V18Z" fill="#FFB300" />
    <rect x="20" y="15" width="8" height="8" rx="2" fill="#E5A93C" stroke="#A05A00" strokeWidth="2" />
    <circle cx="24" cy="19" r="1.5" fill="#333" />
    <rect x="10" y="8" width="4" height="34" fill="#FFC800" opacity="0.7" />
    <rect x="34" y="8" width="4" height="34" fill="#FFC800" opacity="0.7" />
  </svg>
);

const ProfileIcon = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" fill="#CE82FF" />
    <circle cx="24" cy="25" r="13" fill="#FFD0A1" />
    <path d="M11 25C11 17.8 16.8 12 24 12C31.2 12 37 17.8 37 25H11Z" fill="#CE82FF" />
    <path d="M24 12C20 12 16 15 15 19C17 18 20 19 22 21C23 18 26 16 29 17C28 14 26 12 24 12Z" fill="#B566E6" opacity="0.3" />
    <path d="M18 25Q20 27 22 25" stroke="#4B4B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M26 25Q28 27 30 25" stroke="#4B4B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M21 30Q24 33 27 30" stroke="#FF4B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

const tabs = [
  { id: 'home', label: 'Home', path: '/learn', icon: <HomeIcon /> },
  { id: 'letters', label: 'Letters', path: '/letters', icon: <LettersIcon /> },
  { id: 'practice', label: 'Practice', path: '/practice', icon: <PracticeIcon /> },
  { id: 'leaderboard', label: 'Leagues', path: '/leaderboard', icon: <LeaderboardIcon /> },
  { id: 'quests', label: 'Quests', path: '/quests', icon: <QuestsIcon /> },
  { id: 'profile', label: 'Profile', path: '/profile', icon: <ProfileIcon /> },
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
