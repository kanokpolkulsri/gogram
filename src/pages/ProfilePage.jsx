import { useUser, useUserDispatch } from '../data/userStore';
import StreakFire from '../components/StreakFire';
import './ProfilePage.css';

const achievements = [
  {
    id: 1,
    icon: '⭐',
    title: 'First Lesson',
    description: 'Complete your first lesson',
    condition: (user) => user.completedLessons.length >= 1,
  },
  {
    id: 2,
    icon: '🔥',
    title: '3-Day Streak',
    description: 'Maintain a 3-day streak',
    condition: (user) => user.streak >= 3,
  },
  {
    id: 3,
    icon: '🏆',
    title: 'Unit Master',
    description: 'Complete an entire unit',
    condition: (user) =>
      ['1-easy', '1-medium', '1-hard'].every((l) => user.completedLessons.includes(l)) ||
      ['2-easy', '2-medium', '2-hard'].every((l) => user.completedLessons.includes(l)),
  },
  {
    id: 4,
    icon: '💎',
    title: 'XP Hunter',
    description: 'Earn 100 XP total',
    condition: (user) => user.totalXP >= 100,
  },
  {
    id: 5,
    icon: '❤️',
    title: 'Perfect Round',
    description: 'Complete a lesson without losing a heart',
    condition: () => false,
  },
  {
    id: 6,
    icon: '🌟',
    title: 'Weekly Champion',
    description: 'Finish #1 on the weekly leaderboard',
    condition: () => false,
  },
];

// Generate streak calendar (last 7 weeks)
function generateStreakCalendar() {
  const weeks = [];
  const today = new Date();
  for (let w = 6; w >= 0; w--) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + (6 - d)));
      // Mock: random streak days, more likely if recent
      const isActive = Math.random() > (w > 3 ? 0.7 : 0.4);
      week.push({
        date: date.toISOString().split('T')[0],
        active: isActive,
        intensity: isActive ? Math.ceil(Math.random() * 3) : 0,
      });
    }
    weeks.push(week);
  }
  return weeks;
}

const streakCalendar = generateStreakCalendar();

export default function ProfilePage() {
  const user = useUser();
  const dispatch = useUserDispatch();

  return (
    <div className="profile-page" id="profile-page">
      <div className="profile-scroll">
        {/* Avatar */}
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            <span>L</span>
          </div>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-joined">Joined May 2026</p>
          <div className="profile-social">
            <span className="profile-social-stat">
              <strong>{user.following || 12}</strong> Following
            </span>
            <span className="profile-social-divider">·</span>
            <span className="profile-social-stat">
              <strong>{user.followers || 8}</strong> Followers
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="profile-stat">
            <StreakFire size={28} />
            <span className="profile-stat-value">{user.streak}</span>
            <span className="profile-stat-label">Day Streak</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-emoji">⚡</span>
            <span className="profile-stat-value">{user.totalXP}</span>
            <span className="profile-stat-label">Total XP</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-emoji">🏆</span>
            <span className="profile-stat-value">{user.league || 'Gold'}</span>
            <span className="profile-stat-label">Current League</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-emoji">💎</span>
            <span className="profile-stat-value">{user.gems || 0}</span>
            <span className="profile-stat-label">Gems</span>
          </div>
        </div>

        {/* Activity Calendar */}
        <div className="profile-section">
          <h3 className="profile-section-title">Activity</h3>
          <div className="profile-calendar">
            <div className="profile-calendar-labels">
              {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((label, i) => (
                <span key={i} className="profile-calendar-label">{label}</span>
              ))}
            </div>
            <div className="profile-calendar-grid">
              {streakCalendar.map((week, wi) => (
                <div key={wi} className="profile-calendar-week">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={`profile-calendar-day intensity-${day.intensity}`}
                      title={day.date}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="profile-section">
          <h3 className="profile-section-title">Achievements</h3>
          <div className="profile-achievements">
            {achievements.map((ach) => {
              const unlocked = ach.condition(user);
              return (
                <div
                  key={ach.id}
                  className={`profile-achievement ${unlocked ? 'unlocked' : 'locked'}`}
                >
                  <span className="profile-achievement-icon">{ach.icon}</span>
                  <div className="profile-achievement-info">
                    <span className="profile-achievement-title">{ach.title}</span>
                    <span className="profile-achievement-desc">{ach.description}</span>
                  </div>
                  {unlocked && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-green)">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset */}
        <button
          className="profile-reset-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all progress?')) {
              dispatch({ type: 'RESET_PROGRESS' });
            }
          }}
          id="profile-reset-btn"
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
}
