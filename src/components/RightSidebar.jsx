import { useState, useEffect, useMemo } from 'react';
import { getDailyVocabSet } from '../data/dailyVocabData';
import './RightSidebar.css';

const formatExample = (sentence, word) => {
  if (!sentence) return '';
  const regex = new RegExp(`(${word})`, 'gi');
  const parts = sentence.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === word.toLowerCase() ? <strong key={i}>{part}</strong> : part
  );
};

const getTodayDateString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const getDaysBetween = (dateStr1, dateStr2) => {
  if (!dateStr1 || !dateStr2) return 0;
  const d1 = new Date(dateStr1 + 'T00:00:00');
  const d2 = new Date(dateStr2 + 'T00:00:00');
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default function RightSidebar() {
  const [vocabIndex, setVocabIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  const today = getTodayDateString();

  // Get current 5 daily vocabulary words for today from 155-word A-Level pool
  const dailyVocab = useMemo(() => {
    return getDailyVocabSet(today);
  }, [today]);

  const [learnedIds, setLearnedIds] = useState(() => {
    const lastActive = localStorage.getItem('gramgo_vocab_last_active_date');
    if (lastActive !== today) {
      localStorage.setItem('gramgo_vocab_last_active_date', today);
      localStorage.setItem('gramgo_learned_vocab_ids', JSON.stringify([]));
      return [];
    }
    const saved = localStorage.getItem('gramgo_learned_vocab_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [vocabStreak, setVocabStreak] = useState(() => {
    const streak = localStorage.getItem('gramgo_vocab_streak');
    return streak ? parseInt(streak, 10) : 0;
  });

  useEffect(() => {
    const lastCompleted = localStorage.getItem('gramgo_vocab_last_completed_date');
    if (lastCompleted) {
      const daysSinceCompletion = getDaysBetween(lastCompleted, today);
      if (daysSinceCompletion > 1) {
        setVocabStreak(0);
        localStorage.setItem('gramgo_vocab_streak', '0');
      }
    } else {
      setVocabStreak(0);
      localStorage.setItem('gramgo_vocab_streak', '0');
    }
  }, [today]);

  const learnWord = (wordId) => {
    if (learnedIds.includes(wordId)) return;

    const newLearned = [...learnedIds, wordId];
    setLearnedIds(newLearned);
    localStorage.setItem('gramgo_learned_vocab_ids', JSON.stringify(newLearned));

    // Check if all 5 current words are learned
    const currentWordIds = dailyVocab.map(w => w.id);
    const hasLearnedAllCurrent = currentWordIds.every(id => newLearned.includes(id));

    if (hasLearnedAllCurrent) {
      const lastCompleted = localStorage.getItem('gramgo_vocab_last_completed_date');
      if (lastCompleted !== today) {
        const newStreak = vocabStreak + 1;
        setVocabStreak(newStreak);
        localStorage.setItem('gramgo_vocab_streak', String(newStreak));
        localStorage.setItem('gramgo_vocab_last_completed_date', today);
      }
    }
  };

  const isCurrentSetComplete = useMemo(() => {
    return dailyVocab.every(w => learnedIds.includes(w.id));
  }, [dailyVocab, learnedIds]);

  return (
    <aside className="right-sidebar" id="right-sidebar">
      {/* 5 Vocabs a Day Carousel Card */}
      <div className="right-sidebar-card vocab-card" id="vocab-card">
        <div className="vocab-card-header">
          <div className="vocab-card-title-row">
            <span className="vocab-badge">DAILY VOCAB</span>
            {vocabStreak > 0 && (
              <span className="vocab-streak-badge" title="Daily Vocab Streak">
                🔥 {vocabStreak} {vocabStreak === 1 ? 'day' : 'days'}
              </span>
            )}
            <button 
              className="vocab-expand-toggle-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'COLLAPSE' : 'VIEW LIST'}
            </button>
          </div>
        </div>

        {isExpanded ? (
          <div className="vocab-vertical-list">
            {dailyVocab.map((item) => (
              <div 
                key={item.id} 
                className={`vocab-vertical-item ${learnedIds.includes(item.id) ? 'learned' : ''}`}
                onClick={() => learnWord(item.id)}
              >
                <div className="vocab-vertical-item-header">
                  <div className="vocab-vertical-word-group">
                    <h4 className="vocab-vertical-word">{item.word}</h4>
                    <span className="vocab-vertical-type">{item.type}</span>
                  </div>
                  {learnedIds.includes(item.id) && (
                    <span className="vocab-learned-check">✓ Learned</span>
                  )}
                </div>
                <p className="vocab-vertical-translation">{item.thai}</p>
                <p className="vocab-vertical-example">
                  "{formatExample(item.example, item.word)}"
                </p>
              </div>
            ))}
            {isCurrentSetComplete && (
              <div className="vocab-completion-message" style={{ marginTop: '12px' }}>
                🎉 All 5 words learned today!
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="vocab-content animate-fade-in" key={dailyVocab[vocabIndex]?.id || vocabIndex}>
              <div className="vocab-word-row">
                <h3 className="vocab-word">{dailyVocab[vocabIndex]?.word}</h3>
                <span className="vocab-type">{dailyVocab[vocabIndex]?.type}</span>
              </div>
              <p className="vocab-translation">{dailyVocab[vocabIndex]?.thai}</p>
              <p className="vocab-example-sentence">
                "{formatExample(dailyVocab[vocabIndex]?.example, dailyVocab[vocabIndex]?.word)}"
              </p>
            </div>

            {/* Congratulatory Completion Message */}
            {isCurrentSetComplete && (
              <div className="vocab-completion-message">
                🎉 All 5 words learned today!
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
