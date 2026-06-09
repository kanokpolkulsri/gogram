import { useState, useEffect } from 'react';
import { useUser } from '../data/userStore';
import { leagueData } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
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
  const user = useUser();
  const navigate = useNavigate();
  const [vocabIndex, setVocabIndex] = useState(0);

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

  const handleMarkAsLearned = () => {
    if (learnedIndices.includes(vocabIndex)) return;

    const newLearned = [...learnedIndices, vocabIndex];
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
            <span className="vocab-counter">{vocabIndex + 1} / {dailyVocab.length}</span>
          </div>
        </div>



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

          {/* Learn Action Button in the middle */}
          <button 
            className={`vocab-learn-action-btn ${learnedIndices.includes(vocabIndex) ? 'learned' : ''}`}
            onClick={handleMarkAsLearned}
            disabled={learnedIndices.includes(vocabIndex)}
          >
            {learnedIndices.includes(vocabIndex) ? 'Learned ✓' : 'Learn'}
          </button>

          <button 
            className="vocab-carousel-arrow" 
            onClick={nextVocab}
            title="Next word"
          >
            ›
          </button>
        </div>
      </div>

      {/* League card */}
      <div className="right-sidebar-card league-card" id="league-card">
        <div className="league-card-header">
          <h3>{leagueData.currentLeague} League</h3>
          <button className="league-card-link" onClick={() => navigate('/leaderboard')}>VIEW ALL</button>
        </div>
        <div className="league-mini-list">
          {leagueData.weeklyLeaderboard.slice(0, 3).map((player) => (
            <div key={player.rank} className="league-mini-row">
              <span className="league-mini-rank">{player.rank}</span>
              <div className="league-mini-avatar" style={{ backgroundColor: player.avatar }}>
                {player.initials}
              </div>
              <span className="league-mini-name">{player.name}</span>
              <span className="league-mini-xp">{player.xp} XP</span>
            </div>
          ))}
          <div className="league-mini-divider" />
          <div className="league-mini-row active">
            <span className="league-mini-rank">9</span>
            <div className="league-mini-avatar" style={{ backgroundColor: '#1CB0F6' }}>
              ME
            </div>
            <span className="league-mini-name">{user.name || 'You'}</span>
            <span className="league-mini-xp">{user.totalXP || 0} XP</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
