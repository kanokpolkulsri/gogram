import React from 'react';

export default function DashboardSection({ categories, mockUsers, allQuestions, auditLogs }) {
  const totalLearners = mockUsers.length;
  const premiumUsers = mockUsers.filter(u => u.authLevel === 'subscribed').length;
  const premiumRatio = totalLearners > 0 ? Math.round((premiumUsers / totalLearners) * 100) : 0;
  const totalQs = allQuestions.length;

  return (
    <div className="cms-page-content animate-fade-in">
      <h2 className="cms-section-title">CMS Dashboard</h2>
      <p className="cms-section-subtitle">System Overview and Key Metrics</p>

      {/* Dashboard KPIs */}
      <div className="cms-dashboard-kpis">
        <div className="kpi-card">
          <div className="kpi-details">
            <span className="kpi-label">Total Learners</span>
            <span className="kpi-value">{totalLearners}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-details">
            <span className="kpi-label">Pro Users</span>
            <span className="kpi-value">{premiumUsers} <span className="kpi-subtext">({premiumRatio}%)</span></span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-details">
            <span className="kpi-label">Active Questions</span>
            <span className="kpi-value">{totalQs}</span>
          </div>
        </div>
      </div>

      {/* Audit Log Feed */}
      <div className="cms-grid-two-columns">
        <div className="cms-card full-width">
          <div className="cms-card-header">
            <h3 className="cms-card-title">System Audit Logs</h3>
            <span className="cms-badge-info">Latest Actions</span>
          </div>
          <div className="cms-table-wrapper" style={{ maxHeight: '380px', overflowY: 'auto' }}>
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Administrator</th>
                  <th>Action Detail</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td><strong>{log.adminName}</strong></td>
                    <td>{log.action}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
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
        </div>
      </div>
    </div>
  );
}
