import { useUser, useUserDispatch } from '../data/userStore';
import {
  GearIcon,
  EditIcon,
  LightningIcon,
  TrophyIcon,
  EnglishFlagIcon,
  CheckIcon,
} from '../components/icons';
import './ProfilePage.css';

const achievements = [
  {
    id: 1,
    title: 'Star Student',
    levelText: 'LEVEL 4',
    description: 'Complete lessons to earn stars',
    progressText: (user) => `${user.completedLessons.length} / 10`,
    progressPercent: (user) => Math.min(100, (user.completedLessons.length / 10) * 100),
    isCompleted: (user) => user.completedLessons.length >= 10,
    renderBadge: (active) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill={active ? '#FFC800' : '#E5E5E5'} />
        {active && <rect x="3" y="3" width="42" height="42" rx="9" fill="#FFB300" opacity="0.3" />}
        <path d="M24 10l3.09 9.51h10.01l-8.1 5.88 3.09 9.51-8.1-5.88-8.1 5.88 3.09-9.51-8.1-5.88h10.01L24 10z" fill="white" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Wildfire',
    levelText: 'LEVEL 3',
    description: 'Maintain a day streak',
    progressText: (user) => `${user.streak} / 7`,
    progressPercent: (user) => Math.min(100, (user.streak / 7) * 100),
    isCompleted: (user) => user.streak >= 7,
    renderBadge: (active) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill={active ? '#FF9600' : '#E5E5E5'} />
        {active && <rect x="3" y="3" width="42" height="42" rx="9" fill="#FF7600" opacity="0.3" />}
        <path d="M24 11c0 0-7 8-7 14.5c0 4.1 3.1 7.5 7 7.5s7-3.4 7-7.5C31 19 24 11 24 11z" fill="white" />
        {active && <path d="M24 18c0 0-4 5-4 9c0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-4-9-4-9z" fill="#FFC800" />}
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Unit Conqueror',
    levelText: 'LEVEL 2',
    description: 'Complete units to master sections',
    progressText: (user) => `${user.completedLessons.length >= 3 ? 1 : 0} / 3`,
    progressPercent: (user) => (user.completedLessons.length >= 3 ? 100 : 0),
    isCompleted: (user) => user.completedLessons.length >= 3,
    renderBadge: (active) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill={active ? '#B566E6' : '#E5E5E5'} />
        {active && <rect x="3" y="3" width="42" height="42" rx="9" fill="#9C44CE" opacity="0.3" />}
        <path d="M14 14h20v4H14v-4zm2 8h16v4H16v-4zm4 8h8v4h-8v-4z" fill="white" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Sage',
    levelText: 'LEVEL 5',
    description: 'Earn total XP points',
    progressText: (user) => `${user.totalXP} / 1000`,
    progressPercent: (user) => Math.min(100, (user.totalXP / 1000) * 100),
    isCompleted: (user) => user.totalXP >= 1000,
    renderBadge: (active) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill={active ? '#1CB0F6' : '#E5E5E5'} />
        {active && <rect x="3" y="3" width="42" height="42" rx="9" fill="#0092DF" opacity="0.3" />}
        <path d="M24 11l-10 16h6v10l10-16h-6l10-10z" fill="white" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Regal',
    levelText: 'LEVEL 1',
    description: 'Reach a top league ranking',
    progressText: (user) => `${user.league === 'Gold' ? 1 : 0} / 1`,
    progressPercent: (user) => (user.league === 'Gold' ? 100 : 0),
    isCompleted: (user) => user.league === 'Gold',
    renderBadge: (active) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill={active ? '#58CC02' : '#E5E5E5'} />
        {active && <rect x="3" y="3" width="42" height="42" rx="9" fill="#3AA800" opacity="0.3" />}
        <path d="M24 10L14 14v10c0 5 4.5 9.5 10 11 5.5-1.5 10-6 10-11V14L24 10z" fill="white" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Champion',
    levelText: 'LEVEL 1',
    description: 'Win a weekly leaderboard',
    progressText: () => '0 / 1',
    progressPercent: () => 0,
    isCompleted: () => false,
    renderBadge: (active) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill={active ? '#CE82FF' : '#E5E5E5'} />
        {active && <rect x="3" y="3" width="42" height="42" rx="9" fill="#AA62DD" opacity="0.3" />}
        <path d="M24 12c-4.4 0-8 3.6-8 8v2c0 4.4 3.6 8 8 8s8-3.6 8-8v-2c0-4.4-3.6-8-8-8zm-8 4v4H12v-4h4zm16 0h4v4h-4v-4zm-8 16c-3 0-5.5-2.2-5.9-5h11.8c-.4 2.8-2.9 5-5.9 5z" fill="white" />
      </svg>
    ),
  },
];

