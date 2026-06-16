import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  LeaderboardIcon,
  QuestsIcon,
  ProfileIcon,
  LettersIcon,
} from './icons';
import './BottomNav.css';

const tabs = [
  { id: 'categories', path: '/dashboard', Icon: HomeIcon },
  { id: 'home', path: '/learn', Icon: LettersIcon },
  { id: 'leaderboard', path: '/leaderboard', Icon: LeaderboardIcon },
  { id: 'profile', path: '/profile', Icon: ProfileIcon },
];

export default function BottomNav() {
  const location = useLocation();

  const handleScrollToTop = (tabId) => {
    if (tabId !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bottom-nav" id="bottom-nav">
      {tabs.map((tab) => {
        const isActive = tab.path === '/learn'
          ? location.pathname.startsWith('/learn')
          : location.pathname === tab.path;
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className={`bottom-nav-tab ${isActive ? 'active' : ''}`}
            id={`nav-${tab.id}`}
            onClick={() => handleScrollToTop(tab.id)}
          >
            <tab.Icon active={isActive} />
          </Link>
        );
      })}
    </nav>
  );
}
