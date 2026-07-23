// 25 Story-Driven Conversation Questions for Unit 301 (5-part continuous story per level across 5 levels)

export const conversationQuestions = [
  // ==========================================
  // LEVEL 1 (Easy - Scene 1: At StarCafé)
  // ==========================================
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
    question: 'Scene 1 (Part 2): Customizing the Drink',
    dialogue: [
      { speaker: 'A', text: 'Iced Americano, got it. How would you like the sweetness level?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'No problem! 50% sweetness with oat milk.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Could I get less sugar and oat milk, please?",
      "I want to drink it next week.",
      "The weather is very hot today.",
      "Do you sell running shoes here?"
    ],
    correctAnswer: "Could I get less sugar and oat milk, please?",
    explanation: "'Could I get...' is used to politely request customizations for your order.",
    explanationTh: "การสั่งปรับหวานน้อยหรือเปลี่ยนประเภทนม ใช้ประโยคสุภาพ 'Could I get...'"
  },
  {
    id: 'conv_301_easy_3',
    unitId: 301,
    levelId: 'easy',
    category: 'conversation',
    question: 'Scene 1 (Part 3): Adding a Bakery Item',
    dialogue: [
      { speaker: 'A', text: 'Would you like to add a fresh butter croissant today for 40 Baht extra?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Great choice! I will warm that up for you.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Yes, I'll take a warm croissant as well.",
      "I don't know how to bake bread.",
      "Croissants are made of flour.",
      "No, I don't have a bicycle."
    ],
    correctAnswer: "Yes, I'll take a warm croissant as well.",
    explanation: "'Yes, I'll take [item] as well' is a natural way to accept an add-on suggestion.",
    explanationTh: "เมื่อตอบรับการเพิ่มสินค้าใช้ประโยค 'Yes, I'll take [สินค้า] as well'"
  },
  {
    id: 'conv_301_easy_4',
    unitId: 301,
    levelId: 'easy',
    category: 'conversation',
    question: 'Scene 1 (Part 4): Paying at the Register',
    dialogue: [
      { speaker: 'A', text: 'Your total comes to 160 Baht. How would you like to pay today?' },
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
    explanation: "'Can I pay with...?' specifies your payment method at a cashier counter.",
    explanationTh: "พนักงานถามว่า 'How would you like to pay?' คำตอบ 'Can I pay with...' เป็นการระบุวิธีชำระเงิน"
  },
  {
    id: 'conv_301_easy_5',
    unitId: 301,
    levelId: 'easy',
    category: 'conversation',
    question: 'Scene 1 (Part 5): Order Pickup',
    dialogue: [
      { speaker: 'A', text: 'Here is your receipt and order number 42.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'You can pick it up at the counter on the left in about 3 minutes.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Thank you! Where should I wait for my order?",
      "I don't want the receipt anymore.",
      "Number 42 is my favorite number.",
      "What time does the cafe close tonight?"
    ],
    correctAnswer: "Thank you! Where should I wait for my order?",
    explanation: "Asking 'Where should I wait...?' prompts the cashier to explain where to collect your food/drink.",
    explanationTh: "การถามสถานที่รับสินค้าใช้ประโยค 'Where should I wait for my order?'"
  },

  // ==========================================
  // LEVEL 2 (Medium 1 - Scene 2: At Clothes Shop)
  // ==========================================
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
    explanationTh: "การถามราคาสินค้าใช้ประโยค 'How much is it?'"
  },
  {
    id: 'conv_301_medium1_2',
    unitId: 301,
    levelId: 'medium1',
    category: 'conversation',
    question: 'Scene 2 (Part 2): Deciding to Purchase',
    dialogue: [
      { speaker: 'A', text: 'With the 20% discount, it comes to just 960 Baht.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Great! What size would you like to try on?' }
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
  {
    id: 'conv_301_medium1_3',
    unitId: 301,
    levelId: 'medium1',
    category: 'conversation',
    question: 'Scene 2 (Part 3): Inquiring About Size',
    dialogue: [
      { speaker: 'A', text: 'Let me check our stock in the back room for medium size.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Yes, we have one medium left in navy blue!' }
    ],
    targetTurnIndex: 1,
    options: [
      "Do you have this jacket in a medium size?",
      "I am 170 centimeters tall.",
      "Medium is between small and large.",
      "I don't like blue color."
    ],
    correctAnswer: "Do you have this jacket in a medium size?",
    explanation: "'Do you have this in a [size]?' checks inventory availability.",
    explanationTh: "ถามหาสินค้าตามขนาดใช้ประโยค 'Do you have this in a [size]?'"
  },
  {
    id: 'conv_301_medium1_4',
    unitId: 301,
    levelId: 'medium1',
    category: 'conversation',
    question: 'Scene 2 (Part 4): Fitting Room Location',
    dialogue: [
      { speaker: 'A', text: 'Here is the medium jacket for you to try on.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'They are right around the corner next to the mirrors.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Where is the fitting room located?",
      "I don't need to wear clothes.",
      "The mirror is very clean.",
      "Can I take a photo with the jacket?"
    ],
    correctAnswer: "Where is the fitting room located?",
    explanation: "Asking 'Where is the fitting room?' asks where to try on clothing.",
    explanationTh: "ถามตำแหน่งห้องลองเสื้อผ้าใช้ประโยค 'Where is the fitting room located?'"
  },
  {
    id: 'conv_301_medium1_5',
    unitId: 301,
    levelId: 'medium1',
    category: 'conversation',
    question: 'Scene 2 (Part 5): Gift Wrapping Request',
    dialogue: [
      { speaker: 'A', text: 'The jacket fits you perfectly! Shall I take this to the counter?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Of course! We offer complimentary gift wrapping.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Could you please wrap this as a gift?",
      "I don't buy gifts for anyone.",
      "Gifts are given on birthdays.",
      "How heavy is the shopping bag?"
    ],
    correctAnswer: "Could you please wrap this as a gift?",
    explanation: "'Could you please wrap this as a gift?' politely requests gift packaging.",
    explanationTh: "ขอให้พนักงานห่อของขวัญใช้ประโยค 'Could you please wrap this as a gift?'"
  },

  // ==========================================
  // LEVEL 3 (Medium 2 - Scene 3: At Campus Library / O-NET)
  // ==========================================
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
    explanation: "'Not yet!' explains why you haven't started reviewing.",
    explanationTh: "'Not yet!' (ยังเลย!) เป็นคำตอบรับเชิงปฏิเสธอย่างเป็นธรรมชาติเมื่อถูกถามว่าเริ่มติวหรือยัง"
  },
  {
    id: 'conv_301_medium2_2',
    unitId: 301,
    levelId: 'medium2',
    category: 'conversation',
    question: 'Scene 3 (Part 2): Arranging the Study Session',
    dialogue: [
      { speaker: 'A', text: 'We are getting together to study at the library tomorrow.' },
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
    explanationTh: "คำตอบถัดไประบุเวลา 'Around 2 PM' แสดงว่าประโยคคำถามก่อนหน้าต้องเป็นการถามเวลาติว"
  },
  {
    id: 'conv_301_medium2_3',
    unitId: 301,
    levelId: 'medium2',
    category: 'conversation',
    question: 'Scene 3 (Part 3): Room Reservation Check',
    dialogue: [
      { speaker: 'A', text: 'We hope to get one of those quiet group rooms on the 2nd floor.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Yes, I booked Room 204 online this morning for 2 hours.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Did you already reserve the study room?",
      "Study rooms have tables and chairs.",
      "The 2nd floor is above the 1st floor.",
      "I prefer studying in my bedroom."
    ],
    correctAnswer: "Did you already reserve the study room?",
    explanation: "'Did you already reserve...?' checks if a booking has been confirmed.",
    explanationTh: "ถามว่าจองห้องศึกษาเรียบร้อยหรือยังใช้ประโยค 'Did you already reserve...?'"
  },
  {
    id: 'conv_301_medium2_4',
    unitId: 301,
    levelId: 'medium2',
    category: 'conversation',
    question: 'Scene 3 (Part 4): Sharing Study Notes',
    dialogue: [
      { speaker: 'A', text: 'Does anyone have the lecture notes from Unit 4 on tenses?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'That would be awesome! Thanks a lot.' }
    ],
    targetTurnIndex: 1,
    options: [
      "I can bring my class notes from last week.",
      "Unit 4 is after Unit 3.",
      "I forgot where I put my pencil case.",
      "Lectures are 50 minutes long."
    ],
    correctAnswer: "I can bring my class notes from last week.",
    explanation: "'I can bring...' offers study materials to help the group.",
    explanationTh: "เสนอช่วยนำสรุปชีตมาให้เพื่อนใช้ประโยค 'I can bring...'"
  },
  {
    id: 'conv_301_medium2_5',
    unitId: 301,
    levelId: 'medium2',
    category: 'conversation',
    question: 'Scene 3 (Part 5): Final Pre-Meeting Plan',
    dialogue: [
      { speaker: 'A', text: 'Okay, so we meet at 1:45 PM before going upstairs.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Sounds like a plan! See you at the coffee shop entrance.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Great! Let's meet near the entrance coffee shop first.",
      "I don't drink coffee after 12 PM.",
      "The entrance door is glass.",
      "I will be sleeping at 1:45 PM."
    ],
    correctAnswer: "Great! Let's meet near the entrance coffee shop first.",
    explanation: "'Let's meet...' confirms the exact meeting location.",
    explanationTh: "ยืนยันจุดนัดพบใช้ประโยค 'Let's meet near...'"
  },

  // ==========================================
  // LEVEL 4 (Hard 1 - Scene 4: At Restaurant / A-Level)
  // ==========================================
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
    explanationTh: "เมื่อได้รับอาหารผิด ควรทักท้วงอย่างสุภาพด้วยประโยค 'Excuse me, but I actually ordered...'"
  },
  {
    id: 'conv_301_hard1_2',
    unitId: 301,
    levelId: 'hard1',
    category: 'conversation',
    question: 'Scene 4 (Part 2): Accepting Correction',
    dialogue: [
      { speaker: 'A', text: 'Here is your fresh Pad Thai dish. Apologies again for the delay.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Please enjoy your meal!' }
    ],
    targetTurnIndex: 1,
    options: [
      "Thank you, I appreciate you fixing it so quickly.",
      "I am leaving the restaurant right now.",
      "Pad Thai is made with noodles.",
      "The waiter is wearing a red apron."
    ],
    correctAnswer: "Thank you, I appreciate you fixing it so quickly.",
    explanation: "'Thank you, I appreciate...' acknowledges the waiter's prompt service politely.",
    explanationTh: "กล่าวขอบคุณการบริการแก้ไขของพนักงานใช้ประโยค 'Thank you, I appreciate...'"
  },
  {
    id: 'conv_301_hard1_3',
    unitId: 301,
    levelId: 'hard1',
    category: 'conversation',
    question: 'Scene 4 (Part 3): Requesting Extra Items',
    dialogue: [
      { speaker: 'A', text: 'Is there anything else I can get for your table?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Right away, sir. I will bring extra ice and napkins.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Could we get some fresh water and extra ice, please?",
      "Ice is frozen water.",
      "I don't drink tap water.",
      "The table is made of oak wood."
    ],
    correctAnswer: "Could we get some fresh water and extra ice, please?",
    explanation: "'Could we get...?' politely requests additional table service items.",
    explanationTh: "ขอเครื่องดื่มหรืออุปกรณ์เพิ่มเติมใช้ประโยค 'Could we get...?'"
  },
  {
    id: 'conv_301_hard1_4',
    unitId: 301,
    levelId: 'hard1',
    category: 'conversation',
    question: 'Scene 4 (Part 4): Requesting the Bill',
    dialogue: [
      { speaker: 'A', text: 'How was everything with your dinner tonight?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Certainly! I will bring the bill to your table.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Everything was delicious! Could we have the bill, please?",
      "I am full from lunch today.",
      "Restaurants accept cash and cards.",
      "The chef is cooking in the kitchen."
    ],
    correctAnswer: "Everything was delicious! Could we have the bill, please?",
    explanation: "'Could we have the bill, please?' is the standard polite phrase to ask for check/payment at a restaurant.",
    explanationTh: "ขอเรียกเก็บเงินที่ร้านอาหารใช้ประโยค 'Could we have the bill, please?'"
  },
  {
    id: 'conv_301_hard1_5',
    unitId: 301,
    levelId: 'hard1',
    category: 'conversation',
    question: 'Scene 4 (Part 5): Declining After-Dinner Drinks',
    dialogue: [
      { speaker: 'A', text: "We're all heading out for coffee after dinner to celebrate Mark's promotion." },
      { speaker: 'B', text: null },
      { speaker: 'A', text: "Oh, that's too bad! Is everything decision alright?" },
      { speaker: 'B', text: "Yeah, just a slight headache, so I need to rest early tonight." }
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
    explanationTh: "การปฏิเสธคำชวนอย่างสุภาพและนุ่มนวลนิยมใช้ 'I'd love to, but...'"
  },

  // ==========================================
  // LEVEL 5 (Hard 2 - Scene 5: At Airport / GAT Eng)
  // ==========================================
  {
    id: 'conv_301_hard2_1',
    unitId: 301,
    levelId: 'hard2',
    category: 'conversation',
    question: 'Scene 5 (Part 1): Flight Cancellation Inquiries',
    dialogue: [
      { speaker: 'A', text: 'Attention passengers, Flight TG602 to Chiang Mai has been canceled due to severe weather.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'We can rebook you on the 8:00 AM flight tomorrow at no extra charge, or issue a full refund.' }
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
    question: 'Scene 5 (Part 2): Rebooking Decision',
    dialogue: [
      { speaker: 'A', text: 'Would you prefer to rebook on tomorrow morning flight or take a refund?' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Very well. I will issue your new boarding pass for tomorrow 8:00 AM.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Rebooking on tomorrow morning flight works best for me.",
      "I will walk to Chiang Mai instead.",
      "Refunds take 3 to 5 business days.",
      "I don't have a passport."
    ],
    correctAnswer: "Rebooking on tomorrow morning flight works best for me.",
    explanation: "'[Option] works best for me' expresses your choice clearly.",
    explanationTh: "เลือกรอบเที่ยวบินใหม่ใช้ประโยค '[Option] works best for me'"
  },
  {
    id: 'conv_301_hard2_3',
    unitId: 301,
    levelId: 'hard2',
    category: 'conversation',
    question: 'Scene 5 (Part 3): Requesting Hotel Vouchers',
    dialogue: [
      { speaker: 'A', text: 'I have successfully confirmed your seats for tomorrow morning.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Certainly! Here is your voucher for the Transit Hotel near Gate 4.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Could you also assist with an overnight hotel voucher?",
      "Where can I buy a souvenir before leaving?",
      "I don't need any place to stay tonight.",
      "How much does a hotel room cost in Chiang Mai?"
    ],
    correctAnswer: "Could you also assist with an overnight hotel voucher?",
    explanation: "Requesting a hotel voucher prompts the airline agent to provide accommodation.",
    explanationTh: "การขอคูปองโรงแรมที่พักเมื่อเที่ยวบินเลื่อนวันใช้ประโยค 'Could you also assist with an overnight hotel voucher?'"
  },
  {
    id: 'conv_301_hard2_4',
    unitId: 301,
    levelId: 'hard2',
    category: 'conversation',
    question: 'Scene 5 (Part 4): Luggage Transfer Confirmation',
    dialogue: [
      { speaker: 'A', text: 'Your hotel voucher includes dinner and breakfast at the transit lounge.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'Yes, your checked bags remain secure and will be transferred to tomorrow flight.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Will our checked luggage be transferred automatically?",
      "My suitcase is black color.",
      "Baggage claim is on the 1st floor.",
      "I don't carry any heavy bags."
    ],
    correctAnswer: "Will our checked luggage be transferred automatically?",
    explanation: "Asking 'Will our checked luggage be transferred...?' confirms baggage handling details.",
    explanationTh: "สอบถามการย้ายกระเป๋าสัมภาระอัตโนมัติใช้ประโยค 'Will our checked luggage be transferred...?'"
  },
  {
    id: 'conv_301_hard2_5',
    unitId: 301,
    levelId: 'hard2',
    category: 'conversation',
    question: 'Scene 5 (Part 5): Final Departure Instructions',
    dialogue: [
      { speaker: 'A', text: 'Here are your new boarding passes and hotel vouchers. Boarding starts at 7:20 AM tomorrow.' },
      { speaker: 'B', text: null },
      { speaker: 'A', text: 'You are very welcome! Have a pleasant evening and a safe flight tomorrow.' }
    ],
    targetTurnIndex: 1,
    options: [
      "Thank you so much for resolving this so efficiently!",
      "I am going to miss my flight.",
      "Airports are very large buildings.",
      "What time is it right now?"
    ],
    correctAnswer: "Thank you so much for resolving this so efficiently!",
    explanation: "'Thank you so much for resolving this...' expresses polite gratitude to customer service staff.",
    explanationTh: "ขอบคุณการช่วยอำนวยความสะดวกอย่างมีประสิทธิภาพใช้ 'Thank you so much for resolving this...'"
  }
];
