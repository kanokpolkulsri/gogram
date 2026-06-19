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
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          {
            id: 'vtb_e1',
            question: "Complete: 'She ___ a doctor at the hospital.'",
            options: ["is", "am", "are", "be"],
            correctAnswer: "is",
            explanation: "ENGLISH\nSingular subject 'She' takes 'is' in the present tense.\n\nTHAI\nประธานเอกพจน์ 'She' ใช้คู่กับ 'is' ในปัจจุบันกาล\nVocabulary: doctor = หมอ, hospital = โรงพยาบาล"
          },
          {
            id: 'vtb_e2',
            question: "Complete: 'They ___ playing football in the garden.'",
            options: ["are", "is", "am", "be"],
            correctAnswer: "are",
            explanation: "ENGLISH\nPlural subject 'They' takes 'are' in the present continuous tense.\n\nTHAI\nประธานพหูพจน์ 'They' ใช้คู่กับ 'are' ใน Present Continuous Tense\nVocabulary: playing = กำลังเล่น, garden = สวน"
          }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium 1',
        xpReward: 15,
        icon: 'star',
        questions: [
          {
            id: 'vtb_m1_1',
            question: "Complete: 'The news about the change of plans ___ true.'",
            options: ["is", "are", "am", "be"],
            correctAnswer: "is",
            explanation: "ENGLISH\nThe word 'news' is an uncountable noun and is always singular.\n\nTHAI\nคำว่า 'news' (ข่าว) เป็นคำนามนับไม่ได้และถือเป็นเอกพจน์เสมอ จึงใช้ 'is'\nVocabulary: news = ข่าว, change = การเปลี่ยนแปลง, true = จริง"
          },
          {
            id: 'vtb_m1_2',
            question: "Complete: 'Neither of my brothers ___ going to the party.'",
            options: ["is", "are", "was", "be"],
            correctAnswer: "is",
            explanation: "ENGLISH\n'Neither' functions as a singular subject and takes 'is'.\n\nTHAI\n'Neither of...' (ไม่มีคนใดคนหนึ่ง) มีความหมายเป็นเอกพจน์ จึงใช้ 'is'\nVocabulary: neither = ไม่มีใครเลย, brothers = พี่ชาย/น้องชาย, party = งานปาร์ตี้"
          }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium 2',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          {
            id: 'vtb_m2_1',
            question: "Complete: 'A number of candidates ___ already waiting outside.'",
            options: ["are", "is", "was", "be"],
            correctAnswer: "are",
            explanation: "ENGLISH\n'A number of' functions as plural and takes a plural verb 'are'.\n\nTHAI\n'A number of' แปลว่า จำนวนหลายคน/หลายสิ่ง มีความหมายเป็นพหูพจน์ จึงใช้ 'are'\nVocabulary: number = จำนวน, candidates = ผู้สมัคร, waiting = กำลังรอ, outside = ข้างนอก"
          },
          {
            id: 'vtb_m2_2',
            question: "Complete: 'The number of students in this group ___ small.'",
            options: ["is", "are", "were", "be"],
            correctAnswer: "is",
            explanation: "ENGLISH\n'The number of' refers to the numerical count itself, which is singular.\n\nTHAI\n'The number of' (จำนวนของ...) หมายถึงหน่วยตัวเลขจำนวนนั้นที่เป็นเอกพจน์ จึงใช้ 'is'\nVocabulary: number = จำนวน, students = นักเรียน, group = กลุ่ม, small = เล็ก"
          }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard 1',
        xpReward: 20,
        icon: 'level-up',
        questions: [
          {
            id: 'vtb_h1_1',
            question: "Complete: 'It is essential that he ___ present at the conference.'",
            options: ["be", "is", "was", "were"],
            correctAnswer: "be",
            explanation: "ENGLISH\nSubjunctive mood is used after adjectives of necessity like 'essential', requiring the bare form 'be'.\n\nTHAI\nโครงสร้าง Subjunctive หลังคำคุณศัพท์แสดงความสำคัญ/จำเป็น (essential) ต้องใช้กริยาฐานรูปปกติ 'be'\nVocabulary: essential = จำเป็น/สำคัญ, present = เข้าร่วม/แสดงตัว, conference = การประชุม"
          },
          {
            id: 'vtb_h1_2',
            question: "Complete: 'If I ___ in your position, I would accept the job offer.'",
            options: ["were", "was", "is", "be"],
            correctAnswer: "were",
            explanation: "ENGLISH\nUse 'were' for all subjects in unreal hypothetical conditional clauses (second conditional).\n\nTHAI\nใช้ 'were' กับประธานทุกพจน์ในประโยคเงื่อนไขสมมติที่ไม่เป็นจริงในปัจจุบัน (If Clause type 2)\nVocabulary: position = ตำแหน่ง/สถานการณ์, accept = ยอมรับ, job offer = ข้อเสนอการทำงาน"
          }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard 2',
        xpReward: 35,
        icon: 'boss',
        questions: [
          {
            id: 'vtb_h2_1',
            question: "Complete: 'So intense ___ the storm that many trees fell down.'",
            options: ["was", "were", "are", "be"],
            correctAnswer: "was",
            explanation: "ENGLISH\nInverted structure 'So + adj + verb + subject' requires 'was' to agree with 'the storm' (singular).\n\nTHAI\nโครงสร้างกลับหัว (Inversion) ขึ้นด้วย 'So + Adj' ใช้กริยาเอกพจน์ 'was' เพื่อสอดคล้องตามประธาน 'the storm' (พายุ)\nVocabulary: intense = รุนแรง/เข้มข้น, storm = พายุ, trees = ต้นไม้, fell down = ล้มลง"
          },
          {
            id: 'vtb_h2_2',
            question: "Complete: 'The jury ___ divided in their opinions about the verdict.'",
            options: ["were", "was", "is", "be"],
            correctAnswer: "were",
            explanation: "ENGLISH\nWhen members of a collective noun act individually or disagree, use the plural verb.\n\nTHAI\nเมื่อสมาชิกในกลุ่มคำนามรวมกลุ่ม (jury - คณะลูกขุน) มีความเห็นขัดแย้งกันแยกเป็นคนๆ จะใช้กริยาพหูพจน์ 'were'\nVocabulary: jury = คณะลูกขุน, divided = แบ่งแยก/เห็นต่าง, opinions = ความคิดเห็น, verdict = คำตัดสิน"
          }
        ]
      }
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
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          {
            id: 'sop_e1',
            question: "Complete: 'Sarah is my friend. ___ plays tennis with me.'",
            options: ["She", "Her", "He", "Him"],
            correctAnswer: "She",
            explanation: "ENGLISH\nUse subject pronoun 'She' to refer to a female singular subject (Sarah).\n\nTHAI\nใช้สรรพนามรูปประธาน 'She' เพื่อแทนคำนามเอกพจน์เพศหญิง (Sarah)\nVocabulary: friend = เพื่อน, plays = เล่น, tennis = เทนนิส"
          },
          {
            id: 'sop_e2',
            question: "Complete: 'Can you help ___? I cannot lift this heavy box.'",
            options: ["me", "I", "my", "myself"],
            correctAnswer: "me",
            explanation: "ENGLISH\nUse object pronoun 'me' after the verb 'help'.\n\nTHAI\nใช้สรรพนามรูปกรรม 'me' ตามหลังคำกริยา 'help'\nVocabulary: help = ช่วยเหลือ, lift = ยก, heavy = หนัก, box = กล่อง"
          }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium 1',
        xpReward: 15,
        icon: 'star',
        questions: [
          {
            id: 'sop_m1_1',
            question: "Complete: 'My parents are arriving today, and I will meet ___ at the airport.'",
            options: ["them", "they", "their", "theirs"],
            correctAnswer: "them",
            explanation: "ENGLISH\nUse object pronoun 'them' to refer to the plural noun 'parents' acting as an object.\n\nTHAI\nใช้สรรพนามรูปกรรมพหูพจน์ 'them' เพื่อแทนคำนาม 'parents' (พ่อแม่) ที่ทำหน้าที่เป็นกรรม\nVocabulary: parents = พ่อแม่, arriving = มาถึง, meet = พบ/รับ, airport = สนามบิน"
          },
          {
            id: 'sop_m1_2',
            question: "Complete: 'John and ___ went to the bookstore yesterday.'",
            options: ["I", "me", "my", "myself"],
            correctAnswer: "I",
            explanation: "ENGLISH\nUse subject pronoun 'I' because it is part of the compound subject 'John and I'.\n\nTHAI\nใช้สรรพนามรูปประธาน 'I' เนื่องจากเป็นส่วนหนึ่งของประธานร่วม 'John and I'\nVocabulary: went = ไป, bookstore = ร้านหนังสือ, yesterday = เมื่อวาน"
          }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium 2',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          {
            id: 'sop_m2_1',
            question: "Complete: 'Between you and ___, I think this plan is not going to work.'",
            options: ["me", "I", "my", "myself"],
            correctAnswer: "me",
            explanation: "ENGLISH\nAfter prepositions like 'between', always use object pronouns ('me', not 'I').\n\nTHAI\nหลังคำบุพบท เช่น 'between' ต้องใช้สรรพนามรูปกรรมเสมอ จึงใช้ 'between you and me'\nVocabulary: between = ระหว่าง, think = คิดว่า, plan = แผนการ, work = ได้ผล/ทำงาน"
          },
          {
            id: 'sop_m2_2',
            question: "Complete: 'The teacher asked you and ___ to clean the classroom.'",
            options: ["him", "he", "his", "himself"],
            correctAnswer: "him",
            explanation: "ENGLISH\nUse object pronoun 'him' because it is part of the compound object 'you and him'.\n\nTHAI\nใช้สรรพนามรูปกรรม 'him' เนื่องจากเป็นส่วนหนึ่งของกรรมร่วม 'you and him' ตามหลังกริยา 'asked'\nVocabulary: asked = ขอร้อง/ถาม, clean = ทำความสะอาด, classroom = ห้องเรียน"
          }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard 1',
        xpReward: 20,
        icon: 'level-up',
        questions: [
          {
            id: 'sop_h1_1',
            question: "Complete: 'Who is knocking at the door? It is ___.'",
            options: ["I", "me", "my", "myself"],
            correctAnswer: "I",
            explanation: "ENGLISH\nIn formal English, use a subject pronoun ('I') after the linking verb 'is'.\n\nTHAI\nในไวยากรณ์ภาษาอังกฤษแบบทางการ หลังกริยาเชื่อมโยง (linking verb) เช่น is/am/are จะใช้สรรพนามรูปประธาน 'I'\nVocabulary: knocking = เคาะ, door = ประตู"
          },
          {
            id: 'sop_h1_2',
            question: "Complete: 'We are much faster than ___ in this project.'",
            options: ["they", "them", "their", "theirs"],
            correctAnswer: "they",
            explanation: "ENGLISH\nFormally, 'than' is a conjunction introducing an incomplete clause, so subject pronoun 'they' is correct.\n\nTHAI\nในทางไวยากรณ์ทางการ 'than' ทำหน้าที่เป็นคำสันธานเชื่อมประโยคที่ละกริยาไว้ จึงใช้รูปประธาน 'they'\nVocabulary: faster = เร็วกว่า, project = โครงการ"
          }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard 2',
        xpReward: 35,
        icon: 'boss',
        questions: [
          {
            id: 'sop_h2_1',
            question: "Complete: 'It was ___ who solved the mystery, not the police.'",
            options: ["he", "him", "his", "himself"],
            correctAnswer: "he",
            explanation: "ENGLISH\nIn cleft sentences 'It was [subject] who...', use the subject pronoun 'he'.\n\nTHAI\nในประโยคเน้นความ (Cleft sentence) โครงสร้าง 'It was + ประธาน + who...' ต้องใช้รูปประธาน 'he'\nVocabulary: solved = แก้ปัญหา/ไขคดี, mystery = ความลึกลับ/ปริศนา, police = ตำรวจ"
          },
          {
            id: 'sop_h2_2',
            question: "Complete: 'Let ___ who is without sin cast the first stone.'",
            options: ["him", "he", "his", "himself"],
            correctAnswer: "him",
            explanation: "ENGLISH\nThe verb 'let' is transitive and requires the object pronoun 'him'.\n\nTHAI\nคำกริยา 'let' (ปล่อยให้/อนุญาต) เป็นสกรรมกริยาที่ต้องการกรรมมารองรับ จึงต้องใช้รูปกรรม 'him'\nVocabulary: without = ปราศจาก, sin = บาป, cast = ขว้าง/ปา, stone = ก้อนหิน"
          }
        ]
      }
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
      {
        id: 'easy',
        label: 'Easy',
        xpReward: 10,
        icon: 'star',
        questions: [
          {
            id: 'ppr_e1',
            question: "Complete: 'I washed ___ car yesterday because it was dirty.'",
            options: ["my", "mine", "me", "myself"],
            correctAnswer: "my",
            explanation: "ENGLISH\nUse possessive adjective 'my' before the noun 'car'.\n\nTHAI\nใช้คำคุณศัพท์แสดงความเป็นเจ้าของ 'my' นำหน้าคำนาม 'car'\nVocabulary: washed = ล้าง, car = รถยนต์, yesterday = เมื่อวาน, dirty = สกปรก"
          },
          {
            id: 'ppr_e2',
            question: "Complete: 'This book belongs to me. It is ___.'",
            options: ["mine", "my", "me", "myself"],
            correctAnswer: "mine",
            explanation: "ENGLISH\nUse possessive pronoun 'mine' to replace 'my book'.\n\nTHAI\nใช้สรรพนามแสดงความเป็นเจ้าของ 'mine' เพื่อแทนคำว่า 'my book' โดยไม่ต้องมีนามตามหลัง\nVocabulary: belongs to = เป็นของ, book = หนังสือ"
          }
        ]
      },
      {
        id: 'medium1',
        label: 'Medium 1',
        xpReward: 15,
        icon: 'star',
        questions: [
          {
            id: 'ppr_m1_1',
            question: "Complete: 'The cat licked ___ paw after eating the fish.'",
            options: ["its", "it's", "it", "itself"],
            correctAnswer: "its",
            explanation: "ENGLISH\nUse possessive adjective 'its' before the noun 'paw'.\n\nTHAI\nใช้คำคุณศัพท์แสดงความเป็นเจ้าของ 'its' นำหน้าคำนาม 'paw' (อุ้งเท้า)\nVocabulary: licked = เลีย, paw = อุ้งเท้า, eating = กิน, fish = ปลา"
          },
          {
            id: 'ppr_m1_2',
            question: "Complete: 'He cut ___ while preparing dinner in the kitchen.'",
            options: ["himself", "him", "his", "he"],
            correctAnswer: "himself",
            explanation: "ENGLISH\nUse reflexive pronoun 'himself' because the subject and object are the same person.\n\nTHAI\nใช้สรรพนามสะท้อน 'himself' (ตัวเขาเอง) เมื่อประธานและกรรมเป็นบุคคลเดียวกัน\nVocabulary: cut = บาด/ตัด, preparing = เตรียม, dinner = มื้อเย็น, kitchen = ห้องครัว"
          }
        ]
      },
      {
        id: 'medium2',
        label: 'Medium 2',
        xpReward: 15,
        icon: 'dumbbell',
        questions: [
          {
            id: 'ppr_m2_1',
            question: "Complete: 'They painted the entire house ___ without any help.'",
            options: ["themselves", "theirselves", "them", "themselves"],
            correctAnswer: "themselves",
            explanation: "ENGLISH\nUse reflexive pronoun 'themselves' to emphasize that they did it on their own.\n\nTHAI\nใช้สรรพนามสะท้อน 'themselves' (ด้วยตัวพวกเขาเอง) เพื่อเน้นว่าทำเองโดยไม่มีใครช่วย\nVocabulary: painted = ทาสี, entire = ทั้งหมด, house = บ้าน, without = ปราศจาก, help = ความช่วยเหลือ"
          },
          {
            id: 'ppr_m2_2',
            question: "Complete: 'Our car is red, but ___ is blue.'",
            options: ["theirs", "their", "them", "themselves"],
            correctAnswer: "theirs",
            explanation: "ENGLISH\nUse possessive pronoun 'theirs' to mean 'their car'.\n\nTHAI\nใช้สรรพนามแสดงความเป็นเจ้าของ 'theirs' เพื่อแทนคำว่า 'their car'\nVocabulary: car = รถยนต์, red = สีแดง, blue = สีน้ำเงิน"
          }
        ]
      },
      {
        id: 'hard1',
        label: 'Hard 1',
        xpReward: 20,
        icon: 'level-up',
        questions: [
          {
            id: 'ppr_h1_1',
            question: "Complete: 'One should always take care of ___ health.'",
            options: ["one's", "his", "her", "oneself"],
            correctAnswer: "one's",
            explanation: "ENGLISH\nThe pronoun 'one' requires the possessive form 'one's' to remain consistent.\n\nTHAI\nสรรพนามไม่ชี้เฉพาะ 'one' ต้องใช้คู่กับรูปแสดงความเป็นเจ้าของ 'one's' เสมอเพื่อความสอดคล้อง\nVocabulary: should = ควรจะ, always = เสมอ, take care = ดูแล, health = สุขภาพ"
          },
          {
            id: 'ppr_h1_2',
            question: "Complete: 'We enjoyed ___ very much at the beach last weekend.'",
            options: ["ourselves", "ourself", "us", "ours"],
            correctAnswer: "ourselves",
            explanation: "ENGLISH\nUse reflexive pronoun 'ourselves' (plural spelling) with the plural subject 'We'.\n\nTHAI\nใช้สรรพนามสะท้อน 'ourselves' (พหูพจน์ สะกดด้วย -ves) คู่กับประธาน 'We'\nVocabulary: enjoyed = สนุกสนาน, beach = ชายหาด, weekend = สุดสัปดาห์"
          }
        ]
      },
      {
        id: 'hard2',
        label: 'Hard 2',
        xpReward: 35,
        icon: 'boss',
        questions: [
          {
            id: 'ppr_h2_1',
            question: "Complete: 'He was sitting all by ___ in the corner of the library.'",
            options: ["himself", "his", "him", "he"],
            correctAnswer: "himself",
            explanation: "ENGLISH\nThe idiom 'by oneself' means alone or without companionship.\n\nTHAI\nสำนวน 'by oneself' (เช่น by himself) แปลว่า เพียงลำพัง หรือ คนเดียว\nVocabulary: sitting = กำลังนั่ง, corner = มุม, library = ห้องสมุด"
          },
          {
            id: 'ppr_h2_2',
            question: "Complete: 'The responsibility for this decision is ___.'",
            options: ["yours", "your", "you", "yourself"],
            correctAnswer: "yours",
            explanation: "ENGLISH\nUse possessive pronoun 'yours' as a predicate pronoun showing ownership of 'responsibility'.\n\nTHAI\nใช้สรรพนามแสดงความเป็นเจ้าของ 'yours' ทำหน้าที่เป็นส่วนเติมเต็มของกริยาแสดงความเป็นเจ้าของ\nVocabulary: responsibility = ความรับผิดชอบ, decision = การตัดสินใจ"
          }
        ]
      }
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
