import { useState } from 'react';
import { dailyQuests, weeklyQuests } from '../data/mockData';
import { LightningIcon, StopwatchIcon, ClockIcon, ChestIcon } from '../components/icons';
import DuolingoOwl from '../components/DuolingoOwl';
import './QuestsPage.css';

export default function QuestsPage() {
  const [activeTab, setActiveTab] = useState('quests');
  const completedCount = dailyQuests.filter(q => q.current >= q.target).length;

  const questIcons = {
    '⚡': <LightningIcon size={40} />,
    '🎯': <StopwatchIcon size={40} />,
  };

  const renderQuestCard = (quest, index) => {
    const progress = Math.min(100, (quest.current / quest.target) * 100);
    const isComplete = quest.current >= quest.target;

    return (
      <div
        key={quest.id}
        className={`quest-card ${isComplete ? 'completed' : ''}`}
        style={{ animationDelay: `${index * 0.06}s` }}
      >
        <div className="quest-card-icon" style={{ background: `${quest.iconColor}15` }}>
          {questIcons[quest.icon] || (
            <span style={{ fontSize: '32px' }}>{quest.icon}</span>
          )}
        </div>
        <div className="quest-card-body">
          <span className="quest-card-title">{quest.title}</span>
          <div className="quest-card-progress">
            <div className="quest-card-progress-bar">
              <div
                className="quest-card-progress-fill"
                style={{
                  width: `${progress}%`,
                  background: isComplete ? 'var(--color-green)' : '#E5E5E5',
                }}
              />
            </div>
            <span className="quest-card-progress-text">
              {quest.current} / {quest.target}
            </span>
          </div>
        </div>
        <div className="quest-card-reward">
          {isComplete ? (
            <button className="quest-claim-btn">CLAIM</button>
          ) : (
            <ChestIcon size={28} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="quests-page" id="quests-page">
      {/* Tab Switcher */}
      <div className="quests-tabs">
        <button
          className={`quests-tab ${activeTab === 'quests' ? 'active' : ''}`}
          onClick={() => setActiveTab('quests')}
        >
          QUESTS
        </button>
        <button
          className={`quests-tab ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          BADGES
        </button>
      </div>

      {activeTab === 'quests' ? (
        <>
          {/* Hero Banner */}
          <div className="quests-hero">
            <div className="quests-hero-content">
              <h1 className="quests-hero-title">Earn rewards with quests!</h1>
              <p className="quests-hero-sub">
                You&apos;ve completed <strong>{completedCount}</strong> out of{' '}
                <strong>{dailyQuests.length}</strong> quests today.
              </p>
            </div>
            <div className="quests-hero-owl">
              <DuolingoOwl size={90} />
            </div>
            {/* Decorative sparkles */}
            <div className="quests-hero-sparkle s1">✦</div>
            <div className="quests-hero-sparkle s2">✦</div>
            <div className="quests-hero-sparkle s3">✦</div>
          </div>

          {/* Daily Quests */}
          <div className="quests-section">
            <div className="quests-section-header">
              <h2>Daily Quests</h2>
              <span className="quests-section-timer">
                <ClockIcon size={16} color="#FF9600" />
                <span style={{ color: '#FF9600' }}>51 minutes</span>
              </span>
            </div>
            <div className="quests-list">
              {dailyQuests.map((quest, i) => renderQuestCard(quest, i))}
            </div>
          </div>

          {/* Weekly Quests */}
          <div className="quests-section">
            <div className="quests-section-header">
              <h2>Weekly Quests</h2>
              <span className="quests-section-timer">
                <ClockIcon size={16} color="var(--color-text-light)" />
                Resets in 4d 14h
              </span>
            </div>
            <div className="quests-list">
              {weeklyQuests.map((quest, i) => renderQuestCard(quest, dailyQuests.length + i))}
            </div>
          </div>
        </>
      ) : (
        <div className="quests-badges-empty">
          <div className="quests-badges-icon">🏅</div>
          <h3>Coming soon!</h3>
          <p>Complete quests to earn badges and show off your achievements.</p>
        </div>
      )}
    </div>
  );
}
