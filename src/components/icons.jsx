/**
 * Centralized Duolingo-style SVG icon components.
 * Import from here instead of defining locally in each component.
 */

// ─── Flag ────────────────────────────────────────────────────────────
export const EnglishFlagIcon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 76 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      borderRadius: '4px',
      boxShadow: '0 2px 0 #E5E5E5',
      border: '1px solid #E5E5E5',
    }}
  >
    {/* Red and white stripes */}
    <rect width="76" height="40" fill="#FFFFFF" />
    <rect width="76" height="3.07" y="0" fill="#B22234" />
    <rect width="76" height="3.07" y="6.15" fill="#B22234" />
    <rect width="76" height="3.07" y="12.3" fill="#B22234" />
    <rect width="76" height="3.07" y="18.46" fill="#B22234" />
    <rect width="76" height="3.07" y="24.61" fill="#B22234" />
    <rect width="76" height="3.07" y="30.77" fill="#B22234" />
    <rect width="76" height="3.07" y="36.92" fill="#B22234" />
    {/* Blue canton */}
    <rect width="30.4" height="21.54" fill="#3C3B6E" />
    {/* 8 white stars simplified */}
    <circle cx="5" cy="4" r="1.2" fill="#FFFFFF" />
    <circle cx="15" cy="4" r="1.2" fill="#FFFFFF" />
    <circle cx="25" cy="4" r="1.2" fill="#FFFFFF" />
    <circle cx="10" cy="11" r="1.2" fill="#FFFFFF" />
    <circle cx="20" cy="11" r="1.2" fill="#FFFFFF" />
    <circle cx="5" cy="18" r="1.2" fill="#FFFFFF" />
    <circle cx="15" cy="18" r="1.2" fill="#FFFFFF" />
    <circle cx="25" cy="18" r="1.2" fill="#FFFFFF" />
  </svg>
);

// ─── Gem (3D faceted diamond) ────────────────────────────────────────
export const GemIcon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M12 2L19 7L12 12L5 7L12 2Z" fill="#00CDFF" />
    <path d="M12 12L19 7V17L12 22V12Z" fill="#0079FF" opacity="0.85" />
    <path d="M5 7L12 12V22L5 17V7Z" fill="#00A2FF" opacity="0.95" />
    <path d="M12 2L12 12L5 7L12 2Z" fill="#84E7FF" opacity="0.6" />
  </svg>
);

// ─── Heart (solid red) ──────────────────────────────────────────────
export const HeartIcon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#FF4B4B"
    />
  </svg>
);

// ─── Trophy (gold, for leaderboard) ─────────────────────────────────
export const TrophyIcon = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#FFC800"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" />
  </svg>
);

// ─── Lightning Bolt (yellow, for XP) ────────────────────────────────
export const LightningIcon = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M7 2v11h3v9l7-12h-4l4-8H7z" fill="#FFC800" />
  </svg>
);

// ─── Checkmark (green) ──────────────────────────────────────────────
export const CheckIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="var(--color-green)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

