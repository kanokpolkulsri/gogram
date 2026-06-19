import { useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser, useUserDispatch } from '../../data/userStore';
import {
  HomeIcon,
  ProfileIcon,
  BookIcon,
  PracticeIcon,
  QuestsIcon
} from '../../components/icons';
import './AdminPage.css';

// Import modular sections
import DashboardSection from './DashboardSection';
import SearchSection from './SearchSection';
import AiDraftSection from './AiDraftSection';
import TopicsSection from './TopicsSection';
import UsersSection from './UsersSection';

export default function AdminPage() {
  const user = useUser();
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract mock lists from user context
  const categories = user.categories || [];
  const units = user.units || [];
  const mockUsers = user.mockUsers || [];
  const auditLogs = user.auditLogs || [];

  // Parse deep-link parameter or default to 'dashboard'
  const getActiveSection = () => {
    const path = location.pathname;
    if (path.includes('/admin/progress')) return 'users';
    if (path.includes('/admin/search')) return 'search';
    if (path.includes('/admin/generate')) return 'generate';
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
  // SHARED STATES
  // ==========================================

  // Toast State & Helper
  const [toast, setToast] = useState({ show: false, message: '' });
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  // Confirm Modal State & Helper
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    isDanger: false
  });
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

  // Shared Draft Questions State (between AiDraftSection and Edit Modal)
  const [draftQuestions, setDraftQuestions] = useState([]);

  // Shared Edit Question Modal States
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [editingQuestionObj, setEditingQuestionObj] = useState(null);
  const [eqText, setEqText] = useState('');
  const [eqOpt1, setEqOpt1] = useState('');
  const [eqOpt2, setEqOpt2] = useState('');
  const [eqOpt3, setEqOpt3] = useState('');
  const [eqOpt4, setEqOpt4] = useState('');
  const [eqCorrect, setEqCorrect] = useState('');

  // ==========================================
  // QUESTIONS UTILITIES & HANDLERS
  // ==========================================

  // Extract all questions list
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

  // Handle saving question edits
  const handleSaveQuestionEdit = (e) => {
    e.preventDefault();
    if (!editingQuestionObj) return;

    const options = [eqOpt1, eqOpt2];
    if (eqOpt3.trim()) options.push(eqOpt3);
    if (eqOpt4.trim()) options.push(eqOpt4);

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
    setEqOpt4(q.options[3] || '');
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

  // Render Section Component
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <DashboardSection
            categories={categories}
            mockUsers={mockUsers}
            allQuestions={allQuestions}
            auditLogs={auditLogs}
          />
        );
      case 'search':
        return (
          <SearchSection
            categories={categories}
            units={units}
            allQuestions={allQuestions}
            handleStartQuestionEdit={handleStartQuestionEdit}
            handleDeleteQuestion={handleDeleteQuestion}
            showToast={showToast}
          />
        );
      case 'generate':
        return (
          <AiDraftSection
            categories={categories}
            units={units}
            dispatch={dispatch}
            draftQuestions={draftQuestions}
            setDraftQuestions={setDraftQuestions}
            handleStartQuestionEdit={handleStartQuestionEdit}
            triggerConfirm={triggerConfirm}
            showToast={showToast}
          />
        );
      case 'topics':
        return (
          <TopicsSection
            categories={categories}
            units={units}
            dispatch={dispatch}
            triggerConfirm={triggerConfirm}
            showToast={showToast}
          />
        );
      case 'users':
        return (
          <UsersSection
            categories={categories}
            units={units}
            mockUsers={mockUsers}
            currentUser={user}
            dispatch={dispatch}
            triggerConfirm={triggerConfirm}
            showToast={showToast}
          />
        );
      default:
        return (
          <DashboardSection
            categories={categories}
            mockUsers={mockUsers}
            allQuestions={allQuestions}
            auditLogs={auditLogs}
          />
        );
    }
  };

  return (
    <div className="admin-cms-container" id="admin-cms-container">
      {/* Left Sidebar */}
      <aside className="admin-cms-sidebar" id="admin-cms-sidebar">
        <div className="admin-cms-sidebar-header">
          <div className="admin-cms-logo" id="admin-cms-logo" onClick={() => navigate('/learn')}>
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
            <span className="nav-item-label" id="admin-cms-nav-label-generate">AI Generation</span>
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
            <span className="nav-item-icon">
              <ProfileIcon active={false} size={22} />
            </span>
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
        <div className="admin-modal-overlay animate-fade-in">
          <div className="admin-modal edit-question-modal animate-scale-up">
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
                <label>OPTION C *</label>
                <input
                  type="text"
                  value={eqOpt3}
                  onChange={(e) => setEqOpt3(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-cms">
                <label>OPTION D *</label>
                <input
                  type="text"
                  value={eqOpt4}
                  onChange={(e) => setEqOpt4(e.target.value)}
                  required
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
              <div className="cms-form-actions">
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

      {/* CONFIRMATION DIALOG OVERLAY */}
      {confirmModal.isOpen && (
        <div className="admin-modal-overlay animate-fade-in">
          <div className="admin-modal confirm-modal animate-scale-up">
            <h3>{confirmModal.title}</h3>
            <p className="confirm-modal-message" style={{ margin: '12px 0 24px 0', fontSize: '14px', color: 'var(--color-text-light)', lineHeight: '1.5' }}>
              {confirmModal.message}
            </p>
            <div className="cms-form-actions">
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
