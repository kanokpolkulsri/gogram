// Mock data for Gogram — English language learning for Thai learners

export const initialUser = {
  name: 'Learner',
  totalXP: 680,
  hearts: 5,
  maxHearts: 5,
  streak: 3,
  streakHistory: [
    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    new Date(Date.now()).toISOString().split('T')[0]
  ], // Mock 3 active days matching streak of 3
  currentUnit: 1,
  completedLessons: [], // array of 'unitId-levelId' strings
  gems: 660,
  league: 'Gold',
  following: 12,
  followers: 8,
};export const units = [
  {
    id: 1,
    category: 'grammar-foundation',
    title: 'Basics: English Articles',
    section: 'SECTION 1, UNIT 1',
    description: 'Learn how to use "a", "an", and "the"',
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
            question: "Which article is used before 'book'?",
            options: ['a', 'an', 'the'],
            correctAnswer: 'a',
          },
          {
            id: 'a2',
            question: "Which article is used before 'apple'?",
            options: ['a', 'an', 'the'],
            correctAnswer: 'an',
          },
          {
            id: 'a3',
            question: "Complete: '___ sun is hot.'",
            options: ['A', 'An', 'The'],
            correctAnswer: 'The',
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
            question: "Which article is used before 'hour'?",
            options: ['a', 'an', 'the'],
            correctAnswer: 'an',
          },
          {
            id: 'a5',
            question: "Which article is used before 'university'?",
            options: ['a', 'an', 'the'],
            correctAnswer: 'a',
          },
          {
            id: 'a6',
            question: "Complete: 'I saw ___ elephant.'",
            options: ['a', 'an', 'the'],
            correctAnswer: 'an',
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
            question: "Complete: 'She is ___ honest girl.'",
            options: ['a', 'an', 'the'],
            correctAnswer: 'an',
          },
          {
            id: 'a8',
            question: "Complete: '___ earth goes around the sun.'",
            options: ['A', 'An', 'The'],
            correctAnswer: 'The',
          },
          {
            id: 'a9',
            question: "Complete: 'He is ___ teacher.'",
            options: ['a', 'an', 'the'],
            correctAnswer: 'a',
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
            question: 'Which is correct?',
            options: ['I have an umbrella', 'I have a umbrella', 'I have the umbrella'],
            correctAnswer: 'I have an umbrella',
          },
          {
            id: 'a11',
            question: "Complete: '___ water in this bottle is clean.'",
            options: ['A', 'An', 'The'],
            correctAnswer: 'The',
          },
          {
            id: 'a12',
            question: "Complete: 'They live in ___ old house.'",
            options: ['a', 'an', 'the'],
            correctAnswer: 'an',
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
            question: "Which article is used before 'hour'?",
            options: ['a', 'an', 'the'],
            correctAnswer: 'an',
          },
          {
            id: 'a5_b',
            question: "Which article is used before 'university'?",
            options: ['a', 'an', 'the'],
            correctAnswer: 'a',
          },
          {
            id: 'a6_b',
            question: "Complete: 'I saw ___ elephant.'",
            options: ['a', 'an', 'the'],
            correctAnswer: 'an',
          },
          {
            id: 'a10_b',
            question: 'Which is correct?',
            options: ['I have an umbrella', 'I have a umbrella', 'I have the umbrella'],
            correctAnswer: 'I have an umbrella',
          },
          {
            id: 'a11_b',
            question: "Complete: '___ water in this bottle is clean.'",
            options: ['A', 'An', 'The'],
            correctAnswer: 'The',
          },
          {
            id: 'a12_b',
            question: "Complete: 'She is ___ honest girl.'",
            options: ['a', 'an', 'the'],
            correctAnswer: 'an',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    category: 'grammar-foundation',
    title: 'Basics: The verb "être" (is/am/are)',
    section: 'SECTION 1, UNIT 2',
    description: 'Learn English verb "to be" (am, is, are)',
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
            question: "Complete: 'I ___ a student.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'am',
          },
          {
            id: 'p2',
            question: "Complete: 'You ___ my friend.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'are',
          },
          {
            id: 'p3',
            question: "Complete: 'He ___ a doctor.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'is',
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
            question: "Complete: 'She ___ very happy.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'is',
          },
          {
            id: 'p5',
            question: "Complete: 'We ___ from Thailand.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'are',
          },
          {
            id: 'p6',
            question: "Complete: 'It ___ a beautiful day.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'is',
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
            question: "Complete: 'They ___ playing football.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'are',
          },
          {
            id: 'p8',
            question: "Complete: 'The cats ___ sleeping.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'are',
          },
          {
            id: 'p9',
            question: "Complete: 'John ___ at home.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'is',
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
            question: "Complete: 'My parents ___ here.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'are',
          },
          {
            id: 'p11',
            question: 'Which is correct?',
            options: ['I am tired', 'I is tired', 'I are tired'],
            correctAnswer: 'I am tired',
          },
          {
            id: 'p12',
            question: "Complete: 'Neither of them ___ ready.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'is',
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
            question: "Complete: 'She ___ very happy.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'is',
          },
          {
            id: 'p5_b',
            question: "Complete: 'We ___ from Thailand.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'are',
          },
          {
            id: 'p6_b',
            question: "Complete: 'They ___ playing football.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'are',
          },
          {
            id: 'p11_b',
            question: "Complete: 'My parents ___ here.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'are',
          },
          {
            id: 'p13_b',
            question: 'Which is correct?',
            options: ['I am tired', 'I is tired', 'I are tired'],
            correctAnswer: 'I am tired',
          },
          {
            id: 'p15_b',
            question: "Complete: 'It ___ a beautiful day.'",
            options: ['am', 'is', 'are'],
            correctAnswer: 'is',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    category: 'grammar-foundation',
    title: 'Basics: The verb "avoir" (to have)',
    section: 'SECTION 1, UNIT 3',
    description: 'Learn English verb "to have" (have, has)',
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
            question: "Complete: 'I ___ a new car.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'have',
          },
          {
            id: 'v2',
            question: "Complete: 'He ___ a big dog.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'has',
          },
          {
            id: 'v3',
            question: "Complete: 'They ___ many books.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'have',
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
            question: "Complete: 'She ___ a sister.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'has',
          },
          {
            id: 'v5',
            question: "Complete: 'We ___ a test today.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'have',
          },
          {
            id: 'v6',
            question: "Complete: 'You ___ a great smile.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'have',
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
            question: "Complete: 'It ___ four legs.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'has',
          },
          {
            id: 'v8',
            question: "Complete: 'The children ___ toys.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'have',
          },
          {
            id: 'v9',
            question: "Complete: 'Anna ___ a computer.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'has',
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
            question: "Complete: 'My friend ___ a blue bike.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'has',
          },
          {
            id: 'v11',
            question: 'Which is correct?',
            options: ['I have a cat', 'I has a cat', 'I having a cat'],
            correctAnswer: 'I have a cat',
          },
          {
            id: 'v12',
            question: "Complete: 'Everyone ___ problems.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'has',
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
            id: 'v4_b',
            question: "Complete: 'She ___ a sister.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'has',
          },
          {
            id: 'v5_b',
            question: "Complete: 'We ___ a test today.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'have',
          },
          {
            id: 'v6_b',
            question: "Complete: 'The children ___ toys.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'have',
          },
          {
            id: 'v11_b',
            question: 'Which is correct?',
            options: ['I have a cat', 'I has a cat', 'I having a cat'],
            correctAnswer: 'I have a cat',
          },
          {
            id: 'v13_b',
            question: "Complete: 'Anna ___ a computer.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'has',
          },
          {
            id: 'v15_b',
            question: "Complete: 'My friend ___ a blue bike.'",
            options: ['have', 'has', 'had'],
            correctAnswer: 'has',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    category: 'vocabulary',
    title: 'Vocabulary: Fruits & Food',
    section: 'SECTION 1, UNIT 4',
    description: 'Learn common English food and fruits',
    color: '#FF4B4B',
    levels: [
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'v1', question: 'How do you say "แอปเปิ้ล" (apple) in English?', options: ['apple', 'banana', 'orange'], correctAnswer: 'apple' },
          { id: 'v2', question: 'How do you say "กล้วย" (banana) in English?', options: ['banana', 'grape', 'lemon'], correctAnswer: 'banana' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'v3', question: 'How do you say "มันฝรั่ง" (potato) in English?', options: ['potato', 'carrot', 'tomato'], correctAnswer: 'potato' },
          { id: 'v4', question: 'Which word means "องุ่น" (grape)?', options: ['grape', 'strawberry', 'cherry'], correctAnswer: 'grape' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'v5', question: 'What is English for "สตรอว์เบอร์รี" (strawberry)?', options: ['strawberry', 'raspberry', 'plum'], correctAnswer: 'strawberry' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'v6', question: 'Select the correct translation: "ฉันกินแครอท"', options: ['I eat a carrot', 'I eat an onion', 'I eat an apple'], correctAnswer: 'I eat a carrot' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'v7', question: 'How do you write "ผลไม้มีรสหวาน" in English?', options: ['Fruits are sweet', 'Vegetables are green', 'The apple is sour'], correctAnswer: 'Fruits are sweet' }
        ]
      }
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
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'c1', question: 'How do you say "สีแดง" (red) in English?', options: ['red', 'blue', 'green'], correctAnswer: 'red' },
          { id: 'c2', question: 'What is English for "เสื้อเชิ้ต" (shirt)?', options: ['a shirt', 'pants', 'a dress'], correctAnswer: 'a shirt' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'c3', question: 'How do you say "รองเท้าสีดำ" in English?', options: ['black shoes', 'black socks', 'a black hat'], correctAnswer: 'black shoes' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'c4', question: 'What is "สีเหลือง" (yellow) in English?', options: ['yellow', 'orange', 'white'], correctAnswer: 'yellow' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'c5', question: 'Translate: "ชุดเดรสสีน้ำเงิน"', options: ['The blue dress', 'The blue suit', 'The green skirt'], correctAnswer: 'The blue dress' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'c6', question: 'Translate: "เขาใส่เสื้อโค้ทสีดำ"', options: ['He wears a black coat', 'She wears a black jacket', 'He has a black hat'], correctAnswer: 'He wears a black coat' }
        ]
      }
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
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'r1', question: 'In the story, what animal was the shepherd boy guarding?', options: ['sheep', 'cows', 'goats'], correctAnswer: 'sheep' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'r2', question: 'What did the boy scream to trick the villagers?', options: ['Wolf!', 'Lion!', 'Help!'], correctAnswer: 'Wolf!' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'r3', question: 'Why did the villagers ignore his final cry?', options: ['They thought he was lying again', 'They were asleep', 'They did not hear him'], correctAnswer: 'They thought he was lying again' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'r4', question: 'What is the lesson of this story?', options: ['No one believes a liar even when they tell the truth', 'Always yell loudly', 'Wolves are friendly'], correctAnswer: 'No one believes a liar even when they tell the truth' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'r5', question: 'Translate: "เด็กชายเลี้ยงแกะ"', options: ['The shepherd boy', 'The sheep boy', 'The farmer boy'], correctAnswer: 'The shepherd boy' }
        ]
      }
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
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'r6', question: 'Who was Little Red Riding Hood going to visit?', options: ['her grandmother', 'her aunt', 'her friend'], correctAnswer: 'her grandmother' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'r7', question: 'What animal did she meet in the forest?', options: ['a wolf', 'a bear', 'a fox'], correctAnswer: 'a wolf' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'r8', question: 'What was inside her basket?', options: ['food and cake', 'books', 'toys'], correctAnswer: 'food and cake' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'r9', question: 'Where did the wolf go to trick her?', options: ['her grandmother\'s house', 'the market', 'the deep river'], correctAnswer: 'her grandmother\'s house' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'r10', question: 'Translate: "หนูน้อยหมวกแดง"', options: ['Little Red Riding Hood', 'Red Hood Girl', 'Little Red Cap'], correctAnswer: 'Little Red Riding Hood' }
        ]
      }
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
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'e1', question: 'Which sentence is in the passive voice?', options: ['The cake was eaten.', 'He ate the cake.', 'We are eating cake.'], correctAnswer: 'The cake was eaten.' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'e2', question: 'Passive of "She wrote the book":', options: ['The book was written by her.', 'She was written by the book.', 'The book written by her.'], correctAnswer: 'The book was written by her.' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'e3', question: 'Passive of "We build houses":', options: ['Houses are built by us.', 'Houses built by us.', 'We are built houses.'], correctAnswer: 'Houses are built by us.' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'e4', question: 'Complete: "The report must be ___ by Friday." (finish)', options: ['finished', 'finishing', 'finish'], correctAnswer: 'finished' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'e5', question: 'Complete: "English is ___ all over the world." (speak)', options: ['spoken', 'spoke', 'speaking'], correctAnswer: 'spoken' }
        ]
      }
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
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          { id: 'e6', question: 'Complete: "If it rains, we ___ stay home."', options: ['will', 'would', 'shall'], correctAnswer: 'will' }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium',
        xpReward: 15,
        icon: 'star',
        questions: [
          { id: 'e7', question: 'Complete: "If I were you, I ___ buy that car."', options: ['would', 'will', 'should'], correctAnswer: 'would' }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          { id: 'e8', question: 'Complete: "If he had studied, he ___ have passed."', options: ['would', 'will', 'should'], correctAnswer: 'would' }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard',
        xpReward: 20,
        icon: 'star',
        questions: [
          { id: 'e9', question: 'Complete: "Unless you ___ hard, you will not succeed."', options: ['study', 'will study', 'studied'], correctAnswer: 'study' }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard',
        xpReward: 25,
        icon: 'trophy',
        questions: [
          { id: 'e10', question: 'Translate: "ถ้าฉันมีเวลา ฉันจะไป"', options: ['If I have time, I will go', 'If I had time, I went', 'If I have time, I went'], correctAnswer: 'If I have time, I will go' }
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
