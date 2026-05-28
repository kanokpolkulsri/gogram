import { useNavigate } from 'react-router-dom';
import { units } from '../data/mockData';
import { useUser, isLessonUnlocked, isLessonCompleted, getNextLesson } from '../data/userStore';
import LessonNode from '../components/LessonNode';
import BottomNav from '../components/BottomNav';
import DuolingoOwl from '../components/DuolingoOwl';
import './LearnPage.css';

const levelIcons = {
  easy: '⭐',
  medium: '🔥',
  hard: '👑',
};

const levelLabels = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

// Snake path offsets: zigzag pattern
const snakeOffsets = [0, -60, 60];

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
                  <h2 className="learn-unit-title">Unit {unit.id}</h2>
                  <p className="learn-unit-desc">{unit.description}</p>
                </div>
                <div className="learn-unit-guide-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                  </svg>
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
                      index={unitIndex * 3 + levelIndex}
                      onClick={() => navigate(`/quiz/${unit.id}/${level.id}`)}
                    />
                    <span className={`learn-path-label ${status === 'locked' ? 'locked' : ''}`}>
                      {levelLabels[level.id]}
                    </span>
                  </div>
                );
              })}

              {/* Decorative owl between units */}
              {unitIndex === 0 && (
                <div className="learn-path-owl">
                  <DuolingoOwl size={60} />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* All done message if completed everything */}
        {!nextLesson && (
          <div className="learn-complete-message">
            <DuolingoOwl size={100} />
            <h3>🎉 All lessons completed!</h3>
            <p>You&apos;re amazing! More lessons coming soon.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
