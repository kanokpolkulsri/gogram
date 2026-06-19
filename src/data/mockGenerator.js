// Mock realistic question database and generator for GrammarGo

const articlesQuestions = {
  easy: [
    {
      question: "Which article completes: 'I have ___ apple for lunch'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "an",
      explanation: "ENGLISH\nUse 'an' before words starting with a vowel sound (a, e, i, o, u).\n\nTHAI\nใช้ 'an' นำหน้าคำที่ขึ้นต้นด้วยเสียงสระ (ออ) เช่น apple ออกเสียง /æ/ จึงต้องใช้ 'an'"
    },
    {
      question: "Which article completes: '___ sun is very bright today'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the' for unique celestial objects that there is only one of.\n\nTHAI\nใช้ 'the' นำหน้าสิ่งที่มีเพียงหนึ่งเดียวในธรรมชาติ เช่น พระอาทิตย์ (sun)"
    },
    {
      question: "Which article completes: 'She is reading ___ book'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "a",
      explanation: "ENGLISH\nUse 'a' for singular countable nouns that start with a consonant sound when speaking generally.\n\nTHAI\nใช้ 'a' นำหน้าคำนามนับได้เอกพจน์ทั่วไปที่ขึ้นต้นด้วยเสียงพยัญชนะ เช่น book ออกเสียง /b/"
    },
    {
      question: "Which article completes: 'He wants to be ___ doctor'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "a",
      explanation: "ENGLISH\nUse 'a' or 'an' when mentioning someone's profession for the first time.\n\nTHAI\nใช้ 'a' หรือ 'an' นำหน้าอาชีพเมื่อกล่าวถึงเป็นครั้งแรก เช่น a doctor"
    },
    {
      question: "Which article completes: 'Do you want ___ orange?'",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "an",
      explanation: "ENGLISH\nUse 'an' before 'orange' because it starts with the vowel sound /ɒ/.\n\nTHAI\nใช้ 'an' นำหน้า orange เพราะออกเสียงขึ้นต้นด้วยเสียงสระ"
    },
    {
      question: "Which article completes: '___ earth is our home planet'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the' for specific, unique entities like planets.\n\nTHAI\nใช้ 'the' นำหน้าคำว่า earth เพราะเป็นโลกที่มีเพียงหนึ่งเดียว"
    },
    {
      question: "Which article completes: 'I saw ___ cat on the roof'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "a",
      explanation: "ENGLISH\nUse 'a' for a non-specific singular countable noun.\n\nTHAI\nใช้ 'a' สำหรับการเอ่ยถึงแมวตัวหนึ่งแบบไม่เฉพาะเจาะจง"
    },
    {
      question: "Which article completes: 'We live in ___ old house'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "an",
      explanation: "ENGLISH\n'Old' starts with a vowel sound /oʊ/, so we use 'an'.\n\nTHAI\nคำคุณศัพท์ 'old' ขึ้นต้นด้วยเสียงสระ จึงต้องใช้ 'an'"
    },
    {
      question: "Which article completes: '___ water in that glass is dirty'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the' for uncountable nouns when they are specified or defined.\n\nTHAI\nใช้ 'the' นำหน้าคำนามนับไม่ได้เมื่อระบุเฉพาะเจาะจง (น้ำในแก้วนั้น)"
    },
    {
      question: "Which article completes: 'He is playing ___ guitar'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "the",
      explanation: "ENGLISH\nUse 'the' before musical instruments when playing them.\n\nTHAI\nใช้ 'the' นำหน้าเครื่องดนตรีเสมอเมื่อใช้คู่กับกริยา play"
    }
  ],
  medium1: [
    {
      question: "Which article completes: 'It will take ___ hour to get there'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "an",
      explanation: "ENGLISH\n'Hour' starts with a silent 'h', so the initial sound is the vowel sound /aʊər/.\n\nTHAI\nคำว่า 'hour' ตัว h ไม่ออกเสียง (ออกเสียงออ) จึงถือเป็นเสียงสระ ต้องใช้ 'an'"
    },
    {
      question: "Which article completes: 'She goes to ___ university in Bangkok'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "a",
      explanation: "ENGLISH\n'University' starts with the consonant sound /juː/, so we use 'a'.\n\nTHAI\nคำว่า 'university' ขึ้นต้นด้วยเสียงพยัญชนะ /juː/ (ยู) จึงต้องใช้ 'a'"
    },
    {
      question: "Which article completes: 'He is ___ honest man'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "an",
      explanation: "ENGLISH\n'Honest' has a silent 'h', starting with the vowel sound /ɒ/.\n\nTHAI\nคำว่า 'honest' ออกเสียงขึ้นต้นด้วย อ. อ่าง (เสียงสระ) จึงต้องใช้ 'an'"
    },
    {
      question: "Which article completes: '___ unit 1 is very easy'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "No article",
      explanation: "ENGLISH\nDo not use articles before nouns followed by a number.\n\nTHAI\nไม่ใช้ article นำหน้าคำนามที่มีตัวเลขตามหลัง เช่น Unit 1 หรือ Room 5"
    },
    {
      question: "Which article completes: 'We traveled around ___ Europe'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "no article",
      explanation: "ENGLISH\nDo not use articles before names of continents.\n\nTHAI\nไม่ใช้ article นำหน้าชื่อทวีป เช่น Europe, Asia, Africa"
    },
    {
      question: "Which article completes: 'She plays ___ tennis every Saturday'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "no article",
      explanation: "ENGLISH\nDo not use articles before names of sports.\n\nTHAI\nไม่ใช้ article นำหน้ากีฬา เช่น play tennis, play football"
    },
    {
      question: "Which article completes: 'They speak ___ English very well'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "no article",
      explanation: "ENGLISH\nDo not use articles before names of languages.\n\nTHAI\nไม่ใช้ article นำหน้าภาษา เช่น speak English, speak Thai"
    },
    {
      question: "Which article completes: '___ lunch we had yesterday was delicious'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the' for meals when referencing a specific, past meal.\n\nTHAI\nโดยทั่วไปมื้ออาหารไม่ใส่ article แต่ข้อนี้เจาะจงถึงมื้อกลางวันที่กินเมื่อวาน จึงใช้ 'the'"
    },
    {
      question: "Which article completes: 'She has ___ unique style'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "a",
      explanation: "ENGLISH\n'Unique' begins with the consonant sound /juː/ (y-sound), so it takes 'a'.\n\nTHAI\n'Unique' ขึ้นต้นด้วยเสียง /juː/ (ย) ซึ่งเป็นเสียงพยัญชนะ จึงใช้ 'a'"
    },
    {
      question: "Which article completes: '___ CEO of Google is Sundar Pichai'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the' for specific unique titles or roles in a company/country.\n\nTHAI\nใช้ 'the' นำหน้าชื่อตำแหน่งที่มีเพียงคนเดียวในองค์กรหรือประเทศ เช่น The CEO, The President"
    }
  ],
  medium2: [
    {
      question: "Which article completes: '___ Chao Phraya River flows through Bangkok'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the' before names of rivers, seas, and oceans.\n\nTHAI\nใช้ 'the' นำหน้าชื่อแม่น้ำ ทะเล และมหาสมุทรเสมอ เช่น The Chao Phraya River"
    },
    {
      question: "Which article completes: 'They are staying at ___ Hilton Hotel'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "the",
      explanation: "ENGLISH\nUse 'the' before names of hotels, cinemas, and museums.\n\nTHAI\nใช้ 'the' นำหน้าชื่อโรงแรม โรงภาพยนตร์ และพิพิธภัณฑ์ เช่น The Hilton Hotel"
    },
    {
      question: "Which article completes: 'I want to travel to ___ United States'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "the",
      explanation: "ENGLISH\nUse 'the' for country names containing 'United', 'Republic', or pluralized states.\n\nTHAI\nใช้ 'the' นำหน้าประเทศที่มีคำว่า United, Republic, Kingdom หรือเป็นพหูพจน์ เช่น The USA"
    },
    {
      question: "Which article completes: '___ Mount Everest is the highest peak'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "No article",
      explanation: "ENGLISH\nDo not use articles before names of single mountains (but use 'the' for mountain ranges).\n\nTHAI\nไม่ใช้ article นำหน้าชื่อยอดเขาเดี่ยวๆ เช่น Mount Everest แต่เทือกเขาจะใช้ the"
    },
    {
      question: "Which article completes: '___ Pacific Ocean is the largest ocean'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the' before names of oceans.\n\nTHAI\nใช้ 'the' นำหน้าชื่อมหาสมุทรเสมอ เช่น The Pacific Ocean"
    },
    {
      question: "Which article completes: 'He plays ___ piano beautifully'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "the",
      explanation: "ENGLISH\nAlways use 'the' before musical instruments when expressing ability or playing.\n\nTHAI\nใช้ 'the' นำหน้าเครื่องดนตรีในการเล่น เช่น play the piano"
    },
    {
      question: "Which article completes: 'She is ___ most intelligent student in class'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "the",
      explanation: "ENGLISH\nAlways use 'the' before superlative adjectives (most, -est).\n\nTHAI\nใช้ 'the' นำหน้าการเปรียบเทียบขั้นสูงสุด (superlative) เสมอ เช่น the most intelligent"
    },
    {
      question: "Which article completes: '___ rich should help the poor'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the' before adjectives to represent a group of people collectively.\n\nTHAI\nใช้ 'the' นำหน้าคำคุณศัพท์เพื่อแทนกลุ่มคนเป็นพหูพจน์ เช่น the rich (คนรวย), the poor (คนจน)"
    },
    {
      question: "Which article completes: 'I go to ___ bed at 10 PM'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "no article",
      explanation: "ENGLISH\nWe say 'go to bed' without articles when referring to the primary purpose (sleeping).\n\nTHAI\nวลี 'go to bed' (เข้านอน) ไม่ต้องใส่ article เพราะใช้เตียงตามวัตถุประสงค์หลัก"
    },
    {
      question: "Which article completes: '___ happiness is hard to define'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "No article",
      explanation: "ENGLISH\nDo not use articles for abstract nouns used in a general sense.\n\nTHAI\nไม่ใช้ article นำหน้าคำนามที่เป็นนามธรรม (abstract nouns) เมื่อกล่าวลอยๆ เช่น happiness, love"
    }
  ],
  hard1: [
    {
      question: "Which article completes: '___ French are known for their cuisine'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the' before national adjectives ending in -ch, -sh, -ese to represent the people.\n\nTHAI\nใช้ 'the' นำหน้าคำสัญชาติเพื่อแทนประชาชนของประเทศนั้นๆ เช่น The French (ชาวฝรั่งเศส)"
    },
    {
      question: "Which article completes: 'The criminal was sent to ___ prison for his crimes'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "no article",
      explanation: "ENGLISH\nNo article is used before prison/school/hospital when referred to for its primary function.\n\nTHAI\nไม่ใช้ article นำหน้าสถานที่อย่าง prison/school/hospital ถ้าประธานไปใช้บริการตามหน้าที่หลัก (นักโทษเข้าคุก)"
    },
    {
      question: "Which article completes: 'The tourist visited ___ prison to take photos'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "the",
      explanation: "ENGLISH\nUse 'the' before hospital/prison/school when visiting it as a building, not for its primary purpose.\n\nTHAI\nใช้ 'the' นำหน้าสถานที่อย่างคุก/โรงพยาบาล เมื่อไปในฐานะสถานที่/ตึกเฉยๆ ไม่ใช่เพื่อรักษาตัวหรือติดคุก"
    },
    {
      question: "Which article completes: 'He is ___ historical novelist'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "a",
      explanation: "ENGLISH\n'Historical' starts with a pronounced consonant sound /h/, so it takes 'a'.\n\nTHAI\n'Historical' ตัว h ออกเสียงปกติเป็นเสียงพยัญชนะ จึงใช้ 'a' ไม่ใช่ 'an'"
    },
    {
      question: "Which article completes: 'She plays ___ violin in the orchestra'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "the",
      explanation: "ENGLISH\nUse 'the' before musical instruments when playing them.\n\nTHAI\nเครื่องดนตรีในการเล่นใช้ 'the' เสมอ เช่น play the violin"
    },
    {
      question: "Which article completes: '___ life is full of surprises'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "No article",
      explanation: "ENGLISH\nAbstract uncountable nouns like 'life' take no article in general statements.\n\nTHAI\nคำว่า 'life' เมื่อพูดถึงชีวิตทั่วไป ไม่ต้องใช้ article นำหน้า"
    },
    {
      question: "Which article completes: 'I have ___ head for heights'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "a",
      explanation: "ENGLISH\n'Have a head for heights' is an idiom meaning not to be afraid of high places.\n\nTHAI\nเป็นสำนวน 'have a head for heights' แปลว่าไม่กลัวความสูง"
    },
    {
      question: "Which article completes: '___ more you study, the wiser you get'?",
      options: ["A", "An", "The", "No article"],
      correctAnswer: "The",
      explanation: "ENGLISH\nUse 'the... the...' structure for comparative correlation.\n\nTHAI\nโครงสร้าง The + ขั้นกว่า..., the + ขั้นกว่า... (ยิ่ง... ก็ยิ่ง...) เช่น The more... the wiser..."
    },
    {
      question: "Which article completes: 'He was elected ___ President of the association'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "no article",
      explanation: "ENGLISH\nDo not use an article before unique titles after verbs of appointment (elect, appoint, make).\n\nTHAI\nไม่ใส่ article หลังคำกริยาที่แต่งตั้งตำแหน่งที่มีเพียงหนึ่งเดียว เช่น elect, appoint"
    },
    {
      question: "Which article completes: 'She is ___ authority on constitutional law'?",
      options: ["a", "an", "the", "no article"],
      correctAnswer: "an",
      explanation: "ENGLISH\n'Authority' starts with a vowel sound, meaning an expert in a field.\n\nTHAI\n'Authority' ขึ้นต้นด้วยเสียงสระ หมายถึง ผู้เชี่ยวชาญ/ผู้มีอิทธิพลทางความรู้ด้านนั้นๆ จึงใช้ 'an'"
    }
  ],
  hard2: [
    {
      question: "Which article completes: '___ uniform is required, but ___ individual exceptions are allowed'?",
      options: ["A / no article", "An / no article", "The / the", "A / the"],
      correctAnswer: "A / no article",
      explanation: "ENGLISH\n'Uniform' starts with consonant /juː/ sound (a). Plural nouns used in general statements take no article.\n\nTHAI\n'Uniform' ใช้ a นำหน้า ส่วน 'individual exceptions' เป็นพหูพจน์เอ่ยทั่วไปไม่ต้องมี article"
    },
    {
      question: "Which article completes: 'They sailed across ___ Mediterranean in ___ summer'?",
      options: ["the / no article", "no article / the", "the / the", "no article / no article"],
      correctAnswer: "the / no article",
      explanation: "ENGLISH\nUse 'the' before seas (the Mediterranean). Seasons (summer) take no article in general usage.\n\nTHAI\nชื่อทะเลต้องใช้ 'the' ส่วนฤดูกาลตามปกติทั่วไปไม่ต้องใช้ article"
    },
    {
      question: "Which article completes: '___ gold is ___ precious metal'?",
      options: ["No article / a", "The / a", "No article / no article", "The / the"],
      correctAnswer: "No article / a",
      explanation: "ENGLISH\nUncountable nouns (gold) take no article when general. Singular countable descriptions take 'a'.\n\nTHAI\nแร่ธาตุ (gold) พูดลอยๆ ไม่ใช้ article ส่วนคำว่า precious metal เป็นคำนามนับได้ทั่วไปจึงใช้ 'a'"
    },
    {
      question: "Which article completes: 'In ___ search of ___ truth, he read many books'?",
      options: ["no article / no article", "the / no article", "a / the", "the / the"],
      correctAnswer: "no article / no article",
      explanation: "ENGLISH\n'In search of' is a fixed prepositional phrase taking no article. 'Truth' as abstract noun is general here.\n\nTHAI\n'In search of' เป็นวลีเฉพาะที่ไม่ต้องมี article และ 'truth' (ความจริง) เอ่ยลอยๆ ไม่ต้องใช้"
    },
    {
      question: "Which article completes: '___ Mount Everest belongs to ___ Himalayas'?",
      options: ["No article / the", "The / the", "No article / no article", "The / no article"],
      correctAnswer: "No article / the",
      explanation: "ENGLISH\nSingle mountain (Mount Everest) = no article. Mountain ranges (Himalayas) = the.\n\nTHAI\nยอดเขาเดี่ยวไม่ใช้ article แต่เทือกเขา (Himalayas) ต้องใช้ 'the'"
    },
    {
      question: "Which article completes: '___ computer has revolutionized ___ modern office'?",
      options: ["The / the", "A / no article", "No article / the", "The / no article"],
      correctAnswer: "The / the",
      explanation: "ENGLISH\n'The computer' is used generically for the invention class. 'The modern office' is specified.\n\nTHAI\nใช้ 'the' นำหน้าคอมพิวเตอร์เพื่อเป็นตัวแทนของนวัตกรรม/ประเภทเทคโนโลยี และเจาะจงสำนักงานยุคใหม่"
    },
    {
      question: "Which article completes: 'He acted as ___ go-between in ___ negotiations'?",
      options: ["a / the", "the / no article", "a / no article", "no article / the"],
      correctAnswer: "a / the",
      explanation: "ENGLISH\n'Go-between' is countable singular (a). Negotiations are specified in this context (the).\n\nTHAI\n'go-between' (คนกลาง) เป็นนามนับได้ ใช้ 'a' และการเจรจามีการเจาะจงจึงใช้ 'the'"
    },
    {
      question: "Which article completes: 'She graduated with ___ M.A. in English literature'?",
      options: ["an", "a", "the", "no article"],
      correctAnswer: "an",
      explanation: "ENGLISH\n'M.A.' starts with the vowel sound /ɛm/, so it takes 'an'.\n\nTHAI\n'M.A.' เริ่มต้นด้วยตัวอักษร M ออกเสียงเป็น เอ็ม /ɛm/ (เสียงสระ) จึงต้องใช้ 'an'"
    },
    {
      question: "Which article completes: '___ water is essential for ___ life'?",
      options: ["No article / no article", "The / the", "No article / the", "The / no article"],
      correctAnswer: "No article / no article",
      explanation: "ENGLISH\nUncountable nouns (water, life) used in a general statement take no articles.\n\nTHAI\nคำนามนับไม่ได้สองตัวที่พูดถึงหลักความจริงทั่วไป ไม่ใส่ article นำหน้า"
    },
    {
      question: "Which article completes: 'He was ___ first man to walk on ___ moon'?",
      options: ["the / the", "a / the", "the / a", "no article / the"],
      correctAnswer: "the / the",
      explanation: "ENGLISH\nUse 'the' before ordinal numbers (first) and unique objects (moon).\n\nTHAI\nใช้ 'the' นำหน้าลำดับที่ (first) และสิ่งที่มีเพียงหนึ่งเดียวอย่างดวงจันทร์ (moon)"
    }
  ]
};

