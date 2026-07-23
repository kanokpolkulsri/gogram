import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { default: pool } = await import('../db/index.js');
const { conversationQuestions } = await import('../../src/data/conversationQuestions.js');

const conversationUnitsData = [
  // SECTION 1: Daily Life & Social Interactions
  { id: 301, unitNum: 1, title: 'Everyday & Campus Life', description: 'Master cafe ordering, shopping inquiries, library study groups, and airport transit.' },
  { id: 302, unitNum: 2, title: 'Dining Out & Restaurant Ordering', description: 'Master food orders, table bookings, dietary needs, bill splitting, and complaints.' },
  { id: 303, unitNum: 3, title: 'Shopping, Bargaining & Refunds', description: 'Master supermarket shopping, market bargaining, product returns, and order tracking.' },
  { id: 304, unitNum: 4, title: 'Socializing & Making Friends', description: 'Master party small talk, weekend invitations, declining politely, and compliments.' },
  { id: 305, unitNum: 5, title: 'Expressing Sympathy & Encouragement', description: 'Master comforting friends, sick visits, sincere condolences, and burnout support.' },

  // SECTION 2: Travel, Transport & Accommodation
  { id: 306, unitNum: 6, title: 'Street Directions & City Transport', description: 'Master BTS directions, taxi rides, train tickets, bus transfers, and car rentals.' },
  { id: 307, unitNum: 7, title: 'Hotel & Accommodation Management', description: 'Master hotel check-in, housekeeping, facility issues, deposits, and late check-outs.' },
  { id: 308, unitNum: 8, title: 'Airport, Flights & Customs', description: 'Master flight check-in, security checks, duty-free, connection flights, and lost luggage.' },
  { id: 309, unitNum: 9, title: 'Sightseeing & Tourism Activities', description: 'Master museum tours, guided trips, asking for photos, and local culture etiquette.' },
  { id: 310, unitNum: 10, title: 'Renting Apartments & Housing', description: 'Master apartment viewing, lease terms, furniture rental, landlord calls, and moving out.' },

  // SECTION 3: Campus & Academic Success
  { id: 311, unitNum: 11, title: 'Campus Life & Orientation', description: 'Master meeting classmates, club registration, campus facilities, and student ID cards.' },
  { id: 312, unitNum: 12, title: 'Group Projects & Class Collaboration', description: 'Master task allocation, deadlines, shared documents, presentations, and peer feedback.' },
  { id: 313, unitNum: 13, title: 'Academic Advising & Office Hours', description: 'Master asking course feedback, thesis topics, grade inquiries, and recommendation letters.' },
  { id: 314, unitNum: 14, title: 'Scholarships & Study Abroad Interviews', description: 'Master motivation statements, academic goals, extracurriculars, and stress questions.' },
  { id: 315, unitNum: 15, title: 'Library & Research Facilities', description: 'Master book borrowing, research databases, inter-library loans, and scanning services.' },

  // SECTION 4: Workplace & Professional Courtesy
  { id: 316, unitNum: 16, title: 'Workplace Courtesy & Office Talk', description: 'Master morning greetings, team meetings, supervisor help, mistakes, and promotions.' },
  { id: 317, unitNum: 17, title: 'Job Interviews & Career Progression', description: 'Master self-introductions, strengths/weaknesses, salary expectations, and past experience.' },
  { id: 318, unitNum: 18, title: 'Phone Calls & Video Meetings', description: 'Master taking calls, booking appointments, rescheduling, and formal inquiries.' },
  { id: 319, unitNum: 19, title: 'Business Meetings & Pitching', description: 'Master agenda opening, presentation delivery, Q&A handling, and client feedback.' },
  { id: 320, unitNum: 20, title: 'Workplace Negotiations & Extension Requests', description: 'Master deadline extensions, workload balancing, remote requests, and budget approvals.' },

  // SECTION 5: Communication Skills & Opinions
  { id: 321, unitNum: 21, title: 'Expressing Opinions, Agreement & Disagreement', description: 'Master movie preferences, book reviews, gentle disagreement, and tech debates.' },
  { id: 322, unitNum: 22, title: 'Giving Advice & Recommendations', description: 'Master travel tips, study habits, tech purchasing advice, and fitness routines.' },
  { id: 323, unitNum: 23, title: 'Making Comparisons & Preferences', description: 'Master choosing options, pros & cons analysis, brand comparison, and lifestyle choices.' },
  { id: 324, unitNum: 24, title: 'Clarification & Active Listening', description: 'Master asking speakers to repeat, paraphrasing statements, and spelling names.' },
  { id: 325, unitNum: 25, title: 'Culture, Habits & Small Talk', description: 'Master weather talk, festival celebrations, culinary traditions, and travel stories.' },

  // SECTION 6: Health, Emergencies & Financial Services
  { id: 326, unitNum: 26, title: 'Medical, Pharmacy & Health Care', description: 'Master pharmacy purchases, doctor registration, symptom details, and ER visits.' },
  { id: 327, unitNum: 27, title: 'Problem Solving & Customer Service Complaints', description: 'Master lost items, apartment noise, utility bills, swallowed ATM cards, and escalations.' },
  { id: 328, unitNum: 28, title: 'Emergency Situations & Calling for Help', description: 'Master calling ambulances, police reports, roadside assistance, and embassy help.' },
  { id: 329, unitNum: 29, title: 'Banking, ATM & Financial Services', description: 'Master opening accounts, currency exchange, wire transfers, and credit card blocks.' },
  { id: 330, unitNum: 30, title: 'Public Services, Post Office & Admin', description: 'Master sending packages, registered mail, government forms, and utility hookups.' }
];

