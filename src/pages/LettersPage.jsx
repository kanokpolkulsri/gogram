import { useState } from 'react';
import { letters } from '../data/mockData';
import './LettersPage.css';

export default function LettersPage() {
  const [flippedId, setFlippedId] = useState(null);
  const [filter, setFilter] = useState('all'); // all, mastered, learning

  const filteredLetters = letters.filter((letter) => {
    if (filter === 'mastered') return letter.mastered;
    if (filter === 'learning') return !letter.mastered;
    return true;
  });

  const masteredCount = letters.filter((l) => l.mastered).length;

  return (
    <div className="letters-page" id="letters-page">
      <div className="letters-header">
        <h1 className="letters-title">French Letters & Accents</h1>
        <p className="letters-subtitle">
          Master the special characters used in French
        </p>
        <div className="letters-progress">
          <div className="letters-progress-bar">
            <div
              className="letters-progress-fill"
              style={{ width: `${(masteredCount / letters.length) * 100}%` }}
            />
          </div>
          <span className="letters-progress-text">
            {masteredCount} / {letters.length} mastered
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="letters-filters">
        {['all', 'mastered', 'learning'].map((f) => (
          <button
            key={f}
            className={`letters-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'mastered' ? '✅ Mastered' : '📝 Learning'}
          </button>
        ))}
      </div>

      {/* Letter Grid */}
      <div className="letters-grid">
        {filteredLetters.map((letter, index) => {
          const isFlipped = flippedId === letter.char;
          return (
            <div
              key={letter.char}
              className={`letter-card ${letter.mastered ? 'mastered' : 'learning'} ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setFlippedId(isFlipped ? null : letter.char)}
              style={{ animationDelay: `${index * 0.05}s` }}
              id={`letter-${letter.char}`}
            >
              <div className="letter-card-inner">
                {/* Front */}
                <div className="letter-card-front">
                  <span className="letter-char">{letter.char}</span>
                  <span className="letter-name">{letter.name}</span>
                  {letter.mastered && (
                    <span className="letter-mastered-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#58CC02">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    </span>
                  )}
                </div>
                {/* Back */}
                <div className="letter-card-back">
                  <span className="letter-pronunciation">{letter.pronunciation}</span>
                  <span className="letter-example">
                    <strong>{letter.example}</strong>
                  </span>
                  <span className="letter-name-back">{letter.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
