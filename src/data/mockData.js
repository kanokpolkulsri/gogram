// Mock data for Duolingo Clone — French language learning

export const initialUser = {
  name: 'Learner',
  totalXP: 0,
  hearts: 5,
  maxHearts: 5,
  streak: 0,
  streakHistory: [], // array of date strings 'YYYY-MM-DD'
  currentUnit: 1,
  completedLessons: [], // array of 'unitId-levelId' strings
};

export const units = [
  {
    id: 1,
    title: 'Articles',
    description: 'Learn French articles: le, la, les, un, une',
    color: '#58CC02',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
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
        ],
      },
      {
        id: 'medium',
        label: 'Medium',
        xpReward: 15,
        questions: [
          {
            id: 'a6',
            question: 'How do you say "a" (masculine) in French?',
            options: ['un', 'une', 'le', 'des'],
            correctAnswer: 'un',
          },
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
          {
            id: 'a10',
            question: '"___ femme" — which article fits? (a woman)',
            options: ['Un', 'Une', 'Le', 'Des'],
            correctAnswer: 'Une',
          },
        ],
      },
      {
        id: 'hard',
        label: 'Hard',
        xpReward: 20,
        questions: [
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
          {
            id: 'a13',
            question: '"L\'" is used before words starting with...',
            options: ['A vowel', 'A consonant', 'The letter S', 'Two consonants'],
            correctAnswer: 'A vowel',
          },
          {
            id: 'a14',
            question: 'Which is correct? "a book"',
            options: ['un livre', 'une livre', 'le livre', 'la livre'],
            correctAnswer: 'un livre',
          },
          {
            id: 'a15',
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
    title: 'Pronouns',
    description: 'Learn French pronouns: je, tu, il, elle, nous, vous',
    color: '#CE82FF',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
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
        ],
      },
      {
        id: 'medium',
        label: 'Medium',
        xpReward: 15,
        questions: [
          {
            id: 'p6',
            question: 'How do you say "you" (formal/plural) in French?',
            options: ['Tu', 'Vous', 'Nous', 'Ils'],
            correctAnswer: 'Vous',
          },
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
          {
            id: 'p10',
            question: '"___ êtes gentils." — You (plural) are kind.',
            options: ['Tu', 'Nous', 'Vous', 'Ils'],
            correctAnswer: 'Vous',
          },
        ],
      },
      {
        id: 'hard',
        label: 'Hard',
        xpReward: 20,
        questions: [
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
          {
            id: 'p13',
            question: 'Translate: "They (f.) are students"',
            options: ['Elles sont étudiantes', 'Ils sont étudiantes', 'Elles est étudiantes', 'Elle sont étudiantes'],
            correctAnswer: 'Elles sont étudiantes',
          },
          {
            id: 'p14',
            question: '"On" in French informally means...',
            options: ['We/One', 'They', 'He', 'You'],
            correctAnswer: 'We/One',
          },
          {
            id: 'p15',
            question: 'Fill in: "___ suis américain." (I am American)',
            options: ['Je', 'Tu', 'Il', 'Nous'],
            correctAnswer: 'Je',
          },
        ],
      },
    ],
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
