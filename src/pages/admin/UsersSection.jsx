import React, { useState, useEffect, Fragment } from 'react';
import { api } from '../../data/api';

function HeartsEditControl({ userId, currentHearts, onUpdate, showToast }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempVal, setTempVal] = useState(currentHearts === 'infinity' ? 10 : (currentHearts ?? 10));

  const handleSave = () => {
    onUpdate(parseInt(tempVal) || 0);
    setIsEditing(false);
  };

  const handleMakeInfinity = () => {
    onUpdate('infinity');
    setIsEditing(false);
  };

  const handleResetHearts = () => {
    onUpdate(10);
    setIsEditing(false);
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
            authLevel: hasInfinity ? 'subscribed' : (u.role === 'admin' ? 'admin' : 'free')
          };
        }
        return u;
      }));
    } catch (err) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleUpdateSubscription = async (userId, expiresAt) => {
    try {
      await api.put(`/admin/users/${userId}/subscription`, { expiresAt });
      showToast(expiresAt ? 'Premium granted/extended by 30 days' : 'Premium revoked');
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
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                    <div className="cms-loading-spinner" style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid var(--color-gray)', borderTopColor: 'var(--color-blue-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ marginTop: '8px', fontSize: '13px', fontWeight: 'bold', color: 'var(--color-text-light)' }}>Loading Users List...</p>
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
                                <div style={{ padding: '24px', textAlign: 'center' }}>
                                  <div className="cms-loading-spinner" style={{ display: 'inline-block', width: '20px', height: '20px', border: '3px solid var(--color-gray)', borderTopColor: 'var(--color-blue-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                  <span style={{ marginLeft: '8px', fontSize: '13px', color: 'var(--color-text-light)' }}>Loading profile progress...</span>
                                </div>
                              ) : (
                                <>
                                  {/* Account settings, Hearts and Promo Codes inside expanded-progress-container */}
                                  <div className="cms-user-details-settings-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                                    <div className="cms-user-details-settings-block" style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-gray)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                      <div className="cms-user-details-settings-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                                        <h5 className="cms-user-details-settings-title" style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-text)', margin: 0, marginBottom: '4px' }}>Account Settings</h5>
                                        
                                        <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-text-light)' }}>ROLE</label>
                                        <select
                                          className="role-dropdown-cms"
                                          value={u.role || 'user'}
                                          onChange={(e) => handleUpdateRole(u.uid, e.target.value)}
                                          style={{ padding: '6px 12px', borderRadius: '8px', border: '2px solid var(--color-gray)', fontSize: '13px', fontWeight: '700', backgroundColor: 'white', cursor: 'pointer', width: '100%', marginBottom: '8px' }}
                                        >
                                          <option value="user">User</option>
                                          <option value="admin">Admin</option>
                                        </select>

                                        <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-text-light)' }}>STATUS</label>
                                        <select
                                          className="status-dropdown-cms"
                                          value={u.status || 'active'}
                                          onChange={() => handleToggleBlock(u.uid, u.status)}
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
                                            onUpdate={(val) => handleUpdateHearts(u.uid, val)}
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
                                                handleUpdateSubscription(u.uid, date.toISOString());
                                              }}
                                              style={{ flex: 1, padding: '6px 8px', background: 'var(--color-green)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                                            >
                                              +30 Days
                                            </button>
                                            <button
                                              onClick={() => {
                                                handleUpdateSubscription(u.uid, null);
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
                                          {(details.usedPromoCodes && details.usedPromoCodes.length > 0) ? (
                                            details.usedPromoCodes.map(code => {
                                              const isSuspended = details.suspendedPromoCodes?.includes(code);
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
                                                        onClick={() => handleSuspendPromo(u.uid, code, false)}
                                                        style={{ padding: '4px 8px', background: 'var(--color-green)', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
                                                      >
                                                        Activate
                                                      </button>
                                                    ) : (
                                                      <button
                                                        title="Suspend/Deactivate Promo Code"
                                                        onClick={() => handleSuspendPromo(u.uid, code, true)}
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
                                                          onConfirm: () => handleRemovePromo(u.uid, code)
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

                                  {/* Learning Progress Section */}
                                  <h5 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-text-light)', marginTop: '24px', marginBottom: '12px', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category Progress</h5>
                                  <div className="cms-expanded-progress-grid">
                                    {categories.map(cat => {
                                      const completedCount = details.progress?.[cat.id] || 0;
                                      const computedLevel = completedCount + 1;

                                      return (
                                        <div key={cat.id} className="cms-progress-category-card">
                                          <div className="cms-progress-category-info">
                                            <span className="cms-progress-category-title">{cat.title}</span>
                                          </div>
                                          <div className="cms-progress-category-stats" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span
                                              className="cms-level-badge"
                                              style={{
                                                padding: '4px 12px',
                                                borderRadius: '8px',
                                                border: '1px solid var(--color-gray)',
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                backgroundColor: '#F3F4F6',
                                                color: 'var(--color-text)'
                                              }}
                                            >
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
          <div className="pagination-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '2px solid var(--color-gray)' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-text-light)', fontWeight: 'bold' }}>
              Showing Page {currentPage} of {totalPages} ({totalUsers} total users)
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                disabled={currentPage === 1}
                onClick={() => fetchUsers(currentPage - 1, userSearchQuery, userRoleFilter, userStatusFilter)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--color-gray)',
                  backgroundColor: 'white',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  opacity: currentPage === 1 ? 0.5 : 1
                }}
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => fetchUsers(currentPage + 1, userSearchQuery, userRoleFilter, userStatusFilter)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--color-gray)',
                  backgroundColor: 'white',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  opacity: currentPage === totalPages ? 0.5 : 1
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
