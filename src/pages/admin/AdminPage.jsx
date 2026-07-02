import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser, useUserDispatch } from '../../data/userStore';
import { api } from '../../data/api';
import {
  HomeIcon,
  ProfileIcon,
  BookIcon,
  PracticeIcon,
  QuestsIcon,
  HeartIcon
} from '../../components/icons';
import './AdminPage.css';

// Import modular sections
import DashboardSection from './DashboardSection';
import SearchSection from './SearchSection';
import AiDraftSection from './AiDraftSection';
import TopicsSection from './TopicsSection';
import UsersSection from './UsersSection';
import PromoCodesSection from './PromoCodesSection';

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
    if (path.includes('/admin/promo-codes')) return 'promo-codes';
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
  // CACHED STATES FOR SECTIONS
  // ==========================================

  // Dashboard Section Cache
  const [dashboardStats, setDashboardStats] = useState(null);
  const [dashboardAuditLogs, setDashboardAuditLogs] = useState([]);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  const fetchDashboardData = async (force = false) => {
    if (dashboardStats && !force) {
      setIsDashboardLoading(false);
      return;
    }
    try {
      setIsDashboardLoading(true);
      const [statsData, logsData] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/audit-logs?limit=100')
      ]);
      setDashboardStats(statsData);
      setDashboardAuditLogs(logsData);
    } catch (err) {
      showToast(`Error loading dashboard: ${err.message}`);
    } finally {
      setIsDashboardLoading(false);
    }
  };

  // Promo Codes Section Cache
  const [promoCodes, setPromoCodes] = useState(null);
  const [isPromoCodesLoading, setIsPromoCodesLoading] = useState(true);

  const fetchPromoCodes = async (force = false) => {
    if (promoCodes && !force) {
      setIsPromoCodesLoading(false);
      return;
    }
    try {
      setIsPromoCodesLoading(true);
      const data = await api.get('/admin/promo-codes');
      setPromoCodes(data);
    } catch (err) {
      showToast(`Error loading promo codes: ${err.message}`);
    } finally {
      setIsPromoCodesLoading(false);
    }
  };

  // Users Section Cache & Filter States
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const [usersTotalPages, setUsersTotalPages] = useState(1);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [expandedUserIds, setExpandedUserIds] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [usersRefreshTrigger, setUsersRefreshTrigger] = useState(0);
  const [lastUsersFetchParams, setLastUsersFetchParams] = useState(null);

  const fetchUsers = async (page = 1, searchQuery = userSearchQuery, roleFilter = userRoleFilter, statusFilter = userStatusFilter) => {
    const cacheKey = `${page}-${searchQuery}-${roleFilter}-${statusFilter}-${usersRefreshTrigger}`;
    if (lastUsersFetchParams === cacheKey) {
      setIsUsersLoading(false);
      return;
    }
    try {
      setIsUsersLoading(true);
      const data = await api.get(`/admin/users?search=${searchQuery}&role=${roleFilter}&status=${statusFilter}&page=${page}&limit=10`);
      setUsers(data.users || []);
      setTotalUsers(data.total || 0);
      setUsersCurrentPage(data.page || 1);
      setUsersTotalPages(data.pages || 1);
      setLastUsersFetchParams(cacheKey);
    } catch (err) {
      showToast(`Error fetching users: ${err.message}`);
    } finally {
      setIsUsersLoading(false);
    }
  };

  // Questions Search Cache & Filter States
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionsCurrentPage, setQuestionsCurrentPage] = useState(1);
  const [questionsTotalPages, setQuestionsTotalPages] = useState(1);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const [searchQuestionQuery, setSearchQuestionQuery] = useState('');
  const [searchCategoryFilter, setSearchCategoryFilter] = useState('all');
  const [searchTopicFilter, setSearchTopicFilter] = useState('all');
  const [searchDifficultyFilter, setSearchDifficultyFilter] = useState('all');
  const [lastQuestionsFetchParams, setLastQuestionsFetchParams] = useState(null);

  const fetchQuestions = async (page = 1, searchQuery = searchQuestionQuery, categoryFilter = searchCategoryFilter, topicFilter = searchTopicFilter, difficultyFilter = searchDifficultyFilter) => {
    const cacheKey = `${page}-${searchQuery}-${categoryFilter}-${topicFilter}-${difficultyFilter}-${questionsRefreshTrigger}`;
    if (lastQuestionsFetchParams === cacheKey) {
      setIsQuestionsLoading(false);
      return;
    }
    try {
      setIsQuestionsLoading(true);
      const data = await api.get(`/admin/questions?search=${searchQuery}&categoryId=${categoryFilter}&unitId=${topicFilter}&difficulty=${difficultyFilter}&page=${page}&limit=10`);
      setQuestions(data.questions || []);
      setTotalQuestions(data.total || 0);
      setQuestionsCurrentPage(data.page || 1);
      setQuestionsTotalPages(data.pages || 1);
      setLastQuestionsFetchParams(cacheKey);
    } catch (err) {
      showToast(`Error fetching questions: ${err.message}`);
    } finally {
      setIsQuestionsLoading(false);
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

  // On-demand lazy load categories & units for specific tabs
  useEffect(() => {
    const sectionsRequiringLearnData = ['search', 'generate', 'topics', 'users'];
    if (sectionsRequiringLearnData.includes(activeSection)) {
      dispatch({ type: 'ENSURE_LEARN_DATA' });
    }
  }, [activeSection, dispatch]);

  // ==========================================
  // QUESTIONS UTILITIES & HANDLERS
  // ==========================================

  // Refresh trigger to reload SearchSection when a question is edited/deleted
  const [questionsRefreshTrigger, setQuestionsRefreshTrigger] = useState(0);

  // Handle saving question edits
  const handleSaveQuestionEdit = async (e) => {
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

    try {
      await api.put(`/admin/questions/${editingQuestionObj.id}`, {
        question: eqText,
        options,
        correctAnswer: eqCorrect,
        explanation: editingQuestionObj.explanation || null,
        explanationTh: editingQuestionObj.explanationTh || null
      });
      setShowEditQuestionModal(false);
      setEditingQuestionObj(null);
      showToast('Question details saved.');
      setQuestionsRefreshTrigger(prev => prev + 1);
    } catch (err) {
      showToast(`Error updating question: ${err.message}`);
    }
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
      onConfirm: async () => {
        try {
          await api.delete(`/admin/questions/${q.id}`);
          showToast('Question deleted from database.');
          setQuestionsRefreshTrigger(prev => prev + 1);
        } catch (err) {
          showToast(`Error deleting question: ${err.message}`);
        }
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
            stats={dashboardStats}
            auditLogs={dashboardAuditLogs}
            isLoading={isDashboardLoading}
            fetchData={fetchDashboardData}
          />
        );
      case 'search':
        return (
          <SearchSection
            categories={categories}
            units={units}
            questionsRefreshTrigger={questionsRefreshTrigger}
            handleStartQuestionEdit={handleStartQuestionEdit}
            handleDeleteQuestion={handleDeleteQuestion}
            showToast={showToast}
            questions={questions}
            setQuestions={setQuestions}
            totalQuestions={totalQuestions}
            setTotalQuestions={setTotalQuestions}
            currentPage={questionsCurrentPage}
            setCurrentPage={setQuestionsCurrentPage}
            totalPages={questionsTotalPages}
            setTotalPages={setQuestionsTotalPages}
            isLoading={isQuestionsLoading}
            setIsLoading={setIsQuestionsLoading}
            searchQuestionQuery={searchQuestionQuery}
            setSearchQuestionQuery={setSearchQuestionQuery}
            searchCategoryFilter={searchCategoryFilter}
            setSearchCategoryFilter={setSearchCategoryFilter}
            searchTopicFilter={searchTopicFilter}
            setSearchTopicFilter={setSearchTopicFilter}
            searchDifficultyFilter={searchDifficultyFilter}
            setSearchDifficultyFilter={setSearchDifficultyFilter}
            fetchQuestions={fetchQuestions}
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
            currentUser={user}
            triggerConfirm={triggerConfirm}
            showToast={showToast}
            users={users}
            setUsers={setUsers}
            totalUsers={totalUsers}
            setTotalUsers={setTotalUsers}
            currentPage={usersCurrentPage}
            setCurrentPage={setUsersCurrentPage}
            totalPages={usersTotalPages}
            setTotalPages={setUsersTotalPages}
            isLoading={isUsersLoading}
            setIsLoading={setIsUsersLoading}
            userSearchQuery={userSearchQuery}
            setUserSearchQuery={setUserSearchQuery}
            userRoleFilter={userRoleFilter}
            setUserRoleFilter={setUserRoleFilter}
            userStatusFilter={userStatusFilter}
            setUserStatusFilter={setUserStatusFilter}
            expandedUserIds={expandedUserIds}
            setExpandedUserIds={setExpandedUserIds}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            fetchUsers={fetchUsers}
            usersRefreshTrigger={usersRefreshTrigger}
            setUsersRefreshTrigger={setUsersRefreshTrigger}
          />
        );
      case 'promo-codes':
        return (
          <PromoCodesSection
            triggerConfirm={triggerConfirm}
            showToast={showToast}
            promoCodes={promoCodes}
            setPromoCodes={setPromoCodes}
            isLoading={isPromoCodesLoading}
            setIsLoading={setIsPromoCodesLoading}
            fetchPromoCodes={fetchPromoCodes}
          />
        );
      default:
        return (
          <DashboardSection
            categories={categories}
            stats={dashboardStats}
            auditLogs={dashboardAuditLogs}
            isLoading={isDashboardLoading}
            fetchData={fetchDashboardData}
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

          <button
            id="admin-cms-nav-item-promo-codes"
            className={`admin-cms-nav-item admin-cms-nav-item-promo-codes ${activeSection === 'promo-codes' ? 'active' : ''}`}
            onClick={() => handleNavigateSection('promo-codes')}
          >
            <span className="nav-item-icon" id="admin-cms-nav-icon-promo-codes">
              <HeartIcon active={activeSection === 'promo-codes'} size={22} />
            </span>
            <span className="nav-item-label" id="admin-cms-nav-label-promo-codes">Promo Codes</span>
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
