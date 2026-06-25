import React, { useState, Fragment } from 'react';

function HeartsEditControl({ userId, currentHearts, dispatch, showToast }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempVal, setTempVal] = useState(currentHearts === 'infinity' ? 10 : (currentHearts ?? 10));

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_USER_HEARTS',
      userId: userId,
      heartsValue: parseInt(tempVal) || 0
    });
    setIsEditing(false);
    showToast('Hearts updated successfully');
  };

  const handleMakeInfinity = () => {
    dispatch({
      type: 'UPDATE_USER_HEARTS',
      userId: userId,
      heartsValue: 'infinity'
    });
    setIsEditing(false);
    showToast('Hearts status set to Infinity');
  };

  const handleResetHearts = () => {
    dispatch({
      type: 'UPDATE_USER_HEARTS',
      userId: userId,
      heartsValue: 10
    });
    setIsEditing(false);
    showToast('Hearts reset to default (10)');
  };

  if (isEditing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="number"
          min="0"
          value={tempVal}
          onChange={(e) => setTempVal(e.target.value)}
          style={{ width: '60px', padding: '4px 6px', border: '1px solid var(--color-gray)', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}
        />
        <button
          onClick={handleSave}
          style={{ padding: '4px 8px', background: 'var(--color-green)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          style={{ padding: '4px 8px', background: 'var(--color-gray)', border: 'none', borderRadius: '6px', color: 'var(--color-text)', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {currentHearts !== 'infinity' ? (
        <>
          <button
            onClick={() => {
              setTempVal(currentHearts ?? 10);
              setIsEditing(true);
            }}
            style={{ padding: '4px 8px', background: 'var(--color-blue)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
          >
            Edit
          </button>
          <button
            onClick={handleMakeInfinity}
            style={{ padding: '4px 8px', background: 'var(--color-orange)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
          >
            Set Infinity
          </button>
        </>
      ) : (
        <button
          onClick={handleResetHearts}
          style={{ padding: '4px 8px', background: 'var(--color-red)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
        >
          Make Numeric (10)
        </button>
      )}
    </div>
  );
}

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
    <div className="cms-page-content animate-fade-in cms-users-page">
      <h2 className="cms-section-title">User Management</h2>
      <p className="cms-section-subtitle">Manage user roles, pro access, and account status.</p>

      {/* Filter controls */}
      <div className="cms-search-filters-bar cms-users-filters-bar">
        <div className="cms-search-input-wrapper cms-users-input-wrapper">
          <span className="cms-search-icon cms-users-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
          />
        </div>

        <div className="cms-filters-dropdowns cms-users-filters-dropdowns">
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
      <div className="cms-card cms-table-card cms-users-table-card">
        <div className="cms-table-wrapper scrollbar cms-users-table-wrapper">
          <table className="cms-table text-left cms-users-table">
            <thead>
              <tr>
                <th className="th-user-info">USER INFO</th>
                <th className="th-user-role">ROLE</th>
                <th className="th-user-joined">JOINED</th>
                <th className="th-user-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const isBlocked = u.status === 'blocked';
                const isExpanded = expandedUserIds.includes(u.uid);
                const userHearts = u.uid === currentUser?.uid ? currentUser.hearts : u.hearts;
                const userPromoExpiresAt = u.uid === currentUser?.uid ? currentUser.promoExpiresAt : u.promoExpiresAt;
                return (
                  <Fragment key={u.uid}>
                    <tr className={isBlocked ? 'cms-blocked-user-row' : ''}>
                      <td>
                        <div className="cms-table-user-cell">
                          <div className="cms-user-cell-info">
                            <span
                              className="cms-user-cell-name cms-clickable-name"
                              onClick={() => toggleUserExpanded(u.uid)}
                              title="Click to view/edit details"
                            >
                              <span className="user-name-text">{u.name.split(' (')[0]}</span>
                            </span>
                            <span className="cms-user-cell-email">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className={`role-badge-text ${isBlocked ? 'blocked' : u.authLevel}`}>
                          {isBlocked ? 'BLOCKED' : (u.authLevel === 'free' ? 'USER' : u.authLevel === 'subscribed' ? 'PREMIUM' : u.authLevel.toUpperCase())}
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
                        <div className="action-buttons-cell cms-users-action-buttons">
                          {/* Expanded view button in Actions */}
                          <button
                            className="icon-action-btn view-progress-btn"
                            onClick={() => toggleUserExpanded(u.uid)}
                            title="View/Edit Details"
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
                        <td colSpan="4">
                          <div className="expanded-progress-container" id={`user-progress-${u.uid}`}>
                            <h4 className="cms-expanded-progress-title">
                              Details for {u.name.split(' (')[0]}
                            </h4>
                            
                            <div className="cms-expanded-progress-grid">
                              {categories.map(cat => {
                                const catUnits = units.filter(un => un.category === cat.id);
                                let completedCount = u.progress?.[cat.id] || 0;
                                if (u.uid === currentUser?.uid) {
                                  completedCount = catUnits.reduce((sum, un) => {
                                    return sum + un.levels.filter(l => currentUser?.completedLessons?.includes(`${un.id}-${l.id}`)).length;
                                  }, 0);
                                }
                                const computedLevel = Math.floor(completedCount / 5) + 1;

                                return (
                                  <div key={cat.id} className="cms-progress-category-card">
                                    <div className="cms-progress-category-info">
                                      <span className="cms-progress-category-title">{cat.title}</span>
                                    </div>
                                    <div className="cms-progress-category-stats" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                                                const updatedProgress = { ...(u.progress || {}), [cat.id]: 0 };
                                                apiUpdateUser(u.uid, { progress: updatedProgress })
                                                  .then(() => {
                                                    dispatch({
                                                      type: 'RESET_USER_PROGRESS_IN_CATEGORY',
                                                      userId: u.uid,
                                                      categoryId: cat.id,
                                                      isCurrentUser: u.uid === currentUser?.uid
                                                    });
                                                    showToast(`Progress reset for ${u.name} in ${cat.title}.`);
                                                  })
                                                  .catch(err => showToast(`Failed to reset progress: ${err.message}`));
                                              }
                                            });
                                          }}
                                        >
                                          🔄
                                        </button>
                                      )}
                                      <select
                                        value={computedLevel}
                                        onChange={(e) => {
                                          const val = parseInt(e.target.value);
                                          dispatch({
                                            type: 'UPDATE_USER_PROGRESS_LEVEL',
                                            userId: u.uid,
                                            categoryId: cat.id,
                                            levelValue: val
                                          });
                                          showToast(`Updated ${u.name.split(' (')[0]}'s ${cat.title} to Level ${val}`);
                                        }}
                                        className="cms-level-select"
                                        style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--color-gray)', fontSize: '13px', fontWeight: '700', backgroundColor: 'white', cursor: 'pointer' }}
                                      >
                                        <option value="1">LV 1</option>
                                        <option value="2">LV 2</option>
                                        <option value="3">LV 3</option>
                                        <option value="4">LV 4</option>
                                        <option value="5">LV 5</option>
                                      </select>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Account settings, Hearts and Promo Codes inside expanded-progress-container */}
                            <div className="cms-user-details-settings-container" style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                              <div className="cms-user-details-settings-block" style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-gray)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div className="cms-user-details-settings-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                                  <h5 className="cms-user-details-settings-title" style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-text)', margin: 0, marginBottom: '4px' }}>Account Settings</h5>
                                  
                                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-text-light)' }}>ROLE</label>
                                  <select
                                    className="role-dropdown-cms"
                                    value={u.role || 'user'}
                                    onChange={(e) => {
                                      dispatch({ type: 'UPDATE_USER_ROLE', userId: u.uid, role: e.target.value });
                                      showToast(`Role updated to ${e.target.value.toUpperCase()}`);
                                    }}
                                    style={{ padding: '6px 12px', borderRadius: '8px', border: '2px solid var(--color-gray)', fontSize: '13px', fontWeight: '700', backgroundColor: 'white', cursor: 'pointer', width: '100%', marginBottom: '8px' }}
                                  >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                  </select>

                                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-text-light)' }}>STATUS</label>
                                  <select
                                    className="status-dropdown-cms"
                                    value={u.status || 'active'}
                                    onChange={() => {
                                      dispatch({ type: 'BLOCK_USER', userId: u.uid });
                                      showToast(`Account status toggled`);
                                    }}
                                    style={{ padding: '6px 12px', borderRadius: '8px', border: '2px solid var(--color-gray)', fontSize: '13px', fontWeight: '700', backgroundColor: 'white', cursor: 'pointer', width: '100%' }}
                                  >
                                    <option value="active">Active</option>
                                    <option value="blocked">Blocked</option>
                                  </select>
                                </div>
                              </div>

                              <div className="cms-user-details-settings-block" style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-gray)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div className="cms-user-details-settings-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                                  <h5 className="cms-user-details-settings-title" style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-text)', margin: 0 }}>Hearts Status</h5>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--color-text-light)' }}>
                                    <div>
                                      <span style={{ fontWeight: '700' }}>Mode: </span>
                                      <span>{userHearts === 'infinity' ? '♾️ Infinity' : 'Numeric'}</span>
                                    </div>
                                    <div>
                                      <span style={{ fontWeight: '700' }}>Current Hearts: </span>
                                      <span>{userHearts === 'infinity' ? '∞' : (userHearts ?? 10)}</span>
                                    </div>
                                    {userHearts === 'infinity' && (
                                      <div>
                                        <span style={{ fontWeight: '700' }}>Expiration: </span>
                                        <span>
                                          {userPromoExpiresAt 
                                            ? new Date(userPromoExpiresAt).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                              })
                                            : 'Never Expires'}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="cms-user-details-settings-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
                                    <HeartsEditControl
                                      userId={u.uid}
                                      currentHearts={userHearts}
                                      dispatch={dispatch}
                                      showToast={showToast}
                                    />
                                  </div>
                                  
                                  {/* Premium Subscription Controls */}
                                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-text-light)' }}>PREMIUM SUBSCRIPTION</label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      <button
                                        onClick={() => {
                                          const date = new Date();
                                          date.setDate(date.getDate() + 30);
                                          dispatch({ type: 'UPDATE_USER_SUBSCRIPTION', userId: u.uid, expiresAt: date.toISOString() });
                                          showToast('Premium granted/extended by 30 days');
                                        }}
                                        style={{ flex: 1, padding: '6px 8px', background: 'var(--color-green)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                                      >
                                        +30 Days
                                      </button>
                                      <button
                                        onClick={() => {
                                          dispatch({ type: 'UPDATE_USER_SUBSCRIPTION', userId: u.uid, expiresAt: null });
                                          showToast('Premium revoked');
                                        }}
                                        style={{ flex: 1, padding: '6px 8px', background: 'var(--color-red)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                                      >
                                        Revoke
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="cms-user-details-settings-block" style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-gray)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div className="cms-user-details-promo-block" style={{ textAlign: 'left' }}>
                                  <h5 className="cms-user-details-promo-title" style={{ fontSize: '13px', fontWeight: '800', marginBottom: '8px', color: 'var(--color-text)' }}>Promo Codes Redeemed</h5>
                                  <div className="cms-user-details-promo-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {(u.usedPromoCodes && u.usedPromoCodes.length > 0) ? (
                                      u.usedPromoCodes.map(code => {
                                        const isSuspended = u.suspendedPromoCodes?.includes(code);
                                        return (
                                          <div key={code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--color-gray)', backgroundColor: '#F9FAFB' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                              <span style={{ fontSize: '12px', fontWeight: '800', color: isSuspended ? 'var(--color-text-light)' : 'var(--color-text)', textDecoration: isSuspended ? 'line-through' : 'none' }}>
                                                {code}
                                              </span>
                                              {isSuspended && (
                                                <span style={{ fontSize: '10px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FEE2E2', color: '#EF4444' }}>
                                                  Suspended
                                                </span>
                                              )}
                                            </div>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                              {isSuspended ? (
                                                <button
                                                  title="Reactivate/Unsuspend Promo Code"
                                                  onClick={() => {
                                                    dispatch({ type: 'UNSUSPEND_USER_PROMO_CODE', userId: u.uid, code });
                                                    showToast(`Reactivated ${code} for ${u.name.split(' (')[0]}`);
                                                  }}
                                                  style={{ padding: '4px 8px', background: 'var(--color-green)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                                                >
                                                  Activate
                                                </button>
                                              ) : (
                                                <button
                                                  title="Suspend/Deactivate Promo Code"
                                                  onClick={() => {
                                                    dispatch({ type: 'SUSPEND_USER_PROMO_CODE', userId: u.uid, code });
                                                    showToast(`Suspended ${code} for ${u.name.split(' (')[0]}`);
                                                  }}
                                                  style={{ padding: '4px 8px', background: 'var(--color-orange)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                                                >
                                                  Suspend
                                                </button>
                                              )}
                                              <button
                                                title="Remove Promo Code completely"
                                                onClick={() => {
                                                  triggerConfirm({
                                                    title: 'Remove Promo Code',
                                                    message: `Are you sure you want to remove the promo code "${code}" from ${u.name}? This will revoke its benefits and allow the user to redeem this code again.`,
                                                    confirmText: 'Remove Code',
                                                    isDanger: true,
                                                    onConfirm: () => {
                                                      dispatch({ type: 'REMOVE_USER_PROMO_CODE', userId: u.uid, code });
                                                      showToast(`Removed ${code} from ${u.name.split(' (')[0]}`);
                                                    }
                                                  });
                                                }}
                                                style={{ padding: '4px 8px', background: 'var(--color-red)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <span className="cms-user-details-promo-none" style={{ fontSize: '12px', color: 'var(--color-text-light)', fontStyle: 'italic' }}>None used yet</span>
                                    )}
                                  </div>
                                </div>
                              </div>
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
                  <td colSpan="4" className="cms-no-data">No users match search conditions.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
