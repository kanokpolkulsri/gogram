/**
 * 31-Day A-Level & TGAT Vocabulary Standard (155 High-Yield Words).
 * Exactly 31 days × 5 words per day = 155 words total.
 * Day 1 (1st of month) -> Words 1-5
 * Day 14 (14th of month) -> Words 66-70
 * Day 31 (31st of month) -> Words 151-155
 */

export const dailyVocabPool = [
  // DAY 1 (Words 1 - 5): Character & Drive
  { id: 1, word: 'Ambitious', type: 'adj.', thai: 'ทะเยอทะยาน / มีความมุ่งมั่นสูง', example: 'She has ambitious plans for her business expansion.' },
  { id: 2, word: 'Resilient', type: 'adj.', thai: 'ยืดหยุ่น / ฟื้นตัวได้เร็ว', example: 'The local community proved resilient after the severe storm.' },
  { id: 3, word: 'Eloquent', type: 'adj.', thai: 'พูดจาคมคาย / มีวาทศิลป์', example: 'His eloquent speech inspired everyone in the audience.' },
  { id: 4, word: 'Meticulous', type: 'adj.', thai: 'พิถีพิถัน / ละเอียดรอบคอบ', example: 'The architect was meticulous in designing every structural detail.' },
  { id: 5, word: 'Pragmatic', type: 'adj.', thai: 'เน้นการปฏิบัติจริง / สมเหตุสมผล', example: 'We need a pragmatic solution to solve our budget challenges.' },

  // DAY 2 (Words 6 - 10): Personality & Relationships
  { id: 6, word: 'Compassionate', type: 'adj.', thai: 'มีความเห็นอกเห็นใจ / เมตตา', example: 'The nurse showed compassionate care to all her elderly patients.' },
  { id: 7, word: 'Versatile', type: 'adj.', thai: 'อเนกประสงค์ / มีความสามารถหลากหลาย', example: 'He is a versatile actor who excels in both comedy and drama.' },
  { id: 8, word: 'Tenacious', type: 'adj.', thai: 'ทรหด / ไม่ย่อท้อต่ออุปสรรค', example: 'Her tenacious attitude helped her win the national marathon.' },
  { id: 9, word: 'Perceptive', type: 'adj.', thai: 'ตาแหลม / เข้าใจสิ่งต่างๆ ได้รวดเร็ว', example: 'The manager made a perceptive observation about consumer habits.' },
  { id: 10, word: 'Courteous', type: 'adj.', thai: 'สุภาพเรียบร้อย / มีมารยาท', example: 'The hotel staff were consistently courteous and attentive.' },

  // DAY 3 (Words 11 - 15): Work Ethic & Integrity
  { id: 11, word: 'Diligent', type: 'adj.', thai: 'ขยันขันแข็ง / อุตสาหะ', example: 'Diligent students usually perform exceptionally well on exams.' },
  { id: 12, word: 'Impartial', type: 'adj.', thai: 'ยุติธรรม / ไม่ลำเอียง', example: 'A judge must remain strictly impartial during a trial.' },
  { id: 13, word: 'Authentic', type: 'adj.', thai: 'แท้จริง / น่าเชื่อถือ', example: 'The restaurant serves authentic Italian pasta made from scratch.' },
  { id: 14, word: 'Magnanimous', type: 'adj.', thai: 'ใจกว้าง / มีเมตตากรุณา', example: 'He was magnanimous in accepting the opponent\'s apology.' },
  { id: 15, word: 'Intuitive', type: 'adj.', thai: 'โดยสัญชาตญาณ / เข้าใจได้ง่าย', example: 'The app features an intuitive user interface for beginners.' },

  // DAY 4 (Words 16 - 20): Adaptation & Problem Solving
  { id: 16, word: 'Proactive', type: 'adj.', thai: 'ริเริ่มทำก่อน / เชิงรุก', example: 'Taking proactive measures prevents small problems from escalating.' },
  { id: 17, word: 'Sincere', type: 'adj.', thai: 'จริงใจ / บริสุทธิ์ใจ', example: 'She expressed her sincere gratitude for their warm hospitality.' },
  { id: 18, word: 'Resourceful', type: 'adj.', thai: 'หัวไว / มีไหวพริบแก้ปัญหาเก่ง', example: 'Engineers must be resourceful when working under limited budgets.' },
  { id: 19, word: 'Adaptable', type: 'adj.', thai: 'ปรับตัวได้ดี', example: 'Successful leaders are adaptable to changing market environments.' },
  { id: 20, word: 'Empathetic', type: 'adj.', thai: 'เข้าใจความรู้สึกผู้อื่น', example: 'An empathetic friend listens without judging.' },

  // DAY 5 (Words 21 - 25): Academic Frequency (A-Level)
  { id: 21, word: 'Ubiquitous', type: 'adj.', thai: 'พบเห็นได้ทั่วไป / มีอยู่ทุกหนทุกแห่ง', example: 'Smartphones are ubiquitous in modern society.' },
  { id: 22, word: 'Inevitable', type: 'adj.', thai: 'หลีกเลี่ยงไม่ได้', example: 'Getting older is an inevitable part of life.' },
  { id: 23, word: 'Substantial', type: 'adj.', thai: 'มากมาย / เป็นชิ้นเป็นอัน', example: 'The charity received a substantial donation from a local sponsor.' },
  { id: 24, word: 'Prevalent', type: 'adj.', thai: 'แพร่หลาย / เป็นที่นิยม', example: 'Remote work is becoming increasingly prevalent in tech companies.' },
  { id: 25, word: 'Comprehensive', type: 'adj.', thai: 'ครอบคลุม / ถ้วนทั่ว', example: 'The university offers a comprehensive course in global finance.' },

  // DAY 6 (Words 26 - 30): Research & Reasoning
  { id: 26, word: 'Plausible', type: 'adj.', thai: 'สมเหตุสมผล / มีความเป็นไปได้', example: 'The scientist presented a plausible explanation for the discovery.' },
  { id: 27, word: 'Profound', type: 'adj.', thai: 'ลึกซึ้ง / มีอิทธิพลอย่างมาก', example: 'The lecture had a profound impact on my career choices.' },
  { id: 28, word: 'Coherent', type: 'adj.', thai: 'สอดคล้องกัน / เข้าใจง่าย', example: 'She delivered a coherent argument during the final debate.' },
  { id: 29, word: 'Superfluous', type: 'adj.', thai: 'เกินความจำเป็น / ฟุ่มเฟือย', example: 'Clear writing avoids Superfluous words and jargon.' },
  { id: 30, word: 'Discrepancy', type: 'n.', thai: 'ความขัดแย้ง / ความไม่ตรงกัน', example: 'Auditors discovered a minor discrepancy in the quarterly balance sheet.' },

  // DAY 7 (Words 31 - 35): Analysis & Science
  { id: 31, word: 'Paradigm', type: 'n.', thai: 'กระบวนทัศน์ / แบบอย่าง', example: 'Artificial Intelligence is shifting the paradigm of software development.' },
  { id: 32, word: 'Hypothesis', type: 'n.', thai: 'สมมติฐาน', example: 'Researchers tested the hypothesis through controlled laboratory experiments.' },
  { id: 33, word: 'Nuance', type: 'n.', thai: 'ความแตกต่างเล็กน้อยที่ต้องสังเกต', example: 'Translators must understand subtle cultural nuance.' },
  { id: 34, word: 'Correlation', type: 'n.', thai: 'ความสัมพันธ์สอดคล้องกัน', example: 'Studies show a strong correlation between regular exercise and health.' },
  { id: 35, word: 'Feasible', type: 'adj.', thai: 'สามารถทำได้จริง', example: 'Solar power is a feasible source of clean energy.' },

  // DAY 8 (Words 36 - 40): Academic Inquiry
  { id: 36, word: 'Synthesize', type: 'v.', thai: 'สังเคราะห์ / รวบรวมข้อมูล', example: 'Students were asked to synthesize key findings from three articles.' },
  { id: 37, word: 'Elaborate', type: 'v.', thai: 'อธิบายเพิ่มเติมโดยละเอียด', example: 'Could you please elaborate on your proposed marketing strategy?' },
  { id: 38, word: 'Crucial', type: 'adj.', thai: 'สำคัญอย่างยิ่ง', example: 'Water is crucial for the survival of all living organisms.' },
  { id: 39, word: 'Ambiguous', type: 'adj.', thai: 'กำกวม / มีหลายความหมาย', example: 'The contract terms were ambiguous and led to legal disputes.' },
  { id: 40, word: 'Consensus', type: 'n.', thai: 'มติมหาชน / ความเห็นพ้องต้องกัน', example: 'The committee reached a consensus after hours of negotiation.' },

  // DAY 9 (Words 41 - 45): Corporate & Strategy
  { id: 41, word: 'Consolidate', type: 'v.', thai: 'รวมเป็นหนึ่งเดียว / ทำให้มั่นคง', example: 'The merger will consolidate two leading tech firms.' },
  { id: 42, word: 'Delegate', type: 'v.', thai: 'มอบหมายงาน / แต่งตั้งตัวแทน', example: 'Effective leaders know how to delegate tasks to team members.' },
  { id: 43, word: 'Optimize', type: 'v.', thai: 'ปรับแต่งให้เกิดประสิทธิภาพสูงสุด', example: 'Software engineers optimize code to improve loading speeds.' },
  { id: 44, word: 'Streamline', type: 'v.', thai: 'ปรับปรุงขั้นตอนให้รวดเร็วและเป็นระเบียบ', example: 'We streamlined our customer support workflow to reduce wait times.' },
  { id: 45, word: 'Innovate', type: 'v.', thai: 'สร้างสรรค์สิ่งใหม่ / นวัตกรรม', example: 'Companies must innovate continuously to remain competitive.' },

  // DAY 10 (Words 46 - 50): Professional Management
  { id: 46, word: 'Mitigate', type: 'v.', thai: 'บรรเทา / ลดความรุนแรง', example: 'Risk management plans help mitigate potential financial losses.' },
  { id: 47, word: 'Benchmark', type: 'n.', thai: 'เกณฑ์มาตรฐานในการวัดผล', example: 'Customer satisfaction scores serve as our performance benchmark.' },
  { id: 48, word: 'Revenue', type: 'n.', thai: 'รายได้ของบริษัท/องค์กร', example: 'The company reported a 15% increase in annual revenue.' },
  { id: 49, word: 'Leverage', type: 'v.', thai: 'ใช้ประโยชน์สูงสุดจากสิ่งที่มี', example: 'We can leverage social media to reach a global audience.' },
  { id: 50, word: 'Collaborate', type: 'v.', thai: 'ร่วมมือกันทำงาน', example: 'Designers and developers collaborate closely on new app features.' },

  // DAY 11 (Words 51 - 55): Executive Negotiations
  { id: 51, word: 'Negotiate', type: 'v.', thai: 'เจรจาต่อรอง', example: 'The team managed to negotiate a better supplier contract.' },
  { id: 52, word: 'Implement', type: 'v.', thai: 'นำไปปฏิบัติจริง / ดำเนินการ', example: 'The school will implement new safety policies next semester.' },
  { id: 53, word: 'Lucrative', type: 'adj.', thai: 'ที่สร้างกำไรมหาศาล', example: 'Real estate investment can be extremely lucrative.' },
  { id: 54, word: 'Disruptive', type: 'adj.', thai: 'ที่พลิกโฉมอุตสาหกรรม / ก่อให้เกิดการเปลี่ยนแปลงใหญ่', example: 'Electric vehicles are a disruptive innovation in transport.' },
  { id: 55, word: 'Scrutinize', type: 'v.', thai: 'ตรวจสอบอย่างละเอียดรอบคอบ', example: 'Regulators scrutinize banking transactions for fraud prevention.' },

  // DAY 12 (Words 56 - 60): Business Leadership
  { id: 56, word: 'Endeavor', type: 'n.', thai: 'ความพยายาม / กิจการงาน', example: 'We wish you great success in your new entrepreneurial endeavor.' },
  { id: 57, word: 'Facilitate', type: 'v.', thai: 'อำนวยความสะดวก', example: 'Modern software tools facilitate seamless team communication.' },
  { id: 58, word: 'Prioritize', type: 'v.', thai: 'จัดลำดับความสำคัญ', example: 'Managers must prioritize urgent tasks when deadlines approach.' },
  { id: 59, word: 'Subordinate', type: 'n.', thai: 'ผู้ใต้บังคับบัญชา', example: 'A good supervisor supports the growth of every subordinate.' },
  { id: 60, word: 'Accountable', type: 'adj.', thai: 'ที่ต้องรับผิดชอบในผลลัพธ์', example: 'Project managers are accountable for delivering results on schedule.' },

  // DAY 13 (Words 61 - 65): Environment & Society
  { id: 61, word: 'Sustainable', type: 'adj.', thai: 'ยั่งยืน / ไม่ทำลายสิ่งแวดล้อม', example: 'Eco-friendly building materials encourage sustainable living.' },
  { id: 62, word: 'Biodiversity', type: 'n.', thai: 'ความหลากหลายทางชีวภาพ', example: 'Rainforests support a rich diversity of wildlife and biodiversity.' },
  { id: 63, word: 'Cosmopolitan', type: 'adj.', thai: 'มีความเป็นสากล / นานาชาติ', example: 'Bangkok is a vibrant and cosmopolitan city.' },
  { id: 64, word: 'Serene', type: 'adj.', thai: 'สงบเยือกเย็น / เงียบสงบ', example: 'They spent a serene weekend at a mountain resort.' },
  { id: 65, word: 'Exquisite', type: 'adj.', thai: 'ประณีตงดงาม / สวยงามพิถีพิถัน', example: 'The museum displayed an exquisite collection of antique jewelry.' },

  // DAY 14 (Words 66 - 70): City & Life Quality
  { id: 66, word: 'Vibrant', type: 'adj.', thai: 'มีชีวิตชีวา / สดใส', example: 'The night market is famous for its vibrant atmosphere and street food.' },
  { id: 67, word: 'Detrimental', type: 'adj.', thai: 'เป็นโทษ / ก่อผลเสีย', example: 'Lack of sleep can be detrimental to your physical health.' },
  { id: 68, word: 'Hazardous', type: 'adj.', thai: 'อันตราย', example: 'Chemical waste must be stored safely to avoid hazardous leaks.' },
  { id: 69, word: 'Prosperity', type: 'n.', thai: 'ความมั่งคั่ง / ความเจริญรุ่งเรือง', example: 'Economic stability brings peace and prosperity to the nation.' },
  { id: 70, word: 'Heritage', type: 'n.', thai: 'มรดกทางวัฒนธรรม', example: 'Historical monuments preserve a country\'s cultural heritage.' },

  // DAY 15 (Words 71 - 75): Wellness & Nature
  { id: 71, word: 'Alleviate', type: 'v.', thai: 'ผ่อนคลาย / บรรเทาความทุกข์', example: 'Medication helps alleviate headache pain quickly.' },
  { id: 72, word: 'Replenish', type: 'v.', thai: 'เติมเต็มใหม่ / เติมให้เต็มเหมือนเดิม', example: 'Drink plenty of water to replenish lost fluids after running.' },
  { id: 73, word: 'Pristine', type: 'adj.', thai: 'บริสุทธิ์ / ดั้งเดิมไม่ถูกทำลาย', example: 'The island is famous for its pristine white sand beaches.' },
  { id: 74, word: 'Aesthetic', type: 'adj.', thai: 'เกี่ยวกับความสวยงาม / สุนทรียภาพ', example: 'The minimalist interior design has a clean aesthetic appeal.' },
  { id: 75, word: 'Sanctuary', type: 'n.', thai: 'สถานที่ปลอดภัย / สถานคุ้มครอง', example: 'The national park serves as a sanctuary for endangered species.' },

  // DAY 16 (Words 76 - 80): Mind & Feelings
  { id: 76, word: 'Mindfulness', type: 'n.', thai: 'การมีสติ / ความใส่ใจในปัจจุบัน', example: 'Practicing daily mindfulness reduces mental stress and anxiety.' },
  { id: 77, word: 'Embellish', type: 'v.', thai: 'ตกแต่งประดับประดาให้สวยงาม', example: 'She decided to embellish her jacket with colorful patches.' },
  { id: 78, word: 'Hospitable', type: 'adj.', thai: 'ต้อนรับขับไล่เป็นอย่างดี / เป็นมิตร', example: 'Local residents were extremely hospitable toward overseas visitors.' },
  { id: 79, word: 'Captivating', type: 'adj.', thai: 'มีเสน่ห์ดึงดูดใจอย่างมาก', example: 'The novelist wrote a captivating story about space exploration.' },
  { id: 80, word: 'Tranquil', type: 'adj.', thai: 'สงบสงบเงียบ', example: 'We enjoyed a tranquil morning listening to bird songs in the garden.' },

  // DAY 17 (Words 81 - 85): Positive Emotions
  { id: 81, word: 'Ecstatic', type: 'adj.', thai: 'ดีใจอย่างสุดซาบซึ้ง / ปลาบปลื้ม', example: 'She was ecstatic when she passed her final medical exams.' },
  { id: 82, word: 'Apprehensive', type: 'adj.', thai: 'วิตกกังวล / หวั่นเกรง', example: 'Applicants felt apprehensive before entering the interview room.' },
  { id: 83, word: 'Nostalgic', type: 'adj.', thai: 'ถวิลหาอดีต / คิดถึงความหลัง', example: 'Listening to 90s music made him feel nostalgic.' },
  { id: 84, word: 'Relieved', type: 'adj.', thai: 'โล่งอก / ผ่อนคลายความกังวล', example: 'Parents were relieved to hear their children arrived safely.' },
  { id: 85, word: 'Astonished', type: 'adj.', thai: 'ประหลาดใจเป็นอย่างมาก', example: 'Spectators were astonished by the magician\'s incredible tricks.' },

  // DAY 18 (Words 86 - 90): Emotional States
  { id: 86, word: 'Exhilarated', type: 'adj.', thai: 'ตื่นเต้นเบิกบานใจ', example: 'Riding the high-speed roller coaster left us feeling exhilarated.' },
  { id: 87, word: 'Bewildered', type: 'adj.', thai: 'สับสนงุนงง', example: 'Tourists were bewildered by the complex subway map.' },
  { id: 88, word: 'Optimistic', type: 'adj.', thai: 'มองโลกในแง่ดี', example: 'He remains optimistic about the future of green technology.' },
  { id: 89, word: 'Pessimistic', type: 'adj.', thai: 'มองโลกในแง่ร้าย', example: 'Don\'t be pessimistic before you even try the challenge.' },
  { id: 90, word: 'Skeptical', type: 'adj.', thai: 'กังขา / ไม่ค่อยเชื่อ', example: 'Scientists were skeptical of the unverified experimental results.' },

  // DAY 19 (Words 91 - 95): Human Connections
  { id: 91, word: 'Fascinated', type: 'adj.', thai: 'หลงใหล / ให้ความสนใจเป็นพิเศษ', example: 'Children were fascinated by the interactive science exhibits.' },
  { id: 92, word: 'Indifferent', type: 'adj.', thai: 'เฉยชา / ไม่แยแส', example: 'He seemed completely indifferent to the outcome of the game.' },
  { id: 93, word: 'Melancholy', type: 'adj.', thai: 'เศร้าซึม / หม่นหมอง', example: 'Rainy afternoons often evoke a melancholy mood.' },
  { id: 94, word: 'Enthusiastic', type: 'adj.', thai: 'กระตือรือร้น / สนใจอย่างแรงกล้า', example: 'Volunteers were enthusiastic about planting new trees.' },
  { id: 95, word: 'Overwhelmed', type: 'adj.', thai: 'รู้สึกรับไม่ไหว / ท่วมท้นไปด้วยอารมณ์', example: 'She felt overwhelmed by the generous support from her community.' },

  // DAY 20 (Words 96 - 100): Advanced Vocabulary
  { id: 96, word: 'Serendipity', type: 'n.', thai: 'โชคดีที่พบสิ่งดีๆ โดยบังเอิญ', example: 'Meeting my business partner on a train was pure serendipity.' },
  { id: 97, word: 'Euphoria', type: 'n.', thai: 'ความรู้สึกสุขล้น / มีความสุขอย่างยิ่ง', example: 'Winning the championship trophy brought a moment of pure euphoria.' },
  { id: 98, word: 'Empathy', type: 'n.', thai: 'ความสามารถในการเข้าอกเข้าใจผู้อื่น', example: 'Empathy is an essential quality for effective teamwork.' },
  { id: 99, word: 'Spontaneous', type: 'adj.', thai: 'เกิดขึ้นเองตามธรรมชาติ / ไม่ได้วางแผนไว้ก่อน', example: 'They took a spontaneous weekend road trip to the beach.' },
  { id: 100, word: 'Invigorated', type: 'adj.', thai: 'รู้สึกสดชื่นกระปรี้กระเปร่ามีพลัง', example: 'A morning walk in the fresh air left her feeling invigorated.' },

  // DAY 21 (Words 101 - 105): TGAT & A-Level Frequency
  { id: 101, word: 'Adversity', type: 'n.', thai: 'ความทุกข์ยาก / อุปสรรคชีวิต', example: 'Overcoming adversity makes individuals stronger and wiser.' },
  { id: 102, word: 'Benevolent', type: 'adj.', thai: 'เมตตากรุณา / หวังดีต่อผู้อื่น', example: 'The benevolent donor funded university scholarships for needy students.' },
  { id: 103, word: 'Candor', type: 'n.', thai: 'ความตรงไปตรงมา / ความเปิดเผย', example: 'I appreciate your candor in sharing honest feedback.' },
  { id: 104, word: 'Deteriorate', type: 'v.', thai: 'ทรุดโทรม / แย่ลง', example: 'Without maintenance, old buildings deteriorate rapidly.' },
  { id: 105, word: 'Exacerbate', type: 'v.', thai: 'ทำให้แย่ลง / ซ้ำเติม', example: 'High stress levels exacerbate existing health conditions.' },

  // DAY 22 (Words 106 - 110): Exam Passage Vocabulary
  { id: 106, word: 'Formidable', type: 'adj.', thai: 'น่าเกรงขาม / ยากที่จะก้าวผ่าน', example: 'The champion team faced a formidable opponent in the finals.' },
  { id: 107, word: 'Grandeur', type: 'n.', thai: 'ความใหญ่โตมโหฬาร / ความสง่างาม', example: 'Visitors were awed by the architectural grandeur of the palace.' },
  { id: 108, word: 'Hierarchy', type: 'n.', thai: 'ระบบการปกครองตามลำดับขั้น', example: 'Corporate hierarchy dictates decision-making approval chains.' },
  { id: 109, word: 'Illuminating', type: 'adj.', thai: 'ที่ให้ความรู้กระจ่างแจ้ง', example: 'The documentary offered an illuminating perspective on marine biology.' },
  { id: 110, word: 'Juxtapose', type: 'v.', thai: 'วางเปรียบเทียบเคียงข้างกัน', example: 'The gallery will juxtapose modern art with classical sculptures.' },

  // DAY 23 (Words 111 - 115): Advanced Verbal Ability
  { id: 111, word: 'Kinship', type: 'n.', thai: 'ความสัมพันธ์ฉันญาติมิตร', example: 'Members of the hiking club felt a strong sense of kinship.' },
  { id: 112, word: 'Luminous', type: 'adj.', thai: 'ส่องสว่าง / มีแสงในตัวเอง', example: 'Full moon nights illuminate the ocean in luminous blue shades.' },
  { id: 113, word: 'Monotonous', type: 'adj.', thai: 'ซ้ำซากน่าเบื่อ', example: 'Repetitive factory assembly work can become monotonous.' },
  { id: 114, word: 'Nonchalant', type: 'adj.', thai: 'ทำเป็นไม่ใส่ใจ / เมินเฉย', example: 'He gave a nonchalant shrug when asked about his test scores.' },
  { id: 115, word: 'Obstinate', type: 'adj.', thai: 'ดื้อรั้น / ไม่ยอมเปลี่ยนใจ', example: 'The obstinate child refused to eat his vegetables.' },

  // DAY 24 (Words 116 - 120): Critical Analysis Terms
  { id: 116, word: 'Perperual', type: 'adj.', thai: 'ตลอดกาล / ไม่สิ้นสุด', example: 'Glaciers remain in perpetual motion down mountain slopes.' },
  { id: 117, word: 'Quaint', type: 'adj.', thai: 'แปลกใหม่อย่างมีเสน่ห์ดั้งเดิม', example: 'We stayed in a quaint coastal village near the harbor.' },
  { id: 118, word: 'Reconcile', type: 'v.', thai: 'ไกล่เกลี่ย / ปรับความเข้าใจ', example: 'Both sides sought a mediator to reconcile their differences.' },
  { id: 119, word: 'Scrupulous', type: 'adj.', thai: 'ซื่อสัตย์รอบคอบ / ยึดมั่นจริยธรรม', example: 'Researchers must follow scrupulous scientific methodologies.' },
  { id: 120, word: 'Trepidation', type: 'n.', thai: 'ความหวาดหวั่น / ความเกรงกลัว', example: 'She stepped onto the stage with a mixture of excitement and trepidation.' },

  // DAY 25 (Words 121 - 125): Logic & Reasoning (A-Level)
  { id: 121, word: 'Unanimous', type: 'adj.', thai: 'เป็นเอกฉันท์', example: 'The jury reached a unanimous verdict after short deliberation.' },
  { id: 122, word: 'Venerable', type: 'adj.', thai: 'น่าเคารพยกย่อง', example: 'The venerable professor dedicated fifty years to cancer research.' },
  { id: 123, word: 'Wary', type: 'adj.', thai: 'ระมัดระวัง / ไม่ไว้วางใจ', example: 'Investors remain wary of volatile cryptocurrency markets.' },
  { id: 124, word: 'Yield', type: 'v.', thai: 'ให้ผลผลิต / ยอมจำนน', example: 'Fertile soil yields abundant agricultural harvests.' },
  { id: 125, word: 'Zealous', type: 'adj.', thai: 'กระตือรือร้นอย่างแรงกล้า', example: 'Zealous environmentalists campaigned tirelessly for ocean cleanup.' },

  // DAY 26 (Words 126 - 130): Academic Discourse
  { id: 126, word: 'Assertive', type: 'adj.', thai: 'มั่นใจในการแสดงออก / เด็ดขาด', example: 'Communicating in an assertive manner builds professional respect.' },
  { id: 127, word: 'Boisterous', type: 'adj.', thai: 'เอะอะโวยวาย / ร่าเริงครึกครื้น', example: 'The crowd became boisterous when the rock band took the stage.' },
  { id: 128, word: 'Cognitive', type: 'adj.', thai: 'เกี่ยวกับกระบวนการคิดและรับรู้', example: 'Puzzles and reading stimulate children\'s cognitive development.' },
  { id: 129, word: 'Delineate', type: 'v.', thai: 'วาดเขต / อธิบายขอบเขตให้ชัดเจน', example: 'Project agreements clearly delineate roles for each department.' },
  { id: 130, word: 'Elicit', type: 'v.', thai: 'ดึงเอาออกมา / ดึงคำตอบ', example: 'Skilled interviewers ask open questions to elicit detailed responses.' },

  // DAY 27 (Words 131 - 135): Textual Analysis
  { id: 131, word: 'Frugal', type: 'adj.', thai: 'ประหยัดมัธยัสถ์', example: 'Living a frugal lifestyle allowed them to save money for travel.' },
  { id: 132, word: 'Gregarious', type: 'adj.', thai: 'ชอบเข้าสังคม / ชอบอยู่รวมเป็นกลุ่ม', example: 'Dolphins are gregarious mammals that swim in large pods.' },
  { id: 133, word: 'Heedless', type: 'adj.', thai: 'ไม่ใส่ใจ / ประมาท', example: 'He drove onward, heedless of the storm warnings on the radio.' },
  { id: 134, word: 'Impeccable', type: 'adj.', thai: 'ไร้ที่ติ / บริบูรณ์สมบูรณ์แบบ', example: 'Her English pronunciation and grammar are impeccable.' },
  { id: 135, word: 'Jubilant', type: 'adj.', thai: 'ปลื้มปีติยินดีอย่างยิ่ง', example: 'Fans were jubilant after their team won the championship final.' },

  // DAY 28 (Words 136 - 140): Advanced Reading Skills
  { id: 136, word: 'Keen', type: 'adj.', thai: 'แหลมคม / สนใจอย่างยิ่ง', example: 'She has a keen interest in modern architectural design.' },
  { id: 137, word: 'Linger', type: 'v.', thai: 'ตกค้าง / อ้อยอิ่งอยู่นาน', example: 'The pleasant scent of lavender lingered in the living room.' },
  { id: 138, word: 'Mitigation', type: 'n.', thai: 'การลดผ่อน / การบรรเทา', example: 'Disaster mitigation plans protect coastal cities against flooding.' },
  { id: 139, word: 'Nurture', type: 'v.', thai: 'ฟูมฟัก / ทำนุบำรุง', example: 'Teachers nurture creativity and curiosity in young learners.' },
  { id: 140, word: 'Ominous', type: 'adj.', thai: 'เป็นลางร้าย / น่าสะพรึงกลัว', example: 'Dark ominous clouds gathered overhead before the thunderstorm.' },

  // DAY 29 (Words 141 - 145): TGAT Verbal Speed Run
  { id: 141, word: 'Pinnacle', type: 'n.', thai: 'จุดสูงสุด / ยอดเขา', example: 'Winning an Olympic gold medal is the pinnacle of an athlete\'s career.' },
  { id: 142, word: 'Quandary', type: 'n.', thai: 'ภาวะกลืนไม่เข้าคายไม่ออก', example: 'She was in a quandary about choosing between two job offers.' },
  { id: 143, word: 'Reticent', type: 'adj.', thai: 'สงบปากสงบคำ / ไม่ค่อยพูด', example: 'The introverted student was reticent during group discussions.' },
  { id: 144, word: 'Solace', type: 'n.', thai: 'สิ่งปลอบประโลมใจ', example: 'She found solace in playing the piano after a long workday.' },
  { id: 145, word: 'Tactful', type: 'adj.', thai: 'มีกาลเทศะ / รู้จักพูด', example: 'A tactful response resolves customer disputes peacefully.' },

  // DAY 30 (Words 146 - 150): High-Yield A-Level Exam Set
  { id: 146, word: 'Unravel', type: 'v.', thai: 'คลี่คลาย / แก้ปมปัญหา', example: 'Detectives worked tirelessly to unravel the complex mystery.' },
  { id: 147, word: 'Vindicate', type: 'v.', thai: 'พิสูจน์ความบริสุทธิ์ / กอบกู้ชื่อเสียง', example: 'New DNA evidence served to vindicate the wrongly accused man.' },
  { id: 148, word: 'Waver', type: 'v.', thai: 'ลังเลโลเล / ไม่มั่นคง', example: 'Her commitment to justice did not waver despite threats.' },
  { id: 149, word: 'Yielding', type: 'adj.', thai: 'ที่อ่อนน้อม / ที่ยินยอม', example: 'Soft yielding cushions made the armchair remarkably comfortable.' },
  { id: 150, word: 'Zenith', type: 'n.', thai: 'จุดเจริญรุ่งเรืองสูงสุด', example: 'At the zenith of its power, the empire spanned three continents.' },

  // DAY 31 (Words 151 - 155): Month-End Mastery Set
  { id: 151, word: 'Acutely', type: 'adv.', thai: 'อย่างรุนแรง / อย่างมีสติเฉียบแหลม', example: 'The team was acutely aware of the tight project deadline.' },
  { id: 152, word: 'Burgeon', type: 'v.', thai: 'เติบโตอย่างรวดเร็ว / เติบโตเฟื่องฟู', example: 'E-commerce businesses continue to burgeon across Southeast Asia.' },
  { id: 153, word: 'Candidly', type: 'adv.', thai: 'อย่างตรงไปตรงมา', example: 'He spoke candidly about his past mistakes during the podcast.' },
  { id: 154, word: 'Decisive', type: 'adj.', thai: 'เด็ดขาด / เป็นข้อสรุปแน่นอน', example: 'Strong leaders make decisive choices under pressure.' },
  { id: 155, word: 'Exemplary', type: 'adj.', thai: 'เป็นตัวอย่างที่ดีเยี่ยม / เป็นแบบอย่าง', example: 'Her exemplary dedication earned her Employee of the Year.' }
];

/**
 * Gets 5 vocabulary words for a given date or day-of-month (1 to 31).
 * Day 1 (1st) -> Words 1..5
 * Day 14 (14th) -> Words 66..70
 * Day 31 (31st) -> Words 151..155
 * 
 * If offset is provided (via user Clicking Shuffle button), it cycles to the next 5-word block.
 */
export function getDailyVocabSet(dateStr, offset = 0) {
  let dayOfMonth = 1;

  if (dateStr) {
    // Parse YYYY-MM-DD
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      dayOfMonth = parseInt(parts[2], 10) || 1;
    }
  } else {
    dayOfMonth = new Date().getDate();
  }

  // Ensure dayOfMonth is within 1 to 31
  dayOfMonth = Math.max(1, Math.min(31, dayOfMonth));

  // Calculate starting index: Day 1 -> Index 0, Day 2 -> Index 5, Day 14 -> Index 65
  const baseIndex = ((dayOfMonth - 1) * 5 + offset * 5) % dailyVocabPool.length;

  const selected = [];
  for (let i = 0; i < 5; i++) {
    const idx = (baseIndex + i) % dailyVocabPool.length;
    selected.push(dailyVocabPool[idx]);
  }

  return selected;
}
