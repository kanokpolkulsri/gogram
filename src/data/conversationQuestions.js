// 10 Conversation Questions for Unit 301 (2 questions per level across 5 levels)

export const conversationQuestions = [
  // LEVEL 1 (Easy - 3-Turn Dialogues)
  {
    id: 'conv_301_easy_1',
    unitId: 301,
    levelId: 'easy',
    category: 'conversation',
    question: 'Ordering Coffee at a Cafe',
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
    question: 'Asking for Directions',
    dialogue: [
      { speaker: 'A', text: 'Excuse me, do you know where the nearest BTS station is?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Great! Thank you so much.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Yes, it's just down this street on your right.",
      "I don't buy train tickets today.",
      "What is your name?",
      "The BTS station is very expensive."
    ],
    correctAnswer: "Yes, it's just down this street on your right.",
    explanation: "'Yes, it's just down this street...' directly and politely answers a request for directions.",
    explanationTh: "ประโยคบอกทางที่ตรงคำถามและสุภาพ คือการบอกตำแหน่ง เช่น 'it's just down this street on your right' (อยู่ตรงไปตามถนนนี้ทางขวามือ)"
  },

  // LEVEL 2 (Medium 1 - 4-Turn Dialogues)
  {
    id: 'conv_301_medium1_1',
    unitId: 301,
    levelId: 'medium1',
    category: 'conversation',
    question: 'Shopping & Discounts',
    dialogue: [
      { speaker: 'A', text: 'Hello! Are you looking for anything in particular?' },
      { speaker: 'B', text: 'Yes, I really like this jacket. How much is it?' },
      { speaker: 'A', text: "It's 1,200 Baht, but we have a special 20% discount today!" },
      { speaker: 'B', text: null }
    ],
    targetTurnIndex: 3,
    options: [
      "That sounds great! I'll take it then.",
      "I don't wear jackets in summer.",
      "Why is the store so crowded?",
      "Can I have a cup of tea instead?"
    ],
    correctAnswer: "That sounds great! I'll take it then.",
    explanation: "Responding enthusiastically to a discount with 'I'll take it' confirms your decision to purchase.",
    explanationTh: "เมื่อได้รับส่วนลดและพอใจในราคา ควรใช้ประโยคซื้อสินค้า เช่น 'I'll take it' (ตกลง ฉันรับชิ้นนี้ครับ/ค่ะ)"
  },
  {
    id: 'conv_301_medium1_2',
    unitId: 301,
    levelId: 'medium1',
    category: 'conversation',
    question: 'Making Weekend Plans',
    dialogue: [
      { speaker: 'A', text: 'Hey! Are you free this Saturday evening?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "We're checking out the new night market downtown. Want to come along?" },
      { speaker: 'B', text: 'Count me in! What time should we meet?' }
    ],
    targetTurnIndex: 1,
    options: [
      "I don't have any plans yet. What's up?",
      "Saturday is the sixth day of the week.",
      "I am very sleepy right now.",
      "No, I never go shopping alone."
    ],
    correctAnswer: "I don't have any plans yet. What's up?",
    explanation: "'I don't have any plans yet. What's up?' indicates you are free and curious about the idea.",
    explanationTh: "'I don't have any plans yet' เป็นประโยคตอบรับว่าว่างอยู่เพื่อเปิดทางให้อีกฝ่ายเสนอแผนกิจกรรม"
  },

  // LEVEL 3 (Medium 2 - 5-Turn Dialogues / O-NET Style)
  {
    id: 'conv_301_medium2_1',
    unitId: 301,
    levelId: 'medium2',
    category: 'conversation',
    question: 'Campus Life & Study Group (O-NET Style)',
    dialogue: [
      { speaker: 'A', text: 'Hey! Have you started reviewing for the English exam next Monday?' },
      { speaker: 'B', text: "Not yet! I've been busy with my history assignment all week." },
      { speaker: 'A', text: "Same here. A few of us are getting together at the library tomorrow." },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "Around 2 PM. We'll grab some coffee first near the entrance." }
    ],
    targetTurnIndex: 3,
    options: [
      "That sounds like a life-saver! What time are you meeting?",
      "Why didn't you finish your assignment earlier?",
      "The library is closed on public holidays.",
      "I hate studying English Syntax."
    ],
    correctAnswer: "That sounds like a life-saver! What time are you meeting?",
    explanation: "The follow-up response specifies a time ('Around 2 PM'), proving the learner asked about the meeting time.",
    explanationTh: "คำตอบถัดไประบุเวลา 'Around 2 PM' แสดงว่าประโยคคำถามก่อนหน้าต้องเป็นการถามเวลาติว เช่น 'What time are you meeting?'"
  },
  {
    id: 'conv_301_medium2_2',
    unitId: 301,
    levelId: 'medium2',
    category: 'conversation',
    question: 'Restaurant Order Mistake',
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
    explanation: "Politely pointing out a food mix-up with 'Excuse me, but I actually ordered...' is standard polite customer etiquette.",
    explanationTh: "เมื่อได้รับอาหารผิด ควรทักท้วงอย่างสุภาพด้วยประโยค 'Excuse me, but I actually ordered...' (ขอโทษนะครับ พอดีผมสั่ง...)"
  },

  // LEVEL 4 (Hard 1 - 6-Turn Dialogues / A-Level Style)
  {
    id: 'conv_301_hard1_1',
    unitId: 301,
    levelId: 'hard1',
    category: 'conversation',
    question: 'Declining an Invitation Politely (A-Level Style)',
    dialogue: [
      { speaker: 'A', text: "We're all going out for dinner after work today to celebrate Mark's promotion." },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "Oh, that's too bad! Is everything alright?" },
      { speaker: 'B', text: "Yeah, just a slight headache, so I think I need to rest early tonight." },
      { speaker: 'A', text: 'No problem at all. Take care and get well soon!' }
    ],
    targetTurnIndex: 1,
    options: [
      "I'd love to, but I'm really not feeling well today.",
      "I don't like dinner celebrations at all.",
      "Mark doesn't deserve a promotion.",
      "Where is the restaurant located?"
    ],
    correctAnswer: "I'd love to, but I'm really not feeling well today.",
    explanation: "'I'd love to, but...' is the standard polite formula to decline an invitation while softening the refusal.",
    explanationTh: "การปฏิเสธคำชวนอย่างสุภาพและนุ่มนวลนิยมใช้ 'I'd love to, but...' (อยากไปนะครับ/ค่ะ แต่ว่า...)"
  },
  {
    id: 'conv_301_hard1_2',
    unitId: 301,
    levelId: 'hard1',
    category: 'conversation',
    question: 'Expressing Sympathy & Encouragement',
    dialogue: [
      { speaker: 'A', text: "I'm so stressed out. I just found out I didn't pass the scholarship interview." },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "Thanks. I worked so hard for it, so it's really disappointing." },
      { speaker: 'B', text: "I know how much effort you put in. Don't give up—there will be better opportunities ahead!" }
    ],
    targetTurnIndex: 1,
    options: [
      "I'm so sorry to hear that. You must be feeling really down.",
      "You should have studied harder for the interview.",
      "Scholarships are not important anyway.",
      "What time did the interview start?"
    ],
    correctAnswer: "I'm so sorry to hear that. You must be feeling really down.",
    explanation: "Expressing empathy ('I'm so sorry to hear that') comforts someone sharing bad news.",
    explanationTh: "การแสดงความเห็นอกเห็นใจเมื่อเพื่อนเจอข่าวร้าย ใช้ประโยค 'I'm so sorry to hear that...' (เสียใจด้วยนะที่ได้ยินแบบนั้น)"
  },

  // LEVEL 5 (Hard 2 - 7+ Turn Dialogues / GAT Eng Style)
  {
    id: 'conv_301_hard2_1',
    unitId: 301,
    levelId: 'hard2',
    category: 'conversation',
    question: 'Workplace — Asking for a Deadline Extension (GAT Style)',
    dialogue: [
      { speaker: 'A', text: 'Hi Anna, how is the quarterly market report coming along?' },
      { speaker: 'B', text: "I've finished the draft analysis, but I'm still waiting on the sales team's final figures." },
      { speaker: 'A', text: 'I see. Keep in mind the report is due by 5 PM tomorrow.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Alright, as long as I receive it before the Friday morning board meeting.' },
      { speaker: 'B', text: 'Thank you so much! I will make sure it is submitted by Thursday night.' }
    ],
    targetTurnIndex: 3,
    options: [
      "Would it be possible to get a short extension until Friday morning?",
      "I am refusing to finish this report.",
      "Sales numbers are not required for market reports.",
      "I will be on vacation starting tomorrow."
    ],
    correctAnswer: "Would it be possible to get a short extension until Friday morning?",
    explanation: "Politely requesting an extension ('Would it be possible to get an extension...') fits a formal manager-employee conversation.",
    explanationTh: "การขอขยายเวลาส่งงานกับหัวหน้าอย่างมืออาชีพและสุภาพ ใช้ประโยค 'Would it be possible to get an extension...?'"
  },
  {
    id: 'conv_301_hard2_2',
    unitId: 301,
    levelId: 'hard2',
    category: 'conversation',
    question: 'Airport — Flight Cancellation Options',
    dialogue: [
      { speaker: 'A', text: 'Attention passengers, Flight TG602 to Chiang Mai has been canceled due to severe weather.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'We can rebook you on the 8:00 AM flight tomorrow at no extra charge, or issue a full refund.' },
      { speaker: 'B', text: 'The morning flight works best for me. Could you also assist with overnight hotel voucher?' }
    ],
    targetTurnIndex: 1,
    options: [
      "Excuse me, what options do we have for rebooking or refunds?",
      "Chiang Mai is a very beautiful city in northern Thailand.",
      "I don't like flying when it is raining outside.",
      "Can I board the plane right now?"
    ],
    correctAnswer: "Excuse me, what options do we have for rebooking or refunds?",
    explanation: "Asking the airline staff about rebooking/refund options leads to their explanation of the available choices.",
    explanationTh: "เมื่อเที่ยวบินถูกยกเลิก การสอบถามทางเลือกกับเจ้าหน้าที่สนามบินใช้ 'what options do we have for rebooking or refunds?'"
  }
];
