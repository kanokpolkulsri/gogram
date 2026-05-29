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

export default function LessonNode({ status = 'locked', onClick, label, color, index = 0, icon = 'star', tooltipText }) {
  const nodeColor = color || 'var(--color-green)';

  const starIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  const crownIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V18H19V19Z" />
    </svg>
  );

  const dumbbellIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M20.57 14.86L22 13.43l-3-3-1.43 1.43L16.14 10.43c.09-.45.09-.9 0-1.35l1.43-1.43-3-3-1.43 1.43c-.45-.09-.9-.09-1.35 0L10.43 4.64l-3 3 1.43 1.43c-.09.45-.09.9 0 1.35L7.43 11.86l-3-3-1.43 1.43 3 3 1.43-1.43c.09.45.09.9 0 1.35l-1.43 1.43 3 3 1.43-1.43c.45.09.9.09 1.35 0l1.43 1.43 3-3-1.43-1.43c-.09-.45-.09-.9 0-1.35l1.43-1.43 3 3 1.43-1.43-3-3z" />
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

  const levelUpIcon = (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 15L12 9L18 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );

  const dinoBossIcon = (
    <svg width="42" height="42" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M 6 22 Q 2 26 4 29 Q 10 27 11 22 Z" 
        fill="#FF9600" 
        stroke="#B45309"
        strokeWidth="1.2"
      />
      <polygon points="3,17 0,20 5,21" fill="#CE82FF" stroke="#7E22CE" strokeWidth="1" />
      <polygon points="6,12 2,13 6,16" fill="#CE82FF" stroke="#7E22CE" strokeWidth="1" />
      <polygon points="10,8 8,4 12,9" fill="#CE82FF" stroke="#7E22CE" strokeWidth="1" />
      <polygon points="15,7 15,3 18,7" fill="#CE82FF" stroke="#7E22CE" strokeWidth="1" />
      <ellipse cx="14" cy="17" rx="10" ry="10" fill="#FF9600" stroke="#B45309" strokeWidth="1.2" />
      <ellipse cx="20" cy="18" rx="8" ry="7" fill="#FF9600" stroke="#B45309" strokeWidth="1.2" />
      <ellipse cx="14" cy="17" rx="9" ry="9" fill="#FF9600" />
      <ellipse cx="20" cy="18" rx="7.2" ry="6.2" fill="#FF9600" />
      <circle cx="16" cy="13" r="5" fill="white" stroke="#B45309" strokeWidth="1" />
      <circle cx="16.5" cy="13" r="2.2" fill="#1F2937" />
      <circle cx="17.2" cy="12.2" r="0.8" fill="white" />
      <circle cx="21" cy="18" r="1.8" fill="#FF4B4B" opacity="0.7" />
      <path 
        d="M 18 20.8 Q 20.5 22.5 22.5 19.5" 
        stroke="#7C2D12" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        fill="none" 
      />
      <path 
        d="M 15 22 Q 18 23.5 16.5 25.5" 
        stroke="#7C2D12" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />
    </svg>
  );

  const getIcon = () => {
    if (status === 'completed') return checkIcon;
    if (status === 'locked') return lockIcon;

    switch (icon) {
      case 'level-up': return levelUpIcon;
      case 'boss': return dinoBossIcon;
      case 'crown': return crownIcon;
      case 'dumbbell': return dumbbellIcon;
      case 'star':
      default:
        return starIcon;
    }
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
