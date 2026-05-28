import { useUser } from '../data/userStore';
import StreakFire from './StreakFire';
import './MobileHeader.css';

const FrenchFlagIcon = ({ size = 32 }) => (
  <svg 
    width={size} 
    height={size * 0.75} 
    viewBox="0 0 24 18" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    style={{ 
      display: 'inline-block', 
      verticalAlign: 'middle', 
      borderRadius: '4px', 
      boxShadow: '0 2px 0 #E5E5E5', 
      border: '1px solid #E5E5E5' 
    }}
  >
    <rect x="0" y="0" width="8" height="18" fill="#002695" />
    <rect x="8" y="0" width="8" height="18" fill="#FFFFFF" />
    <rect x="16" y="0" width="8" height="18" fill="#ED2939" />
  </svg>
);

const GemIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12 2L19 7L12 12L5 7L12 2Z" fill="#00CDFF" />
    <path d="M12 12L19 7V17L12 22V12Z" fill="#0079FF" opacity="0.85" />
    <path d="M5 7L12 12V22L5 17V7Z" fill="#00A2FF" opacity="0.95" />
    <path d="M12 2L12 12L5 7L12 2Z" fill="#84E7FF" opacity="0.6" />
  </svg>
);

const HeartIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF4B4B" />
  </svg>
);

export default function MobileHeader() {
  const user = useUser();

  return (
    <header 
      className="mobile-header mobile-only" 
      id="mobile-header"
      style={{
        backgroundColor: 'var(--color-white)'
      }}
    >
      <div className="mobile-header-stats animate-fade-in">
        {/* Language flag & XP */}
        <div className="mobile-header-stat" title="Language & XP">
          <span className="mobile-header-flag">
            <FrenchFlagIcon size={32} />
          </span>
          <span className="mobile-header-stat-val">{Math.floor((user.totalXP || 0) / 10)}</span>
        </div>

        {/* Streak */}
        <div className="mobile-header-stat" title="Streak">
          <StreakFire size={32} active={user.streak > 0} />
          <span className="mobile-header-stat-val">{user.streak}</span>
        </div>

        {/* Gems */}
        <div className="mobile-header-stat" title="Gems">
          <span className="mobile-header-gem">
            <GemIcon size={32} />
          </span>
          <span className="mobile-header-stat-val">{user.gems || 0}</span>
        </div>

        {/* Hearts */}
        <div className="mobile-header-stat" title="Hearts">
          <span className="mobile-header-heart">
            <HeartIcon size={32} />
          </span>
          <span className="mobile-header-stat-val">{user.hearts}</span>
        </div>
      </div>
    </header>
  );
}

