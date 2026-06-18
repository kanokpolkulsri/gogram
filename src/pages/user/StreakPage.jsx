import { useNavigate } from 'react-router-dom';
import { useUser } from '../../data/userStore';
import StreakFire from '../../components/StreakFire';
import './StreakPage.css';

const dayLabels = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

function getWeekDays() {
  const today = new Date();
  const days = [];
  // Show 7 days starting from 3 days ago
  for (let i = -3; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    days.push({
      label: dayLabels[d.getDay()],
      date: d.toISOString().split('T')[0],
      isToday: i === 0,
    });
  }
  return days;
}

export default function StreakPage() {
  const navigate = useNavigate();
  const user = useUser();
  const weekDays = getWeekDays();

  return (
    <div className="streak-page" id="streak-page">
      <div className="streak-content">
        {/* Streak Number */}
        <div className="streak-number">{user.streak}</div>

        {/* Label */}
        <div className="streak-label">day streak!</div>

        {/* Fire */}
        <div className="streak-fire-wrapper">
          <StreakFire size={80} />
        </div>

        {/* Calendar */}
        <div className="streak-calendar">
          <div className="streak-week">
            {weekDays.map((day) => {
              const practiced = user.streakHistory.includes(day.date);
              return (
                <div key={day.date} className="streak-day">
                  <span className={`streak-day-label ${day.isToday ? 'today' : ''}`}>
                    {day.label}
                  </span>
                  <div className={`streak-day-circle ${practiced ? 'practiced' : ''} ${day.isToday ? 'today-circle' : ''}`}>
                    {practiced && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="streak-warning">
            But your streak will reset if you don&apos;t practice tomorrow. Watch out!
          </p>
        </div>
      </div>

      {/* Continue */}
      <div className="streak-bottom">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/learn')}
          id="streak-continue-btn"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
