import React, { useState, useEffect } from 'react';

export default function TopicsSection({
  categories,
  units,
  dispatch,
  triggerConfirm,
  showToast
}) {
  // Local Category Navigation State
  const [selectedTopicCatId, setSelectedTopicCatId] = useState(categories[0]?.id || 'grammar');

  // Keep selectedTopicCatId valid when categories are deleted
  useEffect(() => {
    if (categories.length > 0 && !categories.some(c => c.id === selectedTopicCatId)) {
      setSelectedTopicCatId(categories[0].id);
    }
  }, [categories, selectedTopicCatId]);

  // Add Category/Topic Modals States
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [newCatTitle, setNewCatTitle] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatColor, setNewCatColor] = useState('#58CC02');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');

  // Edit Topic Modal States
  const [showEditTopicModal, setShowEditTopicModal] = useState(false);
  const [editingTopicObj, setEditingTopicObj] = useState(null);
  const [etTitle, setEtTitle] = useState('');
  const [etDesc, setEtDesc] = useState('');

  // Selected Category & Topics lists
  const selectedCategoryObj = categories.find(c => c.id === selectedTopicCatId);
  const categoryTopicsList = units.filter(u => u.category === selectedTopicCatId);

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
    showToast('Category created successfully.');
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
    showToast('Topic created successfully.');
  };

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

  const handleDeleteCategory = (e, cat) => {
    e.stopPropagation(); // Avoid selecting the category card on click
    triggerConfirm({
      title: 'Delete Category',
      message: `Are you sure you want to delete the category "${cat.title}"? This will permanently delete all topics, questions, and student progress under this category. This action cannot be undone.`,
      confirmText: 'Delete Category',
      isDanger: true,
      onConfirm: () => {
        dispatch({ type: 'DELETE_CATEGORY', categoryId: cat.id });
        showToast('Category successfully deleted.');
      }
    });
  };

  return (
    <div className="cms-page-content animate-fade-in cms-topics-page">
      <div className="cms-section-header-row cms-topics-section-header">
        <div>
          <h2 className="cms-section-title">Topic Management</h2>
          <p className="cms-section-subtitle">Organize your content into categories and topics.</p>
        </div>

        <div className="topic-actions cms-topics-actions">
          <button className="btn-add-category cms-topics-btn-add-category" onClick={() => setShowAddCategoryModal(true)}>
            + Category
          </button>
          <button className="btn-add-topic cms-topics-btn-add-topic" onClick={() => setShowAddTopicModal(true)}>
            + Topic
          </button>
        </div>
      </div>

      <div className="cms-split-layout cms-topics-split-layout">
        {/* Left panel: Categories */}
        <div className="cms-left-panel cms-topics-left-panel">
          <div className="learners-list-header cms-topics-list-header">
            <span>CATEGORIES</span>
          </div>
          <div className="learners-list scrollbar cms-topics-categories-list">
            {categories.map((cat) => {
              const isSelected = cat.id === selectedTopicCatId;
              return (
                <div
                  key={cat.id}
                  className={`cms-category-item-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedTopicCatId(cat.id)}
                >
                  <span className="folder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder cms-category-folder-icon">
                      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
                    </svg>
                  </span>
                  <span className="category-label-text">{cat.title}</span>
                  <button
                    className="icon-action-btn delete-category-btn"
                    onClick={(e) => handleDeleteCategory(e, cat)}
                    title="Delete Category"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel: Topics in Category */}
        <div className="cms-right-panel flex-column cms-topics-right-panel">
          <div className="panel-list-header cms-topics-panel-header">
            <h4 className="cms-topics-panel-title">TOPICS IN {selectedCategoryObj?.title?.toUpperCase() || ''}</h4>
            <span className="topics-count-badge cms-topics-count-badge">{categoryTopicsList.length} topics found</span>
          </div>

          <div className="topics-listing scrollbar cms-topics-listing">
            {categoryTopicsList.map((topic, idx) => {
              const totalTopicQuestions = topic.levels.reduce((sum, l) => sum + (l.questions?.length || 0), 0);
              return (
                <div key={topic.id} className="topic-detail-card cms-topics-detail-card">
                  <div className="topic-card-left cms-topics-card-left">
                    <div className="topic-index-badge cms-topics-index-badge">{idx + 1}</div>
                    <div className="topic-info-text cms-topics-info-text">
                      <h5 className="cms-topics-info-title">{topic.title} <span className="q-count-indicator cms-topics-q-count">{totalTopicQuestions} Questions</span></h5>
                      <p className="cms-topics-info-desc">{topic.description}</p>
                    </div>
                  </div>
                  <div className="topic-card-right cms-topics-card-right" style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="icon-action-btn edit"
                      onClick={() => handleStartTopicEdit(topic)}
                      title="Edit Topic"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil cms-topic-edit-icon">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                        <path d="m15 5 4 4"/>
                      </svg>
                    </button>
                    <button
                      className="icon-action-btn delete"
                      onClick={() => handleDeleteTopic(topic.id)}
                      title="Delete Topic"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 cms-topic-delete-icon">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        <line x1="10" x2="10" y1="11" y2="17"/>
                        <line x1="14" x2="14" y1="11" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
            {categoryTopicsList.length === 0 && (
              <div className="cms-no-data">No topics created in this category. Click "+ Topic" to add one!</div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: ADD CATEGORY */}
      {showAddCategoryModal && (
        <div className="admin-modal-overlay animate-fade-in">
          <div className="admin-modal add-category-modal animate-scale-up">
            <h3>Create Category</h3>
            <form onSubmit={handleCreateCategory}>
              <div className="add-category-form-group">
                <label>CATEGORY TITLE *</label>
                <input
                  type="text"
                  value={newCatTitle}
                  onChange={(e) => setNewCatTitle(e.target.value)}
                  placeholder="e.g. Speaking Practice"
                  required
                />
              </div>
              <div className="add-category-form-group">
                <label>DESCRIPTION</label>
                <input
                  type="text"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="e.g. Focus on vocabulary pronunciation"
                />
              </div>
              <div className="add-category-form-group">
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
              <div className="cms-form-actions">
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
        <div className="admin-modal-overlay animate-fade-in">
          <div className="admin-modal add-topic-modal animate-scale-up">
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
              <div className="cms-form-actions">
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

      {/* MODAL: EDIT TOPIC */}
      {showEditTopicModal && editingTopicObj && (
        <div className="admin-modal-overlay animate-fade-in">
          <div className="admin-modal edit-topic-modal animate-scale-up">
            <h3>Edit Topic</h3>
            <form onSubmit={handleSaveTopicEdit}>
              <div className="form-group-cms">
                <label>TOPIC TITLE *</label>
                <input
                  type="text"
                  value={etTitle}
                  onChange={(e) => setEtTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-cms">
                <label>DESCRIPTION</label>
                <textarea
                  value={etDesc}
                  onChange={(e) => setEtDesc(e.target.value)}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontFamily: 'var(--font-family)',
                    fontSize: '14px',
                    fontWeight: 700,
                    border: '2px solid var(--color-gray)',
                    borderRadius: '12px',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div className="cms-form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditTopicModal(false);
                    setEditingTopicObj(null);
                  }}
                >
                  CANCEL
                </button>
                <button type="submit" className="btn btn-primary">
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
