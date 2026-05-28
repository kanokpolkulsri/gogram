import './LessonNode.css';

export default function LessonNode({ status = 'locked', onClick, label, color, index = 0 }) {
  const nodeColor = color || 'var(--color-green)';

  const starIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
  );

  const lockIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#AFAFAF">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/>
    </svg>
  );

  const checkIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  );

  const getIcon = () => {
    switch (status) {
      case 'active': return starIcon;
      case 'completed': return checkIcon;
      case 'locked': return lockIcon;
      default: return lockIcon;
    }
  };

  return (
    <div
      className={`lesson-node-wrapper`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {status === 'active' && (
        <div className="lesson-node-tooltip">
          <span>START</span>
        </div>
      )}
      <button
        className={`lesson-node lesson-node-${status}`}
        onClick={status !== 'locked' ? onClick : undefined}
        disabled={status === 'locked'}
        style={{
          '--node-color': status !== 'locked' ? nodeColor : undefined,
        }}
        id={`lesson-${label}`}
        aria-label={`${label} lesson - ${status}`}
      >
        <div className="lesson-node-inner">
          {getIcon()}
        </div>
      </button>
    </div>
  );
}
