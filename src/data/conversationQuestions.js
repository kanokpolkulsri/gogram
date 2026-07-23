// 10 Story-Driven Conversation Questions for Unit 301 (2 cohesive story questions per level across 5 levels)

export const conversationQuestions = [
  // LEVEL 1 (Easy - Scene 1: At StarCafé)
  {
    id: 'conv_301_easy_1',
    unitId: 301,
    levelId: 'easy',
    category: 'conversation',
    question: 'Scene 1 (Part 1): Ordering at StarCafé',
    dialogue: [
      { speaker: 'A', text: 'Good morning! Welcome to StarCafé. What can I get for you today?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Sure thing! Would you like that hot or iced?' }
    ],
    targetTurnIndex: 1,
    options: [
      "I'd like an iced Americano, please.",
      "I am fine, thank you.",
      "Where is the nearest bank?",
      "No, I don't buy anything."
    ],
    correctAnswer: "I'd like an iced Americano, please.",
    explanation: "'I'd like...' is a polite and natural way to order food or drinks in English.",
    explanationTh: "เมื่อสั่งอาหารหรือเครื่องดื่ม ควรใช้ประโยคสุภาพ เช่น 'I'd like...' (ฉันขอรับ...)"
  },
  {
    id: 'conv_301_easy_2',
    unitId: 301,
    levelId: 'easy',
    category: 'conversation',
    question: 'Scene 1 (Part 2): Paying at the Counter',
    dialogue: [
      { speaker: 'A', text: 'Your total comes to 120 Baht. How would you like to pay today?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Sure! You can scan the QR code right here on the counter.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Can I pay with PromptPay QR code?",
      "I want to eat here, please.",
      "Keep the change.",
      "I don't like sweet dessert."
    ],
    correctAnswer: "Can I pay with PromptPay QR code?",
    explanation: "'Can I pay with...?' directly specifies your payment method when paying at a cashier.",
    explanationTh: "พนักงานถามว่า 'How would you like to pay?' คำตอบ 'Can I pay with...' เป็นการระบุวิธีชำระเงินที่สอดคล้องที่สุด"
  },

  // LEVEL 2 (Medium 1 - Scene 2: At the Clothes Shop)
  {
    id: 'conv_301_medium1_1',
    unitId: 301,
    levelId: 'medium1',
    category: 'conversation',
    question: 'Scene 2 (Part 1): Inquiring About Item Price',
    dialogue: [
      { speaker: 'A', text: 'Hello! Are you looking for anything in particular?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "It's 1,200 Baht, but we have a special 20% discount today!" },
      { speaker: 'B', text: 'Oh, that sounds interesting!' }
    ],
    targetTurnIndex: 1,
    options: [
      "Yes, I really like this jacket. How much is it?",
      "No, I am looking for the exit door.",
      "I don't wear jackets in summer.",
      "Where is the nearest fitting room?"
    ],
    correctAnswer: "Yes, I really like this jacket. How much is it?",
    explanation: "Asking 'How much is it?' prompts the clerk to state the price and current discounts.",
    explanationTh: "การถามราคาสินค้าใช้ประโยค 'How much is it?' ซึ่งจะทำให้พนักงานบอกราคาสินค้าและส่วนลด"
  },
  {
    id: 'conv_301_medium1_2',
    unitId: 301,
    levelId: 'medium1',
    category: 'conversation',
    question: 'Scene 2 (Part 2): Deciding to Buy',
    dialogue: [
      { speaker: 'A', text: 'With the 20% discount, it comes to just 960 Baht.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Great! I will wrap this up for you right away.' },
      { speaker: 'B', text: 'Thank you very much!' }
    ],
    targetTurnIndex: 1,
    options: [
      "That sounds great! I'll take it then.",
      "Why is the store so crowded?",
      "Can I have a cup of tea instead?",
      "No, I never go shopping on weekends."
    ],
    correctAnswer: "That sounds great! I'll take it then.",
    explanation: "'I'll take it' confirms your final decision to purchase the item.",
    explanationTh: "เมื่อพอใจในราคาและตกลงซื้อสินค้า ใช้ประโยค 'I'll take it' (ตกลง ฉันรับชิ้นนี้ครับ/ค่ะ)"
  },

  // LEVEL 3 (Medium 2 - Scene 3: At Campus Library / O-NET Style)
  {
    id: 'conv_301_medium2_1',
    unitId: 301,
    levelId: 'medium2',
    category: 'conversation',
    question: 'Scene 3 (Part 1): Exam Review Small Talk',
    dialogue: [
      { speaker: 'A', text: 'Hey! Have you started reviewing for the English exam next Monday?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "Same here. A few of us are getting together at the library tomorrow." },
      { speaker: 'B', text: 'That sounds like a great idea!' }
    ],
    targetTurnIndex: 1,
    options: [
      "Not yet! I've been busy with my history assignment all week.",
      "I passed all my exams last year.",
      "Where is the campus cafeteria?",
      "English is my favorite subject at school."
    ],
    correctAnswer: "Not yet! I've been busy with my history assignment all week.",
    explanation: "'Not yet!' explains why you haven't started reviewing, matching Speaker A's 'Same here'.",
    explanationTh: "'Not yet!' (ยังเลย!) เป็นคำตอบรับเชิงปฏิเสธอย่างเป็นธรรมชาติเมื่อถูกถามว่าเริ่มติวหรือยัง"
  },
  {
    id: 'conv_301_medium2_2',
    unitId: 301,
    levelId: 'medium2',
    category: 'conversation',
    question: 'Scene 3 (Part 2): Arranging the Study Session',
    dialogue: [
      { speaker: 'A', text: 'We are reserving a study room on the 2nd floor for tomorrow afternoon.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "Around 2 PM. We'll grab some coffee first near the entrance." },
      { speaker: 'B', text: 'Perfect! See you tomorrow at 2.' }
    ],
    targetTurnIndex: 1,
    options: [
      "That sounds like a life-saver! What time are you meeting?",
      "Why didn't you finish your assignment earlier?",
      "The library is closed on public holidays.",
      "I hate studying in groups."
    ],
    correctAnswer: "That sounds like a life-saver! What time are you meeting?",
    explanation: "Asking 'What time are you meeting?' prompts Speaker A to state the time ('Around 2 PM').",
    explanationTh: "คำตอบถัดไประบุเวลา 'Around 2 PM' แสดงว่าประโยคคำถามก่อนหน้าต้องเป็นการถามเวลาติว เช่น 'What time are you meeting?'"
  },

  // LEVEL 4 (Hard 1 - Scene 4: At the Restaurant / A-Level Style)
  {
    id: 'conv_301_hard1_1',
    unitId: 301,
    levelId: 'hard1',
    category: 'conversation',
    question: 'Scene 4 (Part 1): Pointing Out an Order Mistake',
    dialogue: [
      { speaker: 'A', text: 'Here is your fried rice and iced tea, sir.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "Oh, I am so sorry! I'll take this back and bring your Pad Thai right away." },
      { speaker: 'B', text: 'Thank you, I appreciate it.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Excuse me, but I actually ordered Pad Thai, not fried rice.",
      "Fried rice is my favorite food in Thailand.",
      "Can I pay the bill right now?",
      "Your restaurant has very nice decoration."
    ],
    correctAnswer: "Excuse me, but I actually ordered Pad Thai, not fried rice.",
    explanation: "'Excuse me, but I actually ordered...' politely corrects a wrong food order.",
    explanationTh: "เมื่อได้รับอาหารผิด ควรทักท้วงอย่างสุภาพด้วยประโยค 'Excuse me, but I actually ordered...' (ขอโทษนะครับ พอดีผมสั่ง...)"
  },
  {
    id: 'conv_301_hard1_2',
    unitId: 301,
    levelId: 'hard1',
    category: 'conversation',
    question: 'Scene 4 (Part 2): Declining After-Dinner Drinks',
    dialogue: [
      { speaker: 'A', text: "We're all heading out for coffee after dinner to celebrate Mark's promotion." },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "Oh, that's too bad! Is everything alright?" },
      { speaker: 'B', text: "Yeah, just a slight headache, so I think I need to rest early tonight." }
    ],
    targetTurnIndex: 1,
    options: [
      "I'd love to, but I'm really not feeling well today.",
      "I don't like dinner celebrations at all.",
      "Mark doesn't deserve a promotion.",
      "Where is the restaurant located?"
    ],
    correctAnswer: "I'd love to, but I'm really not feeling well today.",
    explanation: "'I'd love to, but...' politely declines an invitation while offering a reason.",
    explanationTh: "การปฏิเสธคำชวนอย่างสุภาพและนุ่มนวลนิยมใช้ 'I'd love to, but...' (อยากไปนะครับ/ค่ะ แต่ว่า...)"
  },

  // LEVEL 5 (Hard 2 - Scene 5: At the Airport / GAT Eng Style)
  {
    id: 'conv_301_hard2_1',
    unitId: 301,
    levelId: 'hard2',
    category: 'conversation',
    question: 'Scene 5 (Part 1): Flight Cancellation Inquiries',
    dialogue: [
      { speaker: 'A', text: 'Attention passengers, Flight TG602 to Chiang Mai has been canceled due to severe weather.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'We can rebook you on the 8:00 AM flight tomorrow at no extra charge, or issue a full refund.' },
      { speaker: 'B', text: 'I see. Rebooking on tomorrow morning flight sounds best.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Excuse me, what options do we have for rebooking or refunds?",
      "Chiang Mai is a very beautiful city in northern Thailand.",
      "I don't like flying when it is raining outside.",
      "Can I board the plane right now?"
    ],
    correctAnswer: "Excuse me, what options do we have for rebooking or refunds?",
    explanation: "Asking about rebooking/refund options prompts the airline agent to present available choices.",
    explanationTh: "เมื่อเที่ยวบินถูกยกเลิก การสอบถามทางเลือกกับเจ้าหน้าที่สนามบินใช้ 'what options do we have for rebooking or refunds?'"
  },
  {
    id: 'conv_301_hard2_2',
    unitId: 301,
    levelId: 'hard2',
    category: 'conversation',
    question: 'Scene 5 (Part 2): Requesting Accommodation Vouchers',
    dialogue: [
      { speaker: 'A', text: 'I have successfully confirmed your seats for tomorrow morning at 8:00 AM.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Certainly! Here is your voucher for the Airport Transit Hotel near Gate 4.' },
      { speaker: 'B', text: 'Thank you so much for your help!' }
    ],
    targetTurnIndex: 1,
    options: [
      "Could you also assist with an overnight hotel voucher?",
      "Where can I buy a souvenir before leaving?",
      "I don't need any place to stay tonight.",
      "How much does a hotel room cost in Chiang Mai?"
    ],
    correctAnswer: "Could you also assist with an overnight hotel voucher?",
    explanation: "Requesting a hotel voucher prompts the airline agent to provide accommodation for the overnight delay.",
    explanationTh: "เมื่อเที่ยวบินเลื่อนไปวันรุ่งขึ้น การขอคูปองโรงแรมที่พักใช้ประโยค 'Could you also assist with an overnight hotel voucher?'"
  }
];
