// Mock data for GramGo — English language learning for Thai learners

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

const colors = ['#58CC02', '#CE82FF', '#1CB0F6', '#FF9600', '#FF4B4B', '#00CDFF'];

const defaultLevels = [
  { id: 'easy', label: 'Easy', xpReward: 10, icon: 'star', questions: [] },
  { id: 'medium1', label: 'Medium 1', xpReward: 15, icon: 'star', questions: [] },
  { id: 'medium2', label: 'Medium 2', xpReward: 15, icon: 'dumbbell', questions: [] },
  { id: 'hard1', label: 'Hard 1', xpReward: 20, icon: 'level-up', questions: [] },
  { id: 'hard2', label: 'Hard 2', xpReward: 35, icon: 'boss', questions: [] }
];

const rawUnitsData = [
  // SECTION 1: Nouns & Sentence Basics (1 - 16)
  { id: 1, section: 1, title: 'Verb to Be', description: 'am, is, are, was, were' },
  { id: 2, section: 1, title: 'Subject and Object Pronouns', description: 'he/him, she/her, they/them, I/me' },
  { id: 3, section: 1, title: 'Possessive Adjectives, Possessive Pronouns, and Reflexive Pronouns', description: 'my/mine/myself, its/itself, their/theirs/themselves' },
  { id: 4, section: 1, title: 'Singular and Plural Nouns', description: 'regular and irregular plurals' },
  { id: 5, section: 1, title: 'Countable and Uncountable Nouns', description: 'nouns you can count vs nouns you cannot' },
  { id: 6, section: 1, title: 'Articles and Zero Article', description: 'a, an, the, and no article' },
  { id: 7, section: 1, title: 'Demonstratives', description: 'this, that, these, those' },
  { id: 8, section: 1, title: 'Basic Sentence Order, Objects, and Imperatives', description: 'word order and commands' },
  { id: 9, section: 1, title: 'Existence with There', description: 'there is/are/was/were/will be' },
  { id: 10, section: 1, title: 'Subject-Verb Agreement, Capitalization, and Basic Punctuation', description: 'matching subject with verb and writing rules' },
  { id: 11, section: 1, title: 'Some, Any, and No', description: 'some, any, no' },
  { id: 12, section: 1, title: 'Much, Many, A Lot of, Lots of, Plenty of', description: 'large amounts' },
  { id: 13, section: 1, title: 'Few, A Few, Little, A Little', description: 'small amounts' },
  { id: 14, section: 1, title: 'Each, Every, All, Both, Either, Neither', description: 'groups and pairs' },
  { id: 15, section: 1, title: 'Another, Other, Others, The Other', description: 'comparisons and alternatives' },
  { id: 16, section: 1, title: 'Too and Enough', description: 'excess and sufficiency' },

  // SECTION 2: Fundamental Tenses (17 - 25)
  { id: 17, section: 2, title: 'Present Simple', description: 'routines, habits, facts, and general truths' },
  { id: 18, section: 2, title: 'Present Continuous', description: 'actions happening now or around now' },
  { id: 19, section: 2, title: 'Present Simple vs Present Continuous', description: 'habit/fact vs action-in-progress' },
  { id: 20, section: 2, title: 'Past Simple', description: 'finished actions in the past' },
  { id: 21, section: 2, title: 'Past Continuous', description: 'actions in progress at a specific past time' },
  { id: 22, section: 2, title: 'Past Simple vs Past Continuous', description: 'background action vs interrupting action' },
  { id: 23, section: 2, title: 'Present Perfect', description: 'life experience, recent result, and unfinished time' },
  { id: 24, section: 2, title: 'Present Perfect with Ever, Never, Just, Already, Yet, For, and Since', description: 'time markers and adverbs' },
  { id: 25, section: 2, title: 'Present Perfect vs Past Simple', description: 'finished past action vs connection to now' },

  // SECTION 3: Future Tenses, Questions & Time (26 - 43)
  { id: 26, section: 3, title: 'Present Perfect Continuous', description: 'duration or repeated activity continuing up to now' },
  { id: 27, section: 3, title: 'Past Perfect', description: 'one past action before another past action' },
  { id: 28, section: 3, title: 'Past Perfect Continuous', description: 'duration before another point in the past' },
  { id: 29, section: 3, title: 'Future with Will', description: 'predictions, spontaneous decisions, promises' },
  { id: 30, section: 3, title: 'Future with Be Going To', description: 'prior plans and predictions based on evidence' },
  { id: 31, section: 3, title: 'Will vs Be Going To', description: 'spontaneous vs planned future' },
  { id: 32, section: 3, title: 'Present Continuous for Future Arrangements', description: 'fixed plans and appointments' },
  { id: 33, section: 3, title: 'Future Continuous', description: 'actions in progress in the future' },
  { id: 34, section: 3, title: 'Future Perfect and Future Perfect Continuous', description: 'completion or duration before a future point' },
  { id: 35, section: 3, title: 'Yes-No Questions and Short Answers', description: 'yes-no questions and natural answers' },
  { id: 36, section: 3, title: 'Wh- Questions', description: 'who, what, where, when, why, how' },
  { id: 37, section: 3, title: 'Negatives with Be, Do, and Have', description: 'negative sentences in different tenses' },
  { id: 38, section: 3, title: 'Question Tags', description: "short tags like isn't it? or don't they?" },
  { id: 39, section: 3, title: 'Indirect Questions', description: 'polite questions like Could you tell me where...?' },
  { id: 40, section: 3, title: 'Adverbs of Frequency', description: 'always, usually, often, sometimes, never' },
  { id: 41, section: 3, title: 'Common Time Expressions: for, since, ago, already, yet, just, still', description: 'common time words' },
  { id: 42, section: 3, title: 'Sequence Words and Time Linkers: before, after, during, while, by, until, first, then, finally', description: 'order and sequence' },
  { id: 43, section: 3, title: 'Prepositions of Time', description: 'in, on, at, by, until, during, before, after' },

  // SECTION 4: Movement, Location & Modals (44 - 53)
  { id: 44, section: 4, title: 'Prepositions of Place', description: 'in, on, at, under, over, near, between' },
  { id: 45, section: 4, title: 'Prepositions of Movement', description: 'to, into, onto, out of, across, through' },
  { id: 46, section: 4, title: 'Fixed Prepositions', description: 'verb/adjective/noun + preposition combinations' },
  { id: 47, section: 4, title: 'Ability: can, could, be able to, manage to', description: 'present, past, and general ability' },
  { id: 48, section: 4, title: 'Permission and Requests: can, could, may, would', description: 'permission and requests' },
  { id: 49, section: 4, title: 'Advice: should, ought to, had better', description: 'recommendations, warnings, and suggestions' },
  { id: 50, section: 4, title: 'Obligation and Necessity: must, have to, need to', description: 'rules, duties, and necessary actions' },
  { id: 51, section: 4, title: 'Prohibition and Lack of Necessity: mustn’t, don’t have to, needn’t', description: 'forbidden vs optional actions' },
  { id: 52, section: 4, title: 'Possibility, Probability, and Deduction: may, might, could, must, can’t', description: 'uncertainty vs logical conclusions' },
  { id: 53, section: 4, title: 'Past Modals: should have, could have, would have, might have, must have, can’t have', description: 'regrets, missed chances, past possibility/deduction' },

  // SECTION 5: Advanced Verb Patterns & Modifiers (54 - 67)
  { id: 54, section: 5, title: 'Gerunds', description: '-ing forms as nouns' },
  { id: 55, section: 5, title: 'Infinitives and Infinitives of Purpose', description: 'to + verb and explaining purpose' },
  { id: 56, section: 5, title: 'Gerunds vs Infinitives', description: 'choosing the correct form after verbs' },
  { id: 57, section: 5, title: 'Verb + Object + Infinitive', description: 'patterns like want him to go or tell her to wait' },
  { id: 58, section: 5, title: 'Let, Make, and Help', description: 'permission, cause, and assistance' },
  { id: 59, section: 5, title: 'Causatives: Have and Get', description: 'arranging for someone else to do something' },
  { id: 60, section: 5, title: 'Used To and Would for Past Habits', description: 'past habits and states no longer true' },
  { id: 61, section: 5, title: 'Stative and Dynamic Verbs; Linking Verbs', description: 'action vs state verbs and linking verbs' },
  { id: 62, section: 5, title: 'Comparatives and Superlatives', description: 'comparing things (bigger, biggest)' },
  { id: 63, section: 5, title: 'Comparative Structures: as…as, less…than, the more…the more', description: 'comparisons and proportional relationships' },
  { id: 64, section: 5, title: 'Adjective Order', description: 'natural English order (e.g. beautiful small old house)' },
  { id: 65, section: 5, title: 'Adverbs of Manner, Place, and Time', description: 'how, where, and when something happens' },
  { id: 66, section: 5, title: 'So, Such, Too, and Enough', description: 'intensity and result structures' },
  { id: 67, section: 5, title: 'Common Phrasal Verbs', description: 'separable, inseparable, transitive, intransitive' },

  // SECTION 6: Complex Clauses & Advanced Structures (68 - 75)
  { id: 68, section: 6, title: 'Conjunctions and Linkers', description: 'and, but, so, although, however, therefore' },
  { id: 69, section: 6, title: 'Relative Clauses', description: 'who, which, that, where, whose' },
  { id: 70, section: 6, title: 'Noun Clauses, Participle Clauses, and Reduced Clauses', description: 'advanced clauses and reductions' },
  { id: 71, section: 6, title: 'Passive Voice', description: 'focus on action rather than the doer' },
  { id: 72, section: 6, title: 'Reported Speech', description: 'reporting statements, questions, and commands' },
  { id: 73, section: 6, title: 'Conditionals', description: 'zero, first, second, third, and mixed conditionals' },
  { id: 74, section: 6, title: 'Wish and If Only', description: 'regrets and imagined changes' },
  { id: 75, section: 6, title: 'Inversion and Ellipsis/Substitution', description: 'advanced word order and avoiding repetition' },
  { id: 76, section: 1, title: 'Daily Routines & Activities', description: 'commute, habits, chores, schedules' },
  { id: 77, section: 1, title: 'Family, Relatives & Households', description: 'ancestors, siblings, domestic, household' },
  { id: 78, title: 'Food, Cooking & Kitchen', description: 'ingredients, recipes, simmering, boiling, baking' },
  { id: 79, title: 'Dining Out & Cafés', description: 'reservations, waiter, beverages, appetizers, chef' },
  { id: 80, title: 'Apparel, Fashion & Shopping', description: 'wardrobes, bargains, fitting rooms, discounts' },
  { id: 81, title: 'Feelings & Emotions', description: 'thrilled, frustrated, anxious, delighted, miserable' },
  { id: 82, title: 'Personality & Human Traits', description: 'ambitious, generous, stubborn, outgoing, reliable' },
  { id: 83, title: 'Physical Descriptions & Appearance', description: 'athletic, slender, dynamic, graceful' },
  { id: 84, title: 'Weather & Seasons', description: 'humidity, breeze, forecast, mild, severe' },
  { id: 85, title: 'Hobbies, Sports & Recreation', description: 'tournaments, recreation, fitness, leisure' },
  { id: 86, title: 'Entertainment, Movies & Music', description: 'premieres, genres, audiences, soundtracks' },
  { id: 87, title: 'Travel, Transport & Commute', description: 'passengers, delays, routes, tickets, schedules' },
  { id: 88, title: 'Airports, Flights & Customs', description: 'baggage, boarding passes, destinations, security' },
  { id: 89, title: 'Hotels & Accommodations', description: 'check-in, amenities, lobbies, suites' },
  { id: 90, title: 'Describing Places, Towns & Cities', description: 'cozy, spacious, metropolitan, urban, scenic' },

  // Phase 2: Culture, Media & Society (B1-B2)
  { id: 91, title: 'News, Media & Journalism', description: 'broadcasts, editorials, sources, columns, reports' },
  { id: 92, title: 'Social Media & Communication', description: 'engagement, content, platforms, viral' },
  { id: 93, title: 'Urbanization & City Planning', description: 'infrastructure, rural, construct, zoning' },
  { id: 94, title: 'Art, Literature & Creative Writing', description: 'masterpieces, dialogues, narratives, fiction' },
  { id: 95, title: 'History & Ancient Civilizations', description: 'excavations, heritage, legacies, artifacts' },
  { id: 96, title: 'Law, Crime & Police Operations', description: 'prosecute, suspects, evidence, search warrants' },
  { id: 97, title: 'Courtrooms, Verdicts & Justice', description: 'verdicts, trials, testimonies, jury, sentence' },
  { id: 98, title: 'Government Structure & Elections', description: 'candidates, campaigns, parliament, senate' },
  { id: 99, title: 'Public Policy & Social Issues', description: 'welfare, reforms, discrimination, inequality' },
  { id: 100, title: 'Geography, Maps & Landscape', description: 'altitude, terrain, continents, landmarks' },
  { id: 101, title: 'Demography & Diverse Cultures', description: 'immigration, census, diversity, heritage' },
  { id: 102, title: 'Philosophy & Ethics', description: 'dilemmas, morality, perspectives, principles' },
  { id: 103, title: 'Architecture & Building Design', description: 'exterior, structures, restorations, pillars' },
  { id: 104, title: 'Public Health & Community Care', description: 'hygiene, welfare, clinics, healthcare' },
  { id: 105, title: 'Religions, Beliefs & Traditions', description: 'rituals, sacred, customs, ceremonies' },

  // Phase 3: Scientific & Technical Realms (B1-B2)
  { id: 106, title: 'Education & School Administration', description: 'syllabus, assignments, semesters, enrollment' },
  { id: 107, title: 'Scientific Method & Inquiry', description: 'hypothesis, variable, analyze, data, peer review' },
  { id: 108, title: 'Computer Science & Digital Tools', description: 'algorithm, database, process, software' },
  { id: 109, title: 'Internet Security & Cryptography', description: 'encryption, firewalls, threats, vulnerabilities' },
  { id: 110, title: 'General Biology & Life Forms', description: 'organism, cell, classification, genes' },
  { id: 111, title: 'Ecology, Habitats & Ecosystems', description: 'biodiversity, conservation, species, extinction' },
  { id: 112, title: 'Astronomy, Planets & Space', description: 'orbit, gravity, solar system, telescope' },
  { id: 113, title: 'Chemistry, Elements & Matter', description: 'reaction, compound, molecular, solutions' },
  { id: 114, title: 'Physics, Force & Energy', description: 'friction, velocity, electricity, thermal' },
  { id: 115, title: 'Geology & Earth Sciences', description: 'erosion, seismic, volcano, continental drift' },
  { id: 116, title: 'Meteorology & Natural Disasters', description: 'monsoon, evacuation, drought, hurricane' },
  { id: 117, title: 'Health, Illnesses & Symptoms', description: 'chronic, recovery, treatment, diagnosis' },
  { id: 118, title: 'Immunity & Disease Control', description: 'infection, prevention, antibodies, vaccines' },
  { id: 119, title: 'Psychology & Human Behavior', description: 'cognitive, perception, stimuli, trauma' },
  { id: 120, title: 'Medical Innovation & Tech', description: 'therapy, diagnostics, clinical trials, prosthesis' },

  // Phase 4: Professional & Business English (B2-C1)
  { id: 121, title: 'Office Work & Communications', description: 'memos, colleagues, deadlines, correspondence' },
  { id: 122, title: 'Business Proposals & Projects', description: 'objectives, drafts, execution, deadlines' },
  { id: 123, title: 'Meetings, Seminars & Conferences', description: 'agenda, consensus, presentation, minutes' },
  { id: 124, title: 'Marketing, Advertising & Branding', description: 'campaigns, promote, consumer behavior, brand loyalty' },
  { id: 125, title: 'Sales, Invoicing & Finance Transactions', description: 'invoices, payments, quotes, receipts' },
  { id: 126, title: 'Customer Service & Client Relations', description: 'feedback, customer satisfaction, loyalty, support' },
  { id: 127, title: 'Human Resources & Hiring', description: 'applicants, resumes, headhunting, hiring managers' },
  { id: 128, title: 'Employee Benefits & Work Environment', description: 'salary, retirement, bonuses, commission' },
  { id: 129, title: 'Contracts, Licensing & Legal Agreements', description: 'clauses, termination, breach of contract' },
  { id: 130, title: 'Business Travel & Logistics', description: 'itineraries, reimbursement, inventories, warehouses' },
  { id: 131, title: 'Economics, Supply & Demand', description: 'inflation, market share, economy, recession' },
  { id: 132, title: 'International Trade & Commerce', description: 'tariffs, exports, imports, customs' },
  { id: 133, title: 'Banking, Loans & Accounting', description: 'audits, interest, deposits, collateral' },
  { id: 134, title: 'Manufacturing & Assembly Lines', description: 'defects, output, standard operating procedures' },
  { id: 135, title: 'Startups, Entrepreneurship & Launching', description: 'ventures, funding, scale, investments' },

  // Phase 5: High-Yield Academic Vocab, Phrasal Verbs & Collocations (C1)
  { id: 136, title: 'Academic Word List: Abstract Concepts', description: 'perspective, criteria, core, framework' },
  { id: 137, title: 'Academic Word List: Verbs of Analysis', description: 'evaluate, contrast, indicate, demonstrate' },
  { id: 138, title: 'Academic Word List: Descriptors', description: 'significant, fundamental, precise, arbitrary' },
  { id: 139, title: 'Academic Transition & Signal Words', description: 'furthermore, consequently, whereas, nonetheless' },
  { id: 140, title: 'Phrasal Verbs: Everyday Movement', description: 'pick up, run out, show up, check out' },
  { id: 141, title: 'Phrasal Verbs: Cognitive Actions', description: 'figure out, point out, look into, come up with' },
  { id: 142, title: 'Phrasal Verbs: Work & Business', description: 'call off, carry out, take over, step down' },
  { id: 143, title: 'Collocations: Verb + Noun', description: 'conduct research, make progress, pose a threat' },
  { id: 144, title: 'Collocations: Adjective + Noun', description: 'vital role, widespread concern, key factor' },
  { id: 145, title: 'Collocations: Verb + Preposition', description: 'comply with, focus on, consist of' },
  { id: 146, title: 'Idioms: Work & Academic Success', description: 'burn the midnight oil, hit the books, go the extra mile' },
  { id: 147, title: 'Idioms: Communication & Ideas', description: 'read between the lines, speak your mind, on the same page' },
  { id: 148, title: 'Synonyms: High-Scoring Verbs', description: 'acquire/obtain, accomplish/achieve, establish/create' },
  { id: 149, title: 'Synonyms: High-Scoring Adjectives', description: 'essential/crucial, vast/immense, minor/trivial' },
  { id: 150, title: 'Antonyms & Contrast Words', description: 'prohibit/permit, expand/shrink, support/oppose' },

  // Mixed Grammar (Section 1–5, IDs 151–225)
  // Section 1: Basic Tenses Mix
  { id: 151, title: 'Present Simple & Present Progressive', description: 'Mixed drills on basic present state vs action' },
  { id: 152, title: 'Past Simple & Past Progressive', description: 'Mixed drills on completed actions vs ongoing past contexts' },
  { id: 153, title: 'Future Simple & Future Planned', description: 'Mixed drills on will vs going to vs present continuous' },
  { id: 154, title: 'Present Perfect & Past Simple', description: 'Mixed drills on indefinite vs definite time frames' },
  { id: 155, title: 'Present Perfect Simple & Continuous', description: 'Mixed drills on duration vs completion' },
  { id: 156, title: 'Past Perfect & Past Simple', description: 'Mixed drills on sequential past events' },
  { id: 157, title: 'Future Perfect & Future Continuous', description: 'Mixed drills on futurity and timelines' },
  { id: 158, title: 'Mixed Active Tenses I', description: 'Grammar review of active time systems' },
  { id: 159, title: 'Mixed Active Tenses II', description: 'Advanced review of active timeline situations' },
  { id: 160, title: 'State Verbs & Action Verbs', description: 'Mixed drills on non-progressive verb constraints' },
  { id: 161, title: 'Habitual Past Systems', description: 'used to, would, and past simple contrasts' },
  { id: 162, title: 'Time Clauses & Aspect', description: 'when, while, before, as soon as aspect systems' },
  { id: 163, title: 'Future in the Past', description: 'was going to, would, was about to configurations' },
  { id: 164, title: 'Tense Auxiliary & Ellipsis', description: 'short answers, tag questions, auxiliary matches' },
  { id: 165, title: 'Comprehensive Tense Review', description: 'Integrated active aspect and tense diagnostics' },

  // Section 2: Noun Phrase Mix
  { id: 166, title: 'Definite & Indefinite Articles', description: 'a, an, the, and zero article selections' },
  { id: 167, title: 'Singular & Plural Noun Anomalies', description: 'irregular plurals, collective nouns, uncountable structures' },
  { id: 168, title: 'Quantifiers & Determiners', description: 'much, many, few, little, some, any, each, every' },
  { id: 169, title: 'Subject & Object Pronouns', description: 'pronoun case, gender constraints, dynamic referents' },
  { id: 170, title: 'Possessives & Reflexives', description: 'my, mine, myself, owner structures, reciprocal referents' },
  { id: 171, title: 'Demonstratives & Indefinite Pronouns', description: 'this, that, someone, anything, nowhere, general references' },
  { id: 172, title: 'Prepositions of Place & Direction', description: 'in, on, at, under, across, through, into' },
  { id: 173, title: 'Prepositions of Time & Duration', description: 'in, on, at, during, for, since, until' },
  { id: 174, title: 'Prepositional Phrases', description: 'at risk, in progress, on purpose, by chance' },
  { id: 175, title: 'Adjectives vs Adverbs', description: 'modifiers, adjective endings, adverb positions' },
  { id: 176, title: 'Comparative & Superlative Forms', description: 'er, est, more, most, irregular degree systems' },
  { id: 177, title: 'Equative & Progressive Comparison', description: 'as...as, the more...the more, double comparatives' },
  { id: 178, title: 'Noun-Modifying Preposition Blocks', description: 'noun + preposition linkers in complex NPs' },
  { id: 179, title: 'Compound Nouns & Modifiers', description: 'modifier sequence, hyphenated noun properties' },
  { id: 180, title: 'Comprehensive Noun Phrase Review', description: 'Integrated nouns, determiners, modifiers, case' },

  // Section 3: Clausal Mix
  { id: 181, title: 'Coordinating Conjunctions', description: 'and, but, or, so, yet, for, nor' },
  { id: 182, title: 'Subordinating Conjunctions', description: 'because, although, if, unless, while, whereas' },
  { id: 183, title: 'Correlative Conjunctions', description: 'either...or, neither...nor, not only...but also' },
  { id: 184, title: 'Defining Relative Clauses', description: 'relative pronouns, subject/object case, that/who/which' },
  { id: 185, title: 'Non-Defining Relative Clauses', description: 'comma separators, relative pronouns, extra detail blocks' },
  { id: 186, title: 'Prepositions in Relative Clauses', description: 'in which, whom, formal vs informal structures' },
  { id: 187, title: 'Noun Clauses: That-clauses', description: 'subject/object clausal slots, fact structures' },
  { id: 188, title: 'Noun Clauses: Wh-questions', description: 'indirect questions, word order, embedding' },
  { id: 189, title: 'Participle Clauses', description: 'reduced relative clauses, active vs passive reductions' },
  { id: 190, title: 'Adverbial Participle Clauses', description: 'reason/time clauses, dangling modifier caution' },
  { id: 191, title: 'Adverbial Connectors of Contrast', description: 'despite, in spite of, whereas, on the other hand' },
  { id: 192, title: 'Adverbial Connectors of Purpose/Result', description: 'so that, in order to, therefore, consequently' },
  { id: 193, title: 'Infinitives of Purpose', description: 'to-infinitive, bare infinitive, complex purpose clauses' },
  { id: 194, title: 'Clausal Reduction & Ellipsis', description: 'reduced clause patterns, avoiding redundancy' },
  { id: 195, title: 'Comprehensive Clausal Review', description: 'Integrated subordination, relative paths, coordination' },

  // Section 4: Voice & Speech Mix
  { id: 196, title: 'Passive Voice Simple Aspects', description: 'present, past, future passive transformations' },
  { id: 197, title: 'Passive Voice Complex Aspects', description: 'perfect, continuous, passive modal inflections' },
  { id: 198, title: 'Causative Structures', description: 'have something done, get someone to do, make/let/force' },
  { id: 199, title: 'Reported Statements', description: 'tense backshift, pronoun shifts, time expression updates' },
  { id: 200, title: 'Reported Questions', description: 'reported if/whether, reported wh- questions, word order' },
  { id: 201, title: 'Reported Commands & Requests', description: 'reported verbs (order, ask, beg, recommend) + infinitives' },
  { id: 202, title: 'Gerunds as Subjects & Objects', description: 'ing nouns, subject slots, verbal noun constraints' },
  { id: 203, title: 'Infinitives as Modifiers', description: 'to-infinitive object slots, adjectives + infinitives' },
  { id: 204, title: 'Verbs + Gerund or Infinitive I', description: 'like, try, stop, remember (meaning changes)' },
  { id: 205, title: 'Verbs + Gerund or Infinitive II', description: 'decide, afford, suggest, avoid (fixed structures)' },
  { id: 206, title: 'Impersonal Passive Constructions', description: 'it is said that, he is believed to, reported passives' },
  { id: 207, title: 'Active-Passive Semantic Pairs', description: 'meaning differences, agent emphasis transformations' },
  { id: 208, title: 'Direct Speech Punctuation', description: 'quotes, commas, reporting verb placement' },
  { id: 209, title: 'Reported Speech Exceptions', description: 'no backshift situations, hypothetical reported speech' },
  { id: 210, title: 'Comprehensive Voice & Speech Review', description: 'Integrated passives, causatives, reported speech diagnostics' },

  // Section 5: Advanced Structures Mix
  { id: 211, title: 'Zero & First Conditionals', description: 'general truths, real future possibilities' },
  { id: 212, title: 'Second & Third Conditionals', description: 'imagined present/future, past regrets' },
  { id: 213, title: 'Mixed Conditionals', description: 'past action/present result, present condition/past result' },
  { id: 214, title: 'Alternatives to "If"', description: 'provided that, as long as, unless, in case, otherwise' },
  { id: 215, title: 'Wish & If Only Present', description: 'present regrets, annoying habits (wish + would)' },
  { id: 216, title: 'Wish & If Only Past', description: 'past regrets (wish + past perfect)' },
  { id: 217, title: 'Subject-Auxiliary Inversion', description: 'negative adverbs (seldom, hardly), only when inversions' },
  { id: 218, title: 'Conditional Inversion', description: 'Had I known, Were I, Should you see' },
  { id: 219, title: 'Subjunctive Mood', description: 'insist that, recommend that, demand that bare infinitives' },
  { id: 220, title: 'Cleft Sentences', description: 'It is... that, What I need is... emphasis structures' },
  { id: 221, title: 'Substitution & Ellipsis', description: 'so/not, do so, one/ones word reductions' },
  { id: 222, title: 'Double Negative & Emphasis', description: 'not only, emphatic auxiliary do, double negative traps' },
  { id: 223, title: 'Advanced Adverbial Placements', description: 'adverb sequence, negative adverb sentence heads' },
  { id: 224, title: 'Parenthetical & Sentence Modifiers', description: 'however, frankly speaking, modifying entire clauses' },
  { id: 225, title: 'Comprehensive Advanced Review', description: 'Integrated conditionals, inversions, clefts, subjunctives' }
];

