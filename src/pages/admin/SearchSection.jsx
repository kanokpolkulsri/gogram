import React, { useState } from 'react';

export default function SearchSection({
  categories,
  units,
  allQuestions,
  handleStartQuestionEdit,
  handleDeleteQuestion,
  showToast
}) {
  // Local Search & Filtering State
  const [searchQuestionQuery, setSearchQuestionQuery] = useState('');
  const [searchCategoryFilter, setSearchCategoryFilter] = useState('all');
  const [searchTopicFilter, setSearchTopicFilter] = useState('all');
  const [searchDifficultyFilter, setSearchDifficultyFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(10);

  // Filter questions list
  const filteredQuestions = allQuestions.filter(q => {
    const matchQuery = q.question.toLowerCase().includes(searchQuestionQuery.toLowerCase());
    const matchCategory = searchCategoryFilter === 'all' || q.categoryId === searchCategoryFilter;
    const matchTopic = searchTopicFilter === 'all' || Number(q.unitId) === Number(searchTopicFilter);
    const matchDifficulty = searchDifficultyFilter === 'all' || q.difficulty === searchDifficultyFilter.toUpperCase();
    return matchQuery && matchCategory && matchTopic && matchDifficulty;
  });

  const paginatedQuestions = filteredQuestions.slice(0, visibleCount);


  // CSV Export Functionality
  const handleExportCSV = () => {
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

    const headers = ['Question ID', 'Category', 'Topic', 'Difficulty', 'Question Text', 'Option A', 'Option B', 'Option C', 'Option D', 'Correct Answer'];
    const rows = filteredQuestions.map(q => [
      q.id,
      q.categoryTitle,
      q.unitTitle,
      q.difficulty,
      q.question,
      q.options[0] || '',
      q.options[1] || '',
      q.options[2] || '',
      q.options[3] || '',
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

  return (
    <div className="cms-page-content animate-fade-in cms-search-page">
      <div className="cms-section-header-row cms-search-section-header">
        <div>
          <h2 className="cms-section-title cms-search-title">Search Content</h2>
          <p className="cms-section-subtitle cms-search-subtitle">Find, filter, and manage all content across the platform.</p>
        </div>
        <button className="cms-btn-export-csv cms-search-export-btn" onClick={handleExportCSV}>
          📥 Export CSV
        </button>
      </div>

      {/* Filters Bar */}
      <div className="cms-search-filters-bar cms-search-filters-bar-row">
        <div className="cms-search-input-wrapper cms-search-input-wrapper-search">
          <span className="cms-search-icon cms-search-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by question text..."
            value={searchQuestionQuery}
            onChange={(e) => {
              setSearchQuestionQuery(e.target.value);
              setVisibleCount(10);
            }}
          />
        </div>

        <div className="cms-filters-dropdowns cms-search-filters-dropdowns">
          <select
            value={searchCategoryFilter}
            onChange={(e) => {
              setSearchCategoryFilter(e.target.value);
              setSearchTopicFilter('all'); // reset topic
              setVisibleCount(10);
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>

          <select
            value={searchTopicFilter}
            onChange={(e) => {
              setSearchTopicFilter(e.target.value);
              setVisibleCount(10);
            }}
          >
            <option value="all">All Topics</option>
            {units
              .filter(u => searchCategoryFilter === 'all' || u.category === searchCategoryFilter)
              .map(u => <option key={u.id} value={u.id}>{u.title}</option>)
            }
          </select>

          <select
            value={searchDifficultyFilter}
            onChange={(e) => {
              setSearchDifficultyFilter(e.target.value);
              setVisibleCount(10);
            }}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Questions Table */}
      <div className="cms-card cms-table-card cms-search-table-card">
        <div className="cms-table-wrapper scrollbar cms-search-table-wrapper">
          <table className="cms-table text-left cms-search-table">
            <thead>
              <tr>
                <th className="th-question-content">QUESTION CONTENT</th>
                <th className="th-category">CATEGORY</th>
                <th className="th-topic">TOPIC</th>
                <th className="th-difficulty">DIFFICULTY</th>
                <th className="th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedQuestions.map((q) => {
                return (
                  <tr key={q.id} className="cms-search-question-row">
                    <td>
                      <div className="cms-q-content-cell cms-search-q-content-cell">
                        <span className="cms-q-text-bold cms-search-q-text">{q.question}</span>
                        <div className="cms-q-options-row cms-search-q-options-row">
                          {q.options.map((opt) => {
                            const isCorrect = opt === q.correctAnswer;
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
                    <td>
                      <span className="cms-category-cell-badge cms-search-category-badge">{q.categoryTitle}</span>
                    </td>
                    <td>
                      <span className="cms-topic-cell-title cms-search-topic-title">{q.unitTitle}</span>
                    </td>
                    <td>
                      <span className={`cms-difficulty-badge-text ${q.difficulty.toLowerCase()}`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-cell cms-search-action-buttons">
                        <button className="icon-action-btn edit" title="Edit Question" onClick={() => handleStartQuestionEdit(q)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil cms-question-edit-icon">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                          </svg>
                        </button>
                        <button className="icon-action-btn delete" title="Delete Question" onClick={() => handleDeleteQuestion(q)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 cms-question-delete-icon">
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
                );
              })}
              {filteredQuestions.length === 0 && (
                <tr>
                  <td colSpan="5" className="cms-no-data">No questions found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredQuestions.length > 0 && (
          <div className="pagination-bar cms-search-pagination-bar">
            <span className="pagination-bar-info">
              Showing {Math.min(visibleCount, filteredQuestions.length)} results (Page Limit: {visibleCount})
            </span>
            {filteredQuestions.length > visibleCount && (
              <button
                className="cms-btn-load-more"
                onClick={() => setVisibleCount(prev => prev + 10)}
              >
                LOAD MORE CONTENT
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
