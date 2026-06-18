import React, { useState } from 'react';

export default function AiDraftSection({
  categories,
  units,
  dispatch,
  draftQuestions,
  setDraftQuestions,
  handleStartQuestionEdit,
  triggerConfirm,
  showToast
}) {
  // Local Settings State
  const [aiCategory, setAiCategory] = useState(categories[0]?.id || 'grammar-foundation');
  const [aiDifficulty, setAiDifficulty] = useState('easy'); // 'easy', 'medium', 'hard'
  const [aiCount, setAiCount] = useState(10);
  const [aiOnlyZero, setAiOnlyZero] = useState(true);
  const [aiMode, setAiMode] = useState('bulk'); // 'draft', 'bulk'

  // Local Processing State
  const [isGeneratingBulk, setIsGeneratingBulk] = useState(false);
  const [generationProgressMsg, setGenerationProgressMsg] = useState('');

  // Determine topics to process
  const categoryTopics = units.filter(u => u.category === aiCategory);
  const topicsCount = categoryTopics.length;

  let targetLevelId = 'easy';
  if (aiDifficulty === 'medium') targetLevelId = 'medium1';
  if (aiDifficulty === 'hard') targetLevelId = 'hard1';

  const zeroQuestionTopics = categoryTopics.filter(u => {
    const lvl = u.levels.find(l => l.id === targetLevelId);
    return !lvl || !lvl.questions || lvl.questions.length === 0;
  });

  const topicsToProcess = aiOnlyZero ? zeroQuestionTopics.length : topicsCount;
  const totalGeneratedQs = topicsToProcess * aiCount;

  // AI Bulk/Draft Generator trigger
  const handleTriggerBulkGeneration = () => {
    setIsGeneratingBulk(true);
    setGenerationProgressMsg('Connecting to AI drafting queue...');

    const topicsToProcessList = aiOnlyZero ? zeroQuestionTopics : categoryTopics;

    setTimeout(() => {
      setGenerationProgressMsg('Validating selected nodes and topic counts...');
      setTimeout(() => {
        setGenerationProgressMsg('Generating questions schemas...');
        setTimeout(() => {
          if (aiMode === 'draft') {
            const generated = [];
            topicsToProcessList.forEach(unit => {
              const catObj = categories.find(c => c.id === unit.category);
              for (let i = 0; i < aiCount; i++) {
                generated.push({
                  id: `draft-${Date.now()}-${unit.id}-${i}-${Math.random().toString(36).substr(2, 9)}`,
                  question: `Draft question #${i+1} for ${unit.title} (${aiDifficulty})`,
                  options: [`Option A for ${unit.title}`, `Option B for ${unit.title}`, `Option C for ${unit.title}`],
                  correctAnswer: `Option A for ${unit.title}`,
                  unitId: unit.id,
                  unitTitle: unit.title,
                  categoryId: unit.category,
                  categoryTitle: catObj?.title || unit.category,
                  difficulty: aiDifficulty.toUpperCase()
                });
              }
            });
            setDraftQuestions(prev => [...prev, ...generated]);
            setIsGeneratingBulk(false);
            setGenerationProgressMsg('');
            showToast(`Draft questions successfully generated! Review them below.`);
          } else {
            dispatch({
              type: 'BULK_GENERATE_CMS',
              categoryId: aiCategory,
              difficultyLevel: aiDifficulty,
              questionsPerTopic: aiCount,
              onlyZero: aiOnlyZero
            });
            setIsGeneratingBulk(false);
            setGenerationProgressMsg('');
            showToast('Bulk questions successfully injected into active database!');
          }
        }, 800);
      }, 700);
    }, 700);
  };

  const handleApproveDraft = (dq) => {
    const unitId = dq.unitId;
    const targetUnit = units.find(u => Number(u.id) === Number(unitId));
    if (!targetUnit) return;

    let targetLevelId = 'easy';
    if (dq.difficulty === 'MEDIUM') targetLevelId = 'medium1';
    if (dq.difficulty === 'HARD') targetLevelId = 'hard1';

    const targetLevel = targetUnit.levels.find(l => l.id === targetLevelId);
    if (!targetLevel) return;

    const newQ = {
      id: `q-approved-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      question: dq.question,
      options: dq.options,
      correctAnswer: dq.correctAnswer
    };

    const updatedQuestions = [...(targetLevel.questions || []), newQ];

    dispatch({
      type: 'UPDATE_LEVEL_QUESTIONS',
      unitId,
      levelId: targetLevelId,
      questions: updatedQuestions
    });

    setDraftQuestions(prev => prev.filter(item => item.id !== dq.id));
    showToast('Question approved and added to active database.');
  };

  const handleDiscardDraft = (id) => {
    setDraftQuestions(prev => prev.filter(item => item.id !== id));
    showToast('Draft question discarded.');
  };

  const handleApproveAllDrafts = () => {
    if (draftQuestions.length === 0) return;

    const grouped = {};
    draftQuestions.forEach(dq => {
      let targetLevelId = 'easy';
      if (dq.difficulty === 'MEDIUM') targetLevelId = 'medium1';
      if (dq.difficulty === 'HARD') targetLevelId = 'hard1';

      const key = `${dq.unitId}|${targetLevelId}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push({
        id: `q-approved-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        question: dq.question,
        options: dq.options,
        correctAnswer: dq.correctAnswer
      });
    });

    Object.keys(grouped).forEach(key => {
      const [unitId, levelId] = key.split('|');
      const targetUnit = units.find(u => Number(u.id) === Number(unitId));
      if (!targetUnit) return;

      const targetLevel = targetUnit.levels.find(l => l.id === levelId);
      if (!targetLevel) return;

      const updatedQuestions = [...(targetLevel.questions || []), ...grouped[key]];

      dispatch({
        type: 'UPDATE_LEVEL_QUESTIONS',
        unitId,
        levelId,
        questions: updatedQuestions
      });
    });

    setDraftQuestions([]);
    showToast(`All ${draftQuestions.length} draft questions approved and saved.`);
  };

  const handleDiscardAllDrafts = () => {
    triggerConfirm({
      title: 'Discard All Drafts',
      message: `Are you sure you want to discard all ${draftQuestions.length} draft questions currently in the queue?`,
      confirmText: 'Discard All',
      isDanger: true,
      onConfirm: () => {
        setDraftQuestions([]);
        showToast('All draft questions discarded.');
      }
    });
  };

  return (
    <div className="cms-page-content animate-fade-in">
      <div className="cms-section-header-row">
        <div>
          <h2 className="cms-section-title">AI Content Generation</h2>
          <p className="cms-section-subtitle">Scale your curriculum with AI-powered draft and bulk generation.</p>
        </div>

        <div className="ai-mode-toggles">
          <button
            className={`mode-toggle-btn ${aiMode === 'draft' ? 'active' : ''}`}
            onClick={() => setAiMode('draft')}
          >
            Draft Mode
          </button>
          <button
            className={`mode-toggle-btn ${aiMode === 'bulk' ? 'active' : ''}`}
            onClick={() => setAiMode('bulk')}
          >
            Bulk Mode
          </button>
        </div>
      </div>

      {isGeneratingBulk && (
        <div className="ai-generation-overlay">
          <div className="ai-loader-card">
            <div className="ai-spinner"></div>
            <h5>Generating Content...</h5>
            <p>{generationProgressMsg}</p>
          </div>
        </div>
      )}

      <div className="cms-grid-two-columns">
        {/* Left panel: Bulk Settings */}
        <div className="cms-card">
          <div className="cms-card-header">
            <h3 className="cms-card-title">⚡ {aiMode === 'draft' ? 'Draft Settings' : 'Bulk Settings'}</h3>
          </div>

          <div className="bulk-settings-form">
            <div className="form-group-cms">
              <label>TARGET CATEGORY</label>
              <select
                value={aiCategory}
                onChange={(e) => setAiCategory(e.target.value)}
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>

            <div className="form-group-cms">
              <label>DIFFICULTY LEVEL</label>
              <div className="pills-selector">
                {['easy', 'medium', 'hard'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`pill-select-btn ${aiDifficulty === d ? 'active' : ''}`}
                    onClick={() => setAiDifficulty(d)}
                  >
                    {d.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group-cms">
              <label>QUESTIONS PER TOPIC</label>
              <select
                value={aiCount}
                onChange={(e) => setAiCount(Number(e.target.value))}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
              </select>
            </div>

            <div className="zero-questions-box">
              <div className="box-checkbox-row">
                <input
                  type="checkbox"
                  id="onlyZeroQs"
                  checked={aiOnlyZero}
                  onChange={(e) => setAiOnlyZero(e.target.checked)}
                />
                <label htmlFor="onlyZeroQs"><strong>Only Zero Questions</strong></label>
                <span className="cms-badge-recommended">Recommended</span>
              </div>
            </div>

            {/* Stats Block */}
            <div className="bulk-stats-box">
              <div className="stat-row">
                <span>Topics found:</span>
                <strong>{topicsCount}</strong>
              </div>
              <div className="stat-row">
                <span>Topics to process:</span>
                <strong>{topicsToProcess}</strong>
              </div>
              <div className="stat-row">
                <span>Total generated questions:</span>
                <strong>{totalGeneratedQs}</strong>
              </div>
            </div>

            <button
              className="btn btn-primary btn-cms-bulk-generate"
              disabled={topicsToProcess === 0}
              onClick={handleTriggerBulkGeneration}
            >
              {aiMode === 'draft' ? '🚀 Generate AI Drafts' : '⚡ Inject Bulk Questions'}
            </button>
          </div>
        </div>

        {/* Right panel: Information */}
        <div className="cms-card info-card">
          <div className="cms-card-header">
            <h3 className="cms-card-title">📖 Content Architecture Guide</h3>
          </div>
          <div className="bulk-intro-view">
            <p className="intro-subtitle">How AI Generation Works</p>
            <div className="intro-features">
              <div className="feature-item-box">
                <span className="intro-icon">📝</span>
                <div>
                  <h6>Draft Mode</h6>
                  <p>Generates mock schemas and enqueues them in the Draft Review Queue for manual proofreading before DB injection.</p>
                </div>
              </div>
              <div className="feature-item-box">
                <span className="intro-icon">⚡</span>
                <div>
                  <h6>Bulk Mode</h6>
                  <p>Bypasses the staging queue, injecting the generated questions immediately into the active database.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draft Questions Review Queue Section */}
      {aiMode === 'draft' && draftQuestions.length > 0 && (
        <div className="cms-card animate-fade-in" style={{ marginTop: '16px' }}>
          <div className="cms-card-header" style={{ borderBottom: 'none', marginBottom: '8px' }}>
            <div style={{ textAlign: 'left' }}>
              <h3 className="cms-card-title">📋 Draft Review Queue</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--color-text-light)' }}>
                Review, edit, or reject the following {draftQuestions.length} AI-generated question drafts before saving.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary btn-danger-outline" onClick={handleDiscardAllDrafts}>
                🗑️ Discard All
              </button>
              <button className="btn btn-primary" onClick={handleApproveAllDrafts}>
                ✓ Approve & Save All ({draftQuestions.length})
              </button>
            </div>
          </div>

          <div className="cms-table-wrapper scrollbar" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table className="cms-table text-left">
              <thead>
                <tr>
                  <th className="th-topic-level">TOPIC & LEVEL</th>
                  <th className="th-draft-question-content">DRAFT QUESTION CONTENT</th>
                  <th className="th-draft-actions">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {draftQuestions.map((dq) => (
                  <tr key={dq.id}>
                    <td style={{ width: '220px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span className="cms-topic-cell-title">{dq.unitTitle}</span>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-light)' }}>{dq.categoryTitle}</span>
                        <span className={`cms-difficulty-badge-text ${dq.difficulty.toLowerCase()}`} style={{ width: 'fit-content' }}>
                          {dq.difficulty}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="cms-q-content-cell">
                        <span className="cms-q-text-bold">{dq.question}</span>
                        <div className="cms-q-options-row">
                          {dq.options.map((opt) => {
                            const isCorrect = opt === dq.correctAnswer;
                            return (
                              <span
                                key={opt}
                                className={`cms-q-option-pill ${isCorrect ? 'correct' : ''}`}
                              >
                                {opt}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </td>
                    <td style={{ width: '120px' }}>
                      <div className="action-buttons-cell">
                        <button
                          className="icon-action-btn edit"
                          title="Edit Draft"
                          onClick={() => handleStartQuestionEdit(dq)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil cms-draft-edit-icon">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                          </svg>
                        </button>
                        <button
                          className="icon-action-btn approve"
                          title="Approve Draft"
                          onClick={() => handleApproveDraft(dq)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check cms-draft-approve-icon">
                            <path d="M20 6 9 17l-5-5"/>
                          </svg>
                        </button>
                        <button
                          className="icon-action-btn delete"
                          title="Discard Draft"
                          onClick={() => handleDiscardDraft(dq.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 cms-draft-discard-icon">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            <line x1="10" x2="10" y1="11" y2="17"/>
                            <line x1="14" x2="14" y1="11" y2="17"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