// ─── Clock / Timer ──────────────────────────────────────────────────
export const ClockIcon = ({ size = 16, color = 'var(--color-text-light)' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
  </svg>
);

// ─── Settings Gear ──────────────────────────────────────────────────
export const GearIcon = ({ size = 24, color = '#AFAFAF' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

// ─── Pencil/Edit ────────────────────────────────────────────────────
export const EditIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#AFAFAF"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
  </svg>
);

// ─── Stopwatch (blue, for quests) ───────────────────────────────────
export const StopwatchIcon = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="26" r="18" fill="#DDF4FF" />
    <circle cx="24" cy="26" r="14" fill="#1CB0F6" />
    <circle cx="24" cy="26" r="10" fill="white" />
    <rect x="22" y="8" width="4" height="6" rx="2" fill="#1CB0F6" />
    <line x1="24" y1="26" x2="24" y2="19" stroke="#1CB0F6" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="26" x2="29" y2="26" stroke="#1CB0F6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ─── Headphones (coral/red, for listening) ──────────────────────────
export const HeadphonesIcon = ({ size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="20" fill="#FFDFE0" />
    <path
      d="M12 26v-2a12 12 0 0124 0v2"
      stroke="#FF4B4B"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <rect x="8" y="24" width="6" height="12" rx="3" fill="#FF4B4B" />
    <rect x="34" y="24" width="6" height="12" rx="3" fill="#FF4B4B" />
  </svg>
);

// ─── Open Book (purple, for stories) ────────────────────────────────
export const BookIcon = ({ size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#F3E8FF" />
    <path d="M24 14v20" stroke="#CE82FF" strokeWidth="2" />
    <path d="M24 14c-4 0-8 2-12 4v16c4-2 8-4 12-4" fill="#CE82FF" opacity="0.3" />
    <path d="M24 14c4 0 8 2 12 4v16c-4-2-8-4-12-4" fill="#CE82FF" opacity="0.2" />
    <path d="M14 22h6M14 27h6" stroke="#CE82FF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M28 22h6M28 27h6" stroke="#CE82FF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Recycle Arrows (orange, for mistakes review) ───────────────────
export const RecycleIcon = ({ size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="20" fill="#FFF0D5" />
    <path
      d="M16 20a10 10 0 0116 0M32 28a10 10 0 01-16 0"
      stroke="#FF9600"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path d="M30 16l2 4h-4l2-4z" fill="#FF9600" />
    <path d="M18 32l-2-4h4l-2 4z" fill="#FF9600" />
  </svg>
);

// ─── Chest / Reward (brown, for quest rewards) ──────────────────────
export const ChestIcon = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="10" width="18" height="11" rx="2" fill="#C67600" />
    <path d="M3 10h18V8c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v2z" fill="#FFB300" />
    <rect x="10" y="9" width="4" height="4" rx="1" fill="#E5A93C" stroke="#A05A00" strokeWidth="1" />
    <circle cx="12" cy="11" r="0.8" fill="#333" />
    <rect x="5" y="6" width="2" height="15" fill="#FFC800" opacity="0.5" />
    <rect x="17" y="6" width="2" height="15" fill="#FFC800" opacity="0.5" />
  </svg>
);

// ─── Home (house) ────────────────────────────────────────────────────
export const HomeIcon = ({ active, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 6L6 20h6v18h8V28h8v10h8V20h6L24 6z" fill={active ? '#FF9600' : '#AFAFAF'} />
    {active && <path d="M24 6l-6 5.2V8h4v-2h2z" fill="#FFC800" opacity="0.3" />}
  </svg>
);

// ─── Letters ("あ") ───────────────────────────────────────────────────
export const LettersIcon = ({ active, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <text
      x="24" y="34"
      textAnchor="middle"
      fontFamily="Nunito, sans-serif"
      fontSize="30"
      fontWeight="900"
      fill={active ? '#1CB0F6' : '#AFAFAF'}
    >あ</text>
  </svg>
);

// ─── Practice (Duo owl face + hearts) ──────────────────────────────────
export const PracticeIcon = ({ active, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="16" fill={active ? '#58CC02' : '#E5E5E5'} />
    <circle cx="24" cy="26" r="12" fill={active ? '#89E219' : '#F0F0F0'} />
    <circle cx="19" cy="22" r="4.5" fill="white" />
    <circle cx="29" cy="22" r="4.5" fill="white" />
    <circle cx="20" cy="22" r="2.2" fill="#333" />
    <circle cx="30" cy="22" r="2.2" fill="#333" />
    <ellipse cx="24" cy="28" rx="2.5" ry="1.5" fill="#FFC800" />
    <path d="M10 12c0-2 1.5-3.5 3.5-3.5S17 10 17 12c0 3.5-3.5 6-3.5 6S10 15.5 10 12z" fill={active ? '#FF4B4B' : '#D0D0D0'} />
    <path d="M31 12c0-2 1.5-3.5 3.5-3.5S38 10 38 12c0 3.5-3.5 6-3.5 6S31 15.5 31 12z" fill={active ? '#CE82FF' : '#D0D0D0'} />
  </svg>
);

// ─── Leaderboard (Shield) ─────────────────────────────────────────────
export const LeaderboardIcon = ({ active, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M24 4L8 8v14c0 10.4 6.8 20.1 16 22 9.2-1.9 16-11.6 16-22V8L24 4z"
      fill={active ? '#FFC800' : '#AFAFAF'}
    />
    {active && (
      <>
        <path d="M24 4L24 44c9.2-1.9 16-11.6 16-22V8L24 4z" fill="#FF9600" opacity="0.15" />
        <path d="M24 10L14 12v10c0 7 4.2 13.5 10 16V10z" fill="#FFE57F" opacity="0.4" />
      </>
    )}
  </svg>
);

// ─── Quests (Chest) ───────────────────────────────────────────────────
export const QuestsIcon = ({ active, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="8" y="18" width="32" height="20" rx="3" fill={active ? '#C67600' : '#AFAFAF'} />
    <path d="M8 18h32v-4c0-2.2-1.8-4-4-4H12c-2.2 0-4 1.8-4 4v4z" fill={active ? '#FFB300' : '#D0D0D0'} />
    <rect x="20" y="15" width="8" height="7" rx="1.5" fill={active ? '#E5A93C' : '#C0C0C0'} stroke={active ? '#A05A00' : '#999'} strokeWidth="1.5" />
    <circle cx="24" cy="18.5" r="1" fill="#333" />
    {active && (
      <>
        <rect x="12" y="10" width="3" height="28" fill="#FFC800" opacity="0.5" />
        <rect x="33" y="10" width="3" height="28" fill="#FFC800" opacity="0.5" />
      </>
    )}
  </svg>
);

// ─── Profile (Purple Face) ────────────────────────────────────────────
export const ProfileIcon = ({ active, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="16" fill={active ? '#CE82FF' : '#AFAFAF'} />
    <circle cx="24" cy="20" r="7" fill={active ? '#FFD0A1' : '#E0E0E0'} />
    <ellipse cx="24" cy="36" rx="12" ry="8" fill={active ? '#CE82FF' : '#AFAFAF'} />
    {active && (
      <>
        <circle cx="21" cy="19" r="1.5" fill="#333" />
        <circle cx="27" cy="19" r="1.5" fill="#333" />
        <path d="M21 23q3 3 6 0" stroke="#FF4B4B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </>
    )}
  </svg>
);

// ─── More (Three Dots) ────────────────────────────────────────────────
export const MoreIcon = ({ active, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill={active ? '#58CC02' : '#AFAFAF'} />
  </svg>
);

// ─── 3D Category Letter Icon ──────────────────────────────────────────
export const Category3DIcon = ({ letter, color, size = 64 }) => {
  const colorMap = {
    '#58CC02': { base: '#58CC02', dark: '#38A800', light: '#89E219' }, // Grammar (Green)
    '#FFC800': { base: '#FFC800', dark: '#cc9f00', light: '#FFE880' }, // Yellow
    '#FF4B4B': { base: '#FF4B4B', dark: '#EA2C2C', light: '#FF8585' }, // Vocab (Red)
    '#CE82FF': { base: '#CE82FF', dark: '#AA62DD', light: '#E4B3FF' }, // Reading (Purple)
    '#1CB0F6': { base: '#1CB0F6', dark: '#0092DF', light: '#84D7FF' }, // Exam (Blue)
  };
  const shades = colorMap[color] || { base: color, dark: '#999999', light: '#CCCCCC' };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        verticalAlign: 'middle',
        filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.08))',
        borderRadius: '10px',
      }}
    >
      <rect x="0" y="4" width="64" height="60" rx="12" fill={shades.dark} />
      <rect x="0" y="0" width="64" height="60" rx="12" fill={shades.base} />
      <rect x="4" y="4" width="56" height="24" rx="6" fill={shades.light} opacity="0.45" />
      <text
        x="32"
        y="42"
        fill="#FFFFFF"
        fontSize="36"
        fontWeight="900"
        textAnchor="middle"
        fontFamily="var(--font-family), system-ui, sans-serif"
      >
        {letter}
      </text>
    </svg>
  );
};

// ─── Cute Trophy Icon with Level (Duolingo Style) ──────────────────────
export const TrophyLevelIcon = ({ size = 48, level = 1 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12))'
    }}
  >
    {/* 1. Bottom 3D Bevel Shadow (Dark Gold/Orange) */}
    <path
      d="M14 14 H50 C54 14, 54 18, 53 22 C51 38, 46 52, 32 58 C18 52, 13 38, 11 22 C10 18, 10 14, 14 14 Z"
      fill="#E58600"
    />

    {/* 2. Outer Shield Rim (Bright Yellow) */}
    <path
      d="M14 10 H50 C54 10, 54 14, 53 18 C51 34, 46 48, 32 54 C18 48, 13 34, 11 18 C10 14, 10 10, 14 10 Z"
      fill="#FFD900"
    />

    {/* 3. Inner Shield Face shadow (Orange/Dark Gold) */}
    <path
      d="M17 14 H47 C50 14, 50 17, 49 20 C48 33, 43 45, 32 50 C21 45, 16 33, 15 20 C14 17, 14 14, 17 14 Z"
      fill="#E58600"
    />

    {/* 4. Inner Shield Face (Warm Gold) */}
    <path
      d="M17 12 H47 C50 12, 50 15, 49 18 C48 31, 43 43, 32 48 C21 43, 16 31, 15 18 C14 15, 14 12, 17 12 Z"
      fill="#FF9600"
    />

    {/* 5. Top Highlight (Soft Light Yellow) */}
    <path
      d="M18 14 H46 C48 14, 48 16, 47 18 C46 22, 43 26, 32 28 C21 26, 18 22, 17 18 C16 16, 16 14, 18 14 Z"
      fill="#FFE57F"
      opacity="0.6"
    />

    {/* 6. Level Text "LV" in bold dark orange */}
    <text
      x="32"
      y="27"
      textAnchor="middle"
      fontFamily="var(--font-family), system-ui, sans-serif"
      fontSize="11"
      fontWeight="900"
      fill="#582A00"
      letterSpacing="0.5"
    >
      LV
    </text>

    {/* 7. Level number in bold dark orange */}
    <text
      x="32"
      y="41"
      textAnchor="middle"
      fontFamily="var(--font-family), system-ui, sans-serif"
      fontSize="15"
      fontWeight="900"
      fill="#582A00"
    >
      {level}
    </text>
  </svg>
);