// Verb to be mock database matching screenshots exactly
const verbToBeQuestions = {
  easy: [
    {
      question: "Complete: 'The coffee ___ cold.'",
      options: ["is", "are", "am", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nUncountable nouns like 'coffee' are treated as singular subjects and use 'is'.\n\nTHAI\nคำนามนับไม่ได้ เช่น coffee (กาแฟ) ถือเป็นเอกพจน์ ใช้คู่กับ 'is' คำศัพท์: coffee = กาแฟ, cold = เย็น, is/are/am/be = เป็น/อยู่/คือ"
    },
    {
      question: "Complete: 'I ___ a student at the local school.'",
      options: ["am", "is", "are", "be"],
      correctAnswer: "am",
      explanation: "ENGLISH\nUse 'am' exclusively with the pronoun 'I' in the present tense.\n\nTHAI\nใช้ 'am' คู่กับประธาน 'I' เสมอในประโยคบอกเล่าปัจจุบัน"
    },
    {
      question: "Complete: 'They ___ planning to visit their relatives.'",
      options: ["are", "is", "am", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nPlural subject 'They' takes 'are' in present continuous tense.\n\nTHAI\nประธานพหูพจน์ 'They' ใช้คู่กับ 'are' เสมอใน Present Continuous"
    },
    {
      question: "Complete: 'The weather ___ beautiful today.'",
      options: ["is", "are", "am", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\n'Weather' is an uncountable noun and requires a singular verb.\n\nTHAI\n'weather' (สภาพอากาศ) นับไม่ได้ จัดเป็นเอกพจน์ จึงใช้ 'is'"
    },
    {
      question: "Complete: 'She ___ very tired after work.'",
      options: ["is", "are", "am", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nSingular subject 'She' takes 'is' in the present tense.\n\nTHAI\nประธานเอกพจน์ 'She' ใช้กริยาเอกพจน์ 'is'"
    },
    {
      question: "Complete: 'We ___ ready to order dinner.'",
      options: ["are", "is", "am", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nPlural subject 'We' takes 'are'.\n\nTHAI\nประธานพหูพจน์ 'We' ใช้คู่กับกริยาพหูพจน์ 'are'"
    },
    {
      question: "Complete: 'It ___ a great movie.'",
      options: ["is", "are", "am", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nSingular pronoun 'It' takes 'is'.\n\nTHAI\nประธาน 'It' (มัน) ใช้กริยาเอกพจน์ 'is'"
    },
    {
      question: "Complete: 'You ___ my best friend.'",
      options: ["are", "is", "am", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\n'You' always takes plural agreement verb 'are' regardless of singular/plural sense.\n\nTHAI\nประธาน 'You' ใช้ 'are' เสมอ ไม่ว่าจะเป็นคุณคนเดียวหรือหลายคน"
    },
    {
      question: "Complete: 'The cats ___ sleeping on the rug.'",
      options: ["are", "is", "am", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nPlural noun 'cats' takes the plural verb 'are'.\n\nTHAI\nคำนามพหูพจน์ 'cats' (แมวหลายตัว) ใช้กริยาพหูพจน์ 'are'"
    },
    {
      question: "Complete: 'A dog ___ a loyal companion.'",
      options: ["is", "are", "am", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nSingular subject 'A dog' takes 'is'.\n\nTHAI\nประธาน 'A dog' (สุนัขหนึ่งตัว) เป็นเอกพจน์ใช้ 'is'"
    }
  ],
  medium1: [
    {
      question: "Complete: 'The news about the company's layoffs ___ quite shocking to everyone in the office.'",
      options: ["are", "is", "were", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nThe word 'news' is an uncountable noun and is always treated as singular, even though it ends in 's'. Therefore, it takes 'is'.\n\nTHAI\nคำว่า 'news' (ข่าว) เป็นนามนับไม่ได้และถือเป็นเอกพจน์เสมอ แม้ว่าจะลงท้ายด้วย 's' ก็ตาม ดังนั้นจึงต้องใช้ 'is'"
    },
    {
      question: "Complete: 'The team ___ working on their projects in separate rooms.'",
      options: ["are", "is", "am", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nWhen members of a collective noun ('team') act individually (separate rooms), a plural verb is used.\n\nTHAI\nเมื่อสมาชิกในกลุ่มคน (team) แยกย้ายกันทำงานคนละห้อง จะถือเป็นพหูพจน์ จึงใช้ 'are'"
    },
    {
      question: "Complete: 'Neither of my parents ___ going to the meeting tomorrow.'",
      options: ["is", "are", "am", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\n'Neither of...' grammatically refers to neither singular person, taking the singular verb 'is'.\n\nTHAI\nโครงสร้าง 'Neither of + คำนามพหูพจน์' สื่อถึงไม่มีใครคนใดคนหนึ่ง เป็นเอกพจน์ จึงใช้ 'is'"
    },
    {
      question: "Complete: 'A number of students ___ absent today due to the storm.'",
      options: ["are", "is", "was", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\n'A number of' functions as plural and takes a plural verb 'are'.\n\nTHAI\n'A number of' แปลว่า มากมาย มีความหมายเป็นพหูพจน์ ต้องใช้คู่กับ 'are'"
    },
    {
      question: "Complete: 'The number of students in the classroom ___ thirty.'",
      options: ["is", "are", "were", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\n'The number of' refers to the singular numerical count itself, taking a singular verb 'is'.\n\nTHAI\n'The number of' แปลว่า จำนวนของ... ซึ่งสื่อถึงตัวเลขจำนวนนั้นที่เป็นเอกพจน์ จึงใช้ 'is'"
    },
    {
      question: "Complete: 'Politics ___ a complicated subject for many.'",
      options: ["is", "are", "were", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nSubject names ending in -ics (politics, physics) are uncountable and singular.\n\nTHAI\nวิชาหรือสาขาความรู้ที่ลงท้ายด้วย -ics เช่น politics, physics จัดเป็นคำนามเอกพจน์ ใช้ 'is'"
    },
    {
      question: "Complete: 'Ten dollars ___ a high price for a cup of coffee.'",
      options: ["is", "are", "were", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nQuantities of money, time, or distance are treated as singular units, taking 'is'.\n\nTHAI\nจำนวนเงิน เวลา หรือระยะทาง ถือเป็นหน่วยรวมหน่วยเดียว มีค่าเป็นเอกพจน์ ใช้ 'is'"
    },
    {
      question: "Complete: 'The crowd ___ shouting enthusiastically at the concert last night.'",
      options: ["was", "were", "are", "is"],
      correctAnswer: "was",
      explanation: "ENGLISH\nCollective noun 'crowd' acting as a unified group in the past takes singular past tense 'was'.\n\nTHAI\nคำนามรวมกลุ่ม 'crowd' (ฝูงชน) ทำการกระทำร่วมกันอย่างเป็นเอกภาพในอดีต จึงใช้ 'was'"
    },
    {
      question: "Complete: 'Bread and butter ___ my favorite breakfast.'",
      options: ["is", "are", "were", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nWhen two nouns connected by 'and' represent a single compound idea, they take a singular verb.\n\nTHAI\nเมื่อคำนามสองคำเชื่อมด้วย 'and' แต่สื่อถึงอาหารจานเดียว/แนวคิดเดียว จะถือเป็นเอกพจน์ ใช้ 'is'"
    },
    {
      question: "Complete: 'Every boy and girl ___ given a book.'",
      options: ["was", "were", "are", "be"],
      correctAnswer: "was",
      explanation: "ENGLISH\nNouns preceded by 'every' or 'each' take singular verbs, in the past tense 'was'.\n\nTHAI\nคำนามที่มี 'every' หรือ 'each' นำหน้า แม้จะมีหลายคำเชื่อมด้วย and ก็ยังเป็นเอกพจน์ ใช้ 'was'"
    }
  ],
  medium2: [
    {
      question: "Complete: 'Either the supervisor or the workers ___ responsible.'",
      options: ["are", "is", "was", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nWith 'either... or', the verb agrees with the subject closest to it ('workers').\n\nTHAI\nโครงสร้าง 'either... or' คำกริยาจะสอดคล้องกับประธานตัวหลังสุดที่อยู่ใกล้กริยา (workers) จึงใช้ 'are'"
    },
    {
      question: "Complete: 'A pack of wolves ___ seen in the forest yesterday.'",
      options: ["was", "were", "are", "is"],
      correctAnswer: "was",
      explanation: "ENGLISH\n'A pack of...' is a singular collective unit and takes a singular verb (was).\n\nTHAI\n'A pack of...' (ฝูงของหมาป่า) ถือเป็นหน่วยเอกพจน์หนึ่งฝูง เหตุการณ์เกิดขึ้นในอดีตจึงใช้ 'was'"
    },
    {
      question: "Complete: 'None of the information ___ helpful.'",
      options: ["was", "were", "are", "be"],
      correctAnswer: "was",
      explanation: "ENGLISH\n'None' followed by an uncountable noun ('information') takes a singular verb (was).\n\nTHAI\n'None of' ตามด้วยคำนามนับไม่ได้ (information) กริยาจะต้องใช้เอกพจน์ ในอดีตใช้ 'was'"
    },
    {
      question: "Complete: 'Three-quarters of the city ___ destroyed.'",
      options: ["was", "were", "are", "be"],
      correctAnswer: "was",
      explanation: "ENGLISH\nFractions agree with the noun following the preposition 'of'. 'City' is singular, so it takes 'was'.\n\nTHAI\nคำเศษส่วน กริยาจะสอดคล้องกับคำนามหลัง 'of' เนื่องจาก 'city' เป็นเอกพจน์ จึงใช้ 'was'"
    },
    {
      question: "Complete: 'Most of the apples ___ rotten.'",
      options: ["were", "was", "is", "be"],
      correctAnswer: "were",
      explanation: "ENGLISH\n'Most of' followed by a plural countable noun ('apples') takes a plural verb (were).\n\nTHAI\n'Most of' ตามด้วยนามพหูพจน์ (apples) กริยาต้องใช้พหูพจน์ ในอดีตใช้ 'were'"
    },
    {
      question: "Complete: 'There ___ several issues to resolve.'",
      options: ["are", "is", "was", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nIn 'there is/are' structures, the verb agrees with the following real subject ('issues').\n\nTHAI\nประโยคขึ้นต้นด้วย 'There is/are' ตัวกริยาจะแปรผันตามคำนามข้างหลัง ซึ่ง 'issues' เป็นพหูพจน์จึงใช้ 'are'"
    },
    {
      question: "Complete: 'The jury ___ divided in their opinions.'",
      options: ["were", "was", "is", "be"],
      correctAnswer: "were",
      explanation: "ENGLISH\nCollective noun 'jury' acting as individuals with differing actions/opinions takes plural verb (were).\n\nTHAI\n'jury' (คณะลูกขุน) เมื่อทำหน้าที่แบบขัดแย้งแยกตัวกันตามความคิดตัวเอง ถือเป็นพหูพจน์ จึงใช้ 'were'"
    },
    {
      question: "Complete: 'The quality of these mangoes ___ not good.'",
      options: ["is", "are", "were", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nThe subject of the sentence is singular 'quality', not plural 'mangoes'. Therefore, it takes 'is'.\n\nTHAI\nประธานของประโยคคือ 'quality' (คุณภาพ) ซึ่งเป็นเอกพจน์ ไม่ใช่ mangoes จึงต้องใช้กริยาเอกพจน์ 'is'"
    },
    {
      question: "Complete: 'Mumps ___ a viral disease.'",
      options: ["is", "are", "were", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nNames of diseases ending in -s (mumps, measles) are singular and take 'is'.\n\nTHAI\nชื่อโรคที่ลงท้ายด้วย -s เช่น mumps (คางทูม) ถือเป็นเอกพจน์ ใช้กริยา 'is'"
    },
    {
      question: "Complete: 'Here ___ your keys.'",
      options: ["are", "is", "was", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nIn inverted structures, the verb agrees with the real subject 'keys' which is plural.\n\nTHAI\n'Here' ขึ้นต้นประโยค กริยาจะสอดคล้องกับประธานหลักคือ 'keys' (กุญแจหลายดอก) จึงต้องใช้ 'are'"
    }
  ],
  hard1: [
    {
      question: "Complete: 'If he ___ a bit wiser, he wouldn't make such mistakes.'",
      options: ["were", "was", "is", "be"],
      correctAnswer: "were",
      explanation: "ENGLISH\nUse 'were' for all subjects in unreal hypothetical conditional clauses (second conditional).\n\nTHAI\nใช้ 'were' กับประธานทุกพจน์ในโครงสร้างเงื่อนไขสมมติที่ไม่เป็นจริงในปัจจุบัน (If Clause type 2)"
    },
    {
      question: "Complete: 'I demand that she ___ present at the hearing.'",
      options: ["be", "is", "was", "are"],
      correctAnswer: "be",
      explanation: "ENGLISH\nVerbs of demand, request, or suggestion require subjunctive bare form 'be'.\n\nTHAI\nหลังคำกริยาที่แสดงคำสั่ง/ข้อร้องเรียน (demand) โครงสร้าง Subjunctive จะบังคับใช้กริยาฐานรูปปกติ นั่นคือ 'be' เสมอ"
    },
    {
      question: "Complete: 'It is vital that he ___ informed immediately.'",
      options: ["be", "is", "was", "were"],
      correctAnswer: "be",
      explanation: "ENGLISH\nAdjectives of necessity ('vital', 'essential') trigger subjunctive mood bare verb 'be'.\n\nTHAI\nเมื่อใช้คำคุณศัพท์แสดงความจำเป็นอย่างยิ่ง (vital, essential) ต้องใช้โครงสร้าง Subjunctive ใช้กริยา 'be'"
    },
    {
      question: "Complete: 'He talks as if he ___ the boss here, but he is only a trainee.'",
      options: ["were", "was", "is", "be"],
      correctAnswer: "were",
      explanation: "ENGLISH\n'As if' / 'as though' expressions expressing hypothetical unreality require past subjunctive 'were'.\n\nTHAI\nหลังวลี 'as if' (ราวกับว่า) เพื่อบอกเรื่องที่ไม่จริงหรือจินตนาการ ใช้ Subjunctive 'were' เสมอ"
    },
    {
      question: "Complete: 'No sooner had they arrived than they ___ told to leave.'",
      options: ["were", "was", "are", "be"],
      correctAnswer: "were",
      explanation: "ENGLISH\nIn past passive narrative structure, plural subject 'they' takes 'were'.\n\nTHAI\nในโครงสร้างประโยคเล่าเรื่องในอดีต (narrative past passive) ประธาน 'they' ใช้คู่กับ 'were'"
    },
    {
      question: "Complete: 'Many a student ___ failed the test because of carelessness.'",
      options: ["has", "have", "having", "had"],
      correctAnswer: "has",
      explanation: "ENGLISH\n'Many a + singular noun' grammatically functions as singular and takes the singular verb 'has'.\n\nTHAI\nสำนวน 'Many a + คำนามเอกพจน์' ทำหน้าที่เป็นประธานเอกพจน์เสมอ จึงต้องใช้กริยาเอกพจน์ 'has'"
    },
    {
      question: "Complete: 'Not only the teacher but also the students ___ attending the seminar.'",
      options: ["are", "is", "was", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nIn 'not only... but also' structures, the verb agrees with the closer subject 'students' (plural).\n\nTHAI\nโครงสร้าง 'not only... but also' คำกริยาจะคล้อยตามประธานตัวหลังที่อยู่ชิดกริยามากที่สุด (students) จึงใช้ 'are'"
    },
    {
      question: "Complete: 'The CEO, along with his assistants, ___ attending the meeting.'",
      options: ["is", "are", "were", "be"],
      correctAnswer: "is",
      explanation: "ENGLISH\nParenthetical additions (along with, as well as) do not change the number of the singular main subject (CEO).\n\nTHAI\nวลีขยายเช่น 'along with' (พร้อมด้วย) ไม่นำมารวมเป็นประธานพหูพจน์ ประธานหลักยังคงคือ CEO เอกพจน์ จึงใช้ 'is'"
    },
    {
      question: "Complete: 'The staff ___ requested to wear their badges.'",
      options: ["are", "is", "was", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nCollective noun 'staff' referring to members collectively doing plural individual actions takes 'are'.\n\nTHAI\n'staff' (บุคลากร) สื่อถึงกลุ่มคนที่ต่างคนต่างต้องพกพาตราสัญลักษณ์ของตนเอง ถือเป็นพหูพจน์ใช้ 'are'"
    },
    {
      question: "Complete: 'What ___ the primary reasons for this project's collapse?'",
      options: ["were", "was", "is", "be"],
      correctAnswer: "were",
      explanation: "ENGLISH\nThe interrogative subject agrees with the plural predicate 'reasons' in the past (were).\n\nTHAI\nกริยาในประโยคคำถามจะคล้อยตามประธานหลักคือนามพหูพจน์ 'reasons' จึงใช้ 'were' ในกรณีเล่าเรื่องอดีต"
    }
  ],
  hard2: [
    {
      question: "Complete: 'So intense ___ the debate that the meeting was extended.'",
      options: ["was", "were", "are", "be"],
      correctAnswer: "was",
      explanation: "ENGLISH\nIn inverted sentences starting with 'So + adjective', the verb agrees with the following subject 'the debate' (singular).\n\nTHAI\nในโครงสร้างประโยคกลับหัว (Inversion) ขึ้นด้วย 'So + Adj' กริยา 'was' สอดคล้องตามประธานหลักด้านหลังคือ 'the debate'"
    },
    {
      question: "Complete: 'Hardly ___ there any doubt left after the final presentation.'",
      options: ["was", "were", "is", "be"],
      correctAnswer: "was",
      explanation: "ENGLISH\nNegative inversions with 'hardly' agree with the singular noun 'doubt' in the past (was).\n\nTHAI\nประโยคกลับหัวเชิงปฏิเสธ (Inversion) กริยา 'was' สอดคล้องกับประธานเอกพจน์ 'doubt' (ความสงสัย)"
    },
    {
      question: "Complete: 'The class ___ unable to agree on the dates for the exam.'",
      options: ["were", "was", "is", "be"],
      correctAnswer: "were",
      explanation: "ENGLISH\nWhen members of a collective unit ('class') act in conflict or disagreement, plural verb is used.\n\nTHAI\nเมื่อสมาชิกในกลุ่มคำนามรวมกลุ่ม (class) มีความคิดขัดแย้งกันและไม่อาจตกลงร่วมกันได้ ถือเป็นพหูพจน์ ใช้ 'were'"
    },
    {
      question: "Complete: 'Every file and folder ___ examined before the system audit.'",
      options: ["was", "were", "are", "be"],
      correctAnswer: "was",
      explanation: "ENGLISH\nWhen singular subjects connected by 'and' are preceded by 'every', they take a singular verb.\n\nTHAI\nประธานที่เชื่อมด้วย 'and' แต่มีคำว่า 'every' นำหน้าประโยค จะถือเป็นเอกพจน์เสมอ ในอดีตใช้ 'was'"
    },
    {
      question: "Complete: 'The majority of the research ___ invalid.'",
      options: ["was", "were", "are", "be"],
      correctAnswer: "was",
      explanation: "ENGLISH\n'The majority of' agrees with the uncountable noun 'research' (singular, was).\n\nTHAI\n'The majority of' ตามด้วยคำนามนับไม่ได้ (research) ต้องใช้กริยาเอกพจน์ ในอดีตใช้ 'was'"
    },
    {
      question: "Complete: 'A variety of options ___ presented to the board.'",
      options: ["were", "was", "is", "be"],
      correctAnswer: "were",
      explanation: "ENGLISH\n'A variety of' functions as a plural determiner, thus taking a plural verb.\n\nTHAI\n'A variety of' (ตัวเลือกที่หลากหลาย) ทำหน้าที่เสมือนตัวระบุพหูพจน์ กริยาในอดีตจึงใช้ 'were'"
    },
    {
      question: "Complete: 'To read widely and to write eloquently ___ essential skills.'",
      options: ["are", "is", "was", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nTwo separate infinitive phrases ('to read', 'to write') joined by 'and' require a plural verb 'are'.\n\nTHAI\nประธานที่เป็นวลี Infinitive สองวลีที่เชื่อมด้วย 'and' ถือเป็นประธานสองสิ่งแยกกัน กริยาจึงใช้พหูพจน์ 'are'"
    },
    {
      question: "Complete: 'Where ___ the scissors I lent you yesterday?'",
      options: ["are", "is", "was", "be"],
      correctAnswer: "are",
      explanation: "ENGLISH\nNouns that consist of two parts (scissors, trousers) are grammatically plural and take 'are'.\n\nTHAI\nคำนามที่เป็นสิ่งของที่มีสองส่วนประกบกัน เช่น scissors (กรรไกร) ถือเป็นพหูพจน์เสมอ กริยาจึงต้องใช้ 'are'"
    },
    {
      question: "Complete: 'The coordinates of the target ___ transmitted via satellite.'",
      options: ["were", "was", "is", "be"],
      correctAnswer: "were",
      explanation: "ENGLISH\nThe plural subject 'coordinates' takes the plural verb 'were'.\n\nTHAI\nประธานหลักของประโยคคือคำนามพหูพจน์ 'coordinates' (พิกัด) กริยาในอดีตจึงใช้ 'were'"
    },
    {
      question: "Complete: '___ there any clean towels in the cabinet?'",
      options: ["Are", "Is", "Was", "Be"],
      correctAnswer: "Are",
      explanation: "ENGLISH\nThe interrogative structures with 'there' agree with the plural noun 'towels'.\n\nTHAI\nประโยคคำถามขี้นต้นด้วย There กริยาเปลี่ยนตามนามด้านหลัง ซึ่ง 'towels' เป็นพหูพจน์จึงใช้ 'Are'"
    }
  ]
};

// Default generic generator for fallback categories/topics
function getDynamicMockQuestions(categoryId, topicTitle, levelId, count = 10) {
  const levelDetails = {
    easy: { label: 'Easy', target: 'O-NET M.3', style: 'basic grammar rules' },
    medium1: { label: 'Medium 1', target: 'O-NET M.6', style: 'common grammatical structures and exceptions' },
    medium2: { label: 'Medium 2', target: 'O-NET M.6 / PAT', style: 'contextual structures' },
    hard1: { label: 'Hard 1', target: 'PAT 1/2, A-Level', style: 'tricky syntax rules and edge cases' },
    hard2: { label: 'Hard 2', target: 'IELTS/TOEFL', style: 'nuanced distractor choices and academic registers' }
  };

  const details = levelDetails[levelId] || { label: levelId, target: 'General', style: 'grammar usage' };

  return Array.from({ length: count }).map((_, i) => {
    const qIndex = i + 1;
    // Generate some realistic topics
    const optionsPools = [
      ["which", "who", "whom", "whose"],
      ["although", "despite", "however", "nevertheless"],
      ["since", "for", "during", "while"],
      ["affect", "effect", "affected", "effected"],
      ["lay", "lie", "laid", "lain"],
      ["its", "it's", "their", "there"],
      ["loose", "lose", "lost", "losing"],
      ["between", "among", "through", "beside"],
      ["unless", "if", "provided", "lest"],
      ["so that", "in order to", "because of", "due to"]
    ];

    const pool = optionsPools[i % optionsPools.length];
    const correct = pool[0];
    // Shuffle options to keep it interesting
    const options = [...pool].sort(() => Math.random() - 0.5);

    const questionText = `Choose the correct option to complete the statement about "${topicTitle}": 'He completed the task ___ the difficulties.'`;
    
    return {
      id: `q-mock-${Date.now()}-${categoryId}-${levelId}-${i}`,
      question: `[AI Mock] Question #${qIndex} on "${topicTitle}" (${details.label} Level)`,
      options: ["despite", "although", "however", "though"],
      correctAnswer: "despite",
      explanation: `ENGLISH\nUse 'despite' before noun phrases to show contrast. 'Although' requires a full clause.\n\nTHAI\nใช้ 'despite' (ทั้งๆ ที่) นำหน้าวลีคำนามเพื่อแสดงความขัดแย้ง ส่วน 'although' ต้องตามด้วยอนุประโยค (ประธาน+กริยา) คำศัพท์: despite = ทั้งๆ ที่, difficulties = อุปสรรค`
    };
  });
}

// Main helper export
export function getMockQuestions(categoryId, topicId, levelId, topicTitle) {
  // 1. Check specific static mappings
  // Articles Topic
  if (topicId === 1 || topicTitle.toLowerCase().includes('article')) {
    return articlesQuestions[levelId] || getDynamicMockQuestions(categoryId, topicTitle, levelId);
  }
  // Verb to be Topic
  if (topicId === 2 || topicTitle.toLowerCase().includes('verb "être"') || topicTitle.toLowerCase().includes('to be') || topicTitle.toLowerCase().includes('être')) {
    return verbToBeQuestions[levelId] || getDynamicMockQuestions(categoryId, topicTitle, levelId);
  }

  // 2. Generic static questions mapped by levels to keep them highly realistic
  const staticGeneralQuestions = {
    easy: [
      {
        question: "Complete: 'She ___ to the market yesterday.'",
        options: ["went", "go", "goes", "going"],
        correctAnswer: "went",
        explanation: "ENGLISH\nUse past simple tense 'went' for completed actions in the past (yesterday).\n\nTHAI\nใช้ Past Simple Tense กริยาช่อง 2 'went' เนื่องจากมีคำบอกเวลาอดีตคือ 'yesterday' (เมื่อวาน)"
      },
      {
        question: "Complete: 'My father doesn't ___ coffee.'",
        options: ["drink", "drinks", "drinking", "drank"],
        correctAnswer: "drink",
        explanation: "ENGLISH\nAfter auxiliary verb 'does not', use the base form of the verb (drink).\n\nTHAI\nหลังกริยาช่วย 'does not' ต้องใช้กริยาฐานรูปเดิม (drink) เสมอ ไม่เติม s"
      },
      {
        question: "Complete: 'We have been studying English ___ three years.'",
        options: ["for", "since", "during", "in"],
        correctAnswer: "for",
        explanation: "ENGLISH\nUse 'for' to express the duration of time (three years).\n\nTHAI\nใช้ 'for' นำหน้าระยะเวลา (สามปี) ส่วน 'since' ใช้กับจุดเริ่มต้นของเวลา"
      },
      {
        question: "Complete: 'I am not interested ___ playing games.'",
        options: ["in", "at", "on", "with"],
        correctAnswer: "in",
        explanation: "ENGLISH\nAdjective 'interested' is always paired with preposition 'in'.\n\nTHAI\nคำคุณศัพท์ 'interested' (สนใจ) ต้องใช้คู่กับบุพบท 'in' เสมอ"
      },
      {
        question: "Complete: '___ you see him last week?'",
        options: ["Did", "Do", "Does", "Have"],
        correctAnswer: "Did",
        explanation: "ENGLISH\nUse 'Did' to form past simple questions.\n\nTHAI\nใช้กริยาช่วย 'Did' ขึ้นต้นประโยคคำถามที่เป็นรูปอดีต (last week)"
      },
      {
        question: "Complete: 'There ___ a lot of water in the bottle.'",
        options: ["is", "are", "am", "be"],
        correctAnswer: "is",
        explanation: "ENGLISH\n'Water' is uncountable and takes singular verb 'is'.\n\nTHAI\nน้ำ 'water' นับไม่ได้ จัดเป็นเอกพจน์ จึงใช้ 'is'"
      },
      {
        question: "Complete: 'This is the ___ book I have ever read.'",
        options: ["best", "good", "better", "well"],
        correctAnswer: "best",
        explanation: "ENGLISH\nUse superlative 'best' in front of nouns to indicate highest degree.\n\nTHAI\nใช้คำเปรียบเทียบขั้นสูงสุด 'best' (ดีที่สุด) เพื่อสื่อถึงหนังสือที่เคยอ่านมาทั้งหมด"
      },
      {
        question: "Complete: 'She speaks English ___.'",
        options: ["fluently", "fluent", "more fluent", "fluency"],
        correctAnswer: "fluently",
        explanation: "ENGLISH\nUse adverb 'fluently' to modify the verb 'speaks'.\n\nTHAI\nใช้คำวิเศษณ์ 'fluently' (อย่างคล่องแคล่ว) เพื่อขยายกริยา speaks (พูด)"
      },
      {
        question: "Complete: 'Please don't make so much noise. I ___ trying to study.'",
        options: ["am", "is", "are", "be"],
        correctAnswer: "am",
        explanation: "ENGLISH\nPresent continuous tense for temporary current actions takes 'am' with 'I'.\n\nTHAI\nใช้ 'am' คู่กับประธาน 'I' ในโครงสร้าง Present Continuous เพื่อบอกว่ากำลังเรียนอยู่"
      },
      {
        question: "Complete: 'How ___ money do you need?'",
        options: ["much", "many", "few", "some"],
        correctAnswer: "much",
        explanation: "ENGLISH\n'Money' is an uncountable noun, so we use 'how much'.\n\nTHAI\nเงิน 'money' เป็นคำนามนับไม่ได้ จึงต้องใช้ถามปริมาณด้วย 'how much'"
      }
    ],
    medium1: [
      {
        question: "Complete: 'If I ___ you, I would take that job offer.'",
        options: ["were", "was", "am", "be"],
        correctAnswer: "were",
        explanation: "ENGLISH\nUse past subjunctive 'were' for hypothetical advice clauses.\n\nTHAI\nใช้ 'were' ในเงื่อนไขสมมติที่ไม่เป็นจริงในปัจจุบัน (If Clause Type 2) เมื่อสมมติว่าถ้าเป็นคนอื่น"
      },
      {
        question: "Complete: 'He completed the course ___ the difficulties.'",
        options: ["despite", "although", "even though", "but"],
        correctAnswer: "despite",
        explanation: "ENGLISH\n'Despite' is a preposition and is followed by a noun phrase.\n\nTHAI\nใช้ 'despite' (ทั้งๆ ที่) นำหน้าคำนาม/วลีนาม ส่วน 'although' ต้องตามด้วยอนุประโยค"
      },
      {
        question: "Complete: 'I look forward to ___ from you soon.'",
        options: ["hearing", "hear", "heard", "to hear"],
        correctAnswer: "hearing",
        explanation: "ENGLISH\nPhrasal verb 'look forward to' is followed by a gerund (-ing form).\n\nTHAI\nสำนวน 'look forward to' (ตั้งหน้าตั้งตารอคอย) ต้องตามด้วยกริยาเติม ing (gerund) เสมอ"
      },
      {
        question: "Complete: 'The teacher made us ___ the entire essay.'",
        options: ["rewrite", "rewriting", "to rewrite", "rewrote"],
        correctAnswer: "rewrite",
        explanation: "ENGLISH\nCausative verb 'make' is followed by a bare infinitive (rewrite).\n\nTHAI\nคำกริยาแสดงการสั่งหรือบังคับ 'make + คน' ต้องตามด้วยกริยาฐานรูปปกติไม่มี to (rewrite)"
      },
      {
        question: "Complete: 'By this time next year, she ___ her degree.'",
        options: ["will have completed", "completes", "will complete", "is completing"],
        correctAnswer: "will have completed",
        explanation: "ENGLISH\nFuture perfect tense indicates an action completed before a certain point in future.\n\nTHAI\nใช้ Future Perfect Tense (will have + V.3) เพื่อบอกเหตุการณ์ที่จะเสร็จสมบูรณ์ภายในช่วงเวลาหนึ่งในอนาคต"
      },
      {
        question: "Complete: 'I wish I ___ more time to study last week.'",
        options: ["had had", "had", "have", "would have"],
        correctAnswer: "had had",
        explanation: "ENGLISH\nWish about a past regret requires past perfect tense (had had).\n\nTHAI\nการแสดงความปรารถนาเสียใจเรื่องในอดีต (wish + past perfect) ต้องใช้โครงสร้าง 'had had'"
      },
      {
        question: "Complete: 'She suggested ___ a movie instead of going out.'",
        options: ["watching", "to watch", "watch", "watched"],
        correctAnswer: "watching",
        explanation: "ENGLISH\nVerb 'suggest' takes a gerund (-ing) as its direct object.\n\nTHAI\nกริยา 'suggest' (แนะนำ) ตามด้วยคำนามหรือกริยาเติม ing เสมอ"
      },
      {
        question: "Complete: 'The report was ___ written by the manager.'",
        options: ["already", "yet", "still", "ever"],
        correctAnswer: "already",
        explanation: "ENGLISH\nUse 'already' in positive passive sentences to denote completion.\n\nTHAI\nใช้ 'already' (เรียบร้อยแล้ว) วางหน้ารูปกริยาช่อง 3 เพื่อเน้นว่ารายงานถูกเขียนเสร็จแล้ว"
      },
      {
        question: "Complete: 'This is the restaurant ___ we had our first date.'",
        options: ["where", "which", "that", "when"],
        correctAnswer: "where",
        explanation: "ENGLISH\nUse relative adverb 'where' to refer to a place (restaurant).\n\nTHAI\nใช้ relative adverb 'where' นำหน้านามสถานที่เพื่อบอกตำแหน่งเหตุการณ์"
      },
      {
        question: "Complete: 'The box was ___ heavy that I couldn't lift it.'",
        options: ["so", "such", "very", "too"],
        correctAnswer: "so",
        explanation: "ENGLISH\nUse 'so + adjective + that' structure to show cause and effect.\n\nTHAI\nใช้โครงสร้าง 'so + adj + that' เพื่อบอกเหตุและผล (กล่องหนักมากจนยกไม่ไหว)"
      }
    ],
    medium2: [
      {
        question: "Complete: 'The data ___ still being analyzed by the experts.'",
        options: ["are", "is", "was", "be"],
        correctAnswer: "are",
        explanation: "ENGLISH\n'Data' is technically a plural noun (singular: datum) and takes 'are' in formal usage.\n\nTHAI\nคำว่า 'data' ในทางวิชาการจัดเป็นนามพหูพจน์ (เอกพจน์คือ datum) จึงใช้กริยาพหูพจน์ 'are' ในทางการศึกษา"
      },
      {
        question: "Complete: 'Hardly had he left the house ___ it started pouring.'",
        options: ["when", "than", "then", "so"],
        correctAnswer: "when",
        explanation: "ENGLISH\nStructure 'Hardly... when' expresses two past actions occurring in rapid succession.\n\nTHAI\nโครงสร้าง 'Hardly/Scarcely + had + S + V.3 + when' แปลว่า ทันทีที่... ก็... ใช้คู่กับ 'when' เสมอ"
      },
      {
        question: "Complete: 'She succeeded in passing the exam ___ studying very little.'",
        options: ["despite", "although", "but", "in spite"],
        correctAnswer: "despite",
        explanation: "ENGLISH\n'Despite' functions as a preposition followed by a gerund phrase ('studying...').\n\nTHAI\nใช้ 'despite' นำหน้าคำกริยาเติม ing (gerund) เพื่อแสดงความขัดแย้ง"
      },
      {
        question: "Complete: 'The results of the audit ___ not yet been released.'",
        options: ["have", "has", "are", "were"],
        correctAnswer: "have",
        explanation: "ENGLISH\nSubject is plural 'results', so it takes plural auxiliary 'have'.\n\nTHAI\nประธานหลักของประโยคคือคำนามพหูพจน์ 'results' (ผลลัพธ์) กริยาช่วยจึงต้องใช้พหูพจน์ 'have'"
      },
      {
        question: "Complete: 'I would rather you ___ tell anyone about this.'",
        options: ["didn't", "don't", "wouldn't", "not"],
        correctAnswer: "didn't",
        explanation: "ENGLISH\n'Would rather' followed by a subject pronoun requires a past subjunctive verb (didn't) for present preference.\n\nTHAI\nโครงสร้าง 'would rather + ประธาน' เพื่อบอกความต้องการในปัจจุบัน บังคับใช้กริยารูปอดีต (didn't)"
      },
      {
        question: "Complete: 'None of the money ___ spent on marketing.'",
        options: ["was", "were", "are", "be"],
        correctAnswer: "was",
        explanation: "ENGLISH\n'None of' followed by an uncountable noun ('money') takes singular verb 'was'.\n\nTHAI\n'None of' ตามด้วยคำนามนับไม่ได้ (money) กริยาต้องใช้รูปเอกพจน์ ในอดีตใช้ 'was'"
      },
      {
        question: "Complete: 'He is used to ___ in a noisy environment.'",
        options: ["working", "work", "worked", "to work"],
        correctAnswer: "working",
        explanation: "ENGLISH\n'Be/get used to' means accustomed to, and takes a gerund (-ing) suffix.\n\nTHAI\nวลี 'be used to' แปลว่า คุ้นเคยกับ... ต้องตามด้วยคำนามหรือกริยาเติม ing (working) เสมอ"
      },
      {
        question: "Complete: 'She was one of the few who ___ selected for the scholarship.'",
        options: ["were", "was", "is", "be"],
        correctAnswer: "were",
        explanation: "ENGLISH\nThe relative pronoun 'who' refers to the plural antecedent 'few', taking plural verb 'were'.\n\nTHAI\nสรรพนาม 'who' อ้างถึงคำคุณศัพท์พหูพจน์ด้านหน้าคือ 'few' (คนส่วนน้อย) จึงใช้คู่กับ 'were'"
      },
      {
        question: "Complete: 'If it ___ for your help, we wouldn't have succeeded.'",
        options: ["hadn't been", "wasn't", "weren't", "isn't"],
        correctAnswer: "hadn't been",
        explanation: "ENGLISH\nHypothetical past condition (third conditional) takes past perfect subjunctive 'hadn't been'.\n\nTHAI\nเงื่อนไขสมมติอดีตที่ไม่เกิดขึ้นจริง (If Clause Type 3) ใช้กริยาในรูปสมบูรณ์อดีตคือ 'hadn't been'"
      },
      {
        question: "Complete: '___ you need any assistance, please dial zero.'",
        options: ["Should", "If", "Were", "Had"],
        correctAnswer: "Should",
        explanation: "ENGLISH\nInverted first conditional clauses replace 'if' with auxiliary verb 'Should'.\n\nTHAI\nการละโครงสร้าง If ในเงื่อนไขสมมติแบบแรก (Inversion Type 1) จะใช้กริยาช่วย 'Should' ขึ้นต้นแทน"
      }
    ],
    hard1: [
      {
        question: "Complete: 'Were I ___ the truth, I would have told you.'",
        options: ["to have known", "to know", "known", "knowing"],
        correctAnswer: "to know",
        explanation: "ENGLISH\nInverted second conditional uses 'Were + subject + to + verb'.\n\nTHAI\nประโยคกลับหัวสมมติขั้นที่สอง (Inversion Type 2) ใช้โครงสร้าง 'Were + ประธาน + to + กริยาอินฟินิทิฟ'"
      },
      {
        question: "Complete: 'It is high time we ___ a decision.'",
        options: ["made", "make", "to make", "should make"],
        correctAnswer: "made",
        explanation: "ENGLISH\nPhrases like 'It is high time' require a past subjunctive verb (made) to express urgency for present action.\n\nTHAI\nสำนวน 'It is high time + ประธาน' บังคับใช้กริยาช่อง 2 (made) เพื่อสื่อความจำใจหรือตักเตือนให้รีบทำ"
      },
      {
        question: "Complete: 'The government recommended that the tax rates ___ reduced.'",
        options: ["be", "are", "were", "is"],
        correctAnswer: "be",
        explanation: "ENGLISH\nVerbs of recommendation require subjunctive clauses with the bare base verb 'be'.\n\nTHAI\nกริยาแสดงการแนะนำหรือสั่งการ (recommend) บังคับใช้รูป Subjunctive ใช้กริยาฐานไร้รูปเติมแต่ง 'be'"
      },
      {
        question: "Complete: 'No sooner had she entered the room ___ she noticed the leak.'",
        options: ["than", "when", "then", "so"],
        correctAnswer: "than",
        explanation: "ENGLISH\nCorrelative conjunction 'No sooner' is always paired with comparison 'than'.\n\nTHAI\nโครงสร้าง 'No sooner... than' แปลว่า ทันทีที่... ก็... ต้องใช้คู่กับ 'than' เสมอ"
      },
      {
        question: "Complete: 'He is the candidate ___ we believe will win the election.'",
        options: ["who", "whom", "whose", "which"],
        correctAnswer: "who",
        explanation: "ENGLISH\nUse 'who' as it acts as the subject of the verb 'will win'. 'we believe' is parenthetical.\n\nTHAI\n'who' ทำหน้าที่เป็นประธานของคำกริยา 'will win' (คำว่า we believe เป็นเพียงวลีแทรก)"
      },
      {
        question: "Complete: 'They had ___ completed the work when the electricity cut out.'",
        options: ["scarcely", "no sooner", "almost", "hardly"],
        correctAnswer: "scarcely",
        explanation: "ENGLISH\n'Scarcely' pairs with 'when' to express past sequential events.\n\nTHAI\n'Scarcely... when' สื่อว่า งานเกือบไม่ทันเสร็จดี (เพิ่งทำเสร็จหมาดๆ) ไฟก็ดับลง"
      },
      {
        question: "Complete: 'Not only ___ the game, but they also set a record.'",
        options: ["did they win", "they won", "won they", "had they won"],
        correctAnswer: "did they win",
        explanation: "ENGLISH\nStarting a sentence with negative adverb 'Not only' triggers subject-auxiliary inversion.\n\nTHAI\nเมื่อเปิดประโยคด้วยปฏิเสธนำสายตาอย่าง 'Not only' จะเกิดการกลับประโยค (Inversion) เป็นรูปคำถาม"
      },
      {
        question: "Complete: 'She was determined, ___ the opposition of her family.'",
        options: ["notwithstanding", "nevertheless", "whereas", "although"],
        correctAnswer: "notwithstanding",
        explanation: "ENGLISH\n'Notwithstanding' is a formal preposition meaning in spite of / despite.\n\nTHAI\n'Notwithstanding' เป็นคำบุพบททางการ แปลว่า 'แม้ว่าจะมี...' หรือ 'ทั้งๆ ที่มี...' ทำหน้าที่เหมือน despite"
      },
      {
        question: "Complete: 'The criteria for evaluation ___ extremely strict.'",
        options: ["were", "was", "is", "be"],
        correctAnswer: "were",
        explanation: "ENGLISH\n'Criteria' is the plural form of 'criterion', therefore taking plural past verb 'were'.\n\nTHAI\n'Criteria' เป็นรูปพหูพจน์ของ 'criterion' (เกณฑ์การตัดสิน) กริยาช่องอดีตจึงใช้ 'were'"
      },
      {
        question: "Complete: '___ he to fail the test, he would have to repeat the grade.'",
        options: ["Were", "Should", "If", "Had"],
        correctAnswer: "Were",
        explanation: "ENGLISH\nInverted unreal condition using 'Were + subject + to + verb' (were he to fail).\n\nTHAI\nการละประโยคสมมติแบบกลับคำกริยา (Inversion Type 2) ใช้รูป 'Were + ประธาน + to + V.inf'"
      }
    ],
    hard2: [
      {
        question: "Complete: 'Lest they ___ detected, they moved in complete silence.'",
        options: ["should be", "would be", "will be", "were"],
        correctAnswer: "should be",
        explanation: "ENGLISH\nConjunction 'lest' meaning 'for fear that' triggers subjunctive structures with 'should'.\n\nTHAI\nคำเชื่อม 'lest' แปลว่า 'เกรงว่า / เพื่อป้องกันไม่ให้...' บังคับโครงสร้าง Subjunctive มักใช้คู่กับกริยาช่วย 'should'"
      },
      {
        question: "Complete: 'Only after he had finished the letter ___ he realize his mistake.'",
        options: ["did", "had", "would", "was"],
        correctAnswer: "did",
        explanation: "ENGLISH\nSentences starting with 'Only after...' require subject-auxiliary inversion in the main clause (did he realize).\n\nTHAI\nประโยคขึ้นต้นด้วยข้อกำหนดเงื่อนไข 'Only after...' จะต้องสลับตำแหน่งกริยาช่วยมาหน้าประธานในประโยคหลัก"
      },
      {
        question: "Complete: 'Under no circumstances ___ the door be opened.'",
        options: ["should", "would", "must not", "will"],
        correctAnswer: "should",
        explanation: "ENGLISH\nNegative adverbial phrases at the beginning of sentences prompt subject-auxiliary inversion.\n\nTHAI\nวลีปฏิเสธนำหน้าประโยค 'Under no circumstances' (ไม่ว่ากรณีใดๆ) บังคับสลับกริยาช่วยมาหน้านามประธาน"
      },
      {
        question: "Complete: 'Had we known the severity of the situation, we ___ differently.'",
        options: ["would have acted", "acted", "would act", "had acted"],
        correctAnswer: "would have acted",
        explanation: "ENGLISH\nInverted third conditional ('Had we known') pairs with 'would have + past participle'.\n\nTHAI\nโครงสร้างกลับประโยคเงื่อนไขขั้นที่ 3 (Had + V.3) ประโยคด้านหลังจะใช้กริยา 'would have + V.3'"
      },
      {
        question: "Complete: 'She was highly praised, ___ so because of her dedication.'",
        options: ["deservedly", "deserving", "deserved", "deserve"],
        correctAnswer: "deservedly",
        explanation: "ENGLISH\n'Deservedly so' is a set adverbial phrase indicating that the praise was fully earned.\n\nTHAI\nวลีเฉพาะ 'deservedly so' แปลว่า 'อย่างสมควรแล้ว / สมเกียรติที่เป็นเช่นนั้น'"
      },
      {
        question: "Complete: 'Such ___ the beauty of the island that we decided to stay.'",
        options: ["was", "were", "is", "be"],
        correctAnswer: "was",
        explanation: "ENGLISH\nInversion starting with 'Such + verb' agrees with singular noun phrase 'the beauty of the island'.\n\nTHAI\nประโยคกลับหัวขึ้นด้วย 'Such' ตามด้วยกริยา 'was' สอดคล้องกับประธานเอกพจน์ 'the beauty'"
      },
      {
        question: "Complete: 'None of the evidence ___ presented in court.'",
        options: ["was", "were", "are", "be"],
        correctAnswer: "was",
        explanation: "ENGLISH\nUncountable noun 'evidence' requires a singular verb structure ('was').\n\nTHAI\nคำว่า 'evidence' (หลักฐาน) เป็นนามนับไม่ได้ จึงต้องใช้กริยาเอกพจน์ 'was'"
      },
      {
        question: "Complete: 'The alumni ___ gathered for the reunion dinner.'",
        options: ["were", "was", "is", "be"],
        correctAnswer: "were",
        explanation: "ENGLISH\n'Alumni' is the plural form of 'alumnus', thus taking a plural verb 'were'.\n\nTHAI\n'Alumni' (ศิษย์เก่าหลายคน) เป็นคำนามรูปพหูพจน์ของ alumnus จึงต้องใช้กริยาพหูพจน์ 'were'"
      },
      {
        question: "Complete: 'So quickly ___ the years pass that we forget our childhood.'",
        options: ["do", "did", "are", "have"],
        correctAnswer: "do",
        explanation: "ENGLISH\nStarting with 'So + adverb' prompts inversion, present plural tense takes 'do' matching 'years'.\n\nTHAI\n'So + Adverb' นำประโยคตามมาด้วยการกลับประโยค กริยาช่วย 'do' สอดคล้องกับประธานพหูพจน์ 'years'"
      },
      {
        question: "Complete: 'The phenomena observed during the eclipse ___ unexplained.'",
        options: ["remain", "remains", "remaining", "remained"],
        correctAnswer: "remain",
        explanation: "ENGLISH\n'Phenomena' is the plural form of 'phenomenon', taking plural present verb 'remain'.\n\nTHAI\n'Phenomena' (ปรากฏการณ์หลายอย่าง) เป็นรูปพหูพจน์ของ phenomenon จึงต้องการกริยาพหูพจน์ 'remain'"
      }
    ]
  };

  return staticGeneralQuestions[levelId] || getDynamicMockQuestions(categoryId, topicTitle, levelId);
}
