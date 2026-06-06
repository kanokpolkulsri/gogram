import { useNavigate } from 'react-router-dom';
import { useUser } from '../data/userStore';
import { studyCategories, units } from '../data/mockData';
import { Category3DIcon, HomeIcon } from '../components/icons';
import StreakFire from '../components/StreakFire';
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

  return (
    <div className="category-page" id="category-page">
      <div className="category-scroll">

        {/* Categories Grid */}
        <div className="category-section">
          {!lastCategoryId && (
            <div className="category-welcome-banner animate-fade-in" id="category-welcome-banner">
              <div className="welcome-banner-owl">
                <svg width="48" height="48" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="90" fill="#58CC02" />
                  <ellipse cx="100" cy="110" rx="50" ry="55" fill="#89E219" />
                  <circle cx="82" cy="85" r="14" fill="white" />
                  <circle cx="118" cy="85" r="14" fill="white" />
                  <circle cx="86" cy="85" r="7" fill="#333" />
                  <circle cx="122" cy="85" r="7" fill="#333" />
                  <circle cx="88" cy="83" r="2.5" fill="white" />
                  <circle cx="124" cy="83" r="2.5" fill="white" />
                  <ellipse cx="100" cy="102" rx="7" ry="4" fill="#FFC800" />
                </svg>
              </div>
              <div className="welcome-banner-text">
                <h3>Welcome to Gogram!</h3>
                <p>Select a category below to start your English learning journey.</p>
              </div>
            </div>
          )}

          <div className="category-section-header">
            <div className="category-section-title-wrapper">
              <HomeIcon active={true} size={28} />
              <h2>Study Categories</h2>
            </div>
            {lastCategoryId && (
              <div className="learn-header-streak" title="Total Level">
                <StreakFire size={22} active={true} />
                <span className="learn-header-streak-val">LV. {totalLevels}</span>
              </div>
            )}
          </div>
          <div className="category-grid">
            {sortedCategories.map((category) => {
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
                      {isCurrent && <span className="category-active-badge">ACTIVE</span>}
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
                  </div>
                </div>
              );
            })}

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

      </div>
    </div>
  );
}
