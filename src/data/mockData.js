// Mock data for Gogram — English language learning for Thai learners

export const initialUser = {
  name: 'Learner',
  totalXP: 680,
  hearts: 5,
  maxHearts: 5,
  streak: 3,
  streakHistory: [], // array of date strings 'YYYY-MM-DD'
  currentUnit: 1,
  completedLessons: [], // array of 'unitId-levelId' strings
  gems: 660,
  league: 'Gold',
  following: 12,
  followers: 8,
}; export const units = [
  {
    id: 1,
    category: 'grammar',
    title: 'Verb to Be',
    section: 'SECTION 1, UNIT 1',
    description: 'Master the forms of am, is, are, was, were',
    color: '#58CC02',
    levels: [
      { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
      { id: 'medium1', label: 'Medium 1', xpReward: 15, icon: 'star', questions: [] },
      { id: 'medium2', label: 'Medium 2', xpReward: 15, icon: 'dumbbell', questions: [] },
      { id: 'hard1', label: 'Hard 1', xpReward: 20, icon: 'level-up', questions: [] },
      { id: 'hard2', label: 'Hard 2', xpReward: 35, icon: 'boss', questions: [] }
    ]
  },
  {
    id: 2,
    category: 'grammar',
    title: 'Subject and Object Pronouns',
    section: 'SECTION 1, UNIT 2',
    description: 'Learn when to use he/him, she/her, they/them, and I/me',
    color: '#CE82FF',
    levels: [
      { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
      { id: 'medium1', label: 'Medium 1', xpReward: 15, icon: 'star', questions: [] },
      { id: 'medium2', label: 'Medium 2', xpReward: 15, icon: 'dumbbell', questions: [] },
      { id: 'hard1', label: 'Hard 1', xpReward: 20, icon: 'level-up', questions: [] },
      { id: 'hard2', label: 'Hard 2', xpReward: 35, icon: 'boss', questions: [] }
    ]
  },
  {
    id: 3,
    category: 'grammar',
    title: 'Possessive Adjectives, Possessive Pronouns, and Reflexive Pronouns',
    section: 'SECTION 1, UNIT 3',
    description: 'Master my/mine/myself, its/itself, their/theirs/themselves',
    color: '#1CB0F6',
    levels: [
      { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
      { id: 'medium1', label: 'Medium 1', xpReward: 15, icon: 'star', questions: [] },
      { id: 'medium2', label: 'Medium 2', xpReward: 15, icon: 'dumbbell', questions: [] },
      { id: 'hard1', label: 'Hard 1', xpReward: 20, icon: 'level-up', questions: [] },
      { id: 'hard2', label: 'Hard 2', xpReward: 35, icon: 'boss', questions: [] }
    ]
  },
  {
    id: 4,
    category: 'vocabulary',
    title: 'Vocabulary: Fruits & Food',
    section: 'SECTION 1, UNIT 4',
    description: 'Learn common English food and fruits',
    color: '#FF4B4B',
    levels: [
      { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
      { id: 'medium1', label: 'Medium', xpReward: 15, icon: 'star', questions: [] },
      { id: 'medium2', label: 'Medium', xpReward: 15, icon: 'dumbbell', questions: [] },
      { id: 'hard1', label: 'Hard', xpReward: 20, icon: 'star', questions: [] },
      { id: 'hard2', label: 'Hard', xpReward: 25, icon: 'trophy', questions: [] }
    ]
  },
  {
    id: 5,
    category: 'vocabulary',
    title: 'Vocabulary: Colors & Clothes',
    section: 'SECTION 1, UNIT 5',
    description: 'Learn common colors and clothing vocabulary',
    color: '#FF9600',
    levels: [
      { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
      { id: 'medium1', label: 'Medium', xpReward: 15, icon: 'star', questions: [] },
      { id: 'medium2', label: 'Medium', xpReward: 15, icon: 'dumbbell', questions: [] },
      { id: 'hard1', label: 'Hard', xpReward: 20, icon: 'star', questions: [] },
      { id: 'hard2', label: 'Hard', xpReward: 25, icon: 'trophy', questions: [] }
    ]
  },
  {
    id: 6,
    category: 'reading',
    title: 'Reading: The Boy Who Cried Wolf',
    section: 'SECTION 2, UNIT 1',
    description: 'Practice reading comprehension with a classic fable',
    color: '#CE82FF',
    levels: [
      { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
      { id: 'medium1', label: 'Medium', xpReward: 15, icon: 'star', questions: [] },
      { id: 'medium2', label: 'Medium', xpReward: 15, icon: 'dumbbell', questions: [] },
      { id: 'hard1', label: 'Hard', xpReward: 20, icon: 'star', questions: [] },
      { id: 'hard2', label: 'Hard', xpReward: 25, icon: 'trophy', questions: [] }
    ]
  },
  {
    id: 7,
    category: 'reading',
    title: 'Reading: Little Red Riding Hood',
    section: 'SECTION 2, UNIT 2',
    description: 'Practice comprehension with a classic fairytale',
    color: '#00CDFF',
    levels: [
      { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
      { id: 'medium1', label: 'Medium', xpReward: 15, icon: 'star', questions: [] },
      { id: 'medium2', label: 'Medium', xpReward: 15, icon: 'dumbbell', questions: [] },
      { id: 'hard1', label: 'Hard', xpReward: 20, icon: 'star', questions: [] },
      { id: 'hard2', label: 'Hard', xpReward: 25, icon: 'trophy', questions: [] }
    ]
  },
  {
    id: 8,
    category: 'exam-grammars',
    title: 'Exam: Passive Voice',
    section: 'SECTION 3, UNIT 1',
    description: 'Learn passive voice structure for formal exams',
    color: '#89E219',
    levels: [
      { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
      { id: 'medium1', label: 'Medium', xpReward: 15, icon: 'star', questions: [] },
      { id: 'medium2', label: 'Medium', xpReward: 15, icon: 'dumbbell', questions: [] },
      { id: 'hard1', label: 'Hard', xpReward: 20, icon: 'star', questions: [] },
      { id: 'hard2', label: 'Hard', xpReward: 25, icon: 'trophy', questions: [] }
    ]
  },
  {
    id: 9,
    category: 'exam-grammars',
    title: 'Exam: Conditional Sentences',
    section: 'SECTION 3, UNIT 2',
    description: 'Learn conditional structures (If-clauses)',
    color: '#1CB0F6',
    levels: [
      { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
      { id: 'medium1', label: 'Medium', xpReward: 15, icon: 'star', questions: [] },
      { id: 'medium2', label: 'Medium', xpReward: 15, icon: 'dumbbell', questions: [] },
      { id: 'hard1', label: 'Hard', xpReward: 20, icon: 'star', questions: [] },
      { id: 'hard2', label: 'Hard', xpReward: 25, icon: 'trophy', questions: [] }
    ]
  }
];

export const studyCategories = [
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Explore this category',
    color: '#58CC02',
    iconChar: 'G',
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Strengthen core verbs and keywords',
    color: '#FF4B4B',
    iconChar: 'V',
  },
  {
    id: 'reading',
    title: 'Reading',
    description: 'Improve comprehension with short stories',
    color: '#CE82FF',
    iconChar: 'R',
  },
];



// Shop items
export const shopItems = {
  powerUps: [
    {
      id: 'streak-freeze',
      name: 'Streak Freeze',
      description: 'Streak Freeze allows your streak to remain in place for one full day of inactivity.',
      icon: '❄️',
      cost: 10,
      category: 'Power-Ups',
    },
    {
      id: 'heart-refill',
      name: 'Heart Refill',
      description: 'Refill your hearts so you can keep practicing without waiting.',
      icon: '❤️',
      cost: 350,
      category: 'Power-Ups',
    },
    {
      id: 'double-or-nothing',
      name: 'Double or Nothing',
      description: 'Wager 50 gems that you can maintain a 7 day streak. If you do, you win 100 gems!',
      icon: '🎰',
      cost: 50,
      category: 'Power-Ups',
    },
  ],
  outfits: [
    {
      id: 'superhero',
      name: 'Superhero Gogram Owl',
      description: 'Dress Gogram Owl in a superhero cape!',
      icon: '🦸',
      cost: 600,
      category: 'Outfits',
    },
    {
      id: 'formal',
      name: 'Formal Gogram Owl',
      description: 'Gogram Owl looking fancy in a top hat and bow tie.',
      icon: '🎩',
      cost: 500,
      category: 'Outfits',
    },
    {
      id: 'chef',
      name: 'Chef Gogram Owl',
      description: 'Gogram Owl is ready to cook some fine cuisine!',
      icon: '👨‍🍳',
      cost: 400,
      category: 'Outfits',
    },
    {
      id: 'athletic',
      name: 'Athletic Gogram Owl',
      description: 'Gogram Owl is ready for the sports day!',
      icon: '🏃',
      cost: 450,
      category: 'Outfits',
    },
  ],
};

// League / leaderboard data
export const leagueData = {
  currentLeague: 'Gold',
  leagues: ['Bronze', 'Silver', 'Gold', 'Sapphire', 'Ruby', 'Emerald', 'Amethyst', 'Pearl', 'Obsidian', 'Diamond'],
  weeklyLeaderboard: [
    { rank: 1, name: 'Somchai', xp: 1250, country: '🇹🇭', avatar: '#FF9600', initials: 'SC' },
    { rank: 2, name: 'Sakura', xp: 1180, country: '🇯🇵', avatar: '#FF4B4B', initials: 'SA' },
    { rank: 3, name: 'Pim', xp: 980, country: '🇹🇭', avatar: '#CE82FF', initials: 'PI' },
    { rank: 4, name: 'Hans', xp: 920, country: '🇩🇪', avatar: '#1CB0F6', initials: 'HA' },
    { rank: 5, name: 'Lucia', xp: 870, country: '🇮🇹', avatar: '#58CC02', initials: 'LU' },
    { rank: 6, name: 'Nut', xp: 810, country: '🇹🇭', avatar: '#FF9600', initials: 'NU' },
    { rank: 7, name: 'Emma', xp: 760, country: '🇬🇧', avatar: '#CE82FF', initials: 'EM' },
    { rank: 8, name: 'Yuki', xp: 720, country: '🇯🇵', avatar: '#FF4B4B', initials: 'YU' },
    { rank: 9, name: 'Kanya', xp: 680, country: '🇹🇭', avatar: '#1CB0F6', initials: 'KA' },
    { rank: 10, name: 'Lek', xp: 620, country: '🇹🇭', avatar: '#58CC02', initials: 'LE' },
    { rank: 11, name: 'Marco', xp: 580, country: '🇮🇹', avatar: '#FF9600', initials: 'MR' },
    { rank: 12, name: 'Bow', xp: 520, country: '🇹🇭', avatar: '#CE82FF', initials: 'BO' },
    { rank: 13, name: 'Tom', xp: 480, country: '🇺🇸', avatar: '#1CB0F6', initials: 'TO' },
    { rank: 14, name: 'Kim', xp: 410, country: '🇰🇷', avatar: '#FF4B4B', initials: 'KI' },
    { rank: 15, name: 'Lena', xp: 350, country: '🇸🇪', avatar: '#58CC02', initials: 'LE' },
  ],
  promotionZone: 10, // top 10 get promoted
  demotionZone: 5, // bottom 5 get demoted
};

// Practice categories
export const practiceCategories = [
  {
    id: 'listening',
    title: 'Listening',
    description: 'Practice understanding spoken English',
    icon: '🎧',
    color: '#1CB0F6',
    difficulty: 'Beginner',
    questionsCount: 10,
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Practice pronunciation and speaking',
    icon: '🎤',
    color: '#CE82FF',
    difficulty: 'Beginner',
    questionsCount: 8,
  },
  {
    id: 'reading',
    title: 'Reading',
    description: 'Practice reading comprehension',
    icon: '📖',
    color: '#58CC02',
    difficulty: 'Intermediate',
    questionsCount: 12,
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Practice writing in English',
    icon: '✏️',
    color: '#FF9600',
    difficulty: 'Intermediate',
    questionsCount: 10,
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Review and strengthen your word knowledge',
    icon: '📚',
    color: '#FF4B4B',
    difficulty: 'All Levels',
    questionsCount: 15,
  },
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Practice English grammar rules',
    icon: '📝',
    color: '#FFC800',
    difficulty: 'Intermediate',
    questionsCount: 10,
  },
];

export const encouragements = [
  'Excellent!',
  'Great job!',
  'Amazing!',
  'Perfect!',
  'Way to go!',
  'Brilliant!',
  'Fantastic!',
  'Superb!',
];

export const getRandomEncouragement = () => {
  return encouragements[Math.floor(Math.random() * encouragements.length)];
};
