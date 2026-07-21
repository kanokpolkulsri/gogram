import pool from '../db/index.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
dotenv.config();

// Helper to shuffle arrays
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const defaultLevels = [
  { id: 'easy', label: 'Easy', xpReward: 10, heartsCost: 1 },
  { id: 'medium1', label: 'Medium 1', xpReward: 15, heartsCost: 1 },
  { id: 'medium2', label: 'Medium 2', xpReward: 20, heartsCost: 1 },
  { id: 'hard1', label: 'Hard 1', xpReward: 25, heartsCost: 1 },
  { id: 'hard2', label: 'Hard 2', xpReward: 30, heartsCost: 1 }
];

async function run() {
  console.log('=== Starting Mixed Grammar Generation & Seeding (Bulk Mode) ===');
  
  const client = await pool.connect();
  
  try {
    // 1. Seed Categories table
    console.log('- Upserting Mixed Grammar Category...');
    await client.query(`
      INSERT INTO categories (id, title, description, color, icon_char)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE 
      SET title = EXCLUDED.title,
          description = EXCLUDED.description,
          color = EXCLUDED.color,
          icon_char = EXCLUDED.icon_char
    `, [
      'mixed_grammar',
      'Mixed Grammar',
      'Test your skills with comprehensive exam-style mixed grammar drills',
      '#FF9600',
      'M'
    ]);

    // 2. Build 75 units metadata
    const mixedUnits = [];
    const titles = [
      // Section 1
      'Present Simple & Present Progressive', 'Past Simple & Past Progressive', 'Future Simple & Future Planned',
      'Present Perfect & Past Simple', 'Present Perfect Simple & Continuous', 'Past Perfect & Past Simple',
      'Future Perfect & Future Continuous', 'Mixed Active Tenses I', 'Mixed Active Tenses II',
      'State Verbs & Action Verbs', 'Habitual Past Systems', 'Time Clauses & Aspect',
      'Future in the Past', 'Tense Auxiliary & Ellipsis', 'Comprehensive Tense Review',
      // Section 2
      'Definite & Indefinite Articles', 'Singular & Plural Noun Anomalies', 'Quantifiers & Determiners',
      'Subject & Object Pronouns', 'Possessives & Reflexives', 'Demonstratives & Indefinite Pronouns',
      'Prepositions of Place & Direction', 'Prepositions of Time & Duration', 'Prepositional Phrases',
      'Adjectives vs Adverbs', 'Comparative & Superlative Forms', 'Equative & Progressive Comparison',
      'Noun-Modifying Preposition Blocks', 'Compound Nouns & Modifiers', 'Comprehensive Noun Phrase Review',
      // Section 3
      'Coordinating Conjunctions', 'Subordinating Conjunctions', 'Correlative Conjunctions',
      'Defining Relative Clauses', 'Non-Defining Relative Clauses', 'Prepositions in Relative Clauses',
      'Noun Clauses: That-clauses', 'Noun Clauses: Wh-questions', 'Participle Clauses',
      'Adverbial Participle Clauses', 'Adverbial Connectors of Contrast', 'Adverbial Connectors of Purpose/Result',
      'Infinitives of Purpose', 'Clausal Reduction & Ellipsis', 'Comprehensive Clausal Review',
      // Section 4
      'Passive Voice Simple Aspects', 'Passive Voice Complex Aspects', 'Causative Structures',
      'Reported Statements', 'Reported Questions', 'Reported Commands & Requests',
      'Gerunds as Subjects & Objects', 'Infinitives as Modifiers', 'Verbs + Gerund or Infinitive I',
      'Verbs + Gerund or Infinitive II', 'Impersonal Passive Constructions', 'Active-Passive Semantic Pairs',
      'Direct Speech Punctuation', 'Reported Speech Exceptions', 'Comprehensive Voice & Speech Review',
      // Section 5
      'Zero & First Conditionals', 'Second & Third Conditionals', 'Mixed Conditionals',
      'Alternatives to "If"', 'Wish & If Only Present', 'Wish & If Only Past',
      'Subject-Auxiliary Inversion', 'Conditional Inversion', 'Subjunctive Mood',
      'Cleft Sentences', 'Substitution & Ellipsis', 'Double Negative & Emphasis',
      'Advanced Adverbial Placements', 'Parenthetical & Sentence Modifiers', 'Comprehensive Advanced Review'
    ];

    for (let i = 0; i < 75; i++) {
      mixedUnits.push({
        id: 151 + i,
        unitNumber: i + 1,
        title: titles[i],
        description: `Mixed drills testing various grammatical structures, focusing on ${titles[i].toLowerCase()}`
      });
    }

    const colors = ['#FF4B4B', '#FF9600', '#FFC800', '#58CC02', '#1CB0F6', '#854BE3', '#CE82FF'];

    // 2A. Bulk Seed Units
    console.log('- Bulk Seeding 75 Mixed Grammar Units...');
    const unitValues = [];
    const unitPlaceholders = [];
    mixedUnits.forEach((u, index) => {
      const uColor = colors[(u.id - 1) % colors.length];
      const offset = index * 6;
      unitPlaceholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`);
      unitValues.push(u.id, 'mixed_grammar', u.unitNumber, u.title, u.description, uColor);
    });

    await client.query(`
      INSERT INTO units (id, category_id, unit_number, title, description, color)
      VALUES ${unitPlaceholders.join(', ')}
      ON CONFLICT (id) DO UPDATE 
      SET category_id = EXCLUDED.category_id,
          unit_number = EXCLUDED.unit_number,
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          color = EXCLUDED.color
    `, unitValues);
    console.log(`  Seeded ${mixedUnits.length} units successfully.`);

    // 2B. Bulk Seed Levels
    console.log('- Bulk Seeding Levels for Units...');
    const levelValues = [];
    const levelPlaceholders = [];
    let levelPlaceholderIndex = 0;
    mixedUnits.forEach(u => {
      defaultLevels.forEach(lvl => {
        const offset = levelPlaceholderIndex * 3;
        levelPlaceholderIndex++;
        levelPlaceholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3})`);
        levelValues.push(lvl.id, u.id, lvl.label);
      });
    });

    await client.query(`
      INSERT INTO levels (id, unit_id, label)
      VALUES ${levelPlaceholders.join(', ')}
      ON CONFLICT (unit_id, id) DO UPDATE 
      SET label = EXCLUDED.label
    `, levelValues);
    console.log(`  Seeded ${levelPlaceholderIndex} level records successfully.`);

    // 3. Query existing Grammar questions pool (unit_id between 1 and 75)
    console.log('- Querying existing Grammar questions pool...');
    const questionsRes = await client.query(`
      SELECT question, options, correct_answer, explanation, explanation_th, level_id 
      FROM questions 
      WHERE unit_id BETWEEN 1 AND 75
    `);
    const poolQuestions = questionsRes.rows;
    console.log(`  Fetched ${poolQuestions.length} base Grammar questions from database.`);

    if (poolQuestions.length < 3750) {
      console.warn(`🛑 WARNING: Base grammar pool is incomplete (found ${poolQuestions.length}/3750). We will duplicate questions if needed.`);
    }

    // Group by level_id
    const levelPools = {
      easy: [],
      medium1: [],
      medium2: [],
      hard1: [],
      hard2: []
    };

    for (const q of poolQuestions) {
      if (levelPools[q.level_id]) {
        levelPools[q.level_id].push(q);
      }
    }

    // Shuffle and populate target questions
    console.log('- Shuffling and generating new Mixed Grammar question sets...');
    const allGeneratedQuestions = [];

    for (const levelId of Object.keys(levelPools)) {
      let poolArr = levelPools[levelId];
      if (poolArr.length === 0) {
        console.error(`🛑 ERROR: No questions found for level ${levelId} in database.`);
        process.exit(1);
      }
      
      // Shuffle pool
      shuffle(poolArr);

      // We need exactly 10 questions per unit * 75 units = 750 questions for this level
      let poolIndex = 0;
      for (let uIndex = 0; uIndex < 75; uIndex++) {
        const u = mixedUnits[uIndex];
        
        for (let qIndex = 0; qIndex < 10; qIndex++) {
          const baseQ = poolArr[poolIndex % poolArr.length];
          poolIndex++;

          const qId = `q-${u.id}-${levelId}-${qIndex}`;
          
          allGeneratedQuestions.push({
            id: qId,
            unit_id: u.id,
            unit_number: u.id,
            level_id: levelId,
            question: baseQ.question,
            options: Array.isArray(baseQ.options) ? baseQ.options : JSON.parse(baseQ.options),
            correct_answer: baseQ.correct_answer,
            explanation: baseQ.explanation,
            explanation_th: baseQ.explanation_th
          });
        }
      }
    }

    console.log(`  Generated ${allGeneratedQuestions.length} Mixed Grammar questions.`);

    // 4. Seeding questions in batches of 500
    console.log('- Bulk Seeding questions into database (batches of 500)...');
    const batchSize = 500;
    for (let i = 0; i < allGeneratedQuestions.length; i += batchSize) {
      const batch = allGeneratedQuestions.slice(i, i + batchSize);
      const qValues = [];
      const qPlaceholders = [];
      
      batch.forEach((q, index) => {
        const offset = index * 8;
        qPlaceholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8})`);
        qValues.push(
          q.id,
          q.unit_id,
          q.level_id,
          q.question,
          JSON.stringify(q.options),
          q.correct_answer,
          q.explanation,
          q.explanation_th
        );
      });
      
      await client.query(`
        INSERT INTO questions (id, unit_id, level_id, question, options, correct_answer, explanation, explanation_th)
        VALUES ${qPlaceholders.join(', ')}
        ON CONFLICT (id) DO UPDATE 
        SET question = EXCLUDED.question,
            options = EXCLUDED.options,
            correct_answer = EXCLUDED.correct_answer,
            explanation = EXCLUDED.explanation,
            explanation_th = EXCLUDED.explanation_th
      `, qValues);
      console.log(`  Seeded batch of questions: ${i} to ${i + batch.length}...`);
    }
    console.log('  Seeded all questions successfully in database.');

    // 5. Update local questions_backup.json
    console.log('- Synchronizing questions_backup.json...');
    const backupFilePath = path.resolve('db/questions_backup.json');
    let existingBackup = [];
    if (fs.existsSync(backupFilePath)) {
      existingBackup = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));
    }

    const filteredBackup = existingBackup.filter(x => x.unit_id < 151);
    const finalBackup = [...filteredBackup, ...allGeneratedQuestions];

    fs.writeFileSync(backupFilePath, JSON.stringify(finalBackup, null, 2), 'utf8');
    console.log(`  Successfully wrote ${finalBackup.length} total questions to questions_backup.json.`);

    console.log('🎉 Mixed Grammar Seeding Completed Successfully!');
  } catch (err) {
    console.error('❌ Error during mixed grammar seeding:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
