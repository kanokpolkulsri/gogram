import { useUser } from '../data/userStore';
import { leagueData } from '../data/mockData';
import './LeaderboardPage.css';

const medals = ['🥇', '🥈', '🥉'];

export default function LeaderboardPage() {
  const user = useUser();

  // Insert user at their position
  const allUsers = [
    ...leagueData.weeklyLeaderboard.slice(0, 8),
    { rank: 9, name: 'You', xp: user.totalXP, country: '🇺🇸', avatar: '#58CC02', initials: 'YO', isYou: true },
    ...leagueData.weeklyLeaderboard.slice(8),
  ];

  // Re-sort by XP
  allUsers.sort((a, b) => b.xp - a.xp);
  // Reassign ranks
  allUsers.forEach((u, i) => (u.rank = i + 1));

  return (
    <div className="leaderboard-page" id="leaderboard-page">
      {/* League header */}
      <div className="leaderboard-league-header">
        <div className="leaderboard-league-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#FFC800">
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <h1 className="leaderboard-league-title">{leagueData.currentLeague} League</h1>
        <p className="leaderboard-league-sub">
          Top {leagueData.promotionZone} advance to the next league
        </p>
      </div>

      {/* League progress */}
      <div className="leaderboard-leagues-strip">
        {leagueData.leagues.map((league) => (
          <span
            key={league}
            className={`league-chip ${league === leagueData.currentLeague ? 'active' : ''}`}
          >
            {league}
          </span>
        ))}
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
              <span className="leaderboard-xp">
                {u.xp} XP
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
          <span>Promotion Zone</span>
        </div>
        <div className="leaderboard-legend-item">
          <span className="leaderboard-legend-dot demotion-dot" />
          <span>Demotion Zone</span>
        </div>
      </div>
    </div>
  );
}
