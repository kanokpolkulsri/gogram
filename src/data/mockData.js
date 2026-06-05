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
    category: 'grammar-foundation',
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
    category: 'grammar-foundation',
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
    category: 'grammar-foundation',
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
  {
    id: 4,
    category: 'vocabulary',
    title: 'Fruits & Veggies: Learn food vocabulary',
    section: 'SECTION 1, UNIT 4',
    description: 'Learn common fruits and vegetables in French',
    color: '#FF4B4B',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'v1', question: 'How do you say "apple" in French?', options: ['la pomme', 'la poire', 'la banane'], correctAnswer: 'la pomme' },
          { id: 'v2', question: 'How do you say "banana" in French?', options: ['la banane', 'la fraise', 'le citron'], correctAnswer: 'la banane' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'v3', question: 'How do you say "the potato" in French?', options: ['la pomme de terre', 'la carotte', 'la tomate'], correctAnswer: 'la pomme de terre' },
          { id: 'v4', question: 'Which word means "the grape"?', options: ['le raisin', 'la fraise', 'la cerise'], correctAnswer: 'le raisin' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'v5', question: 'What is French for "strawberry"?', options: ['la fraise', 'la framboise', 'la prune'], correctAnswer: 'la fraise' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'v6', question: 'Select the correct translation: "I eat a carrot"', options: ['Je mange une carotte', 'Je mange un oignon', 'Je mange une pomme'], correctAnswer: 'Je mange une carotte' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'v7', question: 'How do you write "The fruits are sweet" in French?', options: ['Les fruits sont doux', 'Les légumes sont verts', 'La pomme est sucrée'], correctAnswer: 'Les fruits sont doux' }
        ]
      }
    ]
  },
  {
    id: 5,
    category: 'vocabulary',
    title: 'Colors & Clothes: Describe outfits',
    section: 'SECTION 1, UNIT 5',
    description: 'Learn common colors and clothing vocabulary',
    color: '#FF9600',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'c1', question: 'How do you say "red" in French?', options: ['rouge', 'bleu', 'vert'], correctAnswer: 'rouge' },
          { id: 'c2', question: 'What is French for "a shirt"?', options: ['une chemise', 'un pantalon', 'une robe'], correctAnswer: 'une chemise' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'c3', question: 'How do you say "the black shoes" in French?', options: ['les chaussures noires', 'les chaussettes noires', 'le chapeau noir'], correctAnswer: 'les chaussures noires' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'c4', question: 'What is "yellow" in French?', options: ['jaune', 'orange', 'blanc'], correctAnswer: 'jaune' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'c5', question: 'Translate: "The blue dress"', options: ['La robe bleue', 'Le costume bleu', 'La jupe verte'], correctAnswer: 'La robe bleue' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'c6', question: 'Translate: "He wears a black coat"', options: ['Il porte un manteau noir', 'Elle porte une veste noire', 'Il a un chapeau noir'], correctAnswer: 'Il porte un manteau noir' }
        ]
      }
    ]
  },
  {
    id: 6,
    category: 'reading',
    title: 'Le Petit Prince: Excerpts & Dialogue',
    section: 'SECTION 2, UNIT 1',
    description: 'Read simple passages from classic literature',
    color: '#CE82FF',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'r1', question: 'In "Le Petit Prince", what is the prince\'s beloved flower?', options: ['une rose', 'une tulipe', 'un tournesol'], correctAnswer: 'une rose' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'r2', question: 'Translate this quote: "Dessine-moi un mouton"', options: ['Draw me a sheep', 'Show me a sheep', 'Draw me a horse'], correctAnswer: 'Draw me a sheep' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'r3', question: 'Who does the little prince meet in the desert?', options: ['un aviateur', 'un roi', 'un renard'], correctAnswer: 'un aviateur' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'r4', question: 'What is the secret the fox tells the prince?', options: ['L\'essentiel est invisible pour les yeux', 'Le désert est beau', 'Les grandes personnes sont bizarres'], correctAnswer: 'L\'essentiel est invisible pour les yeux' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'r5', question: 'Translate: "On ne voit bien qu\'avec le cœur"', options: ['One sees well only with the heart', 'One sees nothing without love', 'We must love one another'], correctAnswer: 'One sees well only with the heart' }
        ]
      }
    ]
  },
  {
    id: 7,
    category: 'reading',
    title: 'La Belle et la Bête: Fairytales',
    section: 'SECTION 2, UNIT 2',
    description: 'Practice comprehension with traditional stories',
    color: '#00CDFF',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'r6', question: 'What is the Beast\'s castle full of?', options: ['des objets magiques', 'des monstres', 'des richesses perdues'], correctAnswer: 'des objets magiques' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'r7', question: 'Why does Belle go to the castle?', options: ['Pour sauver son père', 'Pour trouver de l\'or', 'Pour épouser la Bête'], correctAnswer: 'Pour sauver son père' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'r8', question: 'What turns the Beast back into a Prince?', options: ['L\'amour véritable', 'Une potion magique', 'Le miroir magique'], correctAnswer: 'L\'amour véritable' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'r9', question: 'What is Belle\'s favorite hobby?', options: ['lire des livres', 'chanter des chansons', 'cuisiner de bons plats'], correctAnswer: 'lire des livres' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'r10', question: 'Translate: "Elle vit heureuse pour toujours"', options: ['She lived happily ever after', 'She saw happiness everywhere', 'She wishes to be happy always'], correctAnswer: 'She lived happily ever after' }
        ]
      }
    ]
  },
  {
    id: 8,
    category: 'exam-grammars',
    title: 'Subjunctive Mode: Express desires',
    section: 'SECTION 3, UNIT 1',
    description: 'Learn the French Subjunctive conjugation and usage',
    color: '#89E219',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'e1', question: 'Which trigger requires the subjunctive?', options: ['Il faut que...', 'Je pense que...', 'Il est certain que...'], correctAnswer: 'Il faut que...' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'e2', question: 'Subjunctive of "être" (il form):', options: ['qu\'il soit', 'qu\'il est', 'qu\'il fut'], correctAnswer: 'qu\'il soit' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'e3', question: 'Subjunctive of "avoir" (tu form):', options: ['que tu aies', 'que tu as', 'que tu auras'], correctAnswer: 'que tu aies' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'e4', question: 'Complete: "Je veux que tu ___ tes devoirs" (faire)', options: ['fasses', 'fais', 'feras'], correctAnswer: 'fasses' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'e5', question: 'Complete: "Bien que nous ___ fatigués, nous continuerons" (être)', options: ['soyons', 'sommes', 'serions'], correctAnswer: 'soyons' }
        ]
      }
    ]
  },
  {
    id: 9,
    category: 'exam-grammars',
    title: 'Conditional Tense: Hypotheses',
    section: 'SECTION 3, UNIT 2',
    description: 'Learn the Conditional tense for hypothetical scenarios',
    color: '#1CB0F6',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'e6', question: 'What is the conditional ending for "je"?', options: ['-ais', '-ait', '-er'], correctAnswer: '-ais' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'e7', question: 'Conditional of "vouloir" (je form):', options: ['je voudrais', 'je voulais', 'je veux'], correctAnswer: 'je voudrais' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'e8', question: 'Conditional of "être" (nous form):', options: ['nous serions', 'nous étions', 'nous sommes'], correctAnswer: 'nous serions' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'e9', question: 'Complete: "Si j\'avais le temps, je ___ en France" (voyager)', options: ['voyagerais', 'voyageais', 'voyagerai'], correctAnswer: 'voyagerais' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'e10', question: 'Translate: "We would like to order now"', options: ['Nous voudrions commander maintenant', 'Nous voulons commander maintenant', 'Nous commanderions bien'], correctAnswer: 'Nous voudrions commander maintenant' }
        ]
      }
    ]
  }
];

export const studyCategories = [
  {
    id: 'grammar-foundation',
    title: 'Grammar Foundation',
    description: 'Master structural and sentence patterns',
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
  {
    id: 'exam-grammars',
    title: 'Exam Grammars',
    description: 'Prepare for formal proficiency standards',
    color: '#1CB0F6',
    iconChar: 'E',
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
