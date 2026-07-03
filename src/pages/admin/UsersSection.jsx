import React, { useState, useEffect, Fragment } from 'react';
import { api } from '../../data/api';
import { useUserDispatch } from '../../data/userStore';
import './UsersSection.css';

function formatDateForInput(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function HeartsEditControl({ userId, currentHearts, onUpdate, showToast }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempVal, setTempVal] = useState(currentHearts === 'infinity' ? 10 : (currentHearts ?? 10));

  const handleSave = () => {
    onUpdate(parseInt(tempVal) || 0);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="cms-flex-row-gap-2">
        <input
          type="number"
          min="0"
          value={tempVal}
          onChange={(e) => setTempVal(e.target.value)}
          className="cms-numeric-input"
        />
        <button
          onClick={handleSave}
          className="cms-btn-action-green"
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="cms-btn-action-gray"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      className="cms-btn-edit-numeric-hearts cms-btn-action-blue"
      onClick={() => {
        setTempVal(currentHearts ?? 10);
        setIsEditing(true);
      }}
    >
      Edit Count
    </button>
  );
}

export default function UsersSection({
  categories,
  currentUser,
  triggerConfirm,
  showToast,
  users,
  setUsers,
  totalUsers,
  setTotalUsers,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  isLoading,
  setIsLoading,
  userSearchQuery,
  setUserSearchQuery,
  userRoleFilter,
  setUserRoleFilter,
  userStatusFilter,
  setUserStatusFilter,
  expandedUserIds,
  setExpandedUserIds,
  userDetails,
  setUserDetails,
  fetchUsers,
  usersRefreshTrigger,
  setUsersRefreshTrigger
}) {
  const dispatch = useUserDispatch();
  const [loadingDetails, setLoadingDetails] = useState({});

  // Fetch users list with debounce on search query
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(1, userSearchQuery, userRoleFilter, userStatusFilter);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [userSearchQuery, userRoleFilter, userStatusFilter, usersRefreshTrigger, fetchUsers]);

  const toggleUserExpanded = async (userId) => {
    if (expandedUserIds.includes(userId)) {
      setExpandedUserIds(expandedUserIds.filter(id => id !== userId));
    } else {
      setExpandedUserIds([...expandedUserIds, userId]);

      // If user details not loaded yet, fetch them lazily
      if (!userDetails[userId]) {
        try {
          setLoadingDetails(prev => ({ ...prev, [userId]: true }));
          const detailsData = await api.get(`/admin/users/${userId}/details`);
          setUserDetails(prev => ({ ...prev, [userId]: detailsData }));
        } catch (err) {
          showToast(`Error loading details: ${err.message}`);
        } finally {
          setLoadingDetails(prev => ({ ...prev, [userId]: false }));
        }
      }

      setTimeout(() => {
        const element = document.getElementById(`user-progress-${userId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  // Admin Actions Handlers
  const handleUpdateRole = async (userId, role) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role });
      showToast(`Role updated to ${role.toUpperCase()}`);
      setUsers(prev => prev.map(u => u.uid === userId ? { ...u, role } : u));
    } catch (err) {
      showToast(`Error updating role: ${err.message}`);
    }
  };

  const handleToggleBlock = async (userId, currentStatus) => {
    const status = currentStatus === 'blocked' ? 'active' : 'blocked';
    try {
      await api.put(`/admin/users/${userId}/status`, { status });
      showToast(`Account status updated to ${status.toUpperCase()}`);
      setUsers(prev => prev.map(u => u.uid === userId ? { ...u, status, authLevel: status === 'blocked' ? 'blocked' : u.authLevel } : u));
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleUpdateHearts = async (userId, heartsValue) => {
    try {
      await api.put(`/admin/users/${userId}/hearts`, { heartsValue });
      showToast(heartsValue === 'infinity' ? 'Hearts set to Infinity' : `Hearts updated to ${heartsValue}`);
      setUsers(prev => prev.map(u => {
        if (u.uid === userId) {
          const hasInfinity = heartsValue === 'infinity';
          return {
            ...u,
            hearts: heartsValue,
            promoExpiresAt: hasInfinity ? new Date('2099-12-31T23:59:59Z').getTime() : null,
            authLevel: hasInfinity ? 'subscribed' : (u.role === 'admin' ? 'admin' : 'free')
          };
        }
        return u;
      }));
      if (userId === currentUser?.uid) {
        dispatch({ type: 'CHECK_HEARTS_REFILL' });
      }
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleUpdateSubscription = async (userId, expiresAt) => {
    try {
      await api.put(`/admin/users/${userId}/subscription`, { expiresAt });
      showToast(expiresAt 
        ? `Subscription updated to expire on ${new Date(expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}` 
        : 'Subscription set to Perpetual (Never Expires)');
      setUsers(prev => prev.map(u => {
        if (u.uid === userId) {
          const hasInfinity = expiresAt && new Date(expiresAt) > new Date();
          return {
            ...u,
            promoExpiresAt: expiresAt ? new Date(expiresAt).getTime() : null,
            authLevel: hasInfinity ? 'subscribed' : (u.role === 'admin' ? 'admin' : 'free'),
            hearts: hasInfinity ? 'infinity' : u.hearts
          };
        }
        return u;
      }));
      if (userId === currentUser?.uid) {
        dispatch({ type: 'CHECK_HEARTS_REFILL' });
      }
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleSuspendPromo = async (userId, code, isSuspended) => {
    try {
      await api.post(`/admin/users/${userId}/promo-codes/${code}/suspend`, { isSuspended });
      showToast(isSuspended ? `Suspended ${code}` : `Reactivated ${code}`);
      setUserDetails(prev => {
        const uDetails = prev[userId] || {};
        const suspended = uDetails.suspendedPromoCodes || [];
        const updatedSuspended = isSuspended 
          ? [...suspended, code] 
          : suspended.filter(c => c !== code);
        return {
          ...prev,
          [userId]: { ...uDetails, suspendedPromoCodes: updatedSuspended }
        };
      });
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleRemovePromo = async (userId, code) => {
    try {
      await api.delete(`/admin/users/${userId}/promo-codes/${code}`);
      showToast(`Removed promo code ${code}`);
      setUserDetails(prev => {
        const uDetails = prev[userId] || {};
        return {
          ...prev,
          [userId]: {
            ...uDetails,
            usedPromoCodes: (uDetails.usedPromoCodes || []).filter(c => c !== code),
            suspendedPromoCodes: (uDetails.suspendedPromoCodes || []).filter(c => c !== code)
          }
        };
      });
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId, name) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      showToast(`User ${name} has been removed.`);
      setUsersRefreshTrigger(prev => prev + 1);
    } catch (err) {
      showToast(`Error deleting user: ${err.message}`);
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
            placeholder="Search by name or email..."
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
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="cms-loading-cell">
                    <div className="cms-loading-spinner cms-loading-spinner-large"></div>
                    <p className="cms-loading-text">Loading Users List...</p>
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isBlocked = u.status === 'blocked';
                  const isExpanded = expandedUserIds.includes(u.uid);
                  const userHearts = u.uid === currentUser?.uid ? currentUser.hearts : u.hearts;
                  const userPromoExpiresAt = u.uid === currentUser?.uid ? currentUser.promoExpiresAt : u.promoExpiresAt;

                  const details = userDetails[u.uid] || {};
                  const isDetailsLoading = loadingDetails[u.uid];

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
                                  onConfirm: () => handleDeleteUser(u.uid, u.name)
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

                              {isDetailsLoading ? (
                                <div className="cms-loading-wrapper">
                                  <div className="cms-loading-spinner cms-loading-spinner-small"></div>
                                  <span className="cms-loading-text-inline">Loading profile progress...</span>
                                </div>
                              ) : (
                                <>
                                  {/* Account settings, Hearts and Promo Codes inside expanded-progress-container */}
                                  <div className="cms-user-details-settings-container">
                                    <div className="cms-user-details-settings-block">
                                      <div className="cms-user-details-settings-group cms-user-details-settings-group-margin">
                                        <h5 className="cms-user-details-settings-title">Account Settings</h5>
                                        
                                        <label className="cms-user-details-settings-label">ROLE</label>
                                        <select
                                          className="role-dropdown-cms cms-user-details-select-field cms-user-details-select-field-margin"
                                          value={u.role || 'user'}
                                          onChange={(e) => handleUpdateRole(u.uid, e.target.value)}
                                        >
                                          <option value="user">User</option>
                                          <option value="admin">Admin</option>
                                        </select>

                                        <label className="cms-user-details-settings-label">STATUS</label>
                                        <select
                                          className="status-dropdown-cms cms-user-details-select-field"
                                          value={u.status || 'active'}
                                          onChange={() => handleToggleBlock(u.uid, u.status)}
                                        >
                                          <option value="active">Active</option>
                                          <option value="blocked">Blocked</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="cms-user-details-settings-block">
                                       <div className="cms-user-details-settings-group">
                                         <h5 className="cms-user-details-settings-title">Hearts & Subscription Status</h5>
                                         
                                          {/* Visual Heart Status Badge Row showing both Infinity and Numeric modes */}
                                          <div className="cms-user-hearts-badge-row">
                                            <button
                                              className={`cms-btn-mode-infinity ${userHearts === 'infinity' ? 'active' : 'inactive'}`}
                                              onClick={() => handleUpdateHearts(u.uid, 'infinity')}
                                              disabled={userHearts === 'infinity'}
                                              title={userHearts === 'infinity' ? 'Currently in Infinite Hearts Mode' : 'Switch to Infinite Hearts Mode'}
                                            >
                                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                  fill={userHearts === 'infinity' ? 'var(--color-orange)' : 'var(--color-text-light)'}
                                                />
                                              </svg>
                                              <span>Infinity (∞)</span>
                                            </button>

                                            <button
                                              className={`cms-btn-mode-numeric ${userHearts !== 'infinity' ? 'active' : 'inactive'}`}
                                              onClick={() => handleUpdateHearts(u.uid, 10)}
                                              disabled={userHearts !== 'infinity'}
                                              title={userHearts !== 'infinity' ? 'Currently in Numeric Hearts Mode' : 'Switch to Numeric Hearts Mode'}
                                            >
                                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path
                                                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                  fill={userHearts !== 'infinity' ? 'var(--color-red)' : 'var(--color-text-light)'}
                                                />
                                              </svg>
                                              <span>Numeric ({userHearts !== 'infinity' ? (userHearts ?? 10) : 10})</span>
                                            </button>
                                          </div>

                                         {/* Expiration Details */}
                                         {userHearts === 'infinity' && (
                                           <div className="cms-user-subscription-expiration-details" style={{ width: '100%' }}>
                                             <div className="cms-flex-col-gap-1">
                                               <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-text-light)', textTransform: 'uppercase' }}>
                                                 Expiration Date
                                               </span>
                                               <div className="cms-flex-row-gap-2">
                                                 <input
                                                   type="date"
                                                   className="cms-user-subscription-date-picker"
                                                   value={formatDateForInput(userPromoExpiresAt)}
                                                   onChange={(e) => {
                                                     const val = e.target.value;
                                                     if (val) {
                                                       const selectedDate = new Date(val + 'T23:59:59');
                                                       handleUpdateSubscription(u.uid, selectedDate.toISOString());
                                                     } else {
                                                       handleUpdateSubscription(u.uid, null);
                                                     }
                                                   }}
                                                 />
                                                 <button
                                                   className={`cms-btn-extend-preset ${!userPromoExpiresAt ? 'active' : ''}`}
                                                   onClick={() => handleUpdateSubscription(u.uid, null)}
                                                   style={{ height: '36px', whiteSpace: 'nowrap' }}
                                                 >
                                                   {!userPromoExpiresAt ? '✓ Perpetual' : 'Set Perpetual'}
                                                 </button>
                                               </div>
                                             </div>
                                           </div>
                                         )}

                                         {/* Action Buttons */}
                                         <div className="cms-user-hearts-actions-container">
                                           {userHearts === 'infinity' ? (
                                             <div className="cms-user-extend-preset-container">
                                               <span className="cms-user-extend-label">EXTEND:</span>
                                               <button
                                                 className="cms-btn-extend-30-days cms-btn-extend-preset"
                                                 onClick={() => {
                                                   const date = new Date();
                                                   date.setDate(date.getDate() + 30);
                                                   handleUpdateSubscription(u.uid, date.toISOString());
                                                 }}
                                               >
                                                 +30 Days
                                               </button>
                                               <button
                                                 className="cms-btn-extend-1-year cms-btn-extend-preset"
                                                 onClick={() => {
                                                   const date = new Date();
                                                   date.setFullYear(date.getFullYear() + 1);
                                                   handleUpdateSubscription(u.uid, date.toISOString());
                                                 }}
                                               >
                                                 +1 Year
                                               </button>
                                             </div>
                                           ) : (
                                             <div className="cms-user-hearts-adjust-numeric-row">
                                               <span className="cms-user-adjust-numeric-label">ADJUST NUMERIC:</span>
                                               <HeartsEditControl
                                                 userId={u.uid}
                                                 currentHearts={userHearts}
                                                 onUpdate={(val) => handleUpdateHearts(u.uid, val)}
                                                 showToast={showToast}
                                               />
                                             </div>
                                           )}
                                         </div>
                                       </div>
                                     </div>

                                    <div className="cms-user-details-settings-block">
                                      <div className="cms-user-details-promo-block">
                                        <h5 className="cms-user-details-promo-title">Promo Codes Redeemed</h5>
                                        <div className="cms-user-details-promo-list">
                                          {(details.usedPromoCodes && details.usedPromoCodes.length > 0) ? (
                                            details.usedPromoCodes.map(code => {
                                              const isSuspended = details.suspendedPromoCodes?.includes(code);
                                              return (
                                                <div key={code} className="cms-user-details-promo-item">
                                                  <div className="cms-user-details-promo-info">
                                                    <span className={`cms-user-details-promo-code ${isSuspended ? 'suspended' : 'active'}`}>
                                                      {code}
                                                    </span>
                                                    {isSuspended && (
                                                      <span className="cms-user-details-promo-suspended-badge">
                                                        Suspended
                                                      </span>
                                                    )}
                                                  </div>
                                                  <div className="cms-user-details-promo-actions">
                                                    {isSuspended ? (
                                                      <button
                                                        title="Reactivate/Unsuspend Promo Code"
                                                        onClick={() => handleSuspendPromo(u.uid, code, false)}
                                                        className="cms-btn-action-green"
                                                      >
                                                        Activate
                                                      </button>
                                                    ) : (
                                                      <button
                                                        title="Suspend/Deactivate Promo Code"
                                                        onClick={() => handleSuspendPromo(u.uid, code, true)}
                                                        className="cms-btn-action-blue"
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
                                                          onConfirm: () => handleRemovePromo(u.uid, code)
                                                        });
                                                      }}
                                                      className="cms-btn-action-red"
                                                    >
                                                      Remove
                                                    </button>
                                                  </div>
                                                </div>
                                              );
                                            })
                                          ) : (
                                            <span className="cms-user-details-promo-none">None used yet</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <h5 className="cms-user-details-progress-section-title">Category Progress</h5>
                                  <div className="cms-expanded-progress-grid">
                                    {categories.map(cat => {
                                      const completedCount = details.progress?.[cat.id] || 0;
                                      const computedLevel = completedCount + 1;

                                      return (
                                        <div key={cat.id} className="cms-progress-category-card">
                                          <div className="cms-progress-category-info">
                                            <span className="cms-progress-category-title">{cat.title}</span>
                                          </div>
                                          <div className="cms-progress-category-stats cms-flex-row-gap-2">
                                            <span className="cms-user-level-badge">
                                              LV {computedLevel}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
              {!isLoading && users.length === 0 && (
                <tr>
                  <td colSpan="4" className="cms-no-data">No users match search conditions.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {!isLoading && totalPages > 1 && (
          <div className="cms-pagination-bar">
            <span className="cms-pagination-text">
              Showing Page {currentPage} of {totalPages} ({totalUsers} total users)
            </span>
            <div className="cms-pagination-actions">
              <button
                disabled={currentPage === 1}
                onClick={() => fetchUsers(currentPage - 1, userSearchQuery, userRoleFilter, userStatusFilter)}
                className="cms-pagination-btn"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => fetchUsers(currentPage + 1, userSearchQuery, userRoleFilter, userStatusFilter)}
                className="cms-pagination-btn"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
