import { useNavigate } from 'react-router-dom';
import { useUser } from '../data/userStore';
import { studyCategories, units } from '../data/mockData';
import { Category3DIcon } from '../components/icons';
import StreakFire from '../components/StreakFire';
import './CategoryPage.css';

export default function CategoryPage() {
  const navigate = useNavigate();
  const user = useUser();

  // Determine the last studied category (default to grammar-foundation)
  const lastCategoryId = user.lastCategoryId || 'grammar-foundation';
  const currentCategory = studyCategories.find((cat) => cat.id === lastCategoryId) || studyCategories[0];

  // Sort categories so that the active category is on top of the list
  const sortedCategories = [...studyCategories].sort((a, b) => {
    if (a.id === lastCategoryId) return -1;
    if (b.id === lastCategoryId) return 1;
    return 0;
  });

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
          <div className="category-section-header">
            <h2>Study Categories</h2>
            <div className="learn-header-streak" title="Total Level">
              <StreakFire size={22} active={true} />
              <span className="learn-header-streak-val">LV. {totalLevels}</span>
            </div>
          </div>
          <div className="category-grid">
            {sortedCategories.map((category) => {
              const isCurrent = category.id === lastCategoryId;
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
                <p className="category-item-desc">Business French, Slang, Travel Hacks coming soon!</p>
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
