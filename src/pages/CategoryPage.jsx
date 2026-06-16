import { useNavigate } from 'react-router-dom';
import { useUser } from '../data/userStore';
import { Category3DIcon, HomeIcon, CategoriesIcon } from '../components/icons';
import Hearts from '../components/Hearts';
import './CategoryPage.css';

export default function CategoryPage() {
  const navigate = useNavigate();
  const user = useUser();
  
  const studyCategories = user.categories || [];
  const units = user.units || [];

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

          {/* Details Section (containing profile photo and greeting) */}
          <div className="linkedin-profile-details">
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
                Hi, {(user.authProfile?.displayName || user.name || 'Learner').split(' ')[0]}!
              </h2>
            </div>
            {/* Hearts displayed at the rightmost end */}
            <div style={{ marginLeft: 'auto' }}>
              <Hearts count={user.hearts} />
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
