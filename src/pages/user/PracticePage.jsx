import { HeadphonesIcon, BookIcon, RecycleIcon } from '../../components/icons';
import GogramOwl from '../../components/GogramOwl';
import './PracticePage.css';

export default function PracticePage() {
  return (
    <div className="practice-page" id="practice-page">
      {/* Hero Banner — Listening unlock */}
      <div className="practice-hero">
        <div className="practice-hero-content">
          <h1 className="practice-hero-title">Practice Hub</h1>
          <p className="practice-hero-sub">
            Strengthen your skills with targeted practice exercises
          </p>
        </div>
        <div className="practice-hero-owl">
          <GogramOwl size={80} />
        </div>
      </div>

      {/* Conversation Section */}
      <div className="practice-section">
        <h2 className="practice-section-title">Conversation</h2>
        <div className="practice-card-duo">
          <div className="practice-card-duo-badge">
            <span className="super-badge">SUPER</span>
          </div>
          <div className="practice-card-duo-icon">
            <HeadphonesIcon size={56} />
          </div>
          <div className="practice-card-duo-body">
            <h3 className="practice-card-duo-title" id="practice-listen-title">Listen</h3>
            <p className="practice-card-duo-desc" id="practice-listen-desc">Practise your listening skills with immersive exercises</p>
          </div>
          <button className="practice-card-duo-btn btn btn-primary" id="practice-listen-start-btn">START</button>
        </div>
      </div>

      {/* Your Collections Section */}
      <div className="practice-section">
        <h2 className="practice-section-title">Your collections</h2>
        <div className="practice-collections-grid">
          {/* Stories Card */}
          <div className="practice-collection-card">
            <div className="practice-collection-icon">
              <BookIcon size={52} />
            </div>
            <h3 className="practice-collection-title" id="practice-stories-title">Stories</h3>
            <p className="practice-collection-desc" id="practice-stories-desc">
              Read and listen to short stories in English
            </p>
            <button className="practice-collection-btn" id="practice-stories-start-btn">START</button>
          </div>

          {/* Mistakes Review Card */}
          <div className="practice-collection-card">
            <div className="practice-collection-icon">
              <RecycleIcon size={52} />
            </div>
            <h3 className="practice-collection-title">Mistakes</h3>
            <p className="practice-collection-desc">
              All mistakes reviewed!
            </p>
            <div className="practice-collection-done">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#58CC02">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Practice */}
      <div className="practice-personalized">
        <div className="practice-personalized-content">
          <GogramOwl size={70} />
          <div className="practice-personalized-text-wrapper" id="practice-personalized-text-wrapper">
            <h3 className="practice-personalized-title" id="practice-personalized-title">Personalized Practice</h3>
            <p className="practice-personalized-desc" id="practice-personalized-desc">
              Complete more lessons to unlock practice sessions tailored to your weaknesses!
            </p>
          </div>
        </div>
        <button className="btn btn-primary practice-personalized-btn" id="practice-personalized-start-btn">
          START REVIEW
        </button>
      </div>
    </div>
  );
}
