import { useState } from 'react';
import { useUser } from '../data/userStore';
import { leagueData } from '../data/mockData';
import { EnglishFlagIcon, GemIcon, HeartIcon } from './icons';
import StreakFire from './StreakFire';
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

export default function RightSidebar() {
  const user = useUser();
  const [vocabIndex, setVocabIndex] = useState(0);

  const nextVocab = () => {
    setVocabIndex((prev) => (prev + 1) % dailyVocab.length);
  };

  const prevVocab = () => {
    setVocabIndex((prev) => (prev - 1 + dailyVocab.length) % dailyVocab.length);
  };

  return (
    <aside className="right-sidebar" id="right-sidebar">
      {/* Top stats bar */}
      <div className="right-sidebar-stats" id="right-sidebar-stats">
        <div className="right-sidebar-stat" title="Language">
          <span className="right-sidebar-flag">
            <EnglishFlagIcon size={24} />
          </span>
          <span className="right-sidebar-stat-val">
            {Math.floor((user.totalXP || 0) / 10)}
          </span>
        </div>
        <div className="right-sidebar-stat" title="Streak">
          <StreakFire size={20} />
          <span className="right-sidebar-stat-val stat-streak">
            {user.streak}
          </span>
        </div>
        <div className="right-sidebar-stat" title="Gems">
          <GemIcon size={18} />
          <span className="right-sidebar-stat-val stat-gems">
            {user.gems || 0}
          </span>
        </div>
        <div className="right-sidebar-stat" title="Hearts">
          <HeartIcon size={18} />
          <span className="right-sidebar-stat-val stat-hearts">
            {user.hearts}
          </span>
        </div>
      </div>

      {/* 5 Vocabs a Day Carousel Card */}
      <div className="right-sidebar-card vocab-card" id="vocab-card">
        <div className="vocab-card-header">
          <div className="vocab-card-title-row">
            <span className="vocab-badge">DAILY VOCAB</span>
            <span className="vocab-counter">{vocabIndex + 1} / {dailyVocab.length}</span>
          </div>
        </div>

        <div className="vocab-content animate-fade-in" key={vocabIndex}>
          <div className="vocab-word-row">
            <h3 className="vocab-word">{dailyVocab[vocabIndex].word}</h3>
            <span className="vocab-type">{dailyVocab[vocabIndex].type}</span>
          </div>
          <p className="vocab-translation">{dailyVocab[vocabIndex].thai}</p>
          <p className="vocab-example-sentence">"{dailyVocab[vocabIndex].example}"</p>
        </div>

        <div className="vocab-carousel-controls">
          <button 
            className="vocab-carousel-arrow" 
            onClick={prevVocab}
            title="Previous word"
          >
            ‹
          </button>
          <div className="vocab-carousel-dots">
            {dailyVocab.map((_, i) => (
              <span
                key={i}
                className={`vocab-carousel-dot ${i === vocabIndex ? 'active' : ''}`}
                onClick={() => setVocabIndex(i)}
              />
            ))}
          </div>
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
          <button className="league-card-link">VIEW LEAGUE</button>
        </div>
        <div className="league-card-body">
          <div className="league-card-icon">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="#FFC800">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <p className="league-card-text">
            Complete a lesson to join this week&apos;s leaderboard and compete against other learners
          </p>
        </div>
      </div>
    </aside>
  );
}
