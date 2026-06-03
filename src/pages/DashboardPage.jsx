import { useNavigate } from 'react-router-dom';
import { useUser } from '../data/userStore';
import { studyCategories, units } from '../data/mockData';
import { Category3DIcon } from '../components/icons';
import DuolingoOwl from '../components/DuolingoOwl';
import './DashboardPage.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useUser();

  // Determine the last studied category (default to grammar-foundation)
  const lastCategoryId = user.lastCategoryId || 'grammar-foundation';
  const currentCategory = studyCategories.find((cat) => cat.id === lastCategoryId) || studyCategories[0];

  // Get progress for the active category to display in Continue Learning card
  const categoryUnits = units.filter((u) => u.category === currentCategory.id);
  const totalCategoryLessons = categoryUnits.length * 5; // 5 levels per unit
  let completedCategoryLessons = 0;
  categoryUnits.forEach((unit) => {
    ['easy', 'medium1', 'medium2', 'hard1', 'hard2'].forEach((lvl) => {
      if (user.completedLessons.includes(`${unit.id}-${lvl}`)) {
        completedCategoryLessons++;
      }
    });
  });

  const categoryProgressPercent = totalCategoryLessons > 0
    ? Math.round((completedCategoryLessons / totalCategoryLessons) * 100)
    : 0;

  return (
    <div className="dashboard-page" id="dashboard-page">
      <div className="dashboard-scroll">
        
        {/* Section 1: Today's Review */}
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Today&apos;s Review</h2>
          <div className="review-card">
            <div className="review-card-content">
              <span className="super-pill-badge">SUPER</span>
              <h3 className="review-card-title">Unit Rewind</h3>
              <p className="review-card-desc">
                Keep your memory fresh with this review of Unit 1!
              </p>
              <button 
                className="review-unlock-btn"
                onClick={() => navigate('/quiz/1/easy')}
                id="review-unlock-btn"
              >
                UNLOCK
              </button>
            </div>
            <div className="review-card-owl-wrapper">
              <div className="review-floating-deco">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#7C4DFF" opacity="0.3" />
                  <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14h-2v-2h2zm0-4h-2V7h2z" fill="white" />
                </svg>
              </div>
              <div className="review-coin-bottom"></div>
              <div className="review-owl-mascot">
                <DuolingoOwl size={95} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Continue Learning */}
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Continue Learning</h2>
          <div 
            className="continue-learning-card"
            onClick={() => navigate(`/learn/${currentCategory.id}`)}
            id="continue-learning-card"
            style={{ cursor: 'pointer' }}
          >
            <div className="continue-card-icon-col">
              <Category3DIcon letter={currentCategory.iconChar} color={currentCategory.color} size={54} />
            </div>
            <div className="continue-card-body-col">
              <div className="continue-card-header-row">
                <span className="continue-card-title">{currentCategory.title}</span>
                <span className="continue-card-badge">ACTIVE</span>
              </div>
              <p className="continue-card-desc">
                Resume your learning path and master new lessons!
              </p>
              <div className="continue-card-progress-row">
                <div className="continue-card-progress-bg">
                  <div 
                    className="continue-card-progress-bar" 
                    style={{ 
                      width: `${Math.max(5, categoryProgressPercent)}%`,
                      backgroundColor: currentCategory.color
                    }} 
                  />
                </div>
                <span className="continue-card-progress-txt">
                  {completedCategoryLessons} / {totalCategoryLessons} Completed
                </span>
              </div>
            </div>
            <button className="continue-card-start-btn">
              START
            </button>
          </div>
        </div>

        {/* Section 3: Categories */}
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Category</h2>
          <div className="category-grid">
            {studyCategories.map((category) => {
              const isCurrent = category.id === lastCategoryId;
              return (
                <div 
                  key={category.id} 
                  className={`category-item-card ${isCurrent ? 'active' : ''}`}
                  onClick={() => navigate(`/learn/${category.id}`)}
                  id={`cat-card-${category.id}`}
                >
                  <div className="category-item-info">
                    <h3 className="category-item-title">{category.title}</h3>
                    <p className="category-item-desc">{category.description}</p>
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
