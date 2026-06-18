import React, { useState } from 'react';

export default function DashboardSection({ categories, mockUsers, allQuestions, auditLogs }) {
  const totalLearners = mockUsers.length;
  const premiumUsers = mockUsers.filter(u => u.authLevel === 'subscribed').length;
  const premiumRatio = totalLearners > 0 ? Math.round((premiumUsers / totalLearners) * 100) : 0;
  const totalQs = allQuestions.length;

  const [visibleCount, setVisibleCount] = useState(10);
  const visibleLogs = auditLogs.slice(0, visibleCount);

  return (
    <div className="cms-page-content animate-fade-in cms-dashboard-page">
      <h2 className="cms-section-title">CMS Dashboard</h2>
      <p className="cms-section-subtitle">System Overview and Key Metrics</p>

      {/* Dashboard KPIs */}
      <div className="cms-dashboard-kpis">
        <div className="kpi-card cms-dashboard-kpi-card">
          <div className="kpi-details cms-dashboard-kpi-details">
            <span className="kpi-label cms-dashboard-kpi-label">Total Learners</span>
            <span className="kpi-value cms-dashboard-kpi-value">{totalLearners}</span>
          </div>
        </div>

        <div className="kpi-card cms-dashboard-kpi-card">
          <div className="kpi-details cms-dashboard-kpi-details">
            <span className="kpi-label cms-dashboard-kpi-label">Pro Users</span>
            <span className="kpi-value cms-dashboard-kpi-value">{premiumUsers} <span className="kpi-subtext cms-dashboard-kpi-subtext">({premiumRatio}%)</span></span>
          </div>
        </div>

        <div className="kpi-card cms-dashboard-kpi-card">
          <div className="kpi-details cms-dashboard-kpi-details">
            <span className="kpi-label cms-dashboard-kpi-label">Active Questions</span>
            <span className="kpi-value cms-dashboard-kpi-value">{totalQs}</span>
          </div>
        </div>
      </div>

      {/* Audit Log Feed */}
      <div className="cms-section-header-row cms-dashboard-audit-header-row">
        <div>
          <h2 className="cms-section-title cms-dashboard-audit-title">System Audit Logs</h2>
          <p className="cms-section-subtitle cms-dashboard-audit-subtitle">Latest admin actions across the platform.</p>
        </div>
        <span className="cms-badge-info cms-dashboard-audit-badge">Latest Actions</span>
      </div>

      <div className="cms-card cms-table-card cms-dashboard-audit-card">
        <div className="cms-table-wrapper scrollbar cms-dashboard-table-wrapper">
          <table className="cms-table text-left cms-dashboard-table">
            <thead>
              <tr>
                <th className="th-audit-admin">ADMINISTRATOR</th>
                <th className="th-audit-action">ACTION DETAIL</th>
                <th className="th-audit-timestamp">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {visibleLogs.map((log) => (
                <tr key={log.id} className="cms-dashboard-audit-row">
                  <td><strong className="cms-dashboard-audit-admin-name">{log.adminName}</strong></td>
                  <td className="cms-dashboard-audit-action">{log.action}</td>
                  <td className="cms-dashboard-audit-timestamp">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
              {auditLogs.length === 0 && (
                <tr>
                  <td colSpan="3" className="cms-no-data">No system logs available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {auditLogs.length > 0 && (
          <div className="pagination-bar cms-dashboard-pagination-bar">
            <span className="pagination-bar-info">
              Showing {Math.min(visibleCount, auditLogs.length)} of {auditLogs.length} logs
            </span>
            {auditLogs.length > visibleCount && (
              <button
                className="cms-btn-load-more cms-dashboard-load-more"
                onClick={() => setVisibleCount(prev => prev + 10)}
              >
                LOAD MORE LOGS
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

