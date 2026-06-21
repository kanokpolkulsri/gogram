import { useState } from 'react';

export default function AiDraftSection({
  categories,
  units,
  dispatch,
  showToast
}) {
  // 1. Core States
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'grammar');
  const [topic, setTopic] = useState('all'); // 'all' or specific topic ID (unit ID)
  const [level, setLevel] = useState('all'); // 'all', 'easy', 'medium1', 'medium2', 'hard1', 'hard2'
  const [onlyZero, setOnlyZero] = useState(true);
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [questionsCount, setQuestionsCount] = useState(10);

  // 2. Processing / Progress States
  const [isGeneratingBulk, setIsGeneratingBulk] = useState(false);
  const [generationProgressMsg, setGenerationProgressMsg] = useState('');

  // 3. Derived Data matching the selected category
  const categoryTopics = units.filter(u => u.category === categoryId);


  // Filter topics based on topic selector
  const activeTopics = topic === 'all'
    ? categoryTopics
    : categoryTopics.filter(t => Number(t.id) === Number(topic));

  const levelList = ['easy', 'medium1', 'medium2', 'hard1', 'hard2'];
  const levelLabels = {
    easy: 'Easy (O-NET M.3)',
    medium1: 'Medium 1 (O-NET M.6)',
    medium2: 'Medium 2 (O-NET M.6 / PAT)',
    hard1: 'Hard 1 (PAT 1/2, A-Level)',
    hard2: 'Hard 2 (IELTS/TOEFL)'
  };

  // Determine tasks to generate (topics & levels combination)
  const getTasksToProcess = () => {
    const tasks = [];
    const targetLevels = level === 'all' ? levelList : [level];

    activeTopics.forEach(t => {
      targetLevels.forEach(lvlId => {
        const lvl = t.levels.find(l => l.id === lvlId);
        const hasQs = (lvl?.questions?.length || 0) > 0;
        if (!onlyZero || !hasQs) {
          tasks.push({ topic: t, levelId: lvlId });
        }
      });
    });
    return tasks;
  };

  const tasksToProcess = getTasksToProcess();

  // Trigger Bulk Generation simulation (calling mock engine, API wired later)
  const handleTriggerBulkGeneration = () => {
    if (tasksToProcess.length === 0) {
      showToast('No slots match the generation criteria.');
      return;
    }

    setIsGeneratingBulk(true);
    setGenerationProgressMsg('Connecting to Gemini API...');

    let taskIndex = 0;

    const runNextTask = () => {
      if (taskIndex >= tasksToProcess.length) {
        // Dispatch bulk generate action
        dispatch({
          type: 'BULK_GENERATE_CMS',
          categoryId,
          topicId: topic,
          levelId: level,
          questionsPerTopic: questionsCount,
          onlyZero
        });
        setIsGeneratingBulk(false);
        setGenerationProgressMsg('');
        showToast(`AI Bulk Generation completed! Generated ${questionsCount} questions for ${tasksToProcess.length} slots.`);
        return;
      }

      const currentTask = tasksToProcess[taskIndex];
      const levelLabel = levelLabels[currentTask.levelId] || currentTask.levelId;
      setGenerationProgressMsg(`Generating: "${currentTask.topic.title}" — ${levelLabel}`);

      taskIndex++;
      setTimeout(runNextTask, 600); // 600ms per level/topic combo for a smooth, impressive visual animation
    };

    setTimeout(runNextTask, 800);
  };

  // Dynamically build prompt preview text
  const getPromptPreviewText = () => {
    const selectedCategoryObj = categories.find(c => c.id === categoryId);
    const categoryTitle = selectedCategoryObj?.title || categoryId;

    const levelDetails = {
      easy: { label: 'Easy', target: 'O-NET M.3', style: 'Straightforward fill-in-the-blank, clear rules' },
      medium1: { label: 'Medium 1', target: 'O-NET M.6', style: 'Rule application, common exceptions' },
      medium2: { label: 'Medium 2', target: 'O-NET M.6 / PAT', style: 'Multiple rules in context, sentence-level' },
      hard1: { label: 'Hard 1', target: 'PAT 1/2, A-Level', style: 'Tricky edge cases, paragraph context' },
      hard2: { label: 'Hard 2', target: 'IELTS/TOEFL', style: 'Nuanced, deceptive distractors, academic register' }
    };

    let levelPromptPart;
    if (level === 'all') {
      levelPromptPart = `Difficulty Levels targets:
- Easy: O-NET M.3 (Straightforward fill-in-the-blank, clear rules)
- Medium 1: O-NET M.6 (Rule application, common exceptions)
- Medium 2: O-NET M.6 / PAT (Multiple rules in context, sentence-level)
- Hard 1: PAT 1/2, A-Level (Tricky edge cases, paragraph context)
- Hard 2: IELTS/TOEFL (Nuanced, deceptive distractors, academic register)`;
    } else {
      const details = levelDetails[level] || { label: level, target: 'General', style: 'Standard multiple choice' };
      levelPromptPart = `Difficulty Level: ${details.label}
Exam Target: ${details.target}
Style Guide: ${details.style}`;
    }

    const selectedTopicObj = categoryTopics.find(t => Number(t.id) === Number(topic));
    const topicTitle = topic === 'all' ? 'All Topics' : (selectedTopicObj?.title || topic);
    const difficultyText = level === 'all' ? 'All Levels' : level;

    return `Act as an expert English assessment writer for Thai learners.
Generate ${questionsCount} multiple-choice English learning questions for the category: "${categoryTitle}" and topic: "${topicTitle}" at ${difficultyText} difficulty level.

${levelPromptPart}

Requirements:
- Target user: Thai beginner/intermediate learner.
- Use natural, practical English.
- Prioritize daily conversation and common real-life usage.
- 4 answer choices per question, exactly 1 correct answer.
- Include short English explanation (explanation) and comprehensive Thai explanation (explanationTh).
- For EVERY question, the Thai explanation (explanationTh) MUST include the Thai meanings of all key vocabulary words from the question and ALL four answer choices.
- For "Reading" category, include a short passage before the questions if appropriate, or make each question a mini-reading task.
- For "Vocabulary" category:
  * Focus on word usage in context.
  * Ensure the Thai explanation contains a clear "Vocabulary List" style breakdown of all answer options and key terms from the question text.
- For "Grammar" category, focus on the specific rule of the topic.
- Do NOT prefix the question with phrases like "Complete:" or wrap it in single/double quotes. Write the question sentence directly (e.g., "She ___ a doctor at the hospital." instead of "Complete: 'She ___ a doctor at the hospital.'").`;
  };

  return (
    <div className="cms-page-content animate-fade-in cms-generate-page">
      {/* Header */}
      <div className="cms-section-header-row">
        <div>
          <h2 className="cms-section-title">AI Content Generation</h2>
          <p className="cms-section-subtitle">Scale your curriculum with Gemini-powered bulk question generation.</p>
        </div>
      </div>

      {/* Generation Overlay */}
      {isGeneratingBulk && (
        <div className="ai-generation-overlay">
          <div className="ai-loader-card">
            <div className="ai-spinner"></div>
            <h5>Generating Content...</h5>
            <p>{generationProgressMsg}</p>
          </div>
        </div>
      )}


      {/* Config Card */}
      <div className="cms-card cms-ai-config-card">
        <div className="cms-card-header">
          <h3 className="cms-card-title">⚡ Generation Configuration</h3>
        </div>

        <div className="bulk-settings-form">
          {/* 1. Category Selection */}
          <div className="form-group-cms">
            <label>1. TARGET CATEGORY</label>
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setTopic('all'); // Reset topic when category changes
              }}
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>

          {/* 2. Topic Selection */}
          <div className="form-group-cms">
            <label>2. TARGET TOPIC</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="all">All Topics in Category</option>
              {categoryTopics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>

          {/* 3. Level Selection */}
          <div className="form-group-cms">
            <label>3. DIFFICULTY LEVEL</label>
            <div className="pills-selector" style={{ flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`pill-select-btn ${level === 'all' ? 'active' : ''}`}
                onClick={() => setLevel('all')}
                style={{ minWidth: '80px' }}
              >
                ALL LEVELS
              </button>
              {levelList.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={`pill-select-btn ${level === l ? 'active' : ''}`}
                  onClick={() => setLevel(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Number of Questions */}
          <div className="form-group-cms">
            <label>4. QUESTIONS PER SLOT</label>
            <div className="pills-selector" style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 5, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`pill-select-btn ${questionsCount === num ? 'active' : ''}`}
                  onClick={() => setQuestionsCount(num)}
                  style={{ flex: 1, padding: '10px 0', minWidth: '0' }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Fill Mode (Checkbox/Toggle style) */}
          <div className="zero-questions-box" style={{ marginTop: '4px' }}>
            <div className="box-checkbox-row">
              <input
                type="checkbox"
                id="onlyZeroQs"
                checked={onlyZero}
                onChange={(e) => setOnlyZero(e.target.checked)}
              />
              <label htmlFor="onlyZeroQs"><strong>Only Fill Empty Slots</strong></label>
              <span className="cms-badge-recommended" style={{ backgroundColor: '#1A73E8', color: '#FFF' }}>Recommended</span>
            </div>
            <p style={{ margin: '6px 0 0 24px', fontSize: '12px', color: '#B45309' }}>
              {onlyZero
                ? "Safely bypasses topics/levels that already contain questions."
                : "WARNING: This will overwrite and replace existing questions for the selected targets."}
            </p>
          </div>

          {/* 5. Collapsible Prompt Preview Drawer */}
          <div className="prompt-preview-container" style={{ border: '1px solid #dadce0', borderRadius: '8px', overflow: 'hidden' }}>
            <button
              type="button"
              className="prompt-preview-toggle-btn"
              onClick={() => setShowPromptPreview(p => !p)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '12px 16px',
                background: '#f8f9fa',
                border: 'none',
                borderBottom: showPromptPreview ? '1px solid #dadce0' : 'none',
                fontFamily: 'inherit',
                fontWeight: '700',
                fontSize: '13px',
                color: '#4a4a4a',
                cursor: 'pointer'
              }}
            >
              <span>🔍 Gemini Prompt Preview</span>
              <span>{showPromptPreview ? 'Hide ▴' : 'Show ▾'}</span>
            </button>
            {showPromptPreview && (
              <div className="prompt-preview-content" style={{ padding: '16px', background: '#fafafa', maxHeight: '250px', overflowY: 'auto' }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '11px', fontFamily: 'Courier, monospace', color: '#333', lineHeight: '1.5' }}>
                  {getPromptPreviewText()}
                </pre>
              </div>
            )}
          </div>

          {/* 7. Generate Trigger */}
          <button
            className="btn btn-primary btn-cms-bulk-generate"
            disabled={tasksToProcess.length === 0}
            onClick={handleTriggerBulkGeneration}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '700',
              backgroundColor: tasksToProcess.length === 0 ? '#dadce0' : 'var(--color-orange)',
              borderColor: tasksToProcess.length === 0 ? '#dadce0' : 'var(--color-orange)',
              color: tasksToProcess.length === 0 ? '#999' : '#fff',
              cursor: tasksToProcess.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ⚡ Generate {questionsCount} Questions Per Slot ({tasksToProcess.length} Slots)
          </button>
        </div>
      </div>
    </div>
  );
}
