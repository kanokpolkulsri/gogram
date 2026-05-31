import { useUser } from '../data/userStore';
import { FrenchFlagIcon, GemIcon, HeartIcon } from './icons';
import StreakFire from './StreakFire';
import './MobileHeader.css';

export default function MobileHeader() {
  const user = useUser();

  return (
    <header
      className="mobile-header mobile-only"
      id="mobile-header"
    >
      <div className="mobile-header-stats animate-fade-in">
        {/* Language flag & XP */}
        <div className="mobile-header-stat" title="Language & XP">
          <span className="mobile-header-flag">
            <FrenchFlagIcon size={32} />
          </span>
          <span className="mobile-header-stat-val">
            {Math.floor((user.totalXP || 0) / 10)}
          </span>
        </div>

        {/* Streak */}
        <div className="mobile-header-stat" title="Streak">
          <StreakFire size={32} active={user.streak > 0} />
          <span className="mobile-header-stat-val stat-streak">
            {user.streak}
          </span>
        </div>

        {/* Gems */}
        <div className="mobile-header-stat" title="Gems">
          <span className="mobile-header-gem">
            <GemIcon size={32} />
          </span>
          <span className="mobile-header-stat-val stat-gems">
            {user.gems || 0}
          </span>
        </div>

        {/* Hearts */}
        <div className="mobile-header-stat" title="Hearts">
          <span className="mobile-header-heart">
            <HeartIcon size={32} />
          </span>
          <span className="mobile-header-stat-val stat-hearts">
            {user.hearts}
          </span>
        </div>
      </div>
    </header>
  );
}
