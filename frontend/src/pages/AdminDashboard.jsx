import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage organizations, donations, and users</p>
        </div>

        <div className="admin-dashboard-grid">
          <div className="admin-dashboard-card admin-card-1">
            <div className="card-icon">✅</div>
            <h2>Approve Organizations</h2>
            <p>Review and approve new organization registrations</p>
            <div className="card-arrow">→</div>
          </div>

          <div className="admin-dashboard-card admin-card-2">
            <div className="card-icon">📊</div>
            <h2>View All Donations</h2>
            <p>Monitor all donations across the platform</p>
            <div className="card-arrow">→</div>
          </div>

          <div className="admin-dashboard-card admin-card-3">
            <div className="card-icon">👥</div>
            <h2>Manage Users</h2>
            <p>Control user accounts and permissions</p>
            <div className="card-arrow">→</div>
          </div>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="stat-number">156</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-number">42</div>
            <div className="stat-label">Organizations</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-number">328</div>
            <div className="stat-label">Total Donations</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-number">89%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}