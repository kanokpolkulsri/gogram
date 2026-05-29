// Mock data for Duolingo Clone — French language learning

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
};

export const units = [
  {
    id: 1,
    title: 'Solo trip: Compare travel experiences',
    section: 'SECTION 1, UNIT 1',
    description: 'Learn French articles: le, la, les, un, une',
    color: '#58CC02',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          {
            id: 'a1',
            question: 'How do you say "the" (masculine) in French?',
            options: ['le', 'la', 'les', 'un'],
            correctAnswer: 'le',
          },
          {
            id: 'a2',
            question: 'How do you say "the" (feminine) in French?',
            options: ['le', 'la', 'un', 'une'],
            correctAnswer: 'la',
          },
          {
            id: 'a3',
            question: 'How do you say "the" (plural) in French?',
            options: ['le', 'la', 'les', 'des'],
            correctAnswer: 'les',
          },
        ],
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          {
            id: 'a4',
            question: 'Which article goes with "chat" (cat)?',
            options: ['la', 'le', 'les', 'une'],
            correctAnswer: 'le',
          },
          {
            id: 'a5',
            question: 'Which article goes with "maison" (house)?',
            options: ['le', 'la', 'un', 'les'],
            correctAnswer: 'la',
          },
          {
            id: 'a6',
            question: 'How do you say "a" (masculine) in French?',
            options: ['un', 'une', 'le', 'des'],
            correctAnswer: 'un',
          },
        ],
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          {
            id: 'a7',
            question: 'How do you say "a" (feminine) in French?',
            options: ['un', 'une', 'la', 'des'],
            correctAnswer: 'une',
          },
          {
            id: 'a8',
            question: '"___ garçon" — which article fits? (the boy)',
            options: ['Le', 'La', 'Les', 'Une'],
            correctAnswer: 'Le',
          },
          {
            id: 'a9',
            question: '"___ filles" — which article fits? (the girls)',
            options: ['Le', 'La', 'Les', 'Un'],
            correctAnswer: 'Les',
          },
        ],
      },
      {
        id: 'hard1',
        label: 'Level 1',
        xpReward: 20,
        icon: 'level-up',
        questions: [
          {
            id: 'a10',
            question: '"___ femme" — which article fits? (a woman)',
            options: ['Un', 'Une', 'Le', 'Des'],
            correctAnswer: 'Une',
          },
          {
            id: 'a11',
            question: 'Which is correct? "I have a dog"',
            options: ["J'ai un chien", "J'ai une chien", "J'ai le chien", "J'ai la chien"],
            correctAnswer: "J'ai un chien",
          },
          {
            id: 'a12',
            question: 'Which is correct? "The women are tall"',
            options: ['Les femmes sont grandes', 'La femmes sont grandes', 'Le femmes sont grandes', 'Des femmes sont grandes'],
            correctAnswer: 'Les femmes sont grandes',
          },
        ],
      },
      {
        id: 'hard2',
        label: 'Boss Challenge',
        xpReward: 35,
        icon: 'boss',
        questions: [
          {
            id: 'a4_b',
            question: 'Which article goes with "chat" (cat)?',
            options: ['la', 'le', 'les', 'une'],
            correctAnswer: 'le',
          },
          {
            id: 'a5_b',
            question: 'Which article goes with "maison" (house)?',
            options: ['le', 'la', 'un', 'les'],
            correctAnswer: 'la',
          },
          {
            id: 'a6_b',
            question: 'How do you say "a" (masculine) in French?',
            options: ['un', 'une', 'le', 'des'],
            correctAnswer: 'un',
          },
          {
            id: 'a11_b',
            question: 'Which is correct? "I have a dog"',
            options: ["J'ai un chien", "J'ai une chien", "J'ai le chien", "J'ai la chien"],
            correctAnswer: "J'ai un chien",
          },
          {
            id: 'a12_b',
            question: 'Which is correct? "The women are tall"',
            options: ['Les femmes sont grandes', 'La femmes sont grandes', 'Le femmes sont grandes', 'Des femmes sont grandes'],
            correctAnswer: 'Les femmes sont grandes',
          },
          {
            id: 'a15_b',
            question: 'Translate: "The apple is red"',
            options: ["La pomme est rouge", "Le pomme est rouge", "Une pomme est rouge", "Les pomme est rouge"],
            correctAnswer: "La pomme est rouge",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Solo trip: Ask about transportation',
    section: 'SECTION 1, UNIT 2',
    description: 'Learn French pronouns: je, tu, il, elle, nous, vous',
    color: '#CE82FF',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          {
            id: 'p1',
            question: 'How do you say "I" in French?',
            options: ['Je', 'Tu', 'Il', 'Nous'],
            correctAnswer: 'Je',
          },
          {
            id: 'p2',
            question: 'How do you say "you" (informal) in French?',
            options: ['Je', 'Tu', 'Vous', 'Il'],
            correctAnswer: 'Tu',
          },
          {
            id: 'p3',
            question: 'How do you say "he" in French?',
            options: ['Elle', 'Il', 'Nous', 'Ils'],
            correctAnswer: 'Il',
          },
        ],
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          {
            id: 'p4',
            question: 'How do you say "she" in French?',
            options: ['Il', 'Elle', 'Elles', 'Vous'],
            correctAnswer: 'Elle',
          },
          {
            id: 'p5',
            question: 'How do you say "we" in French?',
            options: ['Vous', 'Ils', 'Nous', 'Elles'],
            correctAnswer: 'Nous',
          },
          {
            id: 'p6',
            question: 'How do you say "you" (formal/plural) in French?',
            options: ['Tu', 'Vous', 'Nous', 'Ils'],
            correctAnswer: 'Vous',
          },
        ],
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          {
            id: 'p7',
            question: 'How do you say "they" (masculine) in French?',
            options: ['Elles', 'Ils', 'Nous', 'Vous'],
            correctAnswer: 'Ils',
          },
          {
            id: 'p8',
            question: '"___ mange une pomme." — He eats an apple.',
            options: ['Je', 'Tu', 'Il', 'Nous'],
            correctAnswer: 'Il',
          },
          {
            id: 'p9',
            question: '"___ parlons français." — We speak French.',
            options: ['Je', 'Vous', 'Ils', 'Nous'],
            correctAnswer: 'Nous',
          },
        ],
      },
      {
        id: 'hard1',
        label: 'Level 2',
        xpReward: 20,
        icon: 'level-up',
        questions: [
          {
            id: 'p10',
            question: '"___ êtes gentils." — You (plural) are kind.',
            options: ['Tu', 'Nous', 'Vous', 'Ils'],
            correctAnswer: 'Vous',
          },
          {
            id: 'p11',
            question: 'How do you say "they" (feminine) in French?',
            options: ['Ils', 'Elles', 'Nous', 'Vous'],
            correctAnswer: 'Elles',
          },
          {
            id: 'p12',
            question: 'When do you use "vous" instead of "tu"?',
            options: ['Formal or plural', 'Only for children', 'Only for animals', 'Never'],
            correctAnswer: 'Formal or plural',
          },
        ],
      },
      {
        id: 'hard2',
        label: 'Boss Challenge',
        xpReward: 35,
        icon: 'boss',
        questions: [
          {
            id: 'p4_b',
            question: 'How do you say "she" in French?',
            options: ['Il', 'Elle', 'Elles', 'Vous'],
            correctAnswer: 'Elle',
          },
          {
            id: 'p5_b',
            question: 'How do you say "we" in French?',
            options: ['Vous', 'Ils', 'Nous', 'Elles'],
            correctAnswer: 'Nous',
          },
          {
            id: 'p6_b',
            question: 'How do you say "you" (formal/plural) in French?',
            options: ['Tu', 'Vous', 'Nous', 'Ils'],
            correctAnswer: 'Vous',
          },
          {
            id: 'p11_b',
            question: 'How do you say "they" (feminine) in French?',
            options: ['Ils', 'Elles', 'Nous', 'Vous'],
            correctAnswer: 'Elles',
          },
          {
            id: 'p13_b',
            question: 'Translate: "They (f.) are students"',
            options: ['Elles sont étudiantes', 'Ils sont étudiantes', 'Elles est étudiantes', 'Elle sont étudiantes'],
            correctAnswer: 'Elles sont étudiantes',
          },
          {
            id: 'p15_b',
            question: 'Fill in: "___ suis américain." (I am American)',
            options: ['Je', 'Tu', 'Il', 'Nous'],
            correctAnswer: 'Je',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Solo trip: Order in a café',
    section: 'SECTION 1, UNIT 3',
    description: 'Learn French common verbs: être, avoir, aimer, parler',
    color: '#1CB0F6',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          {
            id: 'v1',
            question: 'How do you conjugate "être" (to be) for "je"?',
            options: ['suis', 'es', 'est', 'sommes'],
            correctAnswer: 'suis',
          },
          {
            id: 'v2',
            question: 'How do you conjugate "avoir" (to have) for "tu"?',
            options: ['ai', 'as', 'a', 'avez'],
            correctAnswer: 'as',
          },
          {
            id: 'v3',
            question: 'How do you say "to like" or "to love" in French?',
            options: ['parler', 'aimer', 'être', 'avoir'],
            correctAnswer: 'aimer',
          },
        ],
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          {
            id: 'v4',
            question: 'How do you conjugate "être" for "ils/elles"?',
            options: ['sont', 'êtes', 'sommes', 'est'],
            correctAnswer: 'sont',
          },
          {
            id: 'v5',
            question: 'How do you say "to speak" in French?',
            options: ['aimer', 'parler', 'être', 'avoir'],
            correctAnswer: 'parler',
          },
          {
            id: 'v6',
            question: 'How do you conjugate "aimer" (to like) for "il/elle"?',
            options: ['aime', 'aimes', 'aimons', 'aimez'],
            correctAnswer: 'aime',
          },
        ],
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          {
            id: 'v7',
            question: 'How do you conjugate "parler" (to speak) for "nous"?',
            options: ['parle', 'parles', 'parlons', 'parlez'],
            correctAnswer: 'parlons',
          },
          {
            id: 'v8',
            question: '"Nous ___ un chat." (We have a cat)',
            options: ['sommes', 'avez', 'avons', 'ont'],
            correctAnswer: 'avons',
          },
          {
            id: 'v9',
            question: '"Vous ___ français." (You speak French)',
            options: ['parle', 'parlez', 'parlons', 'parlent'],
            correctAnswer: 'parlez',
          },
        ],
      },
      {
        id: 'hard1',
        label: 'Level 3',
        xpReward: 20,
        icon: 'level-up',
        questions: [
          {
            id: 'v10',
            question: '"J\'___ le café." (I like coffee)',
            options: ['aime', 'aimes', 'aimons', 'aimez'],
            correctAnswer: 'aime',
          },
          {
            id: 'v11',
            question: 'How do you conjugate "avoir" (to have) for "ils/elles"?',
            options: ['ont', 'avons', 'avez', 'ont'],
            correctAnswer: 'ont',
          },
          {
            id: 'v12',
            question: 'Translate: "We are happy"',
            options: ['Nous sommes heureux', 'Nous avez heureux', 'Ils sont heureux', 'Vous êtes heureux'],
            correctAnswer: 'Nous sommes heureux',
          },
        ],
      },
      {
        id: 'hard2',
        label: 'Boss Challenge',
        xpReward: 35,
        icon: 'boss',
        questions: [
          {
            id: 'v5_b',
            question: 'How do you say "to speak" in French?',
            options: ['aimer', 'parler', 'être', 'avoir'],
            correctAnswer: 'parler',
          },
          {
            id: 'v6_b',
            question: 'How do you conjugate "aimer" (to like) for "il/elle"?',
            options: ['aime', 'aimes', 'aimons', 'aimez'],
            correctAnswer: 'aime',
          },
          {
            id: 'v7_b',
            question: 'How do you conjugate "parler" (to speak) for "nous"?',
            options: ['parle', 'parles', 'parlons', 'parlez'],
            correctAnswer: 'parlons',
          },
          {
            id: 'v12_b',
            question: 'Translate: "We are happy"',
            options: ['Nous sommes heureux', 'Nous avez heureux', 'Ils sont heureux', 'Vous êtes heureux'],
            correctAnswer: 'Nous sommes heureux',
          },
          {
            id: 'v14_b',
            question: 'Conjugate: "Ils ___ fatigués." (They are tired)',
            options: ['sont', 'ont', 'sommes', 'êtes'],
            correctAnswer: 'sont',
          },
          {
            id: 'v15_b',
            question: 'Translate: "She likes croissants"',
            options: ['Elle aime les croissants', 'Elle aimes les croissants', 'Elle aime le croissants', 'Elle ont les croissants'],
            correctAnswer: 'Elle aime les croissants',
          },
        ],
      },
    ],
  },
]