export default function ProfilePage() {
  const user = useUser();
  const dispatch = useUserDispatch();

  return (
    <div className="profile-page" id="profile-page">
      <div className="profile-header">
        <h1 className="profile-header-title">Profile</h1>
        <button
          className="profile-settings-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to reset all progress?')) {
              dispatch({ type: 'RESET_PROGRESS' });
            }
          }}
          title="Reset Progress"
        >
          <GearIcon size={24} color="#AFAFAF" />
        </button>
      </div>

      <div className="profile-scroll">
        {/* Avatar Section */}
        <div className="profile-avatar-card">
          <div className="profile-avatar-container">
            {user.authProfile?.photoURL ? (
              <div className="profile-avatar-wrapper">
                <img src={user.authProfile.photoURL} alt="Avatar" className="profile-avatar-image" />
                <button className="profile-avatar-edit-btn" title="Edit Avatar">
                  <EditIcon size={14} />
                </button>
              </div>
            ) : (
              <div className="profile-avatar-silhouette">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="48" stroke="#E5E5E5" strokeWidth="2.5" strokeDasharray="6 6" />
                  <circle cx="50" cy="38" r="18" fill="#E5E5E5" />
                  <path d="M25 76c0-12 11-20 25-20s25 8 25 20H25z" fill="#E5E5E5" />
                </svg>
                <div className="profile-avatar-add-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#1CB0F6" />
                    <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <button className="profile-avatar-edit-btn" title="Edit Avatar">
                  <EditIcon size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="profile-user-info">
            <h2 className="profile-user-name">
              {user.authProfile?.displayName || user.name}
            </h2>
            <p className="profile-username">
              @{user.authProfile?.email ? user.authProfile.email.split('@')[0] : 'learner_english'}
            </p>
            <p className="profile-joined">Joined May 2026</p>
            <div className="profile-flags">
              <EnglishFlagIcon size={24} />
            </div>
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
        </div>

        {/* Invite Friends */}
        <div className="profile-invite-card">
          <div className="profile-invite-owl">
            <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="32" fill="#58CC02" />
              <circle cx="40" cy="43" r="24" fill="#89E219" />
              <circle cx="30" cy="36" r="9" fill="white" />
              <circle cx="50" cy="36" r="9" fill="white" />
              <circle cx="32" cy="36" r="4.5" fill="#333" />
              <circle cx="52" cy="36" r="4.5" fill="#333" />
              <circle cx="33" cy="34.5" r="1.5" fill="white" />
              <circle cx="53" cy="34.5" r="1.5" fill="white" />
              <ellipse cx="40" cy="46" rx="5" ry="3.5" fill="#FFC800" />
              <ellipse cx="32" cy="70" rx="6" ry="3.5" fill="#FFC800" />
              <ellipse cx="48" cy="70" rx="6" ry="3.5" fill="#FFC800" />
            </svg>
          </div>
          <div className="profile-invite-content">
            <h3 className="profile-invite-title">Invite Friends</h3>
            <p className="profile-invite-desc">Learning English is better with friends!</p>
            <button className="profile-invite-btn">INVITE FRIENDS</button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="profile-stats-section">
          <h3 className="profile-section-title">Statistics</h3>
          <div className="profile-stats-grid">
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                  <path d="M32 4C32 4 14 22 14 38C14 48.5 22 56 32 58C42 56 50 48.5 50 38C50 22 32 4 32 4Z" fill="#FF9600" />
                  <path d="M32 20C32 20 22 32 22 40C22 46 26.5 50 32 52C37.5 50 42 46 42 40C42 32 32 20 32 20Z" fill="#FFC800" />
                </svg>
              </div>
              <div className="profile-stat-text">
                <span className="profile-stat-num">{user.streak}</span>
                <span className="profile-stat-lbl">DAY STREAK</span>
              </div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <LightningIcon size={28} />
              </div>
              <div className="profile-stat-text">
                <span className="profile-stat-num">{user.totalXP}</span>
                <span className="profile-stat-lbl">TOTAL XP</span>
              </div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4L8 8v14c0 10.4 6.8 20.1 16 22 9.2-1.9 16-11.6 16-22V8L24 4z" fill="#FFC800" />
                  <path d="M24 4L24 44c9.2-1.9 16-11.6 16-22V8L24 4z" fill="#FF9600" opacity="0.15" />
                </svg>
              </div>
              <div className="profile-stat-text">
                <span className="profile-stat-num">{user.league}</span>
                <span className="profile-stat-lbl">LEAGUE</span>
              </div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <TrophyIcon size={28} />
              </div>
              <div className="profile-stat-text">
                <span className="profile-stat-num">0</span>
                <span className="profile-stat-lbl">TOP 3 FINISHES</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="profile-stats-section">
          <h3 className="profile-section-title">Achievements</h3>
          <div className="profile-achievements-list">
            {achievements.map((ach) => {
              const active = ach.isCompleted(user);
              const progressPct = ach.progressPercent(user);
              const progressVal = ach.progressText(user);

              return (
                <div key={ach.id} className={`profile-achievement-card ${active ? 'active' : 'locked'}`}>
                  <div className="profile-ach-badge-col">
                    {ach.renderBadge(active)}
                    <span className="profile-ach-badge-level">{ach.levelText}</span>
                  </div>
                  <div className="profile-ach-content-col">
                    <div className="profile-ach-text-top">
                      <span className="profile-ach-title">{ach.title}</span>
                      <span className="profile-ach-desc">{ach.description}</span>
                    </div>
                    <div className="profile-ach-progress-row">
                      <div className="profile-ach-progress-bg">
                        <div className="profile-ach-progress-bar" style={{ width: `${progressPct}%` }} />
                      </div>
                      <span className="profile-ach-progress-txt">{progressVal}</span>
                    </div>
                  </div>
                  <div className="profile-ach-status-col">
                    {active ? (
                      <CheckIcon size={22} />
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#CCCCCC">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
