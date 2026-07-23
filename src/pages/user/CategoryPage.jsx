import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../data/userStore';
import { Category3DIcon, HomeIcon, CategoriesIcon } from '../../components/icons';
import Hearts from '../../components/Hearts';
import HeartsModal from '../../components/HeartsModal';
import './CategoryPage.css';

export default function CategoryPage() {
  const navigate = useNavigate();
  const user = useUser();
  const [isHeartsOpen, setIsHeartsOpen] = useState(false);
  
  const studyCategories = user.categories || [];
  const units = user.units || [];

  // Determine the last studied category
  const lastCategoryId = user.lastCategoryId;
  const currentCategory = lastCategoryId
    ? (studyCategories.find((cat) => cat.id === lastCategoryId) || studyCategories[0])
    : null;



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

    // Calculate category level based on completed lessons
    const categoryLevel = 1 + completedLessonsForCat;

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
              <Hearts count={user.hearts} onClick={() => setIsHeartsOpen(true)} />
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
                  <h2 className="category-section-heading continue-learning" id="category-continue-learning-title">Continue Learning</h2>
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
                  <h2 className="category-section-heading more-categories" id="category-more-categories-title">More Categories</h2>
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
                <h2 className="category-section-heading study-categories" id="category-study-categories-title">Study Categories</h2>
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
      <HeartsModal isOpen={isHeartsOpen} onClose={() => setIsHeartsOpen(false)} />
    </div>
  );
}
