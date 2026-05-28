import { useUser } from '../data/userStore';
import BottomNav from '../components/BottomNav';
import './LeaderboardPage.css';

const mockUsers = [
  { name: 'Pierre', xp: 1250, color: '#FF9600', initials: 'P' },
  { name: 'Marie', xp: 980, color: '#CE82FF', initials: 'M' },
  { name: 'Jean', xp: 450, color: '#1CB0F6', initials: 'J' },
  { name: 'Sophie', xp: 320, color: '#FF4B4B', initials: 'S' },
];

const medals = ['🥇', '🥈', '🥉', '', ''];

export default function LeaderboardPage() {
  const user = useUser();

  // Insert user at rank 3
  const allUsers = [
    ...mockUsers.slice(0, 2),
    { name: 'You', xp: user.totalXP, color: '#58CC02', initials: 'L', isYou: true },
    ...mockUsers.slice(2),
  ];

  // Sort by XP
  allUsers.sort((a, b) => b.xp - a.xp);

  return (
    <div className="leaderboard-page" id="leaderboard-page">
      <div className="leaderboard-header">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--color-purple)">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
        <h2>Leaderboard</h2>
      </div>

      <div className="leaderboard-list">
        {allUsers.map((u, index) => (
          <div
            key={u.name}
            className={`leaderboard-row ${u.isYou ? 'leaderboard-row-you' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="leaderboard-rank">
              {medals[index] || index + 1}
            </span>
            <div
              className="leaderboard-avatar"
              style={{ background: u.color }}
            >
              {u.initials}
            </div>
            <span className="leaderboard-name">{u.name}</span>
            <span className="leaderboard-xp">
              <span className="leaderboard-xp-icon">⚡</span>
              {u.xp} XP
            </span>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
