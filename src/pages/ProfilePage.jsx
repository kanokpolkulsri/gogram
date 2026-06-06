import { useUser, useUserDispatch } from '../data/userStore';
import {
  EditIcon,
  EnglishFlagIcon,
  ProfileIcon,
} from '../components/icons';
import './ProfilePage.css';

export default function ProfilePage() {
  const user = useUser();
  const dispatch = useUserDispatch();

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
            <p className="profile-username">
              @{user.authProfile?.email ? user.authProfile.email.split('@')[0] : 'learner_english'}
            </p>
            <p className="profile-joined">Joined May 2026</p>
            <div className="profile-flags">
              <EnglishFlagIcon size={24} />
            </div>
            <div className="profile-social">
              <span className="profile-social-stat">
                <strong>{user.following || 12}</strong> Following
              </span>
              <span className="profile-social-divider">·</span>
              <span className="profile-social-stat">
                <strong>{user.followers || 8}</strong> Followers
              </span>
            </div>
          </div>
        </div>

        {/* Invite Friends */}
        <div className="profile-invite-card">
          <div className="profile-invite-owl">
            <svg width="72" height="72" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="32" fill="#58CC02" />
              <circle cx="40" cy="43" r="24" fill="#89E219" />
              <circle cx="30" cy="36" r="9" fill="white" />
              <circle cx="50" cy="36" r="9" fill="white" />
              <circle cx="32" cy="36" r="4.5" fill="#333" />
              <circle cx="52" cy="36" r="4.5" fill="#333" />
              <circle cx="33" cy="34.5" r="1.5" fill="white" />
              <circle cx="53" cy="34.5" r="1.5" fill="white" />
              <ellipse cx="40" cy="46" rx="5" ry="3.5" fill="#FFC800" />
              <ellipse cx="32" cy="70" rx="6" ry="3.5" fill="#FFC800" />
              <ellipse cx="48" cy="70" rx="6" ry="3.5" fill="#FFC800" />
            </svg>
          </div>
          <div className="profile-invite-content">
            <h3 className="profile-invite-title">Invite Friends</h3>
            <p className="profile-invite-desc">Learning English is better with friends!</p>
            <button className="profile-invite-btn">INVITE FRIENDS</button>
          </div>
        </div>


      </div>
    </div>
  );
}
