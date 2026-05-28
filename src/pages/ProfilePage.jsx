import { useUser, useUserDispatch } from '../data/userStore';
import BottomNav from '../components/BottomNav';
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
];

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
            <span className="profile-stat-emoji">❤️</span>
            <span className="profile-stat-value">{user.hearts}</span>
            <span className="profile-stat-label">Hearts</span>
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

      <BottomNav />
    </div>
  );
}