// French letters/accents for the Letters tab
export const letters = [
  { char: 'é', name: 'e accent aigu', pronunciation: '/e/', example: 'café', mastered: true },
  { char: 'è', name: 'e accent grave', pronunciation: '/ɛ/', example: 'mère', mastered: true },
  { char: 'ê', name: 'e accent circonflex', pronunciation: '/ɛ/', example: 'fête', mastered: false },
  { char: 'ë', name: 'e tréma', pronunciation: '/ɛ/', example: 'Noël', mastered: false },
  { char: 'à', name: 'a accent grave', pronunciation: '/a/', example: 'là', mastered: true },
  { char: 'â', name: 'a accent circonflex', pronunciation: '/ɑ/', example: 'pâte', mastered: false },
  { char: 'ç', name: 'c cédille', pronunciation: '/s/', example: 'garçon', mastered: true },
  { char: 'ù', name: 'u accent grave', pronunciation: '/y/', example: 'où', mastered: false },
  { char: 'û', name: 'u accent circonflex', pronunciation: '/y/', example: 'sûr', mastered: false },
  { char: 'ü', name: 'u tréma', pronunciation: '/y/', example: 'aigüe', mastered: false },
  { char: 'ô', name: 'o accent circonflex', pronunciation: '/o/', example: 'hôtel', mastered: false },
  { char: 'î', name: 'i accent circonflex', pronunciation: '/i/', example: 'île', mastered: false },
  { char: 'ï', name: 'i tréma', pronunciation: '/i/', example: 'naïf', mastered: false },
  { char: 'œ', name: 'o-e ligature', pronunciation: '/œ/', example: 'cœur', mastered: false },
  { char: 'æ', name: 'a-e ligature', pronunciation: '/e/', example: 'et cætera', mastered: false },
];

