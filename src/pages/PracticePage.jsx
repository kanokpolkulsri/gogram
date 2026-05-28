import BottomNav from '../components/BottomNav';
import DuolingoOwl from '../components/DuolingoOwl';
import './PracticePage.css';

export default function PracticePage() {
  return (
    <div className="practice-page" id="practice-page">
      <div className="practice-content">
        <div className="practice-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="var(--color-blue)">
            <path d="M20.27 4.74a4.93 4.93 0 0 0-3.12-1.27c-1.3 0-2.5.46-3.47 1.34L12 6.42l-1.68-1.61A4.93 4.93 0 0 0 6.85 3.47c-1.17 0-2.28.44-3.12 1.27a4.93 4.93 0 0 0 0 6.82L12 20l8.27-8.44a4.93 4.93 0 0 0 0-6.82z"/>
          </svg>
        </div>
        <h2 className="practice-title">Practice</h2>
        <p className="practice-subtitle">
          Coming soon! Keep learning to unlock personalized practice exercises.
        </p>
        <div className="practice-owl">
          <DuolingoOwl size={80} />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
