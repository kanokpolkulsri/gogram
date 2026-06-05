import { useUser } from '../data/userStore';
import { leagueData } from '../data/mockData';
import { FrenchFlagIcon, GemIcon, HeartIcon } from './icons';
import StreakFire from './StreakFire';
import './RightSidebar.css';

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
          <span className="right-sidebar-stat-val">
            {Math.floor((user.totalXP || 0) / 10)}
          </span>
        </div>
        <div className="right-sidebar-stat" title="Streak">
          <StreakFire size={20} />
          <span className="right-sidebar-stat-val stat-streak">
            {user.streak}
          </span>
        </div>
        <div className="right-sidebar-stat" title="Gems">
          <GemIcon size={18} />
          <span className="right-sidebar-stat-val stat-gems">
            {user.gems || 0}
          </span>
        </div>
        <div className="right-sidebar-stat" title="Hearts">
          <HeartIcon size={18} />
          <span className="right-sidebar-stat-val stat-hearts">
            {user.hearts}
          </span>
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
              <circle cx="100" cy="100" r="80" fill="#1CB0F6" />
              <circle cx="100" cy="100" r="65" fill="#58CC02" />
              <ellipse cx="100" cy="115" rx="40" ry="40" fill="#89E219" />
              <circle cx="82" cy="88" r="14" fill="white" />
              <circle cx="118" cy="88" r="14" fill="white" />
              <circle cx="86" cy="88" r="7" fill="#333" />
              <circle cx="122" cy="88" r="7" fill="#333" />
              <circle cx="88" cy="86" r="2.5" fill="white" />
              <circle cx="124" cy="86" r="2.5" fill="white" />
              <ellipse cx="100" cy="105" rx="7" ry="4" fill="#FFC800" />
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
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <p className="league-card-text">
            Complete a lesson to join this week&apos;s leaderboard and compete against other learners
          </p>
        </div>
      </div>
    </aside>
  );
}
