/**
 * Curated Pool of 100 High-Yield Vocabulary Words for Thai Learners.
 * Spans Academic (A-Level/IELTS), Workplace/Business, and Daily Conversation English.
 */
export const dailyVocabPool = [
  // SECTION 1: Character & Personality (1-20)
  { id: 1, word: 'Ambitious', type: 'adj.', thai: 'ทะเยอทะยาน / มีความมุ่งมั่นสูง', example: 'She has ambitious plans for her business expansion.' },
  { id: 2, word: 'Resilient', type: 'adj.', thai: 'ยืดหยุ่น / ฟื้นตัวได้เร็ว', example: 'The local community proved resilient after the severe storm.' },
  { id: 3, word: 'Eloquent', type: 'adj.', thai: 'พูดจาคมคาย / มีวาทศิลป์', example: 'His eloquent speech inspired everyone in the audience.' },
  { id: 4, word: 'Meticulous', type: 'adj.', thai: 'พิถีพิถัน / ละเอียดรอบคอบ', example: 'The architect was meticulous in designing every structural detail.' },
  { id: 5, word: 'Pragmatic', type: 'adj.', thai: 'เน้นการปฏิบัติจริง / สมเหตุสมผล', example: 'We need a pragmatic solution to solve our budget challenges.' },
  { id: 6, word: 'Compassionate', type: 'adj.', thai: 'มีความเห็นอกเห็นใจ / เมตตา', example: 'The nurse showed compassionate care to all her elderly patients.' },
  { id: 7, word: 'Versatile', type: 'adj.', thai: 'อเนกประสงค์ / มีความสามารถหลากหลาย', example: 'He is a versatile actor who excels in both comedy and drama.' },
  { id: 8, word: 'Tenacious', type: 'adj.', thai: 'ทรหด / ไม่ย่อท้อต่ออุปสรรค', example: 'Her tenacious attitude helped her win the national marathon.' },
  { id: 9, word: 'Perceptive', type: 'adj.', thai: 'ตาแหลม / เข้าใจสิ่งต่างๆ ได้รวดเร็ว', example: 'The manager made a perceptive observation about consumer habits.' },
  { id: 10, word: 'Courteous', type: 'adj.', thai: 'สุภาพเรียบร้อย / มีมารยาท', example: 'The hotel staff were consistently courteous and attentive.' },
  { id: 11, word: 'Diligent', type: 'adj.', thai: 'ขยันขันแข็ง / อุตสาหะ', example: 'Diligent students usually perform exceptionally well on exams.' },
  { id: 12, word: 'Impartial', type: 'adj.', thai: 'ยุติธรรม / ไม่ลำเอียง', example: 'A judge must remain strictly impartial during a trial.' },
  { id: 13, word: 'Authentic', type: 'adj.', thai: 'แท้จริง / น่าเชื่อถือ', example: 'The restaurant serves authentic Italian pasta made from scratch.' },
  { id: 14, word: 'Magnanimous', type: 'adj.', thai: 'ใจกว้าง / มีเมตตากรุณา', example: 'He was magnanimous in accepting the opponent\'s apology.' },
  { id: 15, word: 'Intuitive', type: 'adj.', thai: 'โดยสัญชาตญาณ / เข้าใจได้ง่าย', example: 'The app features an intuitive user interface for beginners.' },
  { id: 16, word: 'Proactive', type: 'adj.', thai: 'ริเริ่มทำก่อน / เชิงรุก', example: 'Taking proactive measures prevents small problems from escalating.' },
  { id: 17, word: 'Sincere', type: 'adj.', thai: 'จริงใจ / บริสุทธิ์ใจ', example: 'She expressed her sincere gratitude for their warm hospitality.' },
  { id: 18, word: 'Resourceful', type: 'adj.', thai: 'หัวไว / มีไหวพริบแก้ปัญหาเก่ง', example: 'Engineers must be resourceful when working under limited budgets.' },
  { id: 19, word: 'Adaptable', type: 'adj.', thai: 'ปรับตัวได้ดี', example: 'Successful leaders are adaptable to changing market environments.' },
  { id: 20, word: 'Empathetic', type: 'adj.', thai: 'เข้าใจความรู้สึกผู้อื่น', example: 'An empathetic friend listens without judging.' },

  // SECTION 2: Academic & Intellectual Terms (21-40)
  { id: 21, word: 'Ubiquitous', type: 'adj.', thai: 'พบเห็นได้ทั่วไป / มีอยู่ทุกหนทุกแห่ง', example: 'Smartphones are ubiquitous in modern society.' },
  { id: 22, word: 'Inevitable', type: 'adj.', thai: 'หลีกเลี่ยงไม่ได้', example: 'Getting older is an inevitable part of life.' },
  { id: 23, word: 'Substantial', type: 'adj.', thai: 'มากมาย / เป็นชิ้นเป็นอัน', example: 'The charity received a substantial donation from a local sponsor.' },
  { id: 24, word: 'Prevalent', type: 'adj.', thai: 'แพร่หลาย / เป็นที่นิยม', example: 'Remote work is becoming increasingly prevalent in tech companies.' },
  { id: 25, word: 'Comprehensive', type: 'adj.', thai: 'ครอบคลุม / ถ้วนทั่ว', example: 'The university offers a comprehensive course in global finance.' },
  { id: 26, word: 'Plausible', type: 'adj.', thai: 'สมเหตุสมผล / มีความเป็นไปได้', example: 'The scientist presented a plausible explanation for the discovery.' },
  { id: 27, word: 'Profound', type: 'adj.', thai: 'ลึกซึ้ง / มีอิทธิพลอย่างมาก', example: 'The lecture had a profound impact on my career choices.' },
  { id: 28, word: 'Coherent', type: 'adj.', thai: 'สอดคล้องกัน / เข้าใจง่าย', example: 'She delivered a coherent argument during the final debate.' },
  { id: 29, word: 'Superfluous', type: 'adj.', thai: 'เกินความจำเป็น / ฟุ่มเฟือย', example: 'Clear writing avoids Superfluous words and jargon.' },
  { id: 30, word: 'Discrepancy', type: 'n.', thai: 'ความขัดแย้ง / ความไม่ตรงกัน', example: 'Auditors discovered a minor discrepancy in the quarterly balance sheet.' },
  { id: 31, word: 'Paradigm', type: 'n.', thai: 'กระบวนทัศน์ / แบบอย่าง', example: 'Artificial Intelligence is shifting the paradigm of software development.' },
  { id: 32, word: 'Hypothesis', type: 'n.', thai: 'สมมติฐาน', example: 'Researchers tested the hypothesis through controlled laboratory experiments.' },
  { id: 33, word: 'Nuance', type: 'n.', thai: 'ความแตกต่างเล็กน้อยที่ต้องสังเกต', example: 'Translators must understand subtle cultural nuance.' },
  { id: 34, word: 'Correlation', type: 'n.', thai: 'ความสัมพันธ์สอดคล้องกัน', example: 'Studies show a strong correlation between regular exercise and health.' },
  { id: 35, word: 'Feasible', type: 'adj.', thai: 'สามารถทำได้จริง', example: 'Solar power is a feasible source of clean energy.' },
  { id: 36, word: 'Synthesize', type: 'v.', thai: 'สังเคราะห์ / รวบรวมข้อมูล', example: 'Students were asked to synthesize key findings from three articles.' },
  { id: 37, word: 'Elaborate', type: 'v.', thai: 'อธิบายเพิ่มเติมโดยละเอียด', example: 'Could you please elaborate on your proposed marketing strategy?' },
  { id: 38, word: 'Crucial', type: 'adj.', thai: 'สำคัญอย่างยิ่ง', example: 'Water is crucial for the survival of all living organisms.' },
  { id: 39, word: 'Ambiguous', type: 'adj.', thai: 'กำกวม / มีหลายความหมาย', example: 'The contract terms were ambiguous and led to legal disputes.' },
  { id: 40, word: 'Consensus', type: 'n.', thai: 'มติมหาชน / ความเห็นพ้องต้องกัน', example: 'The committee reached a consensus after hours of negotiation.' },

  // SECTION 3: Workplace, Business & Professional (41-60)
  { id: 41, word: 'Consolidate', type: 'v.', thai: 'รวมเป็นหนึ่งเดียว / ทำให้มั่นคง', example: 'The merger will consolidate two leading tech firms.' },
  { id: 42, word: 'Delegate', type: 'v.', thai: 'มอบหมายงาน / แต่งตั้งตัวแทน', example: 'Effective leaders know how to delegate tasks to team members.' },
  { id: 43, word: 'Optimize', type: 'v.', thai: 'ปรับแต่งให้เกิดประสิทธิภาพสูงสุด', example: 'Software engineers optimize code to improve loading speeds.' },
  { id: 44, word: 'Streamline', type: 'v.', thai: 'ปรับปรุงขั้นตอนให้รวดเร็วและเป็นระเบียบ', example: 'We streamlined our customer support workflow to reduce wait times.' },
  { id: 45, word: 'Innovate', type: 'v.', thai: 'สร้างสรรค์สิ่งใหม่ / นวัตกรรม', example: 'Companies must innovate continuously to remain competitive.' },
  { id: 46, word: 'Mitigate', type: 'v.', thai: 'บรรเทา / ลดความรุนแรง', example: 'Risk management plans help mitigate potential financial losses.' },
  { id: 47, word: 'Benchmark', type: 'n.', thai: 'เกณฑ์มาตรฐานในการวัดผล', example: 'Customer satisfaction scores serve as our performance benchmark.' },
  { id: 48, word: 'Revenue', type: 'n.', thai: 'รายได้ของบริษัท/องค์กร', example: 'The company reported a 15% increase in annual revenue.' },
  { id: 49, word: 'Leverage', type: 'v.', thai: 'ใช้ประโยชน์สูงสุดจากสิ่งที่มี', example: 'We can leverage social media to reach a global audience.' },
  { id: 50, word: 'Collaborate', type: 'v.', thai: 'ร่วมมือกันทำงาน', example: 'Designers and developers collaborate closely on new app features.' },
  { id: 51, word: 'Negotiate', type: 'v.', thai: 'เจรจาต่อรอง', example: 'The team managed to negotiate a better supplier contract.' },
  { id: 52, word: 'Implement', type: 'v.', thai: 'นำไปปฏิบัติจริง / ดำเนินการ', example: 'The school will implement new safety policies next semester.' },
  { id: 53, word: 'Lucrative', type: 'adj.', thai: 'ที่สร้างกำไรมหาศาล', example: 'Real estate investment can be extremely lucrative.' },
  { id: 54, word: 'Disruptive', type: 'adj.', thai: 'ที่พลิกโฉมอุตสาหกรรม / ก่อให้เกิดการเปลี่ยนแปลงใหญ่', example: 'Electric vehicles are a disruptive innovation in transport.' },
  { id: 55, word: 'Scrutinize', type: 'v.', thai: 'ตรวจสอบอย่างละเอียดรอบคอบ', example: 'Regulators scrutinize banking transactions for fraud prevention.' },
  { id: 56, word: 'Endeavor', type: 'n.', thai: 'ความพยายาม / กิจการงาน', example: 'We wish you great success in your new entrepreneurial endeavor.' },
  { id: 57, word: 'Facilitate', type: 'v.', thai: 'อำนวยความสะดวก', example: 'Modern software tools facilitate seamless team communication.' },
  { id: 58, word: 'Prioritize', type: 'v.', thai: 'จัดลำดับความสำคัญ', example: 'Managers must prioritize urgent tasks when deadlines approach.' },
  { id: 59, word: 'Subordinate', type: 'n.', thai: 'ผู้ใต้บังคับบัญชา', example: 'A good supervisor supports the growth of every subordinate.' },
  { id: 60, word: 'Accountable', type: 'adj.', thai: 'ที่ต้องรับผิดชอบในผลลัพธ์', example: 'Project managers are accountable for delivering results on schedule.' },

  // SECTION 4: Lifestyle, Environment & Society (61-80)
  { id: 61, word: 'Sustainable', type: 'adj.', thai: 'ยั่งยืน / ไม่ทำลายสิ่งแวดล้อม', example: 'Eco-friendly building materials encourage sustainable living.' },
  { id: 62, word: 'Biodiversity', type: 'n.', thai: 'ความหลากหลายทางชีวภาพ', example: 'Rainforests support a rich diversity of wildlife and biodiversity.' },
  { id: 63, word: 'Cosmopolitan', type: 'adj.', thai: 'มีความเป็นสากล / นานาชาติ', example: 'Bangkok is a vibrant and cosmopolitan city.' },
  { id: 64, word: 'Serene', type: 'adj.', thai: 'สงบเยือกเย็น / เงียบสงบ', example: 'They spent a serene weekend at a mountain resort.' },
  { id: 65, word: 'Exquisite', type: 'adj.', thai: 'ประณีตงดงาม / สวยงามพิถีพิถัน', example: 'The museum displayed an exquisite collection of antique jewelry.' },
  { id: 66, word: 'Vibrant', type: 'adj.', thai: 'มีชีวิตชีวา / สดใส', example: 'The night market is famous for its vibrant atmosphere and street food.' },
  { id: 67, word: 'Detrimental', type: 'adj.', thai: 'เป็นโทษ / ก่อผลเสีย', example: 'Lack of sleep can be detrimental to your physical health.' },
  { id: 68, word: 'Hazardous', type: 'adj.', thai: 'อันตราย', example: 'Chemical waste must be stored safely to avoid hazardous leaks.' },
  { id: 69, word: 'Prosperity', type: 'n.', thai: 'ความมั่งคั่ง / ความเจริญรุ่งเรือง', example: 'Economic stability brings peace and prosperity to the nation.' },
  { id: 70, word: 'Heritage', type: 'n.', thai: 'มรดกทางวัฒนธรรม', example: 'Historical monuments preserve a country\'s cultural heritage.' },
  { id: 71, word: 'Alleviate', type: 'v.', thai: 'ผ่อนคลาย / บรรเทาความทุกข์', example: 'Medication helps alleviate headache pain quickly.' },
  { id: 72, word: 'Replenish', type: 'v.', thai: 'เติมเต็มใหม่ / เติมให้เต็มเหมือนเดิม', example: 'Drink plenty of water to replenish lost fluids after running.' },
  { id: 73, word: 'Pristine', type: 'adj.', thai: 'บริสุทธิ์ / ดั้งเดิมไม่ถูกทำลาย', example: 'The island is famous for its pristine white sand beaches.' },
  { id: 74, word: 'Aesthetic', type: 'adj.', thai: 'เกี่ยวกับความสวยงาม / สุนทรียภาพ', example: 'The minimalist interior design has a clean aesthetic appeal.' },
  { id: 75, word: 'Sanctuary', type: 'n.', thai: 'สถานที่ปลอดภัย / สถานคุ้มครอง', example: 'The national park serves as a sanctuary for endangered species.' },
  { id: 76, word: 'Mindfulness', type: 'n.', thai: 'การมีสติ / ความใส่ใจในปัจจุบัน', example: 'Practicing daily mindfulness reduces mental stress and anxiety.' },
  { id: 77, word: 'Embellish', type: 'v.', thai: 'ตกแต่งประดับประดาให้สวยงาม', example: 'She decided to embellish her jacket with colorful patches.' },
  { id: 78, word: 'Hospitable', type: 'adj.', thai: 'ต้อนรับขับไล่เป็นอย่างดี / เป็นมิตร', example: 'Local residents were extremely hospitable toward overseas visitors.' },
  { id: 79, word: 'Captivating', type: 'adj.', thai: 'มีเสน่ห์ดึงดูดใจอย่างมาก', example: 'The novelist wrote a captivating story about space exploration.' },
  { id: 80, word: 'Tranquil', type: 'adj.', thai: 'สงบสงบเงียบ', example: 'We enjoyed a tranquil morning listening to bird songs in the garden.' },

  // SECTION 5: Emotions, Feelings & Expressions (81-100)
  { id: 81, word: 'Ecstatic', type: 'adj.', thai: 'ดีใจอย่างสุดซาบซึ้ง / ปลาบปลื้ม', example: 'She was ecstatic when she passed her final medical exams.' },
  { id: 82, word: 'Apprehensive', type: 'adj.', thai: 'วิตกกังวล / หวั่นเกรง', example: 'Applicants felt apprehensive before entering the interview room.' },
  { id: 83, word: 'Nostalgic', type: 'adj.', thai: 'ถวิลหาอดีต / คิดถึงความหลัง', example: 'Listening to 90s music made him feel nostalgic.' },
  { id: 84, word: 'Relieved', type: 'adj.', thai: 'โล่งอก / ผ่อนคลายความกังวล', example: 'Parents were relieved to hear their children arrived safely.' },
  { id: 85, word: 'Astonished', type: 'adj.', thai: 'ประหลาดใจเป็นอย่างมาก', example: 'Spectators were astonished by the magician\'s incredible tricks.' },
  { id: 86, word: 'Exhilarated', type: 'adj.', thai: 'ตื่นเต้นเบิกบานใจ', example: 'Riding the high-speed roller coaster left us feeling exhilarated.' },
  { id: 87, word: 'Bewildered', type: 'adj.', thai: 'สับสนงุนงง', example: 'Tourists were bewildered by the complex subway map.' },
  { id: 88, word: 'Optimistic', type: 'adj.', thai: 'มองโลกในแง่ดี', example: 'He remains optimistic about the future of green technology.' },
  { id: 89, word: 'Pessimistic', type: 'adj.', thai: 'มองโลกในแง่ร้าย', example: 'Don\'t be pessimistic before you even try the challenge.' },
  { id: 90, word: 'Skeptical', type: 'adj.', thai: 'กังขา / ไม่ค่อยเชื่อ', example: 'Scientists were skeptical of the unverified experimental results.' },
  { id: 91, word: 'Fascinated', type: 'adj.', thai: 'หลงใหล / ให้ความสนใจเป็นพิเศษ', example: 'Children were fascinated by the interactive science exhibits.' },
  { id: 92, word: 'Indifferent', type: 'adj.', thai: 'เฉยชา / ไม่แยแส', example: 'He seemed completely indifferent to the outcome of the game.' },
  { id: 93, word: 'Melancholy', type: 'adj.', thai: 'เศร้าซึม / หม่นหมอง', example: 'Rainy afternoons often evoke a melancholy mood.' },
  { id: 94, word: 'Enthusiastic', type: 'adj.', thai: 'กระตือรือร้น / สนใจอย่างแรงกล้า', example: 'Volunteers were enthusiastic about planting new trees.' },
  { id: 95, word: 'Overwhelmed', type: 'adj.', thai: 'รู้สึกรับไม่ไหว / ท่วมท้นไปด้วยอารมณ์', example: 'She felt overwhelmed by the generous support from her community.' },
  { id: 96, word: 'Serendipity', type: 'n.', thai: 'โชคดีที่พบสิ่งดีๆ โดยบังเอิญ', example: 'Meeting my business partner on a train was pure serendipity.' },
  { id: 97, word: 'Euphoria', type: 'n.', thai: 'ความรู้สึกสุขล้น / มีความสุขอย่างยิ่ง', example: 'Winning the championship trophy brought a moment of pure euphoria.' },
  { id: 98, word: 'Empathy', type: 'n.', thai: 'ความสามารถในการเข้าอกเข้าใจผู้อื่น', example: 'Empathy is an essential quality for effective teamwork.' },
  { id: 99, word: 'Spontaneous', type: 'adj.', thai: 'เกิดขึ้นเองตามธรรมชาติ / ไม่ได้วางแผนไว้ก่อน', example: 'They took a spontaneous weekend road trip to the beach.' },
  { id: 100, word: 'Invigorated', type: 'adj.', thai: 'รู้สึกสดชื่นกระปรี้กระเปร่ามีพลัง', example: 'A morning walk in the fresh air left her feeling invigorated.' }
];

/**
 * Deterministically picks 5 vocabulary items from the 100-word pool based on a seed or date.
 * If offset is passed, it shifts the set so the user can shuffle anytime.
 */
export function getDailyVocabSet(dateStr, offset = 0) {
  if (!dateStr) {
    const d = new Date();
    dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // Create a numeric hash from the date string
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Combine with offset
  const baseIndex = Math.abs(hash + offset * 7) % dailyVocabPool.length;

  const selected = [];
  for (let i = 0; i < 5; i++) {
    const idx = (baseIndex + i * 13) % dailyVocabPool.length;
    selected.push(dailyVocabPool[idx]);
  }

  return selected;
}
