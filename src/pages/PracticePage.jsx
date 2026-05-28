import { practiceCategories } from '../data/mockData';
import DuolingoOwl from '../components/DuolingoOwl';
import './PracticePage.css';

export default function PracticePage() {
  return (
    <div className="practice-page" id="practice-page">
      <div className="practice-header">
        <h1 className="practice-title">Practice</h1>
        <p className="practice-subtitle">
          Strengthen your skills with targeted practice exercises
        </p>
      </div>

      {/* Practice Categories */}
      <div className="practice-grid">
        {practiceCategories.map((cat, index) => (
          <div
            key={cat.id}
            className="practice-card"
            style={{ animationDelay: `${index * 0.08}s` }}
            id={`practice-${cat.id}`}
          >
            <div className="practice-card-icon-wrap" style={{ background: `${cat.color}20` }}>
              <span className="practice-card-icon">{cat.icon}</span>
            </div>
            <div className="practice-card-body">
              <h3 className="practice-card-title">{cat.title}</h3>
              <p className="practice-card-desc">{cat.description}</p>
              <div className="practice-card-meta">
                <span className="practice-card-difficulty" style={{ color: cat.color }}>
                  {cat.difficulty}
                </span>
                <span className="practice-card-count">{cat.questionsCount} questions</span>
              </div>
            </div>
            <button
              className="practice-card-btn"
              style={{ background: cat.color, boxShadow: `0 3px 0 ${cat.color}CC` }}
            >
              START
            </button>
          </div>
        ))}
      </div>

      {/* Personalized Practice */}
      <div className="practice-personalized">
        <div className="practice-personalized-content">
          <DuolingoOwl size={80} />
          <div>
            <h3>Personalized Practice</h3>
            <p>Complete more lessons to unlock practice sessions tailored to your weaknesses!</p>
          </div>
        </div>
        <button className="btn btn-primary practice-personalized-btn">START REVIEW</button>
      </div>
    </div>
  );
}
