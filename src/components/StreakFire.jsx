import './StreakFire.css';

export default function StreakFire({ size = 64, active = true }) {
  return (
    <div className="streak-fire" style={{ width: size, height: size }}>
      <svg viewBox="0 0 64 64" width={size} height={size} className="streak-fire-svg">
        <defs>
          <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF9600" />
            <stop offset="50%" stopColor="#FFC800" />
            <stop offset="100%" stopColor="#FFDE00" />
          </linearGradient>
          <linearGradient id="fireInnerGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FF9600" />
          </linearGradient>
        </defs>
        {/* Outer flame */}
        <path
          d="M32 4C32 4 14 22 14 38C14 48.5 22 56 32 58C42 56 50 48.5 50 38C50 22 32 4 32 4Z"
          fill={active ? "url(#fireGradient)" : "#E5E5E5"}
          className="flame-outer"
        />
        {/* Inner flame */}
        <path
          d="M32 20C32 20 22 32 22 40C22 46 26.5 50 32 52C37.5 50 42 46 42 40C42 32 32 20 32 20Z"
          fill={active ? "url(#fireInnerGradient)" : "#AFAFAF"}
          className="flame-inner"
        />
        {/* Core glow */}
        <ellipse 
          cx="32" 
          cy="46" 
          rx="6" 
          ry="8" 
          fill={active ? "#FFC800" : "#CCCCCC"} 
          opacity="0.8" 
          className="flame-core" 
        />
      </svg>
    </div>
  );
}
