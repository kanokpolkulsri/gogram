import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useUserDispatch } from '../data/userStore';
import { auth, signOut } from '../data/firebase';
import {
  EditIcon,
  EnglishFlagIcon,
  ProfileIcon,
} from '../components/icons';
import './ProfilePage.css';

export default function ProfilePage() {
  const user = useUser();
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Failed to sign out:', e);
    }
  };

  const handleTogglePrivate = (e) => {
    dispatch({ type: 'SET_PRIVACY', isPrivate: e.target.checked });
  };

  const handleDownloadData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `gogram-data-${user.name || 'learner'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeleteAccount = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.delete();
      }
      dispatch({ type: 'RESET_PROGRESS' });
      navigate('/welcome', { replace: true });
    } catch (e) {
      console.error('Failed to delete account:', e);
      alert('To delete your account, please log out and log in again first for security verification.');
      setShowDeleteModal(false);
    }
  };

  return (

    <div className="profile-page" id="profile-page">
      <div className="profile-header">
        <div className="profile-title-wrapper">
          <div className="profile-icon-wrapper">
            <ProfileIcon active={true} size={24} />
          </div>
          <h2 className="profile-header-title">Profile</h2>
        </div>
      </div>

      <div className="profile-scroll">
        {/* Avatar Section */}
        <div className="profile-avatar-card">
          <div className="profile-avatar-container">
            {user.authProfile?.photoURL ? (
              <div className="profile-avatar-wrapper">
                <img src={user.authProfile.photoURL} alt="Avatar" className="profile-avatar-image" />
                <button className="profile-avatar-edit-btn" title="Edit Avatar">
                  <EditIcon size={14} />
                </button>
              </div>
            ) : (
              <div className="profile-avatar-silhouette">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="48" stroke="#E5E5E5" strokeWidth="2.5" strokeDasharray="6 6" />
                  <circle cx="50" cy="38" r="18" fill="#E5E5E5" />
                  <path d="M25 76c0-12 11-20 25-20s25 8 25 20H25z" fill="#E5E5E5" />
                </svg>
                <div className="profile-avatar-add-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#1CB0F6" />
                    <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <button className="profile-avatar-edit-btn" title="Edit Avatar">
                  <EditIcon size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="profile-user-info">
            <h2 className="profile-user-name">
              {user.authProfile?.displayName || user.name}
            </h2>
            <p className="profile-joined">Joined May 2026</p>
            <div className="profile-flags">
              <EnglishFlagIcon size={24} />
            </div>
          </div>
        </div>


        {/* Account & Privacy Settings Card */}
        <div className="profile-settings-card">
          <h3 className="profile-settings-title">Account & Privacy</h3>
          
          <div className="profile-settings-list">
            {/* Private Profile Toggle */}
            <div className="profile-settings-item">
              <div className="profile-settings-item-info">
                <span className="profile-settings-item-label">Private Profile</span>
                <span className="profile-settings-item-desc">Hide your profile and progress from public leaderboards.</span>
              </div>
              <label className="profile-switch">
                <input 
                  type="checkbox" 
                  checked={user.isPrivate || false} 
                  onChange={handleTogglePrivate} 
                  id="privacy-toggle"
                />
                <span className="profile-switch-slider"></span>
              </label>
            </div>

            {/* Download Data */}
            <div className="profile-settings-item">
              <div className="profile-settings-item-info">
                <span className="profile-settings-item-label">Download My Data</span>
                <span className="profile-settings-item-desc">Export your progress and account data as a JSON file.</span>
              </div>
              <button className="profile-settings-btn" onClick={handleDownloadData} id="download-data-btn">
                EXPORT
              </button>
            </div>

            {/* Delete Account */}
            <div className="profile-settings-item">
              <div className="profile-settings-item-info">
                <span className="profile-settings-item-label" style={{ color: 'var(--color-red)' }}>Delete Account</span>
                <span className="profile-settings-item-desc">Permanently erase your account and all learning progress.</span>
              </div>
              <button className="profile-settings-btn btn-danger-outline" onClick={() => setShowDeleteModal(true)} id="delete-account-btn">
                DELETE
              </button>
            </div>

            {/* Legal Documents Links */}
            <div className="profile-settings-links">
              <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); alert('Redirecting to Privacy Policy (standard template)...'); }} className="profile-legal-link">Privacy Policy</a>
              <span className="profile-legal-divider">•</span>
              <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); alert('Redirecting to Terms of Service (standard template)...'); }} className="profile-legal-link">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Log Out Button */}
        <button className="profile-logout-btn" onClick={handleLogout}>
          LOG OUT
        </button>

      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <h3>Delete Account?</h3>
            <p>This action is permanent and will completely erase all your XP, stats, and completed lessons. You cannot undo this.</p>
            <div className="profile-modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)} id="cancel-delete-btn">
                CANCEL
              </button>
              <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-red)', boxShadow: '0 4px 0 var(--color-red-dark)' }} onClick={handleDeleteAccount} id="confirm-delete-btn">
                DELETE PERMANENTLY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