export const units = rawUnitsData.map(u => {
  const isVocab = u.id >= 76 && u.id <= 150;
  const isMixed = u.id >= 151;
  const cat = isMixed ? 'mixed_grammar' : (isVocab ? 'vocabulary' : 'grammar');
  
  let sectionStr = `SECTION ${u.section || 1}, UNIT ${u.id}`;
  let title = u.title;
  let description = u.description;
  
  if (isVocab) {
    sectionStr = `SECTION ${Math.floor((u.id - 76) / 15) + 1}, UNIT ${u.id - 75}`;
  } else if (isMixed) {
    const setNum = u.id - 150;
    sectionStr = `SECTION ${Math.floor((u.id - 151) / 15) + 1}, UNIT ${setNum}`;
    title = `Set ${setNum}`;
    description = `Comprehensive mixed grammar practice set.`;
  }
  
  return {
    id: u.id,
    category: cat,
    title: title,
    section: sectionStr,
    description: description,
    color: colors[(u.id - 1) % colors.length],
    levels: defaultLevels
  };
});

// Append 30 Conversation Units (Units 301–330 across 6 Sections)
const conversationUnitsData = [
  // SECTION 1: Daily Life & Social Interactions
  { id: 301, section: 1, unitNum: 1, title: 'Everyday & Campus Life', description: 'Master cafe ordering, shopping inquiries, library study groups, and airport transit.' },
  { id: 302, section: 1, unitNum: 2, title: 'Dining Out & Restaurant Ordering', description: 'Master food orders, table bookings, dietary needs, bill splitting, and complaints.' },
  { id: 303, section: 1, unitNum: 3, title: 'Shopping, Bargaining & Refunds', description: 'Master supermarket shopping, market bargaining, product returns, and order tracking.' },
  { id: 304, section: 1, unitNum: 4, title: 'Socializing & Making Friends', description: 'Master party small talk, weekend invitations, declining politely, and compliments.' },
  { id: 305, section: 1, unitNum: 5, title: 'Expressing Sympathy & Encouragement', description: 'Master comforting friends, sick visits, sincere condolences, and burnout support.' },

  // SECTION 2: Travel, Transport & Accommodation
  { id: 306, section: 2, unitNum: 1, title: 'Street Directions & City Transport', description: 'Master BTS directions, taxi rides, train tickets, bus transfers, and car rentals.' },
  { id: 307, section: 2, unitNum: 2, title: 'Hotel & Accommodation Management', description: 'Master hotel check-in, housekeeping, facility issues, deposits, and late check-outs.' },
  { id: 308, section: 2, unitNum: 3, title: 'Airport, Flights & Customs', description: 'Master flight check-in, security checks, duty-free, connection flights, and lost luggage.' },
  { id: 309, section: 2, unitNum: 4, title: 'Sightseeing & Tourism Activities', description: 'Master museum tours, guided trips, asking for photos, and local culture etiquette.' },
  { id: 310, section: 2, unitNum: 5, title: 'Renting Apartments & Housing', description: 'Master apartment viewing, lease terms, furniture rental, landlord calls, and moving out.' },

  // SECTION 3: Campus & Academic Success
  { id: 311, section: 3, unitNum: 1, title: 'Campus Life & Orientation', description: 'Master meeting classmates, club registration, campus facilities, and student ID cards.' },
  { id: 312, section: 3, unitNum: 2, title: 'Group Projects & Class Collaboration', description: 'Master task allocation, deadlines, shared documents, presentations, and peer feedback.' },
  { id: 313, section: 3, unitNum: 3, title: 'Academic Advising & Office Hours', description: 'Master asking course feedback, thesis topics, grade inquiries, and recommendation letters.' },
  { id: 314, section: 3, unitNum: 4, title: 'Scholarships & Study Abroad Interviews', description: 'Master motivation statements, academic goals, extracurriculars, and stress questions.' },
  { id: 315, section: 3, unitNum: 5, title: 'Library & Research Facilities', description: 'Master book borrowing, research databases, inter-library loans, and scanning services.' },

  // SECTION 4: Workplace & Professional Courtesy
  { id: 316, section: 4, unitNum: 1, title: 'Workplace Courtesy & Office Talk', description: 'Master morning greetings, team meetings, supervisor help, mistakes, and promotions.' },
  { id: 317, section: 4, unitNum: 2, title: 'Job Interviews & Career Progression', description: 'Master self-introductions, strengths/weaknesses, salary expectations, and past experience.' },
  { id: 318, section: 4, unitNum: 3, title: 'Phone Calls & Video Meetings', description: 'Master taking calls, booking appointments, rescheduling, and formal inquiries.' },
  { id: 319, section: 4, unitNum: 4, title: 'Business Meetings & Pitching', description: 'Master agenda opening, presentation delivery, Q&A handling, and client feedback.' },
  { id: 320, section: 4, unitNum: 5, title: 'Workplace Negotiations & Extension Requests', description: 'Master deadline extensions, workload balancing, remote requests, and budget approvals.' },

  // SECTION 5: Communication Skills & Opinions
  { id: 321, section: 5, unitNum: 1, title: 'Expressing Opinions, Agreement & Disagreement', description: 'Master movie preferences, book reviews, gentle disagreement, and tech debates.' },
  { id: 322, section: 5, unitNum: 2, title: 'Giving Advice & Recommendations', description: 'Master travel tips, study habits, tech purchasing advice, and fitness routines.' },
  { id: 323, section: 5, unitNum: 3, title: 'Making Comparisons & Preferences', description: 'Master choosing options, pros & cons analysis, brand comparison, and lifestyle choices.' },
  { id: 324, section: 5, unitNum: 4, title: 'Clarification & Active Listening', description: 'Master asking speakers to repeat, paraphrasing statements, and spelling names.' },
  { id: 325, section: 5, unitNum: 5, title: 'Culture, Habits & Small Talk', description: 'Master weather talk, festival celebrations, culinary traditions, and travel stories.' },

  // SECTION 6: Health, Emergencies & Financial Services
  { id: 326, section: 6, unitNum: 1, title: 'Medical, Pharmacy & Health Care', description: 'Master pharmacy purchases, doctor registration, symptom details, and ER visits.' },
  { id: 327, section: 6, unitNum: 2, title: 'Problem Solving & Customer Service Complaints', description: 'Master lost items, apartment noise, utility bills, swallowed ATM cards, and escalations.' },
  { id: 328, section: 6, unitNum: 3, title: 'Emergency Situations & Calling for Help', description: 'Master calling ambulances, police reports, roadside assistance, and embassy help.' },
  { id: 329, section: 6, unitNum: 4, title: 'Banking, ATM & Financial Services', description: 'Master opening accounts, currency exchange, wire transfers, and credit card blocks.' },
  { id: 330, section: 6, unitNum: 5, title: 'Public Services, Post Office & Admin', description: 'Master sending packages, registered mail, government forms, and utility hookups.' }
];

conversationUnitsData.forEach((u) => {
  units.push({
    id: u.id,
    category: 'conversation',
    title: u.title,
    section: `SECTION ${u.section}, UNIT ${u.unitNum}`,
    description: u.description,
    color: '#1CB0F6',
    levels: defaultLevels
  });
});


export const studyCategories = [
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Master English grammar rules through interactive drills',
    color: '#58CC02',
    iconChar: 'G',
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Master English vocabulary through contextual drills',
    color: '#CE82FF',
    iconChar: 'V',
  },
  {
    id: 'mixed_grammar',
    title: 'Mixed Grammar',
    description: 'Master English grammar through comprehensive mock practice',
    color: '#FF9600',
    iconChar: 'M',
  },
  {
    id: 'conversation',
    title: 'Conversation',
    description: 'Master practical English dialogues & exam-style conversations',
    color: '#1CB0F6',
    iconChar: 'C',
  }
];






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
