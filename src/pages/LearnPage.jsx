import { useNavigate } from 'react-router-dom';
import { units } from '../data/mockData';
import { useUser } from '../data/userStore';
import { isLessonUnlocked, isLessonCompleted, getNextLesson } from '../data/progressHelpers';
import LessonNode from '../components/LessonNode';
import './LearnPage.css';

// Snake path offsets: zigzag pattern for 5 nodes per unit
const snakeOffsets = [0, -50, -80, -40, 10];

export default function LearnPage() {
  const navigate = useNavigate();
  const user = useUser();
  const nextLesson = getNextLesson(user.completedLessons);

  return (
    <div className="learn-page" id="learn-page">
      <div className="learn-scroll-area">
        {units.map((unit, unitIndex) => (
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
                const unlocked = isLessonUnlocked(user.completedLessons, unit.id, level.id);
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
            {unitIndex < units.length - 1 && (
              <div className="learn-jump-here">
                <div className="learn-jump-divider">
                  <span className="learn-jump-text">{units[unitIndex + 1].title}</span>
                </div>
                <button className="learn-jump-btn">JUMP HERE?</button>
              </div>
            )}
          </div>
        ))}

        {/* All done message if completed everything */}
        {!nextLesson && (
          <div className="learn-complete-message">
            <h3>🎉 All lessons completed!</h3>
            <p>You&apos;re amazing! More lessons coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
