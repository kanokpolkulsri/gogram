import { useLocation, useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../../data/userStore';
import GogramOwl from '../../components/GogramOwl';
import './LessonCompletePage.css';

export default function LessonCompletePage() {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const location = useLocation();
  const { score = 5, total = 5, xp = 15 } = location.state || {};
  const percentage = Math.round((score / total) * 100);

  const handleContinue = () => {
    dispatch({ type: 'UPDATE_STREAK' });
    navigate('/streak');
  };

  return (
    <div className="complete-page" id="lesson-complete-page">
      {/* Sparkles */}
      <div className="complete-sparkles">
        <div className="sparkle sparkle-1">✦</div>
        <div className="sparkle sparkle-2">✦</div>
        <div className="sparkle sparkle-3">✧</div>
        <div className="sparkle sparkle-4">✦</div>
        <div className="sparkle sparkle-5">✧</div>
      </div>

      {/* Owl */}
      <div className="complete-owl">
        <GogramOwl size={140} />
      </div>

      {/* Title */}
      <h1 className="complete-title">Lesson Complete!</h1>

      {/* Stats */}
      <div className="complete-stats">
        <div className="complete-stat complete-stat-xp">
          <div className="complete-stat-label">TOTAL XP</div>
          <div className="complete-stat-value">
            <span className="complete-stat-icon">⚡</span>
            <span>{xp}</span>
          </div>
        </div>
        <div className="complete-stat complete-stat-score">
          <div className="complete-stat-label">AMAZING</div>
          <div className="complete-stat-value">
            <span className="complete-stat-icon">🎯</span>
            <span>{percentage}%</span>
          </div>
        </div>
      </div>

      {/* Continue */}
      <div className="complete-bottom">
        <button
          className="btn btn-primary"
          onClick={handleContinue}
          id="complete-continue-btn"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