async function seedConversationAll() {
  console.log('Seeding All 30 Conversation Units into Database...');
  let client;

  try {
    console.log('Connecting to PostgreSQL database...');
    client = await pool.connect();
    console.log('Connected! Starting transaction...');
    await client.query('BEGIN');

    // 0. Ensure schema columns exist
    await client.query(`ALTER TABLE questions ADD COLUMN IF NOT EXISTS dialogue JSONB`);
    await client.query(`ALTER TABLE questions ADD COLUMN IF NOT EXISTS target_turn_index INT`);

    // 1. Insert/Update Conversation Category
    await client.query(
      `INSERT INTO categories (id, title, description, color, icon_char)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE 
       SET title = EXCLUDED.title, description = EXCLUDED.description, color = EXCLUDED.color, icon_char = EXCLUDED.icon_char`,
      [
        'conversation',
        'Conversation',
        'Master practical English dialogues & exam-style conversations',
        '#1CB0F6',
        'C'
      ]
    );

    // 2. Insert/Update 30 Conversation Units & 150 Levels
    const levels = [
      { id: 'easy', label: 'Easy' },
      { id: 'medium1', label: 'Medium 1' },
      { id: 'medium2', label: 'Medium 2' },
      { id: 'hard1', label: 'Hard 1' },
      { id: 'hard2', label: 'Hard 2' }
    ];

    for (const u of conversationUnitsData) {
      await client.query(
        `INSERT INTO units (id, category_id, unit_number, title, description, color)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE 
         SET category_id = EXCLUDED.category_id, unit_number = EXCLUDED.unit_number, title = EXCLUDED.title, description = EXCLUDED.description, color = EXCLUDED.color`,
        [u.id, 'conversation', u.unitNum, u.title, u.description, '#1CB0F6']
      );

      for (const lvl of levels) {
        await client.query(
          `INSERT INTO levels (unit_id, id, label)
           VALUES ($1, $2, $3)
           ON CONFLICT (unit_id, id) DO UPDATE SET label = EXCLUDED.label`,
          [u.id, lvl.id, lvl.label]
        );
      }
    }

    // 3. Insert Questions for Unit 301 into PostgreSQL
    for (const q of conversationQuestions) {
      await client.query(
        `INSERT INTO questions (id, unit_id, level_id, question, options, correct_answer, explanation, explanation_th, dialogue, target_turn_index)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE
         SET unit_id = EXCLUDED.unit_id,
             level_id = EXCLUDED.level_id,
             question = EXCLUDED.question,
             options = EXCLUDED.options,
             correct_answer = EXCLUDED.correct_answer,
             explanation = EXCLUDED.explanation,
             explanation_th = EXCLUDED.explanation_th,
             dialogue = EXCLUDED.dialogue,
             target_turn_index = EXCLUDED.target_turn_index`,
        [
          q.id,
          q.unitId,
          q.levelId,
          q.question,
          JSON.stringify(q.options),
          q.correctAnswer,
          q.explanation,
          q.explanationTh,
          JSON.stringify(q.dialogue),
          q.targetTurnIndex
        ]
      );
    }

    await client.query('COMMIT');
    console.log('✅ Successfully seeded 30 Conversation Units, 150 Levels, and Questions into PostgreSQL Database!');
  } catch (err) {
    if (client) {
      try { await client.query('ROLLBACK'); } catch (rErr) { console.error('Rollback error:', rErr); }
    }
    console.error('❌ Seeding Error:', err);
  } finally {
    if (client) client.release();
    process.exit();
  }
}

seedConversationAll();
