import { useState } from 'react';
import { useUser } from '../data/userStore';
import { leagueData, studyCategories, units } from '../data/mockData';
import './LeaderboardPage.css';

const medals = ['🥇', '🥈', '🥉'];

function ShieldIcon({ color, letter, isActive, size = 76 }) {
  const scale = isActive ? 1.15 : 0.82;
  const opacity = isActive ? 1 : 0.55;
  const shadowColor = `${color}55`;

  return (
    <div 
      className="shield-icon-wrapper"
      style={{ 
        transform: `scale(${scale})`, 
        opacity,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer'
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        style={{ 
          filter: isActive ? `drop-shadow(0 6px 12px ${shadowColor})` : 'none',
          overflow: 'visible'
        }}
      >
        <path
          d="M24 4L8 8v14c0 10.4 6.8 20.1 16 22 9.2-1.9 16-11.6 16-22V8L24 4z"
          fill={isActive ? color : '#E5E5E5'}
        />
        {/* Right side shadow overlay for 3D depth */}
        <path 
          d="M24 4L24 44c9.2-1.9 16-11.6 16-22V8L24 4z" 
          fill="#000000" 
          opacity={isActive ? 0.15 : 0.1} 
        />
        {/* Inner left highlight for 3D depth */}
        <path 
          d="M24 10L14 12v10c0 7 4.2 13.5 10 16V10z" 
          fill="#FFFFFF" 
          opacity={isActive ? 0.12 : 0.20} 
        />
        {/* Inner letter 3D shadow overlay (active only) */}
        {isActive && (
          <text 
            x="24" 
            y="31.5" 
            textAnchor="middle" 
            fill="rgba(0, 0, 0, 0.25)" 
            fontWeight="900" 
            fontSize="22" 
            fontFamily="Nunito, system-ui, sans-serif"
          >
            {letter}
          </text>
        )}
        {/* Inner letter */}
        <text 
          x="24" 
          y="30" 
          textAnchor="middle" 
          fill={isActive ? 'white' : '#555555'} 
          fontWeight="900" 
          fontSize="22" 
          fontFamily="Nunito, system-ui, sans-serif"
        >
          {letter}
        </text>
      </svg>
    </div>
  );
}

export default function LeaderboardPage() {
  const user = useUser();

  // Load the active category or fallback to the first one
  const initialCategoryId = user.lastCategoryId || 'grammar-foundation';
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);

  const selectedCategory = studyCategories.find((c) => c.id === selectedCategoryId) || studyCategories[0];

  // Helper to calculate or get level for each user
  const getLevel = (uName, isYou) => {
    if (isYou) {
      const unitsForCat = units.filter((u) => u.category === selectedCategoryId);
      const completedUnitsCount = unitsForCat.filter(unit => 
        unit.levels.every(level => user.completedLessons.includes(`${unit.id}-${level.id}`))
      ).length;
      return 1 + completedUnitsCount;
    }
    // Dynamic mock user levels based on categoryId and username hashing
    const strVal = (selectedCategoryId + uName).length;
    const mockBase = 1 + (strVal % 5); // Level 1 to 5
    return mockBase;
  };

  // Determine user display details
  const userName = user.authProfile?.displayName || user.name || 'You';
  const userAvatar = user.authProfile?.photoURL || '#58CC02';
  const userInitials = user.authProfile?.displayName 
    ? user.authProfile.displayName.slice(0, 2).toUpperCase() 
    : 'YO';

  // Construct leaderboard users list
  const allUsers = [
    ...leagueData.weeklyLeaderboard.slice(0, 8).map(u => ({ ...u, isYou: false })),
    { name: userName, country: '🇺🇸', avatar: userAvatar, initials: userInitials, isYou: true, xp: user.totalXP },
    ...leagueData.weeklyLeaderboard.slice(8).map(u => ({ ...u, isYou: false })),
  ].map(u => {
    const level = getLevel(u.name, u.isYou);
    return { ...u, level };
  });

  // Re-sort primarily by Level (highest level first) and secondarily by XP
  allUsers.sort((a, b) => {
    if (b.level !== a.level) {
      return b.level - a.level;
    }
    return b.xp - a.xp;
  });

  // Reassign ranks
  allUsers.forEach((u, i) => (u.rank = i + 1));

  // Find logged in user rank
  const youUser = allUsers.find(u => u.isYou);
  const youRank = youUser ? youUser.rank : 9;
  const youLevel = youUser ? youUser.level : 1;

  return (
    <div className="leaderboard-page" id="leaderboard-page">
      {/* Category Shield Row */}
      <div className="leaderboard-shields-row" id="leaderboard-shields-row">
        {studyCategories.map((cat) => {
          const isSelected = cat.id === selectedCategoryId;
          return (
            <div
              key={cat.id}
              className="leaderboard-shield-item"
              onClick={() => setSelectedCategoryId(cat.id)}
              title={cat.title}
            >
              <ShieldIcon
                color={cat.color}
                letter={cat.iconChar}
                isActive={isSelected}
                size={76}
              />
            </div>
          );
        })}
      </div>

      {/* Category Leaderboard header */}
      <div className="leaderboard-league-header">
        <h1 className="leaderboard-league-title">{selectedCategory.title} Board</h1>
        <p className="leaderboard-league-sub">
          See who has reached the highest level in this study track
        </p>
      </div>

      {/* Leaderboard list */}
      <div className="leaderboard-list">
        {allUsers.map((u, index) => {
          const isPromotion = u.rank <= leagueData.promotionZone;
          const isDemotion = u.rank > allUsers.length - leagueData.demotionZone;
          let zoneClass = '';
          if (isPromotion) zoneClass = 'promotion';
          if (isDemotion) zoneClass = 'demotion';

          const renderAvatar = () => {
            if (u.avatar.startsWith('#')) {
              return (
                <div className="leaderboard-avatar" style={{ background: u.avatar }}>
                  {u.initials}
                </div>
              );
            }
            return <img src={u.avatar} alt={u.name} className="leaderboard-avatar-img" />;
          };

          return (
            <div
              key={u.name + u.rank}
              className={`leaderboard-row ${u.isYou ? 'leaderboard-row-you' : ''} ${zoneClass}`}
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <span className="leaderboard-rank">
                {u.rank <= 3 ? medals[u.rank - 1] : u.rank}
              </span>
              <div className="leaderboard-avatar-container">
                {renderAvatar()}
                {u.isYou && <span className="leaderboard-status-dot" />}
              </div>
              <div className="leaderboard-user-info">
                <span className="leaderboard-name">{u.name}</span>
                <span className="leaderboard-country">{u.country}</span>
              </div>
              <span className="leaderboard-xp" style={{ color: selectedCategory.color, fontWeight: '800' }}>
                LV. {u.level}
              </span>
              {isPromotion && (
                <span className="leaderboard-zone-badge promotion-badge">▲</span>
              )}
              {isDemotion && (
                <span className="leaderboard-zone-badge demotion-badge">▼</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky footer for the current user */}
      <div className="leaderboard-sticky-footer" id="leaderboard-sticky-footer">
        <div className="leaderboard-row leaderboard-row-you">
          <span className="leaderboard-rank">
            {youRank <= 3 ? medals[youRank - 1] : youRank}
          </span>
          <div className="leaderboard-avatar-container">
            {userAvatar.startsWith('#') ? (
              <div className="leaderboard-avatar" style={{ background: userAvatar }}>
                {userInitials}
              </div>
            ) : (
              <img src={userAvatar} alt={userName} className="leaderboard-avatar-img" />
            )}
            <span className="leaderboard-status-dot" />
          </div>
          <div className="leaderboard-user-info">
            <span className="leaderboard-name">{userName}</span>
            <span className="leaderboard-country">🇺🇸</span>
          </div>
          <span className="leaderboard-xp" style={{ color: selectedCategory.color, fontWeight: '800' }}>
            LV. {youLevel}
          </span>
        </div>
      </div>

      {/* Zone legend */}
      <div className="leaderboard-legend">
        <div className="leaderboard-legend-item">
          <span className="leaderboard-legend-dot promotion-dot" />
          <span>Top Levels</span>
        </div>
        <div className="leaderboard-legend-item">
          <span className="leaderboard-legend-dot demotion-dot" />
          <span>Bottom Levels</span>
        </div>
      </div>
    </div>
  );
}
