import { useLocation, useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../../data/userStore';
import './LessonCompletePage.css';

export default function LessonCompletePage() {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const location = useLocation();
  const { score = 5, total = 5, xp = 15, levelUp = false, newLevel = 1, categoryTitle = '', categoryId = '' } = location.state || {};

  const handleContinue = () => {
    dispatch({ type: 'UPDATE_STREAK' });
    if (categoryId) {
      navigate(`/learn/${categoryId}`);
    } else {
      navigate('/learn');
    }
  };

  return (
    <div className={`complete-page ${levelUp ? 'level-up-theme' : ''}`} id="lesson-complete-page">


      {levelUp ? (
        <div className="level-up-container animate-fade-in">
          {/* Glowing Shield Badge with Stars */}
          <div className="lesson-complete-shield level-up-badge-container">
            <svg
              width="140"
              height="140"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 8px 16px rgba(255, 150, 0, 0.35))', overflow: 'visible' }}
            >
              {/* 1. Bottom Bevel/Shadow (Dark Gold/Orange) */}
              <path
                d="M14 14 H50 C54 14, 54 18, 53 22 C51 38, 46 52, 32 58 C18 52, 13 38, 11 22 C10 18, 10 14, 14 14 Z"
                fill="var(--color-orange-dark)"
              />

              {/* 2. Outer Shield Rim (Bright Yellow) */}
              <path
                d="M14 10 H50 C54 10, 54 14, 53 18 C51 34, 46 48, 32 54 C18 48, 13 34, 11 18 C10 14, 10 10, 14 10 Z"
                fill="var(--color-yellow)"
              />

              {/* 3. Inner Shield Face shadow (Orange/Dark Gold) */}
              <path
                d="M17 14 H47 C50 14, 50 17, 49 20 C48 33, 43 45, 32 50 C21 45, 16 33, 15 20 C14 17, 14 14, 17 14 Z"
                fill="var(--color-orange-dark)"
              />

              {/* 4. Inner Shield Face (Warm Gold) */}
              <path
                d="M17 12 H47 C50 12, 50 15, 49 18 C48 31, 43 43, 32 48 C21 43, 16 31, 15 18 C14 15, 14 12, 17 12 Z"
                fill="var(--color-orange)"
              />

              {/* 5. Top Highlight (Soft Light Yellow) */}
              <path
                d="M18 14 H46 C48 14, 48 16, 47 18 C46 22, 43 26, 32 28 C21 26, 18 22, 17 18 C16 16, 16 14, 18 14 Z"
                fill="#FFE57F"
                opacity="0.6"
              />
            </svg>
            
            {/* Stars floating around */}
            <div className="shield-stars">
              <span className="shield-star shield-star-1">⭐</span>
              <span className="shield-star shield-star-2">⭐</span>
              <span className="shield-star shield-star-3">⭐</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="complete-title level-up-title">Level Up! LV. {newLevel}</h1>
        </div>
      ) : (
        <div className="lesson-complete-container animate-fade-in">
          {/* Golden Shield with Stars */}
          <div className="lesson-complete-shield">
            <svg
              width="140"
              height="140"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 8px 16px rgba(255, 150, 0, 0.25))', overflow: 'visible' }}
            >
              {/* 1. Bottom Bevel/Shadow (Dark Gold/Orange) */}
              <path
                d="M14 14 H50 C54 14, 54 18, 53 22 C51 38, 46 52, 32 58 C18 52, 13 38, 11 22 C10 18, 10 14, 14 14 Z"
                fill="var(--color-orange-dark)"
              />

              {/* 2. Outer Shield Rim (Bright Yellow) */}
              <path
                d="M14 10 H50 C54 10, 54 14, 53 18 C51 34, 46 48, 32 54 C18 48, 13 34, 11 18 C10 14, 10 10, 14 10 Z"
                fill="var(--color-yellow)"
              />

              {/* 3. Inner Shield Face shadow (Orange/Dark Gold) */}
              <path
                d="M17 14 H47 C50 14, 50 17, 49 20 C48 33, 43 45, 32 50 C21 45, 16 33, 15 20 C14 17, 14 14, 17 14 Z"
                fill="var(--color-orange-dark)"
              />

              {/* 4. Inner Shield Face (Warm Gold) */}
              <path
                d="M17 12 H47 C50 12, 50 15, 49 18 C48 31, 43 43, 32 48 C21 43, 16 31, 15 18 C14 15, 14 12, 17 12 Z"
                fill="var(--color-orange)"
              />

              {/* 5. Top Highlight (Soft Light Yellow) */}
              <path
                d="M18 14 H46 C48 14, 48 16, 47 18 C46 22, 43 26, 32 28 C21 26, 18 22, 17 18 C16 16, 16 14, 18 14 Z"
                fill="#FFE57F"
                opacity="0.6"
              />
            </svg>
            
            {/* Stars floating around */}
            <div className="shield-stars">
              <span className="shield-star shield-star-1">⭐</span>
              <span className="shield-star shield-star-2">⭐</span>
              <span className="shield-star shield-star-3">⭐</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="complete-title">Lesson Complete!</h1>


        </div>
      )}

      {/* Continue */}
      <div className="complete-bottom">
        <button
          className="btn btn-orange"
          onClick={handleContinue}
          id="complete-continue-btn"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
