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

async function generateQuestionsForUnit(unitId, unitTitle, levelId) {
  const levelTargets = {
    easy: 'O-NET M.3 level (basic grammatical structure, clear context, direct application)',
    medium1: 'O-NET M.6 level (common grammatical structures, basic exceptions)',
    medium2: 'O-NET M.6 / PAT level (contextual and relational grammar)',
    hard1: 'TCAS / A-Level 82 English exam standard (tricky traps, distracting options)',
    hard2: 'TCAS / A-Level 82 English exam standard (nuanced grammatical differences, academic registers)'
  };

  const target = levelTargets[levelId];

  const prompt = `
    You are an expert English grammar developer specializing in creating questions for Thai students preparing for university entrance exams (TCAS / A-Level).
    
    Generate exactly 10 unique, multiple-choice questions for:
    - Unit ID: ${unitId}
    - Unit Topic: ${unitTitle}
    - Difficulty Level: ${levelId} (Target: ${target})

    CRITICAL RULES:
    1. The questions MUST be strictly focused on the topic: "${unitTitle}".
    2. Do NOT include grammar concepts from future units or advanced grammar (such as inversions or past perfect) unless the unit topic specifically dictates it.
    3. The correct answer MUST be placed as the FIRST option in the options array.
    4. Provide the explanation in English.
    5. Provide the explanationTh in Thai, which MUST start with: "แปล: [Thai translation of the full question sentence with the correct answer filled in]" followed by "คำอธิบาย: [Thai grammar explanation]".

    Return the output STRICTLY as a JSON array matching this schema:
    [
      {
        "question": "Sentence with blank ___ representing the question.",
        "options": ["Correct Answer (placed first)", "Distractor 1", "Distractor 2", "Distractor 3"],
        "correctAnswer": "Correct Answer (placed first)",
        "explanation": "English explanation of the grammar rule.",
        "explanationTh": "แปล: [Thai translation of full sentence with correct answer filled in]\\n\\nคำอธิบาย: [Thai breakdown of the grammar rule and options]"
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
  console.log('Starting AI-driven generation of 3,750 topic-matched questions...');
  const failedLevels = [];
  const allGeneratedQuestions = [];

  // Handle pool errors globally to prevent crashes on idle connections
  pool.on('error', (err) => {
    console.warn('⚠️ Idle PostgreSQL pool client error caught:', err.message);
  });

  // Load existing backup if we are resuming to preserve generated questions
  const backupFilePath = path.resolve('db/questions_backup.json');
  if (fs.existsSync(backupFilePath)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));
      allGeneratedQuestions.push(...existingData);
      console.log(`Loaded ${existingData.length} existing backup questions from questions_backup.json.`);
    } catch (err) {
      console.warn('Warning: Could not parse existing questions_backup.json.');
    }
  }

  try {
    for (const unit of units) {
      const dbUnitRes = await safeQuery(
        'SELECT id, title FROM units WHERE category_id = $1 AND unit_number = $2',
        [unit.category, unit.id]
      );

      if (dbUnitRes.rows.length === 0) continue;

      const dbUnitId = dbUnitRes.rows[0].id;
      const dbUnitTitle = dbUnitRes.rows[0].title;

      const levels = ['easy', 'medium1', 'medium2', 'hard1', 'hard2'];

      for (const levelId of levels) {
        // Check if we already have 10 migrated questions in the database
        const countRes = await safeQuery(
          "SELECT COUNT(*)::int AS count FROM questions WHERE unit_id = $1 AND level_id = $2 AND explanation_th LIKE 'แปล:%'",
          [dbUnitId, levelId]
        );
        
        if (countRes.rows[0].count === 10) {
          console.log(`ℹ️ Unit #${unit.id} ("${dbUnitTitle}") - ${levelId} is already migrated, skipping.`);
          continue;
        }

        // Clean out any old/messy questions for this level first
        await safeQuery(
          'DELETE FROM questions WHERE unit_id = $1 AND level_id = $2',
          [dbUnitId, levelId]
        );

        console.log(`Generating AI questions for Unit #${unit.id} ("${dbUnitTitle}") - ${levelId}...`);
        
        let questionsList = null;
        let attempts = 3;
        while (attempts > 0) {
          try {
            questionsList = await generateQuestionsForUnit(unit.id, dbUnitTitle, levelId);
            if (Array.isArray(questionsList) && questionsList.length === 10) {
              break;
            }
          } catch (e) {
            attempts--;
            if (attempts === 0) {
              console.error(`❌ Permanent failure for Unit ${unit.id} - ${levelId}. Skipping.`);
              failedLevels.push({ unitId: unit.id, unitTitle: dbUnitTitle, levelId });
              break;
            }
            console.log(`⚠️ Retrying generation for Unit ${unit.id} - ${levelId} (Attempts left: ${attempts})...`);
            await new Promise(r => setTimeout(r, 4000));
          }
        }

        if (questionsList && Array.isArray(questionsList)) {
          for (let i = 0; i < questionsList.length; i++) {
            const q = questionsList[i];
            const qId = `q-${dbUnitId}-${levelId}-${i}`; // Use database unit ID to overwrite correctly
            const resolvedCorrectAnswer = q.correctAnswer || q.correct_answer || (q.options && q.options[0]);
            const resolvedExplanationTh = q.explanationTh || q.explanation_th || '';

            const queryText = `
              INSERT INTO questions (id, unit_id, level_id, question, options, correct_answer, explanation, explanation_th)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              ON CONFLICT (id) DO UPDATE 
              SET question = EXCLUDED.question,
                  options = EXCLUDED.options,
                  correct_answer = EXCLUDED.correct_answer,
                  explanation = EXCLUDED.explanation,
                  explanation_th = EXCLUDED.explanation_th
            `;

            await safeQuery(queryText, [
              qId,
              dbUnitId,
              levelId,
              q.question,
              JSON.stringify(q.options),
              resolvedCorrectAnswer,
              q.explanation,
              resolvedExplanationTh
            ]);

            // Save to local list for backup JSON file (avoid duplicates if resuming)
            const existsInBackup = allGeneratedQuestions.some(x => x.id === qId);
            if (!existsInBackup) {
              allGeneratedQuestions.push({
                id: qId,
                unit_id: dbUnitId,
                unit_number: unit.id,
                level_id: levelId,
                question: q.question,
                options: q.options,
                correct_answer: resolvedCorrectAnswer,
                explanation: q.explanation,
                explanation_th: resolvedExplanationTh
              });
            }
          }

          // Write progressive updates to local JSON backup
          fs.writeFileSync(backupFilePath, JSON.stringify(allGeneratedQuestions, null, 2), 'utf8');
        }
        await new Promise(r => setTimeout(r, 2000));
      }
      console.log(`- Finished Unit #${unit.id}`);
    }

    console.log('===================================================');
    console.log('✅ Migration run completed.');
    if (failedLevels.length > 0) {
      console.warn(`⚠️ The following levels failed and were skipped:`);
      console.log(failedLevels);
    } else {
      console.log('🎉 All 3,750 questions generated and backed up to questions_backup.json successfully!');
    }
  } catch (error) {
    console.error('🛑 Error running migration:', error);
  } finally {
    await pool.end();
  }
}

run();
