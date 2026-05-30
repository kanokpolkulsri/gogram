import { dailyQuests, weeklyQuests } from '../data/mockData';
import './QuestsPage.css';

export default function QuestsPage() {

  return (
    <div className="quests-page" id="quests-page">
      <div className="quests-header">
        <h1 className="quests-title">Quests</h1>
        <p className="quests-subtitle">Complete quests to earn bonus rewards!</p>
      </div>

      {/* Daily Quests */}
      <div className="quests-section">
        <div className="quests-section-header">
          <h2>Daily Quests</h2>
          <span className="quests-section-timer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-text-light)">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
            </svg>
            Resets in 14h
          </span>
        </div>
        <div className="quests-list">
          {dailyQuests.map((quest, index) => {
            const progress = Math.min(100, (quest.current / quest.target) * 100);
            const isComplete = quest.current >= quest.target;
            return (
              <div
                key={quest.id}
                className={`quest-card ${isComplete ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="quest-card-icon" style={{ background: `${quest.iconColor}20` }}>
                  <span style={{ fontSize: '28px' }}>{quest.icon}</span>
                </div>
                <div className="quest-card-body">
                  <span className="quest-card-title">{quest.title}</span>
                  <div className="quest-card-progress">
                    <div className="quest-card-progress-bar">
                      <div
                        className="quest-card-progress-fill"
                        style={{
                          width: `${progress}%`,
                          background: isComplete ? 'var(--color-green)' : quest.iconColor,
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
                    <div className="quest-reward-badge">
                      <span className="quest-reward-gem">💎</span>
                      <span className="quest-reward-amount">{quest.reward}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Quests */}
      <div className="quests-section">
        <div className="quests-section-header">
          <h2>Weekly Quests</h2>
          <span className="quests-section-timer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-text-light)">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
            </svg>
            Resets in 4d 14h
          </span>
        </div>
        <div className="quests-list">
          {weeklyQuests.map((quest, index) => {
            const progress = Math.min(100, (quest.current / quest.target) * 100);
            const isComplete = quest.current >= quest.target;
            return (
              <div
                key={quest.id}
                className={`quest-card ${isComplete ? 'completed' : ''}`}
                style={{ animationDelay: `${(dailyQuests.length + index) * 0.08}s` }}
              >
                <div className="quest-card-icon" style={{ background: `${quest.iconColor}20` }}>
                  <span style={{ fontSize: '28px' }}>{quest.icon}</span>
                </div>
                <div className="quest-card-body">
                  <span className="quest-card-title">{quest.title}</span>
                  <div className="quest-card-progress">
                    <div className="quest-card-progress-bar">
                      <div
                        className="quest-card-progress-fill"
                        style={{
                          width: `${progress}%`,
                          background: isComplete ? 'var(--color-green)' : quest.iconColor,
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
                    <div className="quest-reward-badge">
                      <span className="quest-reward-gem">💎</span>
                      <span className="quest-reward-amount">{quest.reward}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Friends Quest */}
      <div className="quests-section">
        <div className="quests-section-header">
          <h2>Friends Quest</h2>
        </div>
        <div className="quests-friends-empty">
          <div className="quests-friends-icon">👥</div>
          <p>Add friends to unlock Friends Quests and earn bonus rewards together!</p>
          <button className="btn btn-secondary quests-add-friends-btn">ADD FRIENDS</button>
        </div>
      </div>
    </div>
  );
}
