import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser, useUserDispatch } from '../data/userStore';
import {
  HomeIcon,
  LeaderboardIcon,
  ProfileIcon,
  LettersIcon,
  GearIcon,
  BookIcon,
  CategoriesIcon,
  PracticeIcon,
  QuestsIcon
} from '../components/icons';
import './AdminPage.css';

export default function AdminPage() {
  const user = useUser();
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract mock lists from user context
  const categories = user.categories || [];
  const units = user.units || [];
  const mockUsers = user.mockUsers || [];
  const feedbacks = user.feedbacks || [];
  const auditLogs = user.auditLogs || [];

  // Parse deep-link parameter or default to 'dashboard'
  const getActiveSection = () => {
    const path = location.pathname;
    if (path.includes('/admin/progress')) return 'progress';
    if (path.includes('/admin/search')) return 'search';
    if (path.includes('/admin/generate')) return 'generate';
    if (path.includes('/admin/feedback')) return 'feedback';
    if (path.includes('/admin/topics')) return 'topics';
    if (path.includes('/admin/users')) return 'users';
    return 'dashboard';
  };

  const activeSection = getActiveSection();

  const handleNavigateSection = (sectionId) => {
    if (sectionId === 'dashboard') {
      navigate('/admin');
    } else {
      navigate(`/admin/${sectionId}`);
    }
  };

  // ==========================================
  // STATE MANAGEMENT FOR SUB-PAGES
  // ==========================================

  // 1. User Progress States
  const [selectedUserId, setSelectedUserId] = useState(mockUsers[0]?.uid || 'admin-1');
  const [progressSearchTerm, setProgressSearchTerm] = useState('');

  // 2. Search Content States
  const [searchQuestionQuery, setSearchQuestionQuery] = useState('');
  const [searchCategoryFilter, setSearchCategoryFilter] = useState('all');
  const [searchTopicFilter, setSearchTopicFilter] = useState('all');
  const [searchDifficultyFilter, setSearchDifficultyFilter] = useState('all');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [editingQuestionObj, setEditingQuestionObj] = useState(null);
  const [eqText, setEqText] = useState('');
  const [eqOpt1, setEqOpt1] = useState('');
  const [eqOpt2, setEqOpt2] = useState('');
  const [eqOpt3, setEqOpt3] = useState('');
  const [eqCorrect, setEqCorrect] = useState('');

  // 3. AI Content Gen States
  const [aiCategory, setAiCategory] = useState(categories[0]?.id || 'grammar-foundation');
  const [aiDifficulty, setAiDifficulty] = useState('easy'); // 'easy', 'medium', 'hard'
  const [aiCount, setAiCount] = useState(10);
  const [aiOnlyZero, setAiOnlyZero] = useState(true);
  const [aiMode, setAiMode] = useState('bulk'); // 'draft', 'bulk'
  const [isGeneratingBulk, setIsGeneratingBulk] = useState(false);
  const [generationProgressMsg, setGenerationProgressMsg] = useState('');

  // 4. Topic Management States
  const [selectedTopicCatId, setSelectedTopicCatId] = useState(categories[0]?.id || 'grammar-foundation');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatColor, setNewCatColor] = useState('#58CC02');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');

  // 5. User Management States
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');

  // 6. Custom Modals & Toasts States
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    isDanger: false
  });
  const [toast, setToast] = useState({ show: false, message: '' });

  // 7. Draft Questions State
  const [draftQuestions, setDraftQuestions] = useState([]);

  // 8. Edit Topic States
  const [showEditTopicModal, setShowEditTopicModal] = useState(false);
  const [editingTopicObj, setEditingTopicObj] = useState(null);
  const [etTitle, setEtTitle] = useState('');
  const [etDesc, setEtDesc] = useState('');

  // Toast helper
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  // Confirm helper
  const triggerConfirm = (options) => {
    setConfirmModal({
      isOpen: true,
      title: options.title || 'Confirm Action',
      message: options.message || 'Are you sure you want to proceed?',
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel',
      isDanger: !!options.isDanger,
      onConfirm: () => {
        options.onConfirm();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  // Extract all questions in a single listing for the Search page
  const getAllQuestionsList = () => {
    const list = [];
    units.forEach(unit => {
      const catObj = categories.find(c => c.id === unit.category);
      unit.levels.forEach(level => {
        if (level.questions) {
          level.questions.forEach(q => {
            list.push({
              ...q,
              unitId: unit.id,
              unitTitle: unit.title,
              categoryId: unit.category,
              categoryTitle: catObj?.title || unit.category,
              difficulty: level.id.includes('easy') ? 'EASY' : level.id.includes('medium') ? 'MEDIUM' : 'HARD'
            });
          });
        }
      });
    });
    return list;
  };

  const allQuestions = getAllQuestionsList();

  // Handle saving question edits from the search table modal
  const handleSaveQuestionEdit = (e) => {
    e.preventDefault();
    if (!editingQuestionObj) return;

    const options = [eqOpt1, eqOpt2];
    if (eqOpt3.trim()) options.push(eqOpt3);

    // If it is a draft question (local state only)
    if (editingQuestionObj.id.toString().startsWith('draft-')) {
      setDraftQuestions(prev => prev.map(q => {
        if (q.id === editingQuestionObj.id) {
          return {
            ...q,
            question: eqText,
            options,
            correctAnswer: eqCorrect
          };
        }
        return q;
      }));
      setShowEditQuestionModal(false);
      setEditingQuestionObj(null);
      showToast('Draft question updated.');
      return;
    }

    // Find unit
    const unitId = editingQuestionObj.unitId;
    const targetUnit = units.find(u => Number(u.id) === Number(unitId));
    if (!targetUnit) return;

    // Find level
    let targetLevelId = 'easy';
    if (editingQuestionObj.difficulty === 'MEDIUM') targetLevelId = 'medium1';
    if (editingQuestionObj.difficulty === 'HARD') targetLevelId = 'hard1';

    const targetLevel = targetUnit.levels.find(l => l.id === targetLevelId);
    if (!targetLevel) return;

    const updatedQuestions = targetLevel.questions.map(q => {
      if (q.id === editingQuestionObj.id) {
        return {
          ...q,
          question: eqText,
          options,
          correctAnswer: eqCorrect
        };
      }
      return q;
    });

    dispatch({
      type: 'UPDATE_LEVEL_QUESTIONS',
      unitId,
      levelId: targetLevelId,
      questions: updatedQuestions
    });

    setShowEditQuestionModal(false);
    setEditingQuestionObj(null);
    showToast('Question details saved.');
  };

  const handleStartQuestionEdit = (q) => {
    setEditingQuestionObj(q);
    setEqText(q.question);
    setEqOpt1(q.options[0] || '');
    setEqOpt2(q.options[1] || '');
    setEqOpt3(q.options[2] || '');
    setEqCorrect(q.correctAnswer);
    setShowEditQuestionModal(true);
  };

  const handleDeleteQuestion = (q) => {
    // If it is a draft question
    if (q.id.toString().startsWith('draft-')) {
      triggerConfirm({
        title: 'Discard Draft Question',
        message: 'Are you sure you want to discard this draft question?',
        confirmText: 'Discard',
        isDanger: true,
        onConfirm: () => {
          setDraftQuestions(prev => prev.filter(item => item.id !== q.id));
          showToast('Draft question discarded.');
        }
      });
      return;
    }

    triggerConfirm({
      title: 'Delete Question',
      message: 'Are you sure you want to permanently delete this question from the active database? This action cannot be undone.',
      confirmText: 'Delete',
      isDanger: true,
      onConfirm: () => {
        let targetLevelId = 'easy';
        if (q.difficulty === 'MEDIUM') targetLevelId = 'medium1';
        if (q.difficulty === 'HARD') targetLevelId = 'hard1';

        const targetUnit = units.find(u => Number(u.id) === Number(q.unitId));
        if (!targetUnit) return;

        const targetLevel = targetUnit.levels.find(l => l.id === targetLevelId);
        if (!targetLevel) return;

        const updatedQs = targetLevel.questions.filter(item => item.id !== q.id);
        dispatch({
          type: 'UPDATE_LEVEL_QUESTIONS',
          unitId: q.unitId,
          levelId: targetLevelId,
          questions: updatedQs
        });
        showToast('Question deleted from database.');
      }
    });
  };

  // Start Topic Editing
  const handleStartTopicEdit = (topic) => {
    setEditingTopicObj(topic);
    setEtTitle(topic.title);
    setEtDesc(topic.description);
    setShowEditTopicModal(true);
  };

  // Save Topic Edit Handler
  const handleSaveTopicEdit = (e) => {
    e.preventDefault();
    if (!editingTopicObj) return;

    dispatch({
      type: 'UPDATE_TOPIC',
      unitId: editingTopicObj.id,
      title: etTitle,
      description: etDesc
    });

    setShowEditTopicModal(false);
    setEditingTopicObj(null);
    showToast('Topic updated successfully.');
  };

  // Add Category Handler
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCatTitle.trim()) return;
    dispatch({
      type: 'ADD_CATEGORY',
      title: newCatTitle,
      description: newCatDesc,
      color: newCatColor
    });
    setNewCatTitle('');
    setNewCatDesc('');
    setShowAddCategoryModal(false);
  };

  // Add Topic (Unit) Handler
  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;
    dispatch({
      type: 'ADD_TOPIC',
      categoryId: selectedTopicCatId,
      title: newTopicTitle,
      description: newTopicDesc
    });
    setNewTopicTitle('');
    setNewTopicDesc('');
    setShowAddTopicModal(false);
  };

  // AI Bulk/Draft Generator triggers
  const handleTriggerBulkGeneration = () => {
    setIsGeneratingBulk(true);
    setGenerationProgressMsg('Connecting to AI drafting queue...');

    const categoryTopics = units.filter(u => u.category === aiCategory);
    let targetLevelId = 'easy';
    if (aiDifficulty === 'medium') targetLevelId = 'medium1';
    if (aiDifficulty === 'hard') targetLevelId = 'hard1';

    const zeroQuestionTopics = categoryTopics.filter(u => {
      const lvl = u.levels.find(l => l.id === targetLevelId);
      return !lvl || !lvl.questions || lvl.questions.length === 0;
    });

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

  // CSV Export Functionality
  const handleExportCSV = () => {
    const filteredQuestions = allQuestions.filter(q => {
      const matchQuery = q.question.toLowerCase().includes(searchQuestionQuery.toLowerCase());
      const matchCategory = searchCategoryFilter === 'all' || q.categoryId === searchCategoryFilter;
      const matchTopic = searchTopicFilter === 'all' || Number(q.unitId) === Number(searchTopicFilter);
      const matchDifficulty = searchDifficultyFilter === 'all' || q.difficulty === searchDifficultyFilter.toUpperCase();
      return matchQuery && matchCategory && matchTopic && matchDifficulty;
    });

    if (filteredQuestions.length === 0) {
      showToast('No questions found matching current filters to export.');
      return;
    }

    const escapeCSV = (text) => {
      if (text === null || text === undefined) return '';
      const str = String(text);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headers = ['Question ID', 'Category', 'Topic', 'Difficulty', 'Question Text', 'Option A', 'Option B', 'Option C', 'Correct Answer'];
    const rows = filteredQuestions.map(q => [
      q.id,
      q.categoryTitle,
      q.unitTitle,
      q.difficulty,
      q.question,
      q.options[0] || '',
      q.options[1] || '',
      q.options[2] || '',
      q.correctAnswer
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(escapeCSV).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `gogram_questions_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Successfully exported ${filteredQuestions.length} questions as CSV.`);
  };

  // ==========================================
  // VIEW RENDERING
  // ==========================================

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboardHome();
      case 'progress':
        return renderUserProgress();
      case 'search':
        return renderSearchContent();
      case 'generate':
        return renderAiDraftGen();
      case 'feedback':
        return renderUserFeedback();
      case 'topics':
        return renderTopicManagement();
      case 'users':
        return renderUserManagement();
      default:
        return renderDashboardHome();
    }
  };

  // 1. Sub-page: Dashboard Overview
  const renderDashboardHome = () => {
    const totalLearners = mockUsers.length;
    const premiumUsers = mockUsers.filter(u => u.authLevel === 'subscribed').length;
    const premiumRatio = totalLearners > 0 ? Math.round((premiumUsers / totalLearners) * 100) : 0;
    const totalQs = allQuestions.length;

    return (
      <div className="cms-page-content animate-fade-in">
        <h2 className="cms-section-title">CMS Dashboard</h2>
        <p className="cms-section-subtitle">System Overview and Key Metrics</p>

        {/* Dashboard KPIs */}
        <div className="cms-dashboard-kpis">
          <div className="kpi-card">
            <div className="kpi-icon-wrapper" style={{ background: '#E0E7FF', color: '#4F46E5' }}>👥</div>
            <div className="kpi-details">
              <span className="kpi-label">Total Learners</span>
              <span className="kpi-value">{totalLearners}</span>
              <span className="kpi-trend green">↑ 12% this week</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrapper" style={{ background: '#ECFDF5', color: '#10B981' }}>💎</div>
            <div className="kpi-details">
              <span className="kpi-label">Pro Users</span>
              <span className="kpi-value">{premiumUsers} <span className="kpi-subtext">({premiumRatio}%)</span></span>
              <span className="kpi-trend green">↑ 3% this month</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrapper" style={{ background: '#FFFBEB', color: '#F59E0B' }}>📝</div>
            <div className="kpi-details">
              <span className="kpi-label">Active Questions</span>
              <span className="kpi-value">{totalQs}</span>
              <span className="kpi-trend">Live across categories</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrapper" style={{ background: '#FDF2F8', color: '#EC4899' }}>⭐</div>
            <div className="kpi-details">
              <span className="kpi-label">User Feedbacks</span>
              <span className="kpi-value">{feedbacks.length} items</span>
              <span className="kpi-trend">Avg Rating: 4.0 / 5.0</span>
            </div>
          </div>
        </div>

        {/* Audit Log Feed */}
        <div className="cms-grid-two-columns">
          <div className="cms-card full-width">
            <div className="card-header">
              <h3 className="card-title">System Audit Logs</h3>
              <span className="badge-info">Latest Actions</span>
            </div>
            <div className="cms-table-wrapper" style={{ maxHeight: '380px', overflowY: 'auto' }}>
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>Administrator</th>
                    <th>Action Detail</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td><strong>{log.adminName}</strong></td>
                      <td>{log.action}</td>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                  {auditLogs.length === 0 && (
                    <tr>
                      <td colSpan="3" className="no-data">No system logs available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Sub-page: User Progress (Screenshot #1)
  const renderUserProgress = () => {
    // Filter learners list
    const filteredLearners = mockUsers.filter(u =>
      u.name.toLowerCase().includes(progressSearchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(progressSearchTerm.toLowerCase())
    );

    const selectedUser = mockUsers.find(u => u.uid === selectedUserId) || mockUsers[0];

    return (
      <div className="cms-page-content animate-fade-in">
        <h2 className="cms-section-title">User Progress</h2>
        <p className="cms-section-subtitle">Monitor learning activities and track student performance.</p>

        <div className="cms-split-layout">
          {/* Left panel: Learners List */}
          <div className="cms-left-panel">
            <div className="panel-search">
              <input
                type="text"
                placeholder="Search users..."
                value={progressSearchTerm}
                onChange={(e) => setProgressSearchTerm(e.target.value)}
              />
            </div>
            <div className="learners-list-header">
              <span>LEARNERS</span>
              <span>🔍</span>
            </div>
            <div className="learners-list scrollbar">
              {filteredLearners.map((learner) => {
                const isSelected = learner.uid === selectedUserId;
                const initials = learner.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                return (
                  <div
                    key={learner.uid}
                    className={`learner-item-card ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedUserId(learner.uid)}
                  >
                    <div className="learner-avatar-circle">
                      {initials}
                    </div>
                    <div className="learner-details">
                      <span className="learner-name">{learner.name}</span>
                      <span className="learner-email">{learner.email}</span>
                    </div>
                    <span className="arrow-icon">›</span>
                  </div>
                );
              })}
              {filteredLearners.length === 0 && (
                <div className="no-data">No users match search criteria.</div>
              )}
            </div>
          </div>

          {/* Right panel: User details Progress */}
          <div className="cms-right-panel">
            {selectedUser ? (
              <div className="learner-details-card">
                <div className="learner-details-header">
                  <div className="learner-identity">
                    <div className="large-avatar-circle">
                      {selectedUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div className="identity-text">
                      <h3>{selectedUser.name}</h3>
                      <p className="joined-date">Joined {new Date(selectedUser.joined).toLocaleDateString()}</p>
                      <span className={`tier-badge ${selectedUser.authLevel}`}>
                        {selectedUser.authLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn-reset-progress"
                    onClick={() => {
                      triggerConfirm({
                        title: 'Reset User Progress',
                        message: `Are you sure you want to reset all learning progress for ${selectedUser.name}? This will wipe their category scores and completed lesson keys.`,
                        confirmText: 'Reset Progress',
                        isDanger: true,
                        onConfirm: () => {
                          categories.forEach(c => {
                            dispatch({
                              type: 'RESET_USER_PROGRESS_IN_CATEGORY',
                              userId: selectedUser.uid,
                              categoryId: c.id,
                              isCurrentUser: selectedUser.uid === 'admin-1'
                            });
                          });
                          showToast(`Learning progress has been reset for ${selectedUser.name}.`);
                        }
                      });
                    }}
                  >
                    🔄 RESET PROGRESS
                  </button>
                </div>

                <div className="topic-breakdown-section">
                  <h4 className="breakdown-title">TOPIC BREAKDOWN</h4>
                  <div className="breakdown-list">
                    {categories.map((cat) => {
                      // Total questions count for this category
                      const totalQsInCat = units
                        .filter(u => u.category === cat.id)
                        .reduce((sum, u) => sum + u.levels.reduce((ls, l) => ls + (l.questions?.length || 0), 0), 0);

                      // Topics (units) count for this category
                      const topicsCount = units.filter(u => u.category === cat.id).length;

                      // Completed questions count
                      let completedCount = selectedUser.progress?.[cat.id] || 0;

                      // Sync admin user progress with actual completion array
                      if (selectedUser.uid === 'admin-1') {
                        const catUnits = units.filter(un => un.category === cat.id);
                        completedCount = catUnits.reduce((sum, un) => {
                          return sum + un.levels.filter(l => user.completedLessons.includes(`${un.id}-${l.id}`)).length;
                        }, 0);
                      }

                      return (
                        <div key={cat.id} className="breakdown-item">
                          <div className="item-left">
                            <span className="toggle-bullet">›</span>
                            <span className="item-label">{cat.title}</span>
                          </div>
                          <div className="item-right">
                            <span className="item-ratio">{completedCount} / {totalQsInCat}</span>
                            <span className="item-separator">|</span>
                            <span className="item-topics-count">{topicsCount} Topics</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-selection-prompt">
                Select a user from the learners list to see progress breakdown.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 3. Sub-page: Search Content (Screenshot #5)
  const renderSearchContent = () => {
    // Filter questions list
    const filteredQuestions = allQuestions.filter(q => {
      const matchQuery = q.question.toLowerCase().includes(searchQuestionQuery.toLowerCase());
      const matchCategory = searchCategoryFilter === 'all' || q.categoryId === searchCategoryFilter;
      const matchTopic = searchTopicFilter === 'all' || Number(q.unitId) === Number(searchTopicFilter);
      const matchDifficulty = searchDifficultyFilter === 'all' || q.difficulty === searchDifficultyFilter.toUpperCase();
      return matchQuery && matchCategory && matchTopic && matchDifficulty;
    });

    const isAllSelected = filteredQuestions.length > 0 && selectedQuestions.length === filteredQuestions.length;

    const handleSelectAll = () => {
      if (isAllSelected) {
        setSelectedQuestions([]);
      } else {
        setSelectedQuestions(filteredQuestions.map(q => q.id));
      }
    };

    const handleToggleSelectQuestion = (id) => {
      if (selectedQuestions.includes(id)) {
        setSelectedQuestions(selectedQuestions.filter(qId => qId !== id));
      } else {
        setSelectedQuestions([...selectedQuestions, id]);
      }
    };

    return (
      <div className="cms-page-content animate-fade-in">
        <div className="section-header-row">
          <div>
            <h2 className="cms-section-title">Search Content</h2>
            <p className="cms-section-subtitle">Find, filter, and manage all content across the platform.</p>
          </div>
          <button className="btn-export-csv" onClick={handleExportCSV}>
            📥 Export CSV
          </button>
        </div>

        {/* Filters Bar */}
        <div className="search-filters-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by question text..."
              value={searchQuestionQuery}
              onChange={(e) => setSearchQuestionQuery(e.target.value)}
            />
          </div>

          <div className="filters-dropdowns">
            <select
              value={searchCategoryFilter}
              onChange={(e) => {
                setSearchCategoryFilter(e.target.value);
                setSearchTopicFilter('all'); // reset topic
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>

            <select
              value={searchTopicFilter}
              onChange={(e) => setSearchTopicFilter(e.target.value)}
            >
              <option value="all">All Topics</option>
              {units
                .filter(u => searchCategoryFilter === 'all' || u.category === searchCategoryFilter)
                .map(u => <option key={u.id} value={u.id}>{u.title}</option>)
              }
            </select>

            <select
              value={searchDifficultyFilter}
              onChange={(e) => setSearchDifficultyFilter(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Questions Table */}
        <div className="cms-card table-card">
          <div className="cms-table-wrapper scrollbar">
            <table className="cms-table text-left">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>QUESTION CONTENT</th>
                  <th>CATEGORY</th>
                  <th>TOPIC</th>
                  <th>DIFFICULTY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((q) => {
                  const isSelected = selectedQuestions.includes(q.id);
                  return (
                    <tr key={q.id} className={isSelected ? 'selected-row' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectQuestion(q.id)}
                        />
                      </td>
                      <td>
                        <div className="q-content-cell">
                          <span className="q-text-bold">{q.question}</span>
                          <div className="q-options-row">
                            {q.options.map((opt) => {
                              const isCorrect = opt === q.correctAnswer;
                              return (
                                <span
                                  key={opt}
                                  className={`q-option-pill ${isCorrect ? 'correct' : ''}`}
                                >
                                  {opt}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-cell-badge">{q.categoryTitle}</span>
                      </td>
                      <td>
                        <span className="topic-cell-title">{q.unitTitle}</span>
                      </td>
                      <td>
                        <span className={`difficulty-badge-text ${q.difficulty.toLowerCase()}`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons-cell">
                          <button className="icon-action-btn edit" title="Edit Question" onClick={() => handleStartQuestionEdit(q)}>
                            ✏️
                          </button>
                          <button className="icon-action-btn delete" title="Delete Question" onClick={() => handleDeleteQuestion(q)}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredQuestions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="no-data">No questions found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 4. Sub-page: AI Content Generation (Screenshot #3)
  const renderAiDraftGen = () => {
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

    return (
      <div className="cms-page-content animate-fade-in">
        <div className="section-header-row">
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
            <div className="card-header">
              <h3 className="card-title">⚡ {aiMode === 'draft' ? 'Draft Settings' : 'Bulk Settings'}</h3>
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
                  <span className="badge-recommended">Recommended</span>
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
                  <span>Total questions:</span>
                  <strong>{totalGeneratedQs}</strong>
                </div>
                {topicsToProcess === 0 && (
                  <p className="hint-alert-text">
                    All topics in this category already have {aiDifficulty} questions. Uncheck "Only Zero Questions" if you want to add more.
                  </p>
                )}
              </div>

              <button
                className={`btn btn-primary btn-cms-bulk-generate ${topicsToProcess === 0 ? 'disabled' : ''}`}
                onClick={handleTriggerBulkGeneration}
                disabled={topicsToProcess === 0 || isGeneratingBulk}
              >
                ⚡ {aiMode === 'draft' ? `Generate Draft ${totalGeneratedQs} Questions` : `Bulk Generate ${totalGeneratedQs} Questions`}
              </button>
            </div>
          </div>

          {/* Right panel: Information Card */}
          <div className="cms-card info-card">
            {aiMode === 'draft' ? (
              <div className="bulk-intro-view">
                <div className="intro-icon">📝</div>
                <h4>Draft Generation Mode</h4>
                <p className="intro-subtitle">Draft mode generates questions in a local queue so you can review them first.</p>

                <div className="intro-features">
                  <div className="feature-item-box">
                    <strong>PREVIEW BEFORE SAVE</strong>
                    <p>Generated questions appear in the queue table below. You can modify their texts, answers, or discard any that do not meet standards.</p>
                  </div>
                  <div className="feature-item-box">
                    <strong>BATCH APPROVAL</strong>
                    <p>Admins can approve individual draft questions one-by-one, or click "Approve All" to write the entire batch into the learning modules.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bulk-intro-view">
                <div className="intro-icon">⚡</div>
                <h4>Bulk Generation Mode</h4>
                <p className="intro-subtitle">Bulk mode generates and approves questions directly into the database.</p>

                <div className="intro-features">
                  <div className="feature-item-box">
                    <strong>HOW IT WORKS</strong>
                    <p>Iterates through every topic in the selected category and generates the requested number of difficulty-specific questions automatically.</p>
                  </div>
                  <div className="feature-item-box">
                    <strong>DIRECT APPROVAL</strong>
                    <p>Questions are saved as 'Approved' immediately and appear in the study sessions. Use Draft Mode if you want to preview before saving.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Draft Questions Review Queue Section */}
        {aiMode === 'draft' && draftQuestions.length > 0 && (
          <div className="cms-card animate-fade-in" style={{ marginTop: '16px' }}>
            <div className="card-header" style={{ borderBottom: 'none', marginBottom: '8px' }}>
              <div style={{ textAlign: 'left' }}>
                <h3 className="card-title">📋 Draft Review Queue</h3>
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
                    <th>TOPIC & LEVEL</th>
                    <th>DRAFT QUESTION CONTENT</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {draftQuestions.map((dq) => (
                    <tr key={dq.id}>
                      <td style={{ width: '220px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span className="topic-cell-title">{dq.unitTitle}</span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <span className="category-cell-badge">{dq.categoryTitle}</span>
                            <span className={`difficulty-badge-text ${dq.difficulty.toLowerCase()}`}>
                              {dq.difficulty}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="q-content-cell">
                          <span className="q-text-bold">{dq.question}</span>
                          <div className="q-options-row">
                            {dq.options.map((opt) => {
                              const isCorrect = opt === dq.correctAnswer;
                              return (
                                <span
                                  key={opt}
                                  className={`q-option-pill ${isCorrect ? 'correct' : ''}`}
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
                            ✏️
                          </button>
                          <button
                            className="icon-action-btn"
                            style={{ color: '#10B981', background: '#ECFDF5', fontSize: '14px', padding: '4px 8px', borderRadius: '6px' }}
                            title="Approve Draft"
                            onClick={() => handleApproveDraft(dq)}
                          >
                            ✓ Approve
                          </button>
                          <button
                            className="icon-action-btn delete"
                            title="Discard Draft"
                            onClick={() => handleDiscardDraft(dq.id)}
                          >
                            🗑️
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
  };

  // 5. Sub-page: User Feedback
  const renderUserFeedback = () => {
    return (
      <div className="cms-page-content animate-fade-in">
        <h2 className="cms-section-title">User Feedback</h2>
        <p className="cms-section-subtitle">Review learner comments, rating stars, and report tickets.</p>

        <div className="cms-card">
          <div className="cms-table-wrapper scrollbar">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Topic Context</th>
                  <th>Rating</th>
                  <th>Review Comments</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb) => (
                  <tr key={fb.id}>
                    <td>
                      <div className="table-user-cell">
                        <div className="user-cell-info">
                          <span className="user-cell-name">{fb.userName}</span>
                          <span className="user-cell-email">{fb.userEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td><strong>{fb.topic}</strong></td>
                    <td>
                      <span className="stars-container" style={{ color: '#F59E0B' }}>
                        {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                      </span>
                    </td>
                    <td>{fb.comment}</td>
                    <td>{new Date(fb.date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-secondary table-action-btn"
                        onClick={() => {
                          dispatch({ type: 'RESOLVE_FEEDBACK', feedbackId: fb.id });
                          alert('Feedback successfully resolved.');
                        }}
                      >
                        RESOLVED
                      </button>
                    </td>
                  </tr>
                ))}
                {feedbacks.length === 0 && (
                  <tr>
                    <td colSpan="6" className="no-data">No pending feedback tickets. All resolved!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // 6. Sub-page: Topic Management (Screenshot #4)
  const renderTopicManagement = () => {
    const selectedCategoryObj = categories.find(c => c.id === selectedTopicCatId);
    const categoryTopicsList = units.filter(u => u.category === selectedTopicCatId);

    const handleDeleteTopic = (unitId) => {
      const topicObj = units.find(u => Number(u.id) === Number(unitId));
      triggerConfirm({
        title: 'Delete Topic',
        message: `Are you sure you want to delete the topic "${topicObj?.title || ''}" and all of its questions? This cannot be undone.`,
        confirmText: 'Delete Topic',
        isDanger: true,
        onConfirm: () => {
          dispatch({ type: 'DELETE_TOPIC', unitId });
          showToast('Topic successfully deleted.');
        }
      });
    };

    return (
      <div className="cms-page-content animate-fade-in">
        <div className="section-header-row">
          <div>
            <h2 className="cms-section-title">Topic Management</h2>
            <p className="cms-section-subtitle">Organize your content into categories and topics.</p>
          </div>

          <div className="topic-actions">
            <button className="btn-add-category" onClick={() => setShowAddCategoryModal(true)}>
              + Category
            </button>
            <button className="btn-add-topic" onClick={() => setShowAddTopicModal(true)}>
              + Topic
            </button>
          </div>
        </div>

        <div className="cms-split-layout">
          {/* Left panel: Categories */}
          <div className="cms-left-panel">
            <div className="learners-list-header">
              <span>CATEGORIES</span>
            </div>
            <div className="learners-list scrollbar">
              {categories.map((cat) => {
                const isSelected = cat.id === selectedTopicCatId;
                const topicsInCatCount = units.filter(u => u.category === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    className={`category-item-card ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedTopicCatId(cat.id)}
                  >
                    <span className="folder-icon">📁</span>
                    <span className="category-label-text">{cat.title}</span>
                    {cat.id === 'reading' && <span className="cat-premium-label">PREMIUM</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel: Topics in Category */}
          <div className="cms-right-panel flex-column">
            <div className="panel-list-header">
              <h4>TOPICS IN {selectedCategoryObj?.title.toUpperCase()}</h4>
              <span className="topics-count-badge">{categoryTopicsList.length} topics found</span>
            </div>

            <div className="topics-listing scrollbar">
              {categoryTopicsList.map((topic, idx) => {
                const totalTopicQuestions = topic.levels.reduce((sum, l) => sum + (l.questions?.length || 0), 0);
                return (
                  <div key={topic.id} className="topic-detail-card">
                    <div className="topic-card-left">
                      <div className="topic-index-badge">{idx + 1}</div>
                      <div className="topic-info-text">
                        <h5>{topic.title} <span className="q-count-indicator">{totalTopicQuestions} Questions</span></h5>
                        <p>{topic.description}</p>
                      </div>
                    </div>
                    <div className="topic-card-right" style={{ display: 'flex', gap: '6px' }}>
                      <button
                        className="icon-action-btn edit"
                        onClick={() => handleStartTopicEdit(topic)}
                        title="Edit Topic"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-delete-topic"
                        onClick={() => handleDeleteTopic(topic.id)}
                        title="Delete Topic"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
              {categoryTopicsList.length === 0 && (
                <div className="no-data">No topics created in this category. Click "+ Topic" to add one!</div>
              )}
            </div>
          </div>
        </div>

        {/* MODAL: ADD CATEGORY */}
        {showAddCategoryModal && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <h3>Create Category</h3>
              <form onSubmit={handleCreateCategory}>
                <div className="form-group-cms">
                  <label>CATEGORY TITLE *</label>
                  <input
                    type="text"
                    value={newCatTitle}
                    onChange={(e) => setNewCatTitle(e.target.value)}
                    placeholder="e.g. Speaking Practice"
                    required
                  />
                </div>
                <div className="form-group-cms">
                  <label>DESCRIPTION</label>
                  <input
                    type="text"
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="e.g. Focus on vocabulary pronunciation"
                  />
                </div>
                <div className="form-group-cms">
                  <label>THEME COLOR</label>
                  <div className="color-selector-grid">
                    {['#58CC02', '#FF4B4B', '#CE82FF', '#1CB0F6', '#FF9600'].map((color) => (
                      <div
                        key={color}
                        className={`color-pill ${newCatColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setNewCatColor(color)}
                      />
                    ))}
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddCategoryModal(false)}>
                    CANCEL
                  </button>
                  <button type="submit" className="btn btn-primary">
                    CREATE CATEGORY
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD TOPIC */}
        {showAddTopicModal && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <h3>Create Topic</h3>
              <form onSubmit={handleCreateTopic}>
                <div className="form-group-cms">
                  <label>TOPIC TITLE *</label>
                  <input
                    type="text"
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    placeholder="e.g. Present Continuous Tense"
                    required
                  />
                </div>
                <div className="form-group-cms">
                  <label>DESCRIPTION</label>
                  <input
                    type="text"
                    value={newTopicDesc}
                    onChange={(e) => setNewTopicDesc(e.target.value)}
                    placeholder="e.g. Talking about activities happening right now."
                  />
                </div>
                <div className="form-group-cms">
                  <label>CATEGORY</label>
                  <select
                    value={selectedTopicCatId}
                    onChange={(e) => setSelectedTopicCatId(e.target.value)}
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddTopicModal(false)}>
                    CANCEL
                  </button>
                  <button type="submit" className="btn btn-primary">
                    CREATE TOPIC
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 7. Sub-page: User Management (Screenshot #2)
  const renderUserManagement = () => {
    // Filter users list
    const filteredUsers = mockUsers.filter(u => {
      const matchSearch = u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
      const matchRole = userRoleFilter === 'all' || u.authLevel === userRoleFilter;
      const matchStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
      return matchSearch && matchRole && matchStatus;
    });

    return (
      <div className="cms-page-content animate-fade-in">
        <h2 className="cms-section-title">User Management</h2>
        <p className="cms-section-subtitle">Manage user roles, pro access, and account status.</p>

        {/* Filter controls */}
        <div className="search-filters-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
            />
          </div>

          <div className="filters-dropdowns">
            <select value={userRoleFilter} onChange={(e) => setUserRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="free">User</option>
              <option value="subscribed">Premium</option>
              <option value="admin">Admin</option>
            </select>

            <select value={userStatusFilter} onChange={(e) => setUserStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="cms-card">
          <div className="cms-table-wrapper scrollbar">
            <table className="cms-table text-left">
              <thead>
                <tr>
                  <th>USER INFO</th>
                  <th>ROLE</th>
                  <th>PRO STATUS</th>
                  <th>JOINED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const isBlocked = u.status === 'blocked';
                  const initials = u.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  return (
                    <tr key={u.uid} style={{ opacity: isBlocked ? 0.6 : 1 }}>
                      <td>
                        <div className="table-user-cell">
                          <div className="user-cell-info">
                            <span className="user-cell-name">{u.name}</span>
                            <span className="user-cell-email">{u.email}</span>
                            <span className="user-cell-id">ID: {u.uid}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge-text ${u.authLevel}`}>
                          {u.authLevel === 'free' ? 'USER' : u.authLevel.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="pro-status-cell">
                          {u.authLevel === 'subscribed' || u.authLevel === 'admin' ? (
                            <span className="pro-premium"><span className="check-icon">✓</span> Premium</span>
                          ) : (
                            <span className="pro-free"><span className="cancel-icon">✗</span> Free Tier</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="joined-date-cell">
                          {new Date(u.joined).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                          })}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons-cell">
                          <select
                            className="role-dropdown-cms"
                            value={u.authLevel}
                            onChange={(e) => dispatch({ type: 'UPDATE_USER_ROLE', userId: u.uid, role: e.target.value })}
                          >
                            <option value="free">Make Free</option>
                            <option value="subscribed">Make Premium</option>
                            <option value="admin">Make Admin</option>
                          </select>

                          <button
                            className="btn btn-secondary table-action-btn"
                            onClick={() => dispatch({ type: 'BLOCK_USER', userId: u.uid })}
                          >
                            {isBlocked ? 'UNBLOCK' : 'BLOCK'}
                          </button>

                          <button
                            className="btn btn-secondary table-action-btn btn-danger-outline"
                            onClick={() => {
                              triggerConfirm({
                                title: 'Remove User',
                                message: `Are you sure you want to remove ${u.name} from the directory? This will permanently delete their account information and learning progress.`,
                                confirmText: 'Remove User',
                                isDanger: true,
                                onConfirm: () => {
                                  dispatch({ type: 'DELETE_USER', userId: u.uid });
                                  showToast(`User ${u.name} has been removed.`);
                                }
                              });
                            }}
                          >
                            REMOVE
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="no-data">No users match search conditions.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-cms-container">
      {/* Left Sidebar */}
      <aside className="admin-cms-sidebar">
        <div className="admin-cms-sidebar-header">
          <div className="admin-cms-logo" onClick={() => navigate('/learn')}>
            <svg width="32" height="32" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="100" fill="#FF9600" />
              {/* Eye whites */}
              <circle cx="68" cy="90" r="24" fill="white" />
              <circle cx="132" cy="90" r="24" fill="white" />
              {/* Pupils */}
              <circle cx="68" cy="90" r="12" fill="#333" />
              <circle cx="132" cy="90" r="12" fill="#333" />
              {/* Highlights */}
              <circle cx="71" cy="87" r="4" fill="white" />
              <circle cx="135" cy="87" r="4" fill="white" />
              {/* Beak */}
              <ellipse cx="100" cy="122" rx="9" ry="5" fill="#FFC800" />
            </svg>
            <span className="admin-cms-logo-text">GrammarGo</span>
          </div>
        </div>

        <nav className="admin-cms-sidebar-nav" id="admin-cms-sidebar-nav">
          <button
            id="admin-cms-nav-item-dashboard"
            className={`admin-cms-nav-item admin-cms-nav-item-dashboard ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigateSection('dashboard')}
          >
            <span className="nav-item-icon" id="admin-cms-nav-icon-dashboard">
              <HomeIcon active={activeSection === 'dashboard'} size={22} />
            </span>
            <span className="nav-item-label" id="admin-cms-nav-label-dashboard">Dashboard</span>
          </button>

          <button
            id="admin-cms-nav-item-progress"
            className={`admin-cms-nav-item admin-cms-nav-item-progress ${activeSection === 'progress' ? 'active' : ''}`}
            onClick={() => handleNavigateSection('progress')}
          >
            <span className="nav-item-icon" id="admin-cms-nav-icon-progress">
              <LeaderboardIcon active={activeSection === 'progress'} size={22} />
            </span>
            <span className="nav-item-label" id="admin-cms-nav-label-progress">User Progress</span>
          </button>

          <button
            id="admin-cms-nav-item-search"
            className={`admin-cms-nav-item admin-cms-nav-item-search ${activeSection === 'search' ? 'active' : ''}`}
            onClick={() => handleNavigateSection('search')}
          >
            <span className="nav-item-icon" id="admin-cms-nav-icon-search">
              <BookIcon active={activeSection === 'search'} size={22} />
            </span>
            <span className="nav-item-label" id="admin-cms-nav-label-search">Search Content</span>
          </button>

          <button
            id="admin-cms-nav-item-generate"
            className={`admin-cms-nav-item admin-cms-nav-item-generate ${activeSection === 'generate' ? 'active' : ''}`}
            onClick={() => handleNavigateSection('generate')}
          >
            <span className="nav-item-icon" id="admin-cms-nav-icon-generate">
              <PracticeIcon active={activeSection === 'generate'} size={22} />
            </span>
            <span className="nav-item-label" id="admin-cms-nav-label-generate">AI Draft Gen</span>
          </button>

          <button
            id="admin-cms-nav-item-feedback"
            className={`admin-cms-nav-item admin-cms-nav-item-feedback ${activeSection === 'feedback' ? 'active' : ''}`}
            onClick={() => handleNavigateSection('feedback')}
          >
            <span className="nav-item-icon" id="admin-cms-nav-icon-feedback">
              <LettersIcon active={activeSection === 'feedback'} size={22} />
            </span>
            <span className="nav-item-label" id="admin-cms-nav-label-feedback">User Feedback</span>
          </button>

          <button
            id="admin-cms-nav-item-topics"
            className={`admin-cms-nav-item admin-cms-nav-item-topics ${activeSection === 'topics' ? 'active' : ''}`}
            onClick={() => handleNavigateSection('topics')}
          >
            <span className="nav-item-icon" id="admin-cms-nav-icon-topics">
              <QuestsIcon active={activeSection === 'topics'} size={22} />
            </span>
            <span className="nav-item-label" id="admin-cms-nav-label-topics">Topic Management</span>
          </button>

          <button
            id="admin-cms-nav-item-users"
            className={`admin-cms-nav-item admin-cms-nav-item-users ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => handleNavigateSection('users')}
          >
            <span className="nav-item-icon" id="admin-cms-nav-icon-users">
              <ProfileIcon active={activeSection === 'users'} size={22} />
            </span>
            <span className="nav-item-label" id="admin-cms-nav-label-users">User Management</span>
          </button>
        </nav>

        <div className="admin-cms-sidebar-footer">
          <button className="admin-cms-user-mode-btn" onClick={() => navigate('/learn')}>
            <span className="nav-item-icon">👤</span>
            <span className="nav-item-label">User Mode</span>
          </button>
        </div>
      </aside>

      {/* Right Viewport */}
      <div className="admin-cms-viewport">
        {/* Content Area */}
        <main className="admin-cms-content">
          {renderContent()}
        </main>
      </div>

      {/* MODAL: EDIT QUESTION */}
      {showEditQuestionModal && editingQuestionObj && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Edit Question</h3>
            <form onSubmit={handleSaveQuestionEdit}>
              <div className="form-group-cms">
                <label>QUESTION TEXT *</label>
                <input
                  type="text"
                  value={eqText}
                  onChange={(e) => setEqText(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-cms">
                <label>OPTION A *</label>
                <input
                  type="text"
                  value={eqOpt1}
                  onChange={(e) => setEqOpt1(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-cms">
                <label>OPTION B *</label>
                <input
                  type="text"
                  value={eqOpt2}
                  onChange={(e) => setEqOpt2(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-cms">
                <label>OPTION C (OPTIONAL)</label>
                <input
                  type="text"
                  value={eqOpt3}
                  onChange={(e) => setEqOpt3(e.target.value)}
                />
              </div>
              <div className="form-group-cms">
                <label>CORRECT ANSWER VALUE *</label>
                <input
                  type="text"
                  value={eqCorrect}
                  onChange={(e) => setEqCorrect(e.target.value)}
                  placeholder="Must match exactly one option"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditQuestionModal(false)}>
                  CANCEL
                </button>
                <button type="submit" className="btn btn-primary">
                  SAVE QUESTION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT TOPIC */}
      {showEditTopicModal && editingTopicObj && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Edit Topic</h3>
            <form onSubmit={handleSaveTopicEdit}>
              <div className="form-group-cms">
                <label>TOPIC TITLE *</label>
                <input
                  type="text"
                  value={etTitle}
                  onChange={(e) => setEtTitle(e.target.value)}
                  placeholder="e.g. Present Continuous Tense"
                  required
                />
              </div>
              <div className="form-group-cms">
                <label>DESCRIPTION</label>
                <input
                  type="text"
                  value={etDesc}
                  onChange={(e) => setEtDesc(e.target.value)}
                  placeholder="e.g. Talking about activities happening right now."
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditTopicModal(false)}>
                  CANCEL
                </button>
                <button type="submit" className="btn btn-primary">
                  SAVE TOPIC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG OVERLAY */}
      {confirmModal.isOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal confirm-modal animate-scale-up">
            <h3>{confirmModal.title}</h3>
            <p className="confirm-modal-message" style={{ margin: '12px 0 24px 0', fontSize: '14px', color: 'var(--color-text-light)', lineHeight: '1.5' }}>
              {confirmModal.message}
            </p>
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
              >
                {confirmModal.cancelText}
              </button>
              <button
                type="button"
                className="btn"
                style={confirmModal.isDanger ? { backgroundColor: '#EF4444', borderColor: '#EF4444', color: '#fff' } : { backgroundColor: 'var(--color-blue-dark)', borderColor: 'var(--color-blue-dark)', color: '#fff' }}
                onClick={confirmModal.onConfirm}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div className="toast-notification animate-slide-in">
          <span className="toast-icon">✓</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
