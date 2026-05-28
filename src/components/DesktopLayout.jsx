import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import BottomNav from './BottomNav';
import './DesktopLayout.css';

export default function DesktopLayout({ children, showRightSidebar = true }) {
  return (
    <div className="desktop-layout" id="desktop-layout">
      <Sidebar />
      <main className="desktop-main">
        <div className="desktop-main-content">
          {children}
        </div>
      </main>
      {showRightSidebar && <RightSidebar />}
      {/* Mobile bottom nav - shown only on small screens */}
      <div className="mobile-only">
        <BottomNav />
      </div>
    </div>
  );
}