// Daily quests
export const dailyQuests = [
  {
    id: 'dq1',
    title: 'Earn 10 XP',
    icon: '⚡',
    iconColor: '#FFC800',
    current: 0,
    target: 10,
    reward: 5,
    rewardType: 'gems',
  },
  {
    id: 'dq2',
    title: 'Score 80% or higher in 2 lessons',
    icon: '🎯',
    iconColor: '#58CC02',
    current: 0,
    target: 2,
    reward: 10,
    rewardType: 'gems',
  },
  {
    id: 'dq3',
    title: 'Earn 15 Combo Bonus XP',
    icon: '🔥',
    iconColor: '#FF9600',
    current: 0,
    target: 15,
    reward: 5,
    rewardType: 'gems',
  },
  {
    id: 'dq4',
    title: 'Complete 3 lessons without losing a heart',
    icon: '❤️',
    iconColor: '#FF4B4B',
    current: 0,
    target: 3,
    reward: 15,
    rewardType: 'gems',
  },
];

// Weekly quests
export const weeklyQuests = [
  {
    id: 'wq1',
    title: 'Earn 100 XP this week',
    icon: '💪',
    iconColor: '#CE82FF',
    current: 45,
    target: 100,
    reward: 20,
    rewardType: 'gems',
  },
  {
    id: 'wq2',
    title: 'Maintain a 7-day streak',
    icon: '🔥',
    iconColor: '#FF9600',
    current: 3,
    target: 7,
    reward: 50,
    rewardType: 'gems',
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
      name: 'Superhero Duo',
      description: 'Dress Duo in a superhero cape!',
      icon: '🦸',
      cost: 600,
      category: 'Outfits',
    },
    {
      id: 'formal',
      name: 'Formal Duo',
      description: 'Duo looking fancy in a top hat and bow tie.',
      icon: '🎩',
      cost: 500,
      category: 'Outfits',
    },
    {
      id: 'chef',
      name: 'Chef Duo',
      description: 'Duo is ready to cook some French cuisine!',
      icon: '👨‍🍳',
      cost: 400,
      category: 'Outfits',
    },
    {
      id: 'athletic',
      name: 'Athletic Duo',
      description: 'Duo is ready for the sports day!',
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
    { rank: 1, name: 'Pierre', xp: 1250, country: '🇫🇷', avatar: '#FF9600', initials: 'PI' },
    { rank: 2, name: 'Sakura', xp: 1180, country: '🇯🇵', avatar: '#FF4B4B', initials: 'SA' },
    { rank: 3, name: 'Marie', xp: 980, country: '🇫🇷', avatar: '#CE82FF', initials: 'MA' },
    { rank: 4, name: 'Hans', xp: 920, country: '🇩🇪', avatar: '#1CB0F6', initials: 'HA' },
    { rank: 5, name: 'Lucia', xp: 870, country: '🇮🇹', avatar: '#58CC02', initials: 'LU' },
    { rank: 6, name: 'Carlos', xp: 810, country: '🇪🇸', avatar: '#FF9600', initials: 'CA' },
    { rank: 7, name: 'Emma', xp: 760, country: '🇬🇧', avatar: '#CE82FF', initials: 'EM' },
    { rank: 8, name: 'Yuki', xp: 720, country: '🇯🇵', avatar: '#FF4B4B', initials: 'YU' },
    { rank: 9, name: 'Jean', xp: 680, country: '🇫🇷', avatar: '#1CB0F6', initials: 'JE' },
    { rank: 10, name: 'Sophie', xp: 620, country: '🇧🇪', avatar: '#58CC02', initials: 'SO' },
    { rank: 11, name: 'Marco', xp: 580, country: '🇮🇹', avatar: '#FF9600', initials: 'MR' },
    { rank: 12, name: 'Anna', xp: 520, country: '🇵🇱', avatar: '#CE82FF', initials: 'AN' },
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
    description: 'Practice understanding spoken French',
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
    description: 'Practice writing in French',
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
    description: 'Practice French grammar rules',
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
