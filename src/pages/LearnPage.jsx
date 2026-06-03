import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { units, studyCategories } from '../data/mockData';
import { useUser, useUserDispatch } from '../data/userStore';
import { isLessonUnlocked, isLessonCompleted, getNextLesson } from '../data/progressHelpers';
import LessonNode from '../components/LessonNode';
import './LearnPage.css';

// Snake path offsets: zigzag pattern for 5 nodes per unit
const snakeOffsets = [0, -50, -80, -40, 10];

export default function LearnPage() {
  const { categoryId = 'grammar-foundation' } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const dispatch = useUserDispatch();

  // Find the category info (fallback to first category if invalid)
  const categoryInfo = studyCategories.find((c) => c.id === categoryId) || studyCategories[0];

  // Filter units to show this category's units
  const categoryUnits = units.filter((u) => u.category === categoryInfo.id);

  // Keep userStore updated with the last studied category
  useEffect(() => {
    dispatch({ type: 'SET_LAST_CATEGORY', categoryId: categoryInfo.id });
  }, [categoryInfo.id, dispatch]);

  const nextLesson = getNextLesson(user.completedLessons, categoryUnits);

  return (
    <div className="learn-page" id="learn-page">
      {/* Category Header with Back Arrow */}
      <div className="learn-category-header" style={{ backgroundColor: categoryInfo.color }}>
        <button 
          className="learn-back-btn" 
          onClick={() => navigate('/learn')}
          id="learn-back-btn"
          aria-label="Back to dashboard"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span>Dashboard</span>
        </button>
        <div className="learn-category-title-wrap">
          <span className="learn-category-lbl">CATEGORY STUDY</span>
          <h1 className="learn-category-name">{categoryInfo.title}</h1>
        </div>
      </div>

      <div className="learn-scroll-area">
        {categoryUnits.map((unit, unitIndex) => (
          <div key={unit.id} className="learn-unit">
            {/* Unit Header */}
            <div
              className="learn-unit-header"
              style={{ backgroundColor: unit.color }}
            >
              <div className="learn-unit-header-content">
                <div>
                  <div className="learn-unit-section">{unit.section}</div>
                  <h2 className="learn-unit-title">{unit.title}</h2>
                </div>
                <div className="learn-unit-guide-btn" title="Guidebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                  </svg>
                  <span className="learn-unit-guide-label">GUIDEBOOK</span>
                </div>
              </div>
            </div>

            {/* Lesson Path */}
            <div className="learn-path">
              {unit.levels.map((level, levelIndex) => {
                const unlocked = isLessonUnlocked(user.completedLessons, unit.id, level.id, categoryUnits);
                const completed = isLessonCompleted(user.completedLessons, unit.id, level.id);
                const isNext = nextLesson && nextLesson.unitId === unit.id && nextLesson.levelId === level.id;

                let status = 'locked';
                if (completed) status = 'completed';
                else if (isNext) status = 'active';
                else if (unlocked) status = 'active';

                let tooltipText = undefined;
                if (levelIndex === 3) tooltipText = `LEVEL ${unit.id}`;
                else if (levelIndex === 4) tooltipText = 'START';

                return (
                  <div
                    key={level.id}
                    className="learn-path-node"
                    style={{ transform: `translateX(${snakeOffsets[levelIndex]}px)` }}
                  >
                    <LessonNode
                      status={status}
                      label={`${unit.id}-${level.id}`}
                      color={unit.color}
                      index={unitIndex * 5 + levelIndex}
                      icon={level.icon}
                      tooltipText={tooltipText}
                      onClick={() => navigate(`/quiz/${unit.id}/${level.id}`)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Jump here button between units */}
            {unitIndex < categoryUnits.length - 1 && (
              <div className="learn-jump-here">
                <div className="learn-jump-divider">
                  <span className="learn-jump-text">{categoryUnits[unitIndex + 1].title}</span>
                </div>
                <button className="learn-jump-btn">JUMP HERE?</button>
              </div>
            )}
          </div>
        ))}

        {/* All done message if completed everything in this category */}
        {!nextLesson && (
          <div className="learn-complete-message">
            <h3>🎉 Category completed!</h3>
            <p>You&apos;ve completed all lessons in {categoryInfo.title}! Choose another category on the dashboard.</p>
            <button className="btn btn-primary" onClick={() => navigate('/learn')} style={{ marginTop: '16px' }}>
              BACK TO DASHBOARD
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
