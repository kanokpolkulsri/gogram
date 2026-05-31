import { useState } from 'react';
import './DuolingoOwl.css';

export default function DuolingoOwl({ size = 120 }) {
  const [animation, setAnimation] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const handleClick = () => {
    if (isLocked) return;
    const moves = ['animate-backflip', 'animate-turnaround'];
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    setAnimation(randomMove);
    setIsLocked(true);
    const duration = randomMove === 'animate-backflip' ? 900 : 700;
    setTimeout(() => {
      setAnimation('');
      setIsLocked(false);
    }, duration);
  };

  return (
    <div
      className={`duolingo-owl-container ${animation}`}
      onClick={handleClick}
      title="Click me to perform a trick!"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Body */}
        <ellipse cx="100" cy="120" rx="58" ry="60" fill="#58CC02" />
        <ellipse cx="100" cy="130" rx="45" ry="45" fill="#89E219" />

        {/* Left wing/arm */}
        <ellipse cx="48" cy="125" rx="14" ry="22" fill="#58CC02" transform="rotate(-15 48 125)" />

        {/* Right wing/arm */}
        <ellipse cx="152" cy="125" rx="14" ry="22" fill="#58CC02" transform="rotate(15 152 125)" />

        {/* Head */}
        <circle cx="100" cy="80" r="42" fill="#58CC02" />
        <circle cx="100" cy="82" r="36" fill="#89E219" />

        {/* Ear tufts */}
        <ellipse cx="68" cy="48" rx="8" ry="16" fill="#58CC02" transform="rotate(-20 68 48)" />
        <ellipse cx="132" cy="48" rx="8" ry="16" fill="#58CC02" transform="rotate(20 132 48)" />

        {/* Left eye */}
        <circle cx="82" cy="78" r="16" fill="white" />
        <circle cx="86" cy="78" r="8" fill="#333" />
        <circle cx="88" cy="76" r="3" fill="white" />

        {/* Right eye */}
        <circle cx="118" cy="78" r="16" fill="white" />
        <circle cx="122" cy="78" r="8" fill="#333" />
        <circle cx="124" cy="76" r="3" fill="white" />

        {/* Beak */}
        <ellipse cx="100" cy="98" rx="8" ry="5" fill="#FFC800" />

        {/* Belly spot */}
        <ellipse cx="100" cy="140" rx="22" ry="18" fill="#C2F125" opacity="0.4" />

        {/* Feet */}
        <ellipse cx="84" cy="174" rx="12" ry="5" fill="#FFC800" />
        <ellipse cx="116" cy="174" rx="12" ry="5" fill="#FFC800" />

        {/* Smile */}
        <path
          d="M88 104 Q100 114 112 104"
          stroke="#3C8C00"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
