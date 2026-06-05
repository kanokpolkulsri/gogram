import { useState } from 'react';
import { useUser } from '../data/userStore';
import { leagueData, studyCategories, units } from '../data/mockData';
import './LeaderboardPage.css';

const medals = ['🥇', '🥈', '🥉'];

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

  // Construct leaderboard users list
  const allUsers = [
    ...leagueData.weeklyLeaderboard.slice(0, 8).map(u => ({ ...u, isYou: false })),
    { name: 'You', country: '🇺🇸', avatar: '#58CC02', initials: 'YO', isYou: true, xp: user.totalXP },
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

  return (
    <div className="leaderboard-page" id="leaderboard-page">
      {/* Category Leaderboard header */}
      <div className="leaderboard-league-header">
        <div className="leaderboard-league-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#FFC800">
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <h1 className="leaderboard-league-title">Category Leaderboards</h1>
        <p className="leaderboard-league-sub">
          See who has reached the highest level in each study track
        </p>
      </div>

      {/* Categories leagues strip */}
      <div className="leaderboard-leagues-strip">
        {studyCategories.map((cat) => {
          const isSelected = cat.id === selectedCategoryId;
          const chipStyle = isSelected
            ? {
                backgroundColor: `${cat.color}15`,
                color: cat.color,
                borderColor: cat.color,
                borderWidth: '2px',
                borderStyle: 'solid'
              }
            : {};
          return (
            <button
              key={cat.id}
              className={`league-chip ${isSelected ? 'active' : ''}`}
              style={chipStyle}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Leaderboard list */}
      <div className="leaderboard-list">
        {allUsers.map((u, index) => {
          const isPromotion = u.rank <= leagueData.promotionZone;
          const isDemotion = u.rank > allUsers.length - leagueData.demotionZone;
          let zoneClass = '';
          if (isPromotion) zoneClass = 'promotion';
          if (isDemotion) zoneClass = 'demotion';

          return (
            <div
              key={u.name + u.rank}
              className={`leaderboard-row ${u.isYou ? 'leaderboard-row-you' : ''} ${zoneClass}`}
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <span className="leaderboard-rank">
                {u.rank <= 3 ? medals[u.rank - 1] : u.rank}
              </span>
              <div
                className="leaderboard-avatar"
                style={{ background: u.avatar }}
              >
                {u.initials}
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
