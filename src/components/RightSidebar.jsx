import { useUser } from '../data/userStore';
import { dailyQuests, leagueData } from '../data/mockData';
import StreakFire from './StreakFire';
import './RightSidebar.css';

const FrenchFlagIcon = ({ size = 24 }) => (
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

const GemIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12 2L19 7L12 12L5 7L12 2Z" fill="#00CDFF" />
    <path d="M12 12L19 7V17L12 22V12Z" fill="#0079FF" opacity="0.85" />
    <path d="M5 7L12 12V22L5 17V7Z" fill="#00A2FF" opacity="0.95" />
    <path d="M12 2L12 12L5 7L12 2Z" fill="#84E7FF" opacity="0.6" />
  </svg>
);

const HeartIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF4B4B" />
  </svg>
);

export default function RightSidebar() {
  const user = useUser();

  return (
    <aside className="right-sidebar" id="right-sidebar">
      {/* Top stats bar */}
      <div className="right-sidebar-stats" id="right-sidebar-stats">
        <div className="right-sidebar-stat" title="Language">
          <span className="right-sidebar-flag">
            <FrenchFlagIcon size={24} />
          </span>
          <span className="right-sidebar-stat-val">{Math.floor((user.totalXP || 0) / 10)}</span>
        </div>
        <div className="right-sidebar-stat" title="Streak">
          <StreakFire size={20} />
          <span className="right-sidebar-stat-val">{user.streak}</span>
        </div>
        <div className="right-sidebar-stat" title="Gems">
          <span className="right-sidebar-gem">
            <GemIcon size={18} />
          </span>
          <span className="right-sidebar-stat-val">{user.gems || 0}</span>
        </div>
        <div className="right-sidebar-stat" title="Hearts">
          <span className="right-sidebar-heart">
            <HeartIcon size={18} />
          </span>
          <span className="right-sidebar-stat-val">{user.hearts}</span>
        </div>
      </div>

      {/* Super Duolingo promo */}
      <div className="right-sidebar-card promo-card" id="promo-card">
        <div className="promo-card-header">
          <span className="promo-badge">SUPER</span>
          <div className="promo-card-text">
            <h3>Try Super for free</h3>
            <p>No ads, personalized practice, and unlimited Legendary!</p>
          </div>
          <div className="promo-card-owl">
            <svg width="60" height="60" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" fill="#1CB0F6"/>
              <circle cx="100" cy="100" r="65" fill="#58CC02"/>
              <ellipse cx="100" cy="110" rx="40" ry="45" fill="#89E219"/>
              <circle cx="85" cy="90" r="11" fill="white"/>
              <circle cx="115" cy="90" r="11" fill="white"/>
              <circle cx="88" cy="90" r="5.5" fill="#333"/>
              <circle cx="118" cy="90" r="5.5" fill="#333"/>
              <ellipse cx="100" cy="105" rx="6" ry="3.5" fill="#FFC800"/>
            </svg>
          </div>
        </div>
        <button className="promo-card-btn btn">TRY 1 WEEK FREE</button>
      </div>

      {/* League card */}
      <div className="right-sidebar-card league-card" id="league-card">
        <div className="league-card-header">
          <h3>{leagueData.currentLeague} League</h3>
          <button className="league-card-link">VIEW LEAGUE</button>
        </div>
        <div className="league-card-body">
          <div className="league-card-icon">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="#FFC800">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <p className="league-card-text">Complete a lesson to join this week&apos;s leaderboard and compete against other learners</p>
        </div>
      </div>

      {/* Daily Quests */}
      <div className="right-sidebar-card quests-card" id="quests-card">
        <div className="quests-card-header">
          <h3>Daily Quests</h3>
          <button className="quests-card-link">VIEW ALL</button>
        </div>
        <div className="quests-card-list">
          {dailyQuests.slice(0, 3).map((quest) => (
            <div key={quest.id} className="quest-item">
              <span className="quest-item-icon" style={{ color: quest.iconColor }}>
                {quest.icon}
              </span>
              <div className="quest-item-info">
                <span className="quest-item-title">{quest.title}</span>
                <div className="quest-item-progress-wrapper">
                  <div className="quest-item-progress-bar">
                    <div
                      className="quest-item-progress-fill"
                      style={{
                        width: `${Math.min(100, (quest.current / quest.target) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="quest-item-progress-text">
                    {quest.current} / {quest.target}
                  </span>
                </div>
              </div>
              <div className="quest-item-reward">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1CB0F6">
                  <path d="M12 2L9 9H2l5.5 4-2 7L12 16l6.5 4-2-7L22 9h-7L12 2z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
