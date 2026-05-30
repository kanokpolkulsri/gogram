import './LessonNode.css';

function getDarkColor(color) {
  const mapping = {
    '#58cc02': '#3fa000',
    '#58CC02': '#3fa000',
    '#ce82ff': '#a435f0',
    '#CE82FF': '#a435f0',
    '#1cb0f6': '#0a88c2',
    '#1CB0F6': '#0a88c2',
    '#ff9600': '#cc7800',
    '#FF9600': '#cc7800',
    '#ff4b4b': '#ea2b2b',
    '#FF4B4B': '#ea2b2b',
    '#ffc800': '#cc9f00',
    '#FFC800': '#cc9f00',
  };

  if (mapping[color]) return mapping[color];

  if (color && color.startsWith('#')) {
    let hex = color.substring(1);
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const dr = Math.max(0, Math.floor(r * 0.7));
    const dg = Math.max(0, Math.floor(g * 0.7));
    const db = Math.max(0, Math.floor(b * 0.7));

    const toHex = (c) => c.toString(16).padStart(2, '0');
    return `#${toHex(dr)}${toHex(dg)}${toHex(db)}`;
  }

  return 'var(--color-green-dark)';
}

export default function LessonNode({ status = 'locked', onClick, label, color, index = 0, tooltipText }) {
  const nodeColor = color || 'var(--color-green)';

  const starIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  const checkIcon = (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const lockIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#AFAFAF">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
    </svg>
  );

  const getIcon = () => {
    if (status === 'completed') return checkIcon;
    if (status === 'locked') return lockIcon;
    return starIcon;
  };

  return (
    <div
      className="lesson-node-wrapper"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {status === 'active' && (
        <>
          <svg className="lesson-node-progress-ring" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" stroke="#E5E5E5" strokeWidth="8" fill="none" />
          </svg>
          <div className="lesson-node-tooltip" style={{ '--node-color': nodeColor }}>
            <span>{tooltipText || 'START'}</span>
          </div>
        </>
      )}

      <button
        className={`lesson-node lesson-node-${status}`}
        onClick={status !== 'locked' ? onClick : undefined}
        disabled={status === 'locked'}
        style={{
          '--node-color': status !== 'locked' ? nodeColor : undefined,
          '--node-color-dark': status !== 'locked' ? getDarkColor(nodeColor) : undefined,
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
