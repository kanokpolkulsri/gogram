import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser, useUserDispatch } from '../data/userStore';
import { isLessonUnlocked, isLessonCompleted, getNextLesson } from '../data/progressHelpers';
import LessonNode from '../components/LessonNode';
import './LearnPage.css';

// Snake path offsets: zigzag pattern for 5 nodes per unit
const snakeOffsets = [0, -50, -80, -40, 10];

export default function LearnPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const dispatch = useUserDispatch();

  const studyCategories = user.categories || [];
  const units = user.units || [];

  // Load the active category from the parameter, defaulting to the last studied category (can be null)
  const activeCategoryId = categoryId || user.lastCategoryId;

  // Redirect to categories selection page if no category is selected
  useEffect(() => {
    if (!activeCategoryId) {
      navigate('/dashboard', { replace: true });
    }
  }, [activeCategoryId, navigate]);

  // Keep userStore updated with the last studied category
  useEffect(() => {
    if (activeCategoryId) {
      dispatch({ type: 'SET_LAST_CATEGORY', categoryId: activeCategoryId });
    }
  }, [activeCategoryId, dispatch]);

  const categoryInfo = useMemo(() => {
    return studyCategories.find((c) => c.id === activeCategoryId) || studyCategories[0];
  }, [activeCategoryId]);

  const categoryUnits = useMemo(() => {
    return activeCategoryId
      ? units.filter((u) => u.category === categoryInfo.id)
      : [];
  }, [activeCategoryId, categoryInfo.id]);

  const nextLesson = getNextLesson(user.completedLessons, categoryUnits);

  // Initialize activeUnitId state
  const initialActiveUnit = nextLesson
    ? (categoryUnits.find((u) => u.id === nextLesson.unitId) || categoryUnits[0])
    : categoryUnits[0];

  const [activeUnitId, setActiveUnitId] = useState(initialActiveUnit?.id);

  // Reset activeUnitId when activeCategoryId changes
  useEffect(() => {
    if (categoryUnits.length > 0) {
      const targetUnit = nextLesson
        ? (categoryUnits.find((u) => u.id === nextLesson.unitId) || categoryUnits[0])
        : categoryUnits[0];
      setActiveUnitId(targetUnit?.id || categoryUnits[0].id);
    }
  }, [activeCategoryId]);

  const hasScrolledRef = useRef(false);

  // Reset scroll tracker when category changes
  useEffect(() => {
    hasScrolledRef.current = false;
  }, [activeCategoryId]);

  // Scroll current node into view when first landing on the page
  useEffect(() => {
    if (categoryUnits.length === 0 || hasScrolledRef.current) return;

    const timer = setTimeout(() => {
      const activeNode = document.querySelector('.learn-path-node.current-node');
      if (activeNode) {
        activeNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
        hasScrolledRef.current = true;
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [activeCategoryId, categoryUnits]);

  // Track which unit is currently in view using scroll position detection
  useEffect(() => {
    if (categoryUnits.length === 0) return;

    const handleScroll = () => {
      const unitElements = document.querySelectorAll('.learn-unit');
      if (unitElements.length === 0) return;

      // Determine threshold dynamically based on screen width
      const isMobile = window.innerWidth < 1024;
      const threshold = isMobile ? 160 : 110;

      // Check if we are scrolled close to the bottom of the page
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const isAtBottom = scrollY + clientHeight >= scrollHeight - 50;

      let activeIndex = 0;

      if (isAtBottom) {
        activeIndex = unitElements.length - 1;
      } else {
        for (let i = 0; i < unitElements.length; i++) {
          const el = unitElements[i];
          const nodes = el.querySelectorAll('.learn-path-node');
          if (nodes.length > 0) {
            const lastNode = nodes[nodes.length - 1];
            const lastNodeRect = lastNode.getBoundingClientRect();

            // If the bottom of the last node of this unit has not scrolled past the threshold,
            // then this unit is the active one!
            if (lastNodeRect.bottom > threshold) {
              activeIndex = i;
              break;
            }
          }
          activeIndex = i; // fallback/last unit
        }
      }

      const activeUnit = categoryUnits[activeIndex];
      if (activeUnit && activeUnit.id !== activeUnitId) {
        setActiveUnitId(activeUnit.id);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Check initially after a brief delay to allow React to commit nodes to the DOM
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [categoryUnits, activeUnitId]);

  if (!activeCategoryId) {
    return null; // Return empty while redirecting
  }

  const currentUnitId = activeUnitId || (categoryUnits[0]?.id);
  const activeUnitHeader = categoryUnits.find((u) => Number(u.id) === Number(currentUnitId)) || categoryUnits[0];

  return (
    <div className="learn-page" id="learn-page">
      {/* Sticky active unit header */}
      {activeUnitHeader && (
        <div
          className="learn-unit-header pinned-header animate-fade-in"
          style={{ backgroundColor: activeUnitHeader.color }}
          key={activeUnitHeader.id}
        >
          <div className="learn-unit-header-content">
            <div>
              <div className="learn-unit-section">
                {activeUnitHeader.section.includes(',')
                  ? activeUnitHeader.section.split(',')[1].trim()
                  : activeUnitHeader.section}
              </div>
              <h2 className="learn-unit-title">{activeUnitHeader.title}</h2>
            </div>
          </div>
        </div>
      )}

      <div className="learn-scroll-area">
        {categoryUnits.map((unit, unitIndex) => (
          <div
            key={unit.id}
            className="learn-unit"
            data-unit-id={unit.id}
          >
            {/* Unit Header / Jump divider */}
            {unitIndex > 0 && (
              <div className="learn-jump-here">
                <div className="learn-jump-divider">
                  <span className="learn-jump-text">{unit.title}</span>
                </div>
              </div>
            )}

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
                    className={`learn-path-node ${isNext ? 'current-node' : ''}`}
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
          </div>
        ))}

        {/* All done message if completed everything in this category */}
        {!nextLesson && (
          <div className="learn-complete-message">
            <h3>🎉 Category completed!</h3>
            <p>You&apos;ve completed all lessons in {categoryInfo.title}! Choose another category on the dashboard.</p>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')} style={{ marginTop: '16px' }}>
              BACK TO DASHBOARD
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
