import pool from '../db/index.js';
import { units } from '../../src/data/mockData.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('🛑 ERROR: GEMINI_API_KEY is not set in server/.env file.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

async function generateVocabularyQuestions(unitId, unitTitle, levelId) {
  const levelTargets = {
    easy: 'O-NET M.3 / Basic Vocabulary (fundamental nouns and verbs, clear contextual sentences, direct definitions)',
    medium1: 'O-NET M.6 / Intermediate Vocabulary (common verbs, compound adjectives, basic synonyms)',
    medium2: 'O-NET M.6 / Intermediate Vocabulary (word partnerships, common phrasal verbs, descriptive descriptors)',
    hard1: 'TCAS / A-Level English exam standard (high-yield exam-relevant nouns/adjectives, phrasal verbs, academic context, NOT obscure GRE words)',
    hard2: 'TCAS / A-Level English exam standard (exam-frequent collocations, phrasal verbs in context, professional and academic register, NOT obscure GRE words)'
  };

  const target = levelTargets[levelId];

  const prompt = `
    You are an expert English vocabulary developer specializing in creating questions for Thai students preparing for university entrance exams (TCAS / A-Level).
    
    Generate exactly 10 unique, multiple-choice questions for:
    - Unit ID: ${unitId}
    - Unit Topic: ${unitTitle}
    - Difficulty Level: ${levelId} (Target: ${target})

    CRITICAL RULES:
    1. The questions MUST be strictly focused on the topic: "${unitTitle}".
    2. Do NOT use obscure or archaic GRE vocabulary words (like "obfuscate" or "recalcitrant"). The words tested must be practical, high-yield vocabulary useful in daily life or standard exams (like TGAT, A-Level, or TOEIC).
    3. The correct answer MUST be placed as the FIRST option in the options array. All 4 choices must be distinct, valid English words.
    4. Provide the explanation in English. It MUST define the correct word and provide a brief one-line explanation of the other three distractors so the student learns all four words.
    5. Provide the explanationTh in Thai, which MUST start with: "แปล: [Thai translation of the full question sentence with the correct answer filled in]" followed by "คำอธิบาย:" and then a list of all 4 choices on separate lines, each prefixed by a hyphen "-" bullet point (e.g. - [word] ([Thai translation]): [explanation/meaning]).

    Return the output STRICTLY as a JSON array matching this schema:
    [
      {
        "question": "Sentence with blank ___ representing the question.",
        "options": ["Correct Answer (placed first)", "Distractor 1", "Distractor 2", "Distractor 3"],
        "correctAnswer": "Correct Answer (placed first)",
        "explanation": "English explanation defining correct word and distractors.",
        "explanationTh": "แปล: [Thai translation of sentence]\\n\\nคำอธิบาย:\\n- [option1] ([translation]): [meaning]\\n- [option2] ([translation]): [meaning]\\n- [option3] ([translation]): [meaning]\\n- [option4] ([translation]): [meaning]"
      }
    ]
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const text = result.response.text();
    return JSON.parse(text);
  } catch (err) {
    console.error(`Failed to generate questions for Unit ${unitId} - ${levelId}:`, err);
    throw err;
  }
}

async function safeQuery(text, params, clientRetryAttempts = 3) {
  for (let attempt = 1; attempt <= clientRetryAttempts; attempt++) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      const isConnectionError = err.code === 'ECONNRESET' || 
                                err.message.includes('Connection terminated') || 
                                err.message.includes('read ECONNRESET');
      if (isConnectionError && attempt < clientRetryAttempts) {
        console.warn(`⚠️ DB Connection error (${err.message}). Retrying query (attempt ${attempt + 1}/${clientRetryAttempts})...`);
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      throw err;
    }
  }
}

async function run() {
  console.log('Starting full scale generation of remaining Vocabulary questions (3,650 questions)...');
  const allGeneratedQuestions = [];

  // Handle pool errors globally
  pool.on('error', (err) => {
    console.warn('⚠️ Idle PostgreSQL pool client error caught:', err.message);
  });

  // Load existing questions backup to append correctly
  const backupFilePath = path.resolve('db/questions_backup.json');
  if (fs.existsSync(backupFilePath)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));
      allGeneratedQuestions.push(...existingData);
      console.log(`Loaded ${existingData.length} existing backup questions.`);
    } catch (err) {
      console.warn('Warning: Could not parse existing questions_backup.json.');
    }
  }

  try {
    // 1. Seed the category first
    await safeQuery(`
      INSERT INTO categories (id, title, description, color, icon_char)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE 
      SET title = EXCLUDED.title, description = EXCLUDED.description, color = EXCLUDED.color, icon_char = EXCLUDED.icon_char
    `, ['vocabulary', 'Vocabulary', 'Master English vocabulary through contextual drills', '#CE82FF', 'V']);

    // Filter units belonging to the vocabulary track
    const vocabUnits = units.filter(u => u.category === 'vocabulary');

    for (const u of vocabUnits) {
      // 2. Ensure unit is in database
      const unitRes = await safeQuery(`
        INSERT INTO units (id, category_id, unit_number, title, description, color)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE 
        SET category_id = EXCLUDED.category_id, unit_number = EXCLUDED.unit_number, title = EXCLUDED.title, description = EXCLUDED.description, color = EXCLUDED.color
        RETURNING id
      `, [u.id, u.category, u.id - 75, u.title, u.description, u.color]);

      const dbUnitId = unitRes.rows[0].id;

      const levels = ['easy', 'medium1', 'medium2', 'hard1', 'hard2'];
      for (const levelId of levels) {
        // 3. Check if we already have 10 valid questions in the database
        const countRes = await safeQuery(
          "SELECT COUNT(*)::int AS count FROM questions WHERE unit_id = $1 AND level_id = $2 AND explanation_th LIKE 'แปล:%'",
          [dbUnitId, levelId]
        );

        if (countRes.rows[0].count === 10) {
          console.log(`ℹ️ Unit #${u.id} ("${u.title}") - ${levelId} is already fully seeded, skipping.`);
          continue;
        }

        console.log(`- Setting up levels for Unit #${u.id} - ${levelId}`);
        await safeQuery(`
          INSERT INTO levels (id, unit_id, label)
          VALUES ($1, $2, $3)
          ON CONFLICT (unit_id, id) DO UPDATE 
          SET label = EXCLUDED.label
        `, [levelId, dbUnitId, levelId.toUpperCase()]);

        // Generate AI questions
        console.log(`- Generating AI questions for Unit #${u.id} ("${u.title}") - ${levelId}...`);
        let questionsList = null;
        let attempts = 4;
        while (attempts > 0) {
          try {
            questionsList = await generateVocabularyQuestions(u.id, u.title, levelId);
            if (Array.isArray(questionsList) && questionsList.length === 10) {
              break;
            }
          } catch (e) {
            attempts--;
            if (attempts === 0) {
              console.error(`❌ Permanent failure for Unit ${u.id} - ${levelId}. Skipping.`);
              break;
            }
            console.log(`⚠️ Retrying generation for Unit ${u.id} - ${levelId} (Attempts left: ${attempts})...`);
            await new Promise(r => setTimeout(r, 6000));
          }
        }

        if (questionsList && Array.isArray(questionsList)) {
          for (let i = 0; i < questionsList.length; i++) {
            const q = questionsList[i];
            const qId = `q-${dbUnitId}-${levelId}-${i}`;
            const resolvedCorrectAnswer = q.correctAnswer || q.correct_answer || (q.options && q.options[0]);
            const resolvedExplanationTh = q.explanationTh || q.explanation_th || '';

            await safeQuery(`
              INSERT INTO questions (id, unit_id, level_id, question, options, correct_answer, explanation, explanation_th)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              ON CONFLICT (id) DO UPDATE 
              SET question = EXCLUDED.question,
                  options = EXCLUDED.options,
                  correct_answer = EXCLUDED.correct_answer,
                  explanation = EXCLUDED.explanation,
                  explanation_th = EXCLUDED.explanation_th
            `, [
              qId,
              dbUnitId,
              levelId,
              q.question,
              JSON.stringify(q.options),
              resolvedCorrectAnswer,
              q.explanation,
              resolvedExplanationTh
            ]);

            // Save or update in local backup array
            const existsInBackup = allGeneratedQuestions.some(x => x.id === qId);
            if (existsInBackup) {
              const idx = allGeneratedQuestions.findIndex(x => x.id === qId);
              allGeneratedQuestions[idx] = {
                id: qId,
                unit_id: u.id,
                unit_number: u.id,
                level_id: levelId,
                question: q.question,
                options: q.options,
                correct_answer: resolvedCorrectAnswer,
                explanation: q.explanation,
                explanation_th: resolvedExplanationTh
              };
            } else {
              allGeneratedQuestions.push({
                id: qId,
                unit_id: u.id,
                unit_number: u.id,
                level_id: levelId,
                question: q.question,
                options: q.options,
                correct_answer: resolvedCorrectAnswer,
                explanation: q.explanation,
                explanation_th: resolvedExplanationTh
              });
            }
          }
        }

        // Save progressive local backup updates to prevent progress loss
        fs.writeFileSync(backupFilePath, JSON.stringify(allGeneratedQuestions, null, 2), 'utf8');
        // Wait 1.5 seconds between generations to handle rate limiting nicely
        await new Promise(r => setTimeout(r, 1500));
      }
      console.log(`✅ Completed Seeding Unit #${u.id}`);
    }

    console.log('🎉 Seeding of ALL Vocabulary category questions finished successfully!');
  } catch (error) {
    console.error('Fatal error during seeding:', error);
  } finally {
    await pool.end();
  }
}

run();
