import { useNavigate } from 'react-router-dom';
import { useUser } from '../data/userStore';
import { studyCategories, units, leagueData } from '../data/mockData';
import { Category3DIcon, HomeIcon, CategoriesIcon, TrophyIcon, LeaderboardIcon } from '../components/icons';
import './CategoryPage.css';

export default function CategoryPage() {
  const navigate = useNavigate();
  const user = useUser();

  // Determine the last studied category
  const lastCategoryId = user.lastCategoryId;
  const currentCategory = lastCategoryId
    ? (studyCategories.find((cat) => cat.id === lastCategoryId) || studyCategories[0])
    : null;

  // Sort categories so that the active category is on top of the list (if any)
  const sortedCategories = lastCategoryId
    ? [...studyCategories].sort((a, b) => {
      if (a.id === lastCategoryId) return -1;
      if (b.id === lastCategoryId) return 1;
      return 0;
    })
    : studyCategories;

  // Calculate the total of levels of all categories
  const totalLevels = studyCategories.reduce((sum, category) => {
    const unitsForCat = units.filter((u) => u.category === category.id);
    const completedUnitsForCat = unitsForCat.filter(unit =>
      unit.levels.every(level => user.completedLessons.includes(`${unit.id}-${level.id}`))
    ).length;
    return sum + (1 + completedUnitsForCat);
  }, 0);

  // Get active category ID for leaderboard calculations
  const activeCategoryId = lastCategoryId || 'grammar-foundation';

  // Calculate user level in active category
  const activeUnits = units.filter((u) => u.category === activeCategoryId);
  const activeCompletedUnitsCount = activeUnits.filter(unit =>
    ['easy', 'medium1', 'medium2', 'hard1', 'hard2'].every(lvl =>
      user.completedLessons.includes(`${unit.id}-${lvl}`)
    )
  ).length;
  const userActiveLevel = 1 + activeCompletedUnitsCount;

  // Mock list of user rankings (matches LeaderboardPage logic)
  const getMockUserLevel = (uName) => {
    const strVal = (activeCategoryId + uName).length;
    return 1 + (strVal % 5); // Level 1 to 5
  };

  const allLeaderboardUsers = [
    ...(leagueData?.weeklyLeaderboard?.slice(0, 8) || []).map(u => ({ ...u, isYou: false })),
    { name: user.authProfile?.displayName || user.name || 'You', xp: user.totalXP, isYou: true },
    ...(leagueData?.weeklyLeaderboard?.slice(8) || []).map(u => ({ ...u, isYou: false })),
  ].map(u => {
    const level = u.isYou ? userActiveLevel : getMockUserLevel(u.name);
    return { ...u, level };
  });

  allLeaderboardUsers.sort((a, b) => {
    if (b.level !== a.level) return b.level - a.level;
    return b.xp - a.xp;
  });

  const userRank = allLeaderboardUsers.findIndex(u => u.isYou) + 1;


  const renderCategoryCard = (category) => {
    const isCurrent = lastCategoryId && category.id === lastCategoryId;
    // Calculate progress for this category
    const unitsForCat = units.filter((u) => u.category === category.id);
    const totalLessonsForCat = unitsForCat.length * 5;
    let completedLessonsForCat = 0;
    unitsForCat.forEach((unit) => {
      ['easy', 'medium1', 'medium2', 'hard1', 'hard2'].forEach((lvl) => {
        if (user.completedLessons.includes(`${unit.id}-${lvl}`)) {
          completedLessonsForCat++;
        }
      });
    });
    const progressPercent = totalLessonsForCat > 0
      ? Math.round((completedLessonsForCat / totalLessonsForCat) * 100)
      : 0;

    // Calculate category level based on completed units
    const completedUnitsCount = unitsForCat.filter((unit) =>
      ['easy', 'medium1', 'medium2', 'hard1', 'hard2'].every((lvl) =>
        user.completedLessons.includes(`${unit.id}-${lvl}`)
      )
    ).length;
    const categoryLevel = 1 + completedUnitsCount;

    const borderStyle = isCurrent
      ? {
        borderColor: category.color,
        backgroundColor: `${category.color}0A` // ~4% opacity tint matching category brand color
      }
      : {};

    return (
      <div
        key={category.id}
        className={`category-item-card ${isCurrent ? 'active' : ''}`}
        onClick={() => navigate(`/learn/${category.id}`)}
        id={isCurrent ? 'continue-learning-card' : `cat-card-${category.id}`}
        style={borderStyle}
      >
        <div className="category-item-info">
          <div className="category-item-title-row">
            <h3 className="category-item-title">{category.title}</h3>
          </div>
          <p className="category-item-desc">{category.description}</p>
          <div className="category-card-progress">
            <div className="category-card-progress-bar">
              <div
                className="category-card-progress-fill"
                style={{
                  width: `${progressPercent}%`,
                  background: category.color
                }}
              />
            </div>
            <span className="category-card-progress-text">
              {completedLessonsForCat} / {totalLessonsForCat}
            </span>
          </div>
        </div>
        <div className="category-item-icon-wrapper">
          <Category3DIcon letter={category.iconChar} color={category.color} size={64} />
          <span className="category-level-badge">LV. {categoryLevel}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="category-page" id="category-page">
      <div className="category-scroll">
        <div className="linkedin-profile-card" id="category-welcome-banner">
          {/* Hero Banner SVG */}
          <div className="linkedin-hero-wrapper">
            <svg className="linkedin-hero-banner" viewBox="0 0 600 90" width="100%" height="90" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
              <defs>
                <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#75D2FF" />
                  <stop offset="100%" stopColor="#BBE7FF" />
                </linearGradient>
              </defs>

              {/* Sky Background */}
              <rect width="600" height="90" fill="url(#skyGradient)" />

              {/* Cloud 1 (Back Layer) */}
              <g className="banner-cloud cloud-back">
                <rect x="0" y="0" width="70" height="22" rx="11" fill="white" />
                <circle cx="25" cy="0" r="16" fill="white" />
                <circle cx="45" cy="-2" r="14" fill="white" />
              </g>

              {/* Cloud 2 (Mid Layer) */}
              <g className="banner-cloud cloud-mid">
                <rect x="0" y="0" width="50" height="16" rx="8" fill="white" />
                <circle cx="18" cy="-2" r="12" fill="white" />
                <circle cx="32" cy="-4" r="10" fill="white" />
              </g>

              {/* Bird 1 (Right to Left) */}
              <g className="bird-container bird-fly-1">
                <path className="bird-wing-up" d="M 0,6 Q 4,-2 8,4 Q 12,-2 16,6 Q 10,3 8,5 Q 6,3 0,6 Z" fill="#5B8FB9" />
                <path className="bird-wing-down" d="M 0,2 Q 4,10 8,4 Q 12,10 16,2 Q 10,3 8,5 Q 6,3 0,2 Z" fill="#5B8FB9" />
              </g>

              {/* Bird 2 (Left to Right, flipped) */}
              <g className="bird-container bird-fly-2">
                <path className="bird-wing-up" d="M 0,6 Q 4,-2 8,4 Q 12,-2 16,6 Q 10,3 8,5 Q 6,3 0,6 Z" fill="#5B8FB9" opacity="0.8" />
                <path className="bird-wing-down" d="M 0,2 Q 4,10 8,4 Q 12,10 16,2 Q 10,3 8,5 Q 6,3 0,2 Z" fill="#5B8FB9" opacity="0.8" />
              </g>

              {/* Cloud 3 (Front Layer) */}
              <g className="banner-cloud cloud-front">
                <rect x="0" y="0" width="36" height="12" rx="6" fill="white" />
                <circle cx="13" cy="-1" r="8" fill="white" />
                <circle cx="23" cy="-2" r="7" fill="white" />
              </g>
            </svg>
          </div>

          {/* Details Section (containing profile photo, greeting, stats, and weekly streak) */}
          <div className="linkedin-profile-details">
            <div className="linkedin-profile-main-row">
              <div className="linkedin-avatar-container-static">
                {user.authProfile?.photoURL ? (
                  <img src={user.authProfile.photoURL} alt="Avatar" className="linkedin-avatar-image" />
                ) : (
                  <div className="linkedin-avatar-placeholder">
                    {(user.authProfile?.displayName || user.name || 'L').slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="linkedin-greeting-row">
                <h2 className="linkedin-name-row">
                  Hi, {(user.authProfile?.displayName || user.name || 'Learner').split(' ')[0]}! 👋
                </h2>
              </div>
            </div>

            {/* Profile Statistics Grid */}
            <div className="profile-stats-grid">
              {/* Stat 1: Streak */}
              <div className="profile-stat-card">
                {/* Custom Inline Orange Flame SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 7 9 7 14C7 16.76 9.24 19 12 19C14.76 19 17 16.76 17 14C17 9 12 2 12 2Z" fill="#FF9600" />
                  <path d="M12 7C12 7 9.5 11.5 9.5 14C9.5 15.38 10.62 16.5 12 16.5C13.38 16.5 14.5 15.38 14.5 14C14.5 11.5 12 7 12 7Z" fill="#FFC800" />
                </svg>
                <span className="profile-stat-value">{user.streak || 0} Day{user.streak !== 1 && 's'}</span>
                <span className="profile-stat-label">Streak</span>
              </div>

              {/* Stat 2: Total Levels */}
              <div className="profile-stat-card" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                <TrophyIcon size={24} />
                <span className="profile-stat-value">LV. {totalLevels}</span>
                <span className="profile-stat-label">Total Levels</span>
              </div>

              {/* Stat 3: Server Rank */}
              <div className="profile-stat-card" onClick={() => navigate('/leaderboard')} style={{ cursor: 'pointer' }}>
                <LeaderboardIcon active={true} size={24} />
                <span className="profile-stat-value">Rank #{userRank}</span>
                <span className="profile-stat-label">Server Rank</span>
              </div>
            </div>


          </div>
        </div>

        {lastCategoryId ? (
          <>
            {/* Continue Learning Section */}
            <div className="category-section">
              <div className="category-section-header">
                <div className="category-section-title-wrapper continue-learning-header">
                  <div className="category-section-icon-wrapper orange-icon">
                    <HomeIcon active={true} size={24} />
                  </div>
                  <h2>Continue Learning</h2>
                </div>
              </div>
              <div className="category-grid">
                {currentCategory && renderCategoryCard(currentCategory)}
              </div>
            </div>

            {/* Other Categories Section */}
            <div className="category-section">
              <div className="category-section-header">
                <div className="category-section-title-wrapper other-categories-header">
                  <div className="category-section-icon-wrapper blue-icon">
                    <CategoriesIcon active={true} size={24} />
                  </div>
                  <h2>More Categories</h2>
                </div>
              </div>
              <div className="category-grid">
                {studyCategories
                  .filter((category) => category.id !== lastCategoryId)
                  .map((category) => renderCategoryCard(category))}

                {/* Locked / Future track card */}
                <div className="category-item-card locked">
                  <div className="category-item-info">
                    <h3 className="category-item-title">More Categories</h3>
                    <p className="category-item-desc">Business English, Slang, Travel Hacks coming soon!</p>
                  </div>
                  <div className="category-item-icon-wrapper opacity-50">
                    <Category3DIcon letter="?" color="#CCCCCC" size={64} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* General/New User Study Categories Section */
          <div className="category-section">
            <div className="category-section-header">
              <div className="category-section-title-wrapper study-categories-header">
                <div className="category-section-icon-wrapper blue-icon">
                  <CategoriesIcon active={true} size={24} />
                </div>
                <h2>Study Categories</h2>
              </div>
            </div>
            <div className="category-grid">
              {studyCategories.map((category) => renderCategoryCard(category))}

              {/* Locked / Future track card */}
              <div className="category-item-card locked">
                <div className="category-item-info">
                  <h3 className="category-item-title">More Categories</h3>
                  <p className="category-item-desc">Business English, Slang, Travel Hacks coming soon!</p>
                </div>
                <div className="category-item-icon-wrapper opacity-50">
                  <Category3DIcon letter="?" color="#CCCCCC" size={64} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
