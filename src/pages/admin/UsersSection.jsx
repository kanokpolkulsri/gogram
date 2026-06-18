import React, { useState, Fragment } from 'react';

export default function UsersSection({
  categories,
  units,
  mockUsers,
  currentUser,
  dispatch,
  triggerConfirm,
  showToast
}) {
  // Local Filtering and Search State
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');

  // Local Expand State for User Progress Details
  const [expandedUserIds, setExpandedUserIds] = useState([]);

  // Filter users list
  const filteredUsers = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchRole = userRoleFilter === 'all' || u.authLevel === userRoleFilter;
    const matchStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleUserExpanded = (userId) => {
    if (expandedUserIds.includes(userId)) {
      setExpandedUserIds(expandedUserIds.filter(id => id !== userId));
    } else {
      setExpandedUserIds([...expandedUserIds, userId]);
      setTimeout(() => {
        const element = document.getElementById(`user-progress-${userId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <div className="cms-page-content animate-fade-in">
      <h2 className="cms-section-title">User Management</h2>
      <p className="cms-section-subtitle">Manage user roles, pro access, and account status.</p>

      {/* Filter controls */}
      <div className="cms-search-filters-bar">
        <div className="cms-search-input-wrapper">
          <span className="cms-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
          />
        </div>

        <div className="cms-filters-dropdowns">
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
      <div className="cms-card cms-table-card">
        <div className="cms-table-wrapper scrollbar">
          <table className="cms-table text-left">
            <thead>
              <tr>
                <th className="th-user-info">USER INFO</th>
                <th className="th-user-role">ROLE</th>
                <th className="th-user-joined">JOINED</th>
                <th className="th-user-progress">PROGRESS</th>
                <th className="th-user-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const isBlocked = u.status === 'blocked';
                const isExpanded = expandedUserIds.includes(u.uid);
                return (
                  <Fragment key={u.uid}>
                    <tr className={isBlocked ? 'cms-blocked-user-row' : ''}>
                      <td>
                        <div className="cms-table-user-cell">
                          <div className="cms-user-cell-info">
                            <span
                              className="cms-user-cell-name cms-clickable-name"
                              onClick={() => toggleUserExpanded(u.uid)}
                              title="Click to view/hide progress breakdown"
                            >
                              <span className="user-name-text">{u.name}</span>
                            </span>
                            <span className="cms-user-cell-email">{u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`role-badge-text ${isBlocked ? 'blocked' : u.authLevel}`}>
                          {isBlocked ? 'BLOCKED' : (u.authLevel === 'free' ? 'USER' : u.authLevel === 'subscribed' ? 'PREMIUM' : 'ADMIN')}
                        </span>
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
                        <button
                          className="icon-action-btn view-progress-btn"
                          onClick={() => toggleUserExpanded(u.uid)}
                          title="View category progress breakdown"
                          style={{
                            color: isExpanded ? 'var(--color-blue-dark)' : 'var(--color-text-light)',
                            borderColor: isExpanded ? 'var(--color-blue-dark)' : 'var(--color-gray)'
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye cms-user-view-progress-icon">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                      </td>
                      <td>
                        <div className="action-buttons-cell">
                          <select
                            className="role-dropdown-cms"
                            value={isBlocked ? 'blocked' : u.authLevel}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === 'blocked') {
                                if (!isBlocked) {
                                  dispatch({ type: 'BLOCK_USER', userId: u.uid });
                                }
                              } else {
                                if (isBlocked) {
                                  dispatch({ type: 'BLOCK_USER', userId: u.uid });
                                }
                                dispatch({ type: 'UPDATE_USER_ROLE', userId: u.uid, role: val });
                              }
                            }}
                          >
                            <option value="free">User</option>
                            <option value="subscribed">Premium</option>
                            <option value="admin">Admin</option>
                            <option value="blocked">Blocked</option>
                          </select>

                          <button
                            className="icon-action-btn delete"
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
                            title="Remove User"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 cms-user-delete-icon">
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
                    {isExpanded && (
                      <tr className="cms-expanded-progress-row">
                        <td colSpan="5">
                          <div className="expanded-progress-container" id={`user-progress-${u.uid}`}>
                            <h4 className="cms-expanded-progress-title">
                              📈 Category Progress for {u.name}
                            </h4>
                            <div className="cms-expanded-progress-grid">
                              {categories.map(cat => {
                                const catUnits = units.filter(un => un.category === cat.id);
                                const totalNodes = catUnits.reduce((sum, un) => sum + un.levels.length, 0);

                                let completedCount = u.progress?.[cat.id] || 0;
                                if (u.uid === 'admin-1') {
                                  completedCount = catUnits.reduce((sum, un) => {
                                    return sum + un.levels.filter(l => currentUser?.completedLessons?.includes(`${un.id}-${l.id}`)).length;
                                  }, 0);
                                }

                                const computedLevel = Math.floor(completedCount / 5) + 1;

                                return (
                                  <div key={cat.id} className="cms-progress-category-card">
                                    <div className="cms-progress-category-info">
                                      <span className="cms-progress-category-title">{cat.title}</span>
                                      <div className="cms-progress-category-stats">
                                        <span className="cms-progress-level-badge">
                                          LV {computedLevel}
                                        </span>
                                        <span className="cms-progress-nodes-text">
                                          {completedCount} / {totalNodes} nodes
                                        </span>
                                      </div>
                                    </div>
                                    {completedCount > 0 && (
                                      <button
                                        className="icon-action-btn cms-reset-progress-btn"
                                        title={`Reset ${cat.title} progress`}
                                        onClick={() => {
                                          triggerConfirm({
                                            title: 'Reset Category Progress',
                                            message: `Are you sure you want to reset progress in "${cat.title}" for ${u.name}? This will wipe their category scores and completed lesson keys for this category.`,
                                            confirmText: 'Reset Progress',
                                            isDanger: true,
                                            onConfirm: () => {
                                              dispatch({
                                                type: 'RESET_USER_PROGRESS_IN_CATEGORY',
                                                userId: u.uid,
                                                categoryId: cat.id,
                                                isCurrentUser: u.uid === 'admin-1'
                                              });
                                              showToast(`Progress reset for ${u.name} in ${cat.title}.`);
                                            }
                                          });
                                        }}
                                      >
                                        🔄
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="cms-no-data">No users match search conditions.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
