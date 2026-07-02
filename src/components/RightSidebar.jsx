import { useState, useEffect } from 'react';
import './RightSidebar.css';

const dailyVocab = [
  {
    word: 'Ambitious',
    type: 'adj.',
    thai: 'ทะเยอทะยาน',
    example: 'She has ambitious plans for her business expansion.'
  },
  {
    word: 'Resilient',
    type: 'adj.',
    thai: 'ยืดหยุ่น / ฟื้นตัวเร็ว',
    example: 'The local community proved resilient after the severe storm.'
  },
  {
    word: 'Eloquent',
    type: 'adj.',
    thai: 'พูดจาคมคาย / มีวาทศิลป์',
    example: 'His eloquent speech inspired everyone in the audience.'
  },
  {
    word: 'Inevitable',
    type: 'adj.',
    thai: 'หลีกเลี่ยงไม่ได้',
    example: 'Getting older is an inevitable part of life.'
  },
  {
    word: 'Ubiquitous',
    type: 'adj.',
    thai: 'พบเห็นได้ทั่วไป / มีอยู่ทุกหนทุกแห่ง',
    example: 'Smartphones are ubiquitous in modern society.'
  }
];

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

  const [learnedIndices, setLearnedIndices] = useState(() => {
    const today = getTodayDateString();
    const lastActive = localStorage.getItem('gogram_vocab_last_active_date');
    if (lastActive !== today) {
      localStorage.setItem('gogram_vocab_last_active_date', today);
      localStorage.setItem('gogram_learned_vocabs', JSON.stringify([]));
      return [];
    }
    const saved = localStorage.getItem('gogram_learned_vocabs');
    return saved ? JSON.parse(saved) : [];
  });

  const [vocabStreak, setVocabStreak] = useState(() => {
    const streak = localStorage.getItem('gogram_vocab_streak');
    return streak ? parseInt(streak, 10) : 0;
  });

  useEffect(() => {
    const today = getTodayDateString();
    const lastCompleted = localStorage.getItem('gogram_vocab_last_completed_date');
    if (lastCompleted) {
      const daysSinceCompletion = getDaysBetween(lastCompleted, today);
      if (daysSinceCompletion > 1) {
        setVocabStreak(0);
        localStorage.setItem('gogram_vocab_streak', '0');
      }
    } else {
      setVocabStreak(0);
      localStorage.setItem('gogram_vocab_streak', '0');
    }
  }, []);

  const nextVocab = () => {
    setVocabIndex((prev) => (prev + 1) % dailyVocab.length);
  };

  const prevVocab = () => {
    setVocabIndex((prev) => (prev - 1 + dailyVocab.length) % dailyVocab.length);
  };

  const learnWord = (index) => {
    if (learnedIndices.includes(index)) return;

    const newLearned = [...learnedIndices, index];
    setLearnedIndices(newLearned);
    localStorage.setItem('gogram_learned_vocabs', JSON.stringify(newLearned));

    if (newLearned.length === dailyVocab.length) {
      const today = getTodayDateString();
      const lastCompleted = localStorage.getItem('gogram_vocab_last_completed_date');
      if (lastCompleted !== today) {
        const newStreak = vocabStreak + 1;
        setVocabStreak(newStreak);
        localStorage.setItem('gogram_vocab_streak', String(newStreak));
        localStorage.setItem('gogram_vocab_last_completed_date', today);
      }
    }
  };

  const handleMarkAsLearned = () => {
    learnWord(vocabIndex);

    setTimeout(() => {
      setVocabIndex((prev) => (prev + 1) % dailyVocab.length);
    }, 400);
  };

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
            {dailyVocab.map((item, index) => (
              <div 
                key={index} 
                className={`vocab-vertical-item ${learnedIndices.includes(index) ? 'learned' : ''}`}
              >
                <div className="vocab-vertical-item-header">
                  <div className="vocab-vertical-word-group">
                    <h4 className="vocab-vertical-word">{item.word}</h4>
                    <span className="vocab-vertical-type">{item.type}</span>
                  </div>

                </div>
                <p className="vocab-vertical-translation">{item.thai}</p>
                <p className="vocab-vertical-example">
                  "{formatExample(item.example, item.word)}"
                </p>
              </div>
            ))}
            {learnedIndices.length === dailyVocab.length && (
              <div className="vocab-completion-message" style={{ marginTop: '12px' }}>
                🎉 All 5 words learned today!
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="vocab-content animate-fade-in" key={vocabIndex}>
              <div className="vocab-word-row">
                <h3 className="vocab-word">{dailyVocab[vocabIndex].word}</h3>
                <span className="vocab-type">{dailyVocab[vocabIndex].type}</span>
              </div>
              <p className="vocab-translation">{dailyVocab[vocabIndex].thai}</p>
              <p className="vocab-example-sentence">
                "{formatExample(dailyVocab[vocabIndex].example, dailyVocab[vocabIndex].word)}"
              </p>
            </div>

            {/* Congratulatory Completion Message */}
            {learnedIndices.length === dailyVocab.length && (
              <div className="vocab-completion-message">
                🎉 All 5 words learned today!
              </div>
            )}

            <div className="vocab-carousel-controls">
              <button 
                className="vocab-carousel-arrow" 
                onClick={prevVocab}
                title="Previous word"
              >
                ‹
              </button>



              <button 
                className="vocab-carousel-arrow" 
                onClick={nextVocab}
                title="Next word"
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
