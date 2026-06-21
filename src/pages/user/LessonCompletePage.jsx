import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser, useUserDispatch } from '../../data/userStore';
import { getNextLesson } from '../../data/progressHelpers';
import './LessonCompletePage.css';
import './LeaderboardPage.css';

const COMPLETION_MESSAGES = [
  "You nailed it!",
  "Superb!",
  "You're the best!",
  "This is too easy for you!",
  "Amazing job!",
  "Outstanding!",
  "Phenomenal!"
];

export default function LessonCompletePage() {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const location = useLocation();
  const user = useUser();
  const { score = 5, total = 5, xp = 15, levelUp = false, newLevel = 1, categoryTitle = '', categoryId = '' } = location.state || {};

  const activeCategoryId = categoryId || user.lastCategoryId || 'grammar';
  const unitsForCat = (user.units || []).filter((u) => u.category === activeCategoryId);
  const nextLesson = getNextLesson(user.completedLessons, unitsForCat);

  const handleContinue = () => {
    dispatch({ type: 'UPDATE_STREAK' });
    if (nextLesson) {
      navigate(`/quiz/${nextLesson.unitId}/${nextLesson.levelId}`);
    } else if (activeCategoryId) {
      navigate(`/learn/${activeCategoryId}`);
    } else {
      navigate('/learn');
    }
  };

  const handleClose = () => {
    dispatch({ type: 'UPDATE_STREAK' });
    if (activeCategoryId) {
      navigate(`/learn/${activeCategoryId}`);
    } else {
      navigate('/learn');
    }
  };
  const completedUnitsCount = unitsForCat.filter((u) =>
    ['easy', 'medium1', 'medium2', 'hard1', 'hard2'].every((lvl) =>
      user.completedLessons.includes(`${u.id}-${lvl}`)
    )
  ).length;
  const currentLevel = 1 + completedUnitsCount;
  const displayLevel = levelUp ? newLevel : currentLevel;

  const category = (user.categories || []).find((c) => c.id === activeCategoryId) || {
    id: 'grammar',
    title: 'Grammar',
    color: '#58CC02',
    iconChar: 'G'
  };

  const renderCategoryShield = (size = 140, isLevelUp = false) => {
    const colorMap = {
      '#58CC02': { base: '#58CC02', dark: '#38A800', light: '#89E219' }, // Grammar (Green)
      '#FFC800': { base: '#FFC800', dark: '#cc9f00', light: '#FFE880' }, // Yellow
      '#FF4B4B': { base: '#FF4B4B', dark: '#EA2C2C', light: '#FF8585' }, // Vocab (Red)
      '#CE82FF': { base: '#CE82FF', dark: '#AA62DD', light: '#E4B3FF' }, // Reading (Purple)
      '#1CB0F6': { base: '#1CB0F6', dark: '#0092DF', light: '#84D7FF' }, // Exam (Blue)
    };
    const categoryColor = category.color;
    const letter = category.iconChar;
    const shades = colorMap[categoryColor] || { base: categoryColor, dark: categoryColor, light: categoryColor };
    const shadowColor = isLevelUp ? 'rgba(255, 150, 0, 0.35)' : `${categoryColor}44`;

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: `drop-shadow(0 8px 16px ${shadowColor})`,
          overflow: 'visible'
        }}
      >
        {/* Base Shield */}
        <path
          d="M24 4L8 8v14c0 10.4 6.8 20.1 16 22 9.2-1.9 16-11.6 16-22V8L24 4z"
          fill={shades.base}
        />
        {/* Right Split Shadow */}
        <path
          d="M24 4L24 44c9.2-1.9 16-11.6 16-22V8L24 4z"
          fill={shades.dark}
          opacity={0.15}
        />
        {/* Inner Left Highlight */}
        <path
          d="M24 10L14 12v10c0 7 4.2 13.5 10 16V10z"
          fill={shades.light}
          opacity={0.4}
        />
        {/* Inner letter 3D shadow overlay */}
        <text
          x="24"
          y="31.5"
          textAnchor="middle"
          fill="rgba(0, 0, 0, 0.2)"
          fontWeight="900"
          fontSize="22"
          fontFamily="Nunito, system-ui, sans-serif"
        >
          {letter}
        </text>
        {/* Inner letter */}
        <text
          x="24"
          y="30"
          textAnchor="middle"
          fill="white"
          fontWeight="900"
          fontSize="22"
          fontFamily="Nunito, system-ui, sans-serif"
        >
          {letter}
        </text>
      </svg>
    );
  };

  const renderStarSVG = (size, className) => (
    <svg
      className={`shield-star ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={category.color}
      style={{ display: 'block' }}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  );

  const randomMessage = useMemo(() => {
    const idx = Math.floor(Math.random() * COMPLETION_MESSAGES.length);
    return COMPLETION_MESSAGES[idx];
  }, []);

  const userName = user.authProfile?.displayName || user.name || 'You';
  const userAvatar = user.authProfile?.photoURL || '#58CC02';
  const userInitials = user.authProfile?.displayName
    ? user.authProfile.displayName.slice(0, 2).toUpperCase()
    : 'YO';

  return (
    <div className={`complete-page ${levelUp ? 'level-up-theme' : ''}`} id="lesson-complete-page">
      <button
        className="complete-close-btn"
        onClick={handleClose}
        id="complete-close-btn"
        aria-label="Close lesson complete"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#AFAFAF">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>

      {levelUp ? (
        <div className="level-up-container animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Glowing Shield Badge with Stars */}
          <div className="lesson-complete-shield level-up-badge-container">
            {renderCategoryShield(140, true)}
            
            {/* Stars floating around */}
            <div className="shield-stars">
              {renderStarSVG(24, "shield-star-1")}
              {renderStarSVG(20, "shield-star-2")}
              {renderStarSVG(26, "shield-star-3")}
            </div>
          </div>

          {/* Title */}
          <h1 className="complete-title level-up-title" style={{ marginBottom: '8px' }}>
            Level Up!
          </h1>

          <p className="complete-level-subtitle">
            {randomMessage}
          </p>
          <div className="lesson-complete-level-card">
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
            <div className="leaderboard-user-info" style={{ textAlign: 'left' }}>
              <span className="leaderboard-name">{userName}</span>
            </div>
            <span className="leaderboard-xp">
              LV. {displayLevel}
            </span>
          </div>
        </div>
      ) : (
        <div className="lesson-complete-container animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Golden Shield with Stars */}
          <div className="lesson-complete-shield">
            {renderCategoryShield(140, false)}
            
            {/* Stars floating around */}
            <div className="shield-stars">
              {renderStarSVG(24, "shield-star-1")}
              {renderStarSVG(20, "shield-star-2")}
              {renderStarSVG(26, "shield-star-3")}
            </div>
          </div>

          {/* Title */}
          <h1 className="complete-title">Lesson Complete!</h1>

          <p className="complete-level-subtitle">
            {randomMessage}
          </p>
          <div className="lesson-complete-level-card">
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
            <div className="leaderboard-user-info" style={{ textAlign: 'left' }}>
              <span className="leaderboard-name">{userName}</span>
            </div>
            <span className="leaderboard-xp">
              LV. {displayLevel}
            </span>
          </div>
        </div>
      )}

      {/* Continue */}
      <div className="complete-bottom">
        <button
          className="btn btn-orange"
          onClick={handleContinue}
          id="complete-continue-btn"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
