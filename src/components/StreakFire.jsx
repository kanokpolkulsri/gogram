import './StreakFire.css';

export default function StreakFire({ size = 64, active = true, customColor = null, isRainbow = false }) {
  const shieldFill = isRainbow
    ? 'url(#rainbowGradient)'
    : (customColor ? customColor : '#FFC800');

  const shieldHighlight = isRainbow
    ? '#FFFFFF'
    : (customColor ? 'rgba(255,255,255,0.45)' : '#FFE57F');

  const shieldDark = isRainbow
    ? 'rgba(0,0,0,0.2)'
    : (customColor ? 'rgba(0,0,0,0.18)' : '#FF9600');

  const inactiveFill = '#E5E5E5';
  const inactiveDark = '#AFAFAF';

  return (
    <div className="streak-fire" style={{ width: size, height: size }}>
      <svg viewBox="0 0 48 48" width={size} height={size} className="streak-fire-svg">
        {isRainbow && (
          <defs>
            <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF007F" />
              <stop offset="35%" stopColor="#FF7F00" />
              <stop offset="65%" stopColor="#FFFF00" />
              <stop offset="85%" stopColor="#00FF66" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
        )}
        {/* Shield shadow / dark rim */}
        <path
          d="M24 4L8 8v14c0 10.4 6.8 20.1 16 22 9.2-1.9 16-11.6 16-22V8L24 4z"
          fill={active ? shieldDark : inactiveDark}
          transform="translate(0, 2)"
        />
        {/* Shield body */}
        <path
          d="M24 4L8 8v14c0 10.4 6.8 20.1 16 22 9.2-1.9 16-11.6 16-22V8L24 4z"
          fill={active ? shieldFill : inactiveFill}
        />
        {/* Top highlight */}
        {active && (
          <path
            d="M24 7L11 10.5v8c0 1 0.2 2 0.5 3C14 18 19 15 24 14c5 1 10 4 12.5 7.5 0.3-1 0.5-2 0.5-3v-8L24 7z"
            fill={shieldHighlight}
            opacity="0.4"
          />
        )}
      </svg>
    </div>
  );
}
